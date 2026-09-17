"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Zap, AlertCircle, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [daysLeft, setDaysLeft] = useState(7);
  const [expiresAt, setExpiresAt] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setErrorMessage("No verification token was found in the link. Please request a new verification link.");
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(`/api/auth/verify?token=${encodeURIComponent(token)}`);
        const data = await res.json();

        if (res.ok && data.success) {
          setStatus("success");
          setEmail(data.email || "");
          if (data.trialStatus) {
            setDaysLeft(data.trialStatus.daysLeft || 7);
            setExpiresAt(data.trialStatus.expiresAtFormatted || "");
          }
          if (data.email) {
            try {
              localStorage.setItem("tagpro_trial_email", data.email);
              localStorage.setItem("tagpro_trial_verified", "true");
            } catch (e) {
              console.warn(e);
            }
          }
        } else {
          setStatus("error");
          setErrorMessage(data.error || "Verification failed. The link may have expired.");
        }
      } catch (err: unknown) {
        setStatus("error");
        setErrorMessage(err instanceof Error ? err.message : "Connection error while verifying.");
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 max-w-lg mx-auto w-full">
        <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 text-center space-y-6 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-44 h-44 bg-gradient-to-br from-emerald-500/20 to-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* VERIFYING STATE */}
          {status === "verifying" && (
            <div className="py-8 space-y-4">
              <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mx-auto" />
              <h2 className="text-xl font-bold">Verifying Your Email...</h2>
              <p className="text-xs text-slate-500">
                Please wait while we activate your 7-day free trial.
              </p>
            </div>
          )}

          {/* ERROR STATE */}
          {status === "error" && (
            <div className="py-4 space-y-5">
              <div className="w-14 h-14 rounded-full bg-rose-100 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
                <AlertCircle className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-rose-600 dark:text-rose-400">
                  Verification Failed
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {errorMessage}
                </p>
              </div>
              <Link
                href="/"
                className="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:opacity-90 transition-opacity block"
              >
                Return to Generator & Request New Link
              </Link>
            </div>
          )}

          {/* SUCCESS STATE */}
          {status === "success" && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>EMAIL VERIFIED • 7 DAYS UNLOCKED</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Your 7-Day Free Trial is Active!
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Welcome aboard <strong>{email}</strong>. You now have full, unlimited access to all TagGeneratorPro tools for the next 7 days.
                </p>
              </div>

              {/* Trial Info Card */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-left text-xs space-y-2.5">
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Verified Email:</span>
                  <span className="font-semibold text-slate-900 dark:text-white font-mono text-[11px]">{email}</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Trial Period:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{daysLeft} Days Free Trial</span>
                </div>
                {expiresAt && (
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Active Until:</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">{expiresAt}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Generations Quota:</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">Unlimited (YouTube, IG, TT, FB)</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Cost:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">100% FREE ($0)</span>
                </div>
              </div>

              <Link
                href="/"
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-500 via-teal-600 to-indigo-600 hover:opacity-95 shadow-lg shadow-emerald-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                <span>Start Generating Unlimited Tags Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>No credit card was charged • 100% free creator tool</span>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Verifying email link...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
