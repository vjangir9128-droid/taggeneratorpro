import { NextRequest, NextResponse } from "next/server";
import { generateTags, Platform, GeneratedTagsResult } from "@/lib/hashtag-engine";
import { generateWithAI, ContentType, GenerationOptions } from "@/lib/llm-provider";
import { getTrialStatus } from "@/lib/trial-auth";

export interface GenerateResponseData {
  success: boolean;
  platform: Platform;
  contentType: ContentType;
  topic: string;
  tagsResult?: GeneratedTagsResult;
  title?: string;
  description?: string;
  bio?: string;
  trial: {
    isVerified: boolean;
    isActive: boolean;
    daysLeft: number;
    hoursLeft: number;
    email?: string;
  };
  requiresVerification?: boolean;
  error?: string;
}

// In-memory counter for unverified guest previews before requiring email verification
const guestUsageMap = new Map<string, number>();

export async function POST(req: NextRequest) {
  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request body." },
        { status: 400 }
      );
    }

    const {
      platform = "youtube",
      contentType = "all",
      topic = "",
      options = {},
    }: {
      platform: Platform;
      contentType: ContentType;
      topic: string;
      options?: GenerationOptions;
    } = body;

    if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid topic, niche, or keyword." },
        { status: 400 }
      );
    }

    if (!["youtube", "instagram", "facebook", "tiktok"].includes(platform)) {
      return NextResponse.json(
        { success: false, error: "Invalid platform specified." },
        { status: 400 }
      );
    }

    // Determine trial authentication
    const headerEmail = req.headers.get("x-trial-email");
    const cookieEmail = req.cookies.get("tagpro_trial_email")?.value;
    const email = headerEmail || cookieEmail || body.email;

    const trialStatus = email ? getTrialStatus(email) : null;
    const isTrialActive = trialStatus?.isActive ?? false;

    // If trial is NOT active / unverified, check guest limit
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    if (!isTrialActive) {
      const guestCount = guestUsageMap.get(ip) || 0;
      // Allow 2 quick trial previews before requiring email verification
      if (guestCount >= 2) {
        return NextResponse.json(
          {
            success: false,
            requiresVerification: true,
            error: "Please verify your email to activate your 7-Day Free Unlimited Trial! TagGeneratorPro is 100% free with no credit card required.",
            trial: {
              isVerified: false,
              isActive: false,
              daysLeft: 0,
              hoursLeft: 0,
            },
          },
          { status: 403 }
        );
      }
      guestUsageMap.set(ip, guestCount + 1);
    }

    const cleanTopic = topic.trim().slice(0, 200);

    let tagsResult: GeneratedTagsResult | undefined;
    let title: string | undefined;
    let description: string | undefined;
    let bio: string | undefined;

    if (contentType === "hashtags" || contentType === "all") {
      tagsResult = generateTags(platform, cleanTopic);
    }

    if (contentType === "title" || contentType === "description" || contentType === "bio" || contentType === "all") {
      const aiResult = await generateWithAI(platform, contentType, cleanTopic, options);
      if (aiResult.title) title = aiResult.title;
      if (aiResult.description) description = aiResult.description;
      if (aiResult.bio) bio = aiResult.bio;
    }

    const responsePayload: GenerateResponseData = {
      success: true,
      platform,
      contentType,
      topic: cleanTopic,
      tagsResult,
      title,
      description,
      bio,
      trial: {
        isVerified: trialStatus?.isVerified || false,
        isActive: isTrialActive,
        daysLeft: trialStatus?.daysLeft || 0,
        hoursLeft: trialStatus?.hoursLeft || 0,
        email: trialStatus?.email || "",
      },
    };

    return NextResponse.json(responsePayload);
  } catch (error: unknown) {
    console.error("API Generation Error:", error);
    const message = error instanceof Error ? error.message : "Internal server error occurred";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
