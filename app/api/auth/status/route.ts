import { NextRequest, NextResponse } from "next/server";
import { getTrialStatus } from "@/lib/trial-auth";

export async function GET(req: NextRequest) {
  try {
    const emailQuery = req.nextUrl.searchParams.get("email");
    const cookieEmail = req.cookies.get("tagpro_trial_email")?.value;
    const email = emailQuery || cookieEmail;

    if (!email) {
      return NextResponse.json({
        success: true,
        trialStatus: {
          email: "",
          isVerified: false,
          isActive: false,
          isExpired: false,
          daysLeft: 0,
          hoursLeft: 0,
        },
      });
    }

    const status = getTrialStatus(email);
    return NextResponse.json({ success: true, trialStatus: status });
  } catch (error: unknown) {
    console.error("status route error:", error);
    const msg = error instanceof Error ? error.message : "Failed to fetch trial status";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
