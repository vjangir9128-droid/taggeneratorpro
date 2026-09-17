"use client";

import { Platform } from "@/lib/hashtag-engine";

interface PlatformSelectorProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
}

interface PlatformItem {
  id: Platform;
  label: string;
  badge: string;
  accentClass: string;
  activeBorder: string;
  iconSvg: (active: boolean) => React.ReactNode;
}

const PLATFORMS: PlatformItem[] = [
  {
    id: "youtube",
    label: "YouTube",
    badge: "500-Char SEO Tags",
    accentClass: "hover:text-red-500 hover:border-red-500/30",
    activeBorder: "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400 shadow-xs shadow-red-500/10",
    iconSvg: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-red-500" : "text-slate-400"}`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    id: "instagram",
    label: "Instagram",
    badge: "Tri-Tier 30 Hashtags",
    accentClass: "hover:text-pink-500 hover:border-pink-500/30",
    activeBorder: "border-pink-500 bg-pink-500/10 text-pink-600 dark:text-pink-400 shadow-xs shadow-pink-500/10",
    iconSvg: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-pink-500" : "text-slate-400"}`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    id: "tiktok",
    label: "TikTok",
    badge: "Trending & FYP",
    accentClass: "hover:text-cyan-500 hover:border-cyan-500/30",
    activeBorder: "border-cyan-500 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shadow-xs shadow-cyan-500/10",
    iconSvg: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-cyan-400" : "text-slate-400"}`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.74 1.45-.07 2.76-.99 3.25-2.36.2-.55.27-1.14.27-1.72.03-4.57.01-9.15.02-13.72V.02h.06z"/>
      </svg>
    ),
  },
  {
    id: "facebook",
    label: "Facebook",
    badge: "Engagement & Reach",
    accentClass: "hover:text-blue-500 hover:border-blue-500/30",
    activeBorder: "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400 shadow-xs shadow-blue-500/10",
    iconSvg: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-blue-500" : "text-slate-400"}`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
];

export default function PlatformSelector({ selected, onChange }: PlatformSelectorProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {PLATFORMS.map((p) => {
          const isActive = selected === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onChange(p.id)}
              className={`flex flex-col sm:flex-row items-center sm:items-start p-3 rounded-2xl border transition-all duration-200 text-left gap-2.5 ${
                isActive
                  ? `${p.activeBorder} font-bold ring-1 ring-offset-0`
                  : "border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              }`}
            >
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0">
                {p.iconSvg(isActive)}
              </div>
              <div className="min-w-0">
                <span className="text-sm font-semibold block truncate">
                  {p.label}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">
                  {p.badge}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
