"use client";

import { useState } from "react";
import { Mail, Check, Sparkles, X, ShieldCheck, Zap, ArrowRight, Loader2, ExternalLink } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerifiedSuccess?: (email: string) => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sentSuccess, setSentSuccess] = useState(false);
  const [previewLink, setPreviewLink] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSendLink = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError("");

    const clean = email.trim();
    if (!clean || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: clean }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSentSuccess(true);
        if (data.verificationUrl) {
          setPreviewLink(data.verificationUrl);
        }
      } else {
        setError(data.error || "Failed to send verification link.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Background ambient glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-gradient-to-br from-indigo-500/20 to-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!sentSuccess ? (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-gradient-to-tr from-emerald-500 to-indigo-600 text-white shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40">
                  <Zap className="w-3 h-3" /> 100% FREE
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Unlock 7 Days Free Trial
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-5">
              TagGeneratorPro is <strong>completely free for everyone</strong>. Verify your email to activate 7 days of unlimited generations across all platforms.
            </p>

            {/* Features Unlocked */}
            <div className="space-y-2 mb-5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
              {[
                "7 Days of Unlimited Daily Generations",
                "YouTube, Instagram, TikTok & Facebook Tags",
                "Full SEO Titles, Descriptions & Bio Generator",
                "1-Click Bulk CSV & JSON Export",
                "No Credit Card Required • Instant Activation",
              ].map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Email Form */}
            <form onSubmit={handleSendLink} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Your Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="creator@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                {error && <p className="text-[11px] text-rose-500 mt-1.5">{error}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-500 to-indigo-600 hover:opacity-95 shadow-md shadow-emerald-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-75"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Verification Link...</span>
                  </>
                ) : (
                  <>
                    <span>Send Verification Link</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>We never spam or share your email • 1-click verification</span>
            </div>
          </div>
        ) : (
          /* SENT STATE */
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
              <Mail className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Check Your Inbox!
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              We sent a verification link to <strong className="text-slate-900 dark:text-white">{email}</strong>. Click the link in the email to activate your 7-day free trial.
            </p>

            {previewLink && (
              <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-left space-y-2">
                <div className="text-[11px] font-semibold text-indigo-700 dark:text-indigo-300">
                  ⚡ Instant Verification (Direct Link):
                </div>
                <a
                  href={previewLink}
                  className="w-full py-2.5 px-3 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1.5 text-center"
                >
                  <span>Verify Email & Unlock 7 Days Now</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            <button
              onClick={() => {
                setSentSuccess(false);
                setEmail("");
              }}
              className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 underline"
            >
              Use a different email address
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
