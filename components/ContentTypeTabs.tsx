"use client";

import { ContentType } from "@/lib/llm-provider";
import { Hash, Type, FileText, UserCheck, Sparkles } from "lucide-react";

interface ContentTypeTabsProps {
  selected: ContentType;
  onChange: (type: ContentType) => void;
  platform: string;
}

export default function ContentTypeTabs({ selected, onChange, platform }: ContentTypeTabsProps) {
  const getTagLabel = () => {
    if (platform === "youtube") return "SEO Tags / Keywords";
    if (platform === "instagram") return "Hashtags (Tri-Tier)";
    if (platform === "tiktok") return "Trending Hashtags";
    return "Hashtags & Keywords";
  };

  const getTitleLabel = () => {
    if (platform === "instagram" || platform === "tiktok") return "Hook / Caption";
    return "Title";
  };

  const tabs: { id: ContentType; label: string; icon: React.ReactNode }[] = [
    { id: "all", label: "All Assets", icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: "hashtags", label: getTagLabel(), icon: <Hash className="w-3.5 h-3.5" /> },
    { id: "title", label: getTitleLabel(), icon: <Type className="w-3.5 h-3.5" /> },
    { id: "description", label: "Description", icon: <FileText className="w-3.5 h-3.5" /> },
    { id: "bio", label: "Bio / About", icon: <UserCheck className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="flex items-center gap-1.5 p-1.5 overflow-x-auto rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 scrollbar-none">
      {tabs.map((tab) => {
        const isActive = selected === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
              isActive
                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs border border-slate-200/80 dark:border-slate-700"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-800/40"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
