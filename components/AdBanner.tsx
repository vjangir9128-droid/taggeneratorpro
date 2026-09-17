"use client";

import { Sparkles } from "lucide-react";

export type AdSlot = "top-banner" | "inline" | "sidebar" | "footer";

interface AdBannerProps {
  slot: AdSlot;
  className?: string;
}

const SLOT_CONFIG: Record<
  AdSlot,
  { label: string; dimensions: string; heightClass: string; minW: string }
> = {
  "top-banner": {
    label: "Top Sponsor Unit",
    dimensions: "728x90 / Responsive",
    heightClass: "min-h-[80px]",
    minW: "w-full max-w-4xl",
  },
  inline: {
    label: "Inline Creator Showcase",
    dimensions: "Fluid Responsive Banner",
    heightClass: "min-h-[90px]",
    minW: "w-full",
  },
  sidebar: {
    label: "Sidebar Unit",
    dimensions: "300x250 Medium Rectangle",
    heightClass: "min-h-[250px]",
    minW: "w-full max-w-[320px]",
  },
  footer: {
    label: "Footer Banner Unit",
    dimensions: "728x90 Leaderboard",
    heightClass: "min-h-[80px]",
    minW: "w-full max-w-4xl",
  },
};

export default function AdBanner({ slot, className = "" }: AdBannerProps) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const config = SLOT_CONFIG[slot];

  return (
    <div
      className={`my-3 mx-auto flex flex-col items-center justify-center p-3 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 text-center transition-all ${config.heightClass} ${config.minW} ${className}`}
    >
      {adsenseId ? (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client={adsenseId}
            data-ad-slot="1234567890"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center justify-between w-full px-4 gap-2">
          <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
            <span className="text-xs uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              100% Free
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              TagGeneratorPro • Free Social Media SEO Tools
            </span>
          </div>

          <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>100% Free For All Creators</span>
          </div>
        </div>
      )}
    </div>
  );
}
