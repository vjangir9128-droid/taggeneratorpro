import { NextRequest, NextResponse } from "next/server";
import { generateTags, Platform, GeneratedTagsResult } from "@/lib/hashtag-engine";
import { generateWithAI, ContentType, GenerationOptions } from "@/lib/llm-provider";

export interface GenerateResponseData {
  success: boolean;
  platform: Platform;
  contentType: ContentType;
  topic: string;
  tagsResult?: GeneratedTagsResult;
  title?: string;
  description?: string;
  bio?: string;
  error?: string;
}

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
