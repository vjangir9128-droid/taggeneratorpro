"use client";

import { useState } from "react";
import { Sparkles, Loader2, SlidersHorizontal, ArrowRight, X } from "lucide-react";
import { Platform } from "@/lib/hashtag-engine";
import { ContentType, GenerationOptions } from "@/lib/llm-provider";

interface GeneratorFormProps {
  platform: Platform;
  contentType: ContentType;
  isLoading: boolean;
  onGenerate: (topic: string, options: GenerationOptions) => void;
}

const TRENDING_SUGGESTIONS: Record<Platform, string[]> = {
  youtube: [
    "fitness motivation 2026",
    "travel vlog Bali",
    "ai tech review",
    "budget meal prep",
    "coding tutorial for beginners",
    "day in my life vlog",
  ],
  instagram: [
    "gym workout routine",
    "wanderlust luxury travel",
    "aesthetic desk setup",
    "healthy street food",
    "minimalist streetwear",
    "side hustle passive income",
  ],
  tiktok: [
    "workout hacks",
    "travel check hidden gems",
    "cool ai tools 2026",
    "quick 15 min recipe",
    "room makeover aesthetic",
    "thrift haul transformation",
  ],
  facebook: [
    "healthy living tips",
    "small business growth",
    "digital marketing tips",
    "family dinner ideas",
    "continuous learning habits",
    "future tech discussions",
  ],
};

export default function GeneratorForm({
  platform,
  contentType,
  isLoading,
  onGenerate,
}: GeneratorFormProps) {
  const [topic, setTopic] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [tone, setTone] = useState<"viral" | "professional" | "casual" | "informative">("viral");
  const [audience, setAudience] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || isLoading) return;
    onGenerate(topic.trim(), { tone, audience: audience.trim() });
  };

  const handleChipClick = (suggestion: string) => {
    setTopic(suggestion);
    onGenerate(suggestion, { tone, audience: audience.trim() });
  };

  const getPlaceholder = () => {
    if (platform === "youtube") return "e.g. fitness motivation, travel vlog Bali, ai coding tutorial...";
    if (platform === "instagram") return "e.g. aesthetic coffee, workout gains, luxury travel, street style...";
    if (platform === "tiktok") return "e.g. viral recipe, outfit transition, side hustle tips, fyp hacks...";
    return "e.g. business tips, healthy habits, tech trends, family recipes...";
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Main Search Input Container */}
        <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 focus-within:border-indigo-500 dark:focus-within:border-indigo-500 shadow-lg shadow-indigo-500/5 transition-all">
          <div className="flex-1 flex items-center px-2">
            <Sparkles className="w-5 h-5 text-indigo-500 shrink-0 mr-2.5" />
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={getPlaceholder()}
              disabled={isLoading}
              className="w-full py-2.5 text-sm sm:text-base font-medium bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
            />
            {topic && (
              <button
                type="button"
                onClick={() => setTopic("")}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowOptions(!showOptions)}
              className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                showOptions
                  ? "border-indigo-500/40 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400"
                  : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
              title="Tone and Audience Options"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Options</span>
            </button>

            <button
              type="submit"
              disabled={isLoading || !topic.trim()}
              className="py-3 px-6 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shrink-0"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <span>Generate</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Collapsible Options Panel */}
        {showOptions && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-150">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Tone & Vibe
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: "viral", label: "🔥 Viral / Hype" },
                  { id: "professional", label: "💼 Professional" },
                  { id: "casual", label: "✨ Casual & Friendly" },
                  { id: "informative", label: "🧠 Informative" },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTone(t.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium text-left transition-colors ${
                      tone === t.id
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Target Audience (Optional)
              </label>
              <input
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="e.g. Gen Z, beginners, entrepreneurs, busy parents"
                className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Refines copy and tag suggestions to address specific audience preferences.
              </p>
            </div>
          </div>
        )}

        {/* Trending Suggestions Chips */}
        <div className="flex items-center gap-2 pt-1 overflow-x-auto scrollbar-none">
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500 shrink-0">
            Trending:
          </span>
          {TRENDING_SUGGESTIONS[platform].map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => handleChipClick(suggestion)}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-white dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 shrink-0 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}
