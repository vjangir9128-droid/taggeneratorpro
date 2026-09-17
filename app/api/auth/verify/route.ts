import { NextRequest, NextResponse } from "next/server";
import { verifyEmailToken } from "@/lib/trial-auth";

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token") || "";

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Missing verification token." },
        { status: 400 }
      );
    }

    const result = verifyEmailToken(token);

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    const response = NextResponse.json({
      success: true,
      email: result.email,
      trialStatus: result.trialStatus,
      message: "Email verified successfully! Your 7-day free trial is now active.",
    });

    // Set secure cookie for trial session
    if (result.email) {
      response.cookies.set("tagpro_trial_email", result.email, {
        path: "/",
        maxAge: 7 * 24 * 60 * 60, // 7 days
        sameSite: "lax",
      });
    }

    return response;
  } catch (error: unknown) {
    console.error("verify token error:", error);
    const msg = error instanceof Error ? error.message : "Internal verification error.";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const token = body.token || "";

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Missing verification token." },
        { status: 400 }
      );
    }

    const result = verifyEmailToken(token);

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    const response = NextResponse.json({
      success: true,
      email: result.email,
      trialStatus: result.trialStatus,
      message: "Email verified successfully! Your 7-day free trial is now active.",
    });

    if (result.email) {
      response.cookies.set("tagpro_trial_email", result.email, {
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
        sameSite: "lax",
      });
    }

    return response;
  } catch (error: unknown) {
    console.error("verify token error:", error);
    const msg = error instanceof Error ? error.message : "Internal verification error.";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
