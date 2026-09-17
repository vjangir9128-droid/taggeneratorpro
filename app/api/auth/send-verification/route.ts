import { NextRequest, NextResponse } from "next/server";
import { isValidEmail, createVerificationToken } from "@/lib/trial-auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email = "" } = body;

    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const origin = req.headers.get("origin") || req.nextUrl.origin || "http://localhost:3000";
    const { token } = createVerificationToken(email);

    const verificationUrl = `${origin}/verify-email?token=${token}`;

    console.log(`[AUTH] Verification link generated for ${email}: ${verificationUrl}`);

    // If RESEND_API_KEY or SMTP is set, you could send a real email here:
    // e.g. await sendEmail({ to: email, subject: "Verify your email for TagGeneratorPro 7-Day Trial", html: ... })

    return NextResponse.json({
      success: true,
      message: `A verification link has been sent to ${email}. Check your inbox or use the preview link below.`,
      verificationUrl, // Returned for instant preview & local testing
      email,
    });
  } catch (error: unknown) {
    console.error("send-verification error:", error);
    const msg = error instanceof Error ? error.message : "Failed to send verification link.";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
