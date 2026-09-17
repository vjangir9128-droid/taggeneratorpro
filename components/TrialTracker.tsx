"use client";

import { Sparkles, CheckCircle2, ShieldCheck, Mail, LogOut, Zap } from "lucide-react";

interface TrialTrackerProps {
  isVerified: boolean;
  daysLeft: number;
  hoursLeft: number;
  email: string;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export default function TrialTracker({
  isVerified,
  daysLeft,
  hoursLeft,
  email,
  onOpenAuth,
  onLogout,
}: TrialTrackerProps) {
  if (isVerified) {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border border-emerald-500/30 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                7-Day Free Trial Active:
              </span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300">
                {daysLeft > 0 ? `${daysLeft} Days Left` : `${hoursLeft} Hours Left`}
              </span>
              <span className="hidden sm:inline text-[11px] text-slate-500 font-mono">
                ({email})
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Unlimited tag, title, description, and bio generations unlocked across all 4 platforms.
            </p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="text-[11px] font-medium text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 flex items-center gap-1 shrink-0 transition-colors"
          title="Switch email or log out"
        >
          <LogOut className="w-3 h-3" />
          <span>Change Email</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
          <Zap className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
            <span>Free 7-Day Unlimited Access:</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
              Email Verification
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Verify your email to unlock 7 days of unlimited AI generations. 100% free with no credit card.
          </p>
        </div>
      </div>

      <button
        onClick={onOpenAuth}
        className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-indigo-600 hover:opacity-95 shadow-md shadow-emerald-500/20 active:scale-95 transition-all flex items-center gap-1.5 shrink-0"
      >
        <Mail className="w-3.5 h-3.5" />
        <span>Activate 7-Day Free Trial</span>
      </button>
    </div>
  );
}
