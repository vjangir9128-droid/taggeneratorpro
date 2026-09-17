"use client";

import { Sparkles, Zap, TrendingUp, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative pt-6 pb-4 sm:pt-10 sm:pb-6 text-center max-w-3xl mx-auto px-4">
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-44 bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 mb-4 shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
        <span>100% Free For Everyone • No Login Required</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-3">
        Rank Higher with Viral{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600">
          Tags, Hashtags & Hooks
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-6">
        Generate 500-character YouTube SEO tags, tri-tier Instagram hashtags, TikTok FYP hooks, descriptions, and bios in seconds. Free, unlimited, and instant for all creators.
      </p>

      {/* Feature Highlights micro-bar */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>Instant Tag Generation</span>
        </div>
        <div className="flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
          <span>YouTube 500-Char Compliance</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
          <span>No Sign-up or Credit Card Required</span>
        </div>
      </div>
    </div>
  );
}
