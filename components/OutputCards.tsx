"use client";

import { useState } from "react";
import { Copy, Check, Hash, Type, FileText, UserCheck, Download, Share2, Sparkles, CheckCheck } from "lucide-react";
import { Platform, GeneratedTagsResult } from "@/lib/hashtag-engine";
import { ContentType } from "@/lib/llm-provider";

interface OutputCardsProps {
  platform: Platform;
  contentType: ContentType;
  topic: string;
  tagsResult?: GeneratedTagsResult;
  title?: string;
  description?: string;
  bio?: string;
  onUpgradeClick?: () => void;
}

export default function OutputCards({
  platform,
  contentType,
  topic,
  tagsResult,
  title,
  description,
  bio,
  onUpgradeClick,
}: OutputCardsProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleCopyAll = async () => {
    const sections: string[] = [];

    if (title) {
      sections.push(`=== TITLE / CAPTION ===\n${title}`);
    }
    if (tagsResult?.raw) {
      const label = platform === "youtube" ? "SEO TAGS (COMMA-SEPARATED)" : "HASHTAGS";
      sections.push(`=== ${label} ===\n${tagsResult.raw}`);
    }
    if (description) {
      sections.push(`=== DESCRIPTION ===\n${description}`);
    }
    if (bio) {
      sections.push(`=== BIO / ABOUT ===\n${bio}`);
    }

    const fullText = sections.join("\n\n");
    await copyToClipboard(fullText, "all");
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2200);
  };

  const handleExportCSV = () => {
    const rows = [
      ["Platform", "Topic", "Asset Type", "Content"],
      [platform, topic, "Title", `"${(title || "").replace(/"/g, '""')}"`],
      [platform, topic, "Tags", `"${(tagsResult?.raw || "").replace(/"/g, '""')}"`],
      [platform, topic, "Description", `"${(description || "").replace(/"/g, '""')}"`],
      [platform, topic, "Bio", `"${(bio || "").replace(/"/g, '""')}"`],
    ];

    const csvContent = "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `taggeneratorpro-${platform}-${topic.replace(/\s+/g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper for YouTube tags character limit
  const ytTagCharCount = tagsResult?.characterCount || 0;
  const ytTagMax = 500;
  const ytPercentage = Math.min(100, Math.round((ytTagCharCount / ytTagMax) * 100));

  // Platform bio limits
  const bioLimit = platform === "tiktok" ? 80 : platform === "instagram" ? 150 : 300;
  const bioCharCount = bio?.length || 0;

  // Title limits
  const titleLimit = platform === "tiktok" ? 50 : 100;
  const titleCharCount = title?.length || 0;

  const showTags = (contentType === "all" || contentType === "hashtags") && !!tagsResult;
  const showTitle = (contentType === "all" || contentType === "title") && !!title;
  const showDescription = (contentType === "all" || contentType === "description") && !!description;
  const showBio = (contentType === "all" || contentType === "bio") && !!bio;

  const hasAnyContent = showTags || showTitle || showDescription || showBio;

  if (!hasAnyContent) return null;

  return (
    <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Generated Content for</span>
            <span className="capitalize text-indigo-600 dark:text-indigo-400">"{topic}"</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Platform: <span className="capitalize font-semibold text-slate-700 dark:text-slate-300">{platform}</span>
            {tagsResult?.nicheDetected && (
              <span> • Niche: <span className="capitalize font-medium text-emerald-600 dark:text-emerald-400">{tagsResult.nicheDetected}</span></span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5"
            title="Download CSV for spreadsheets"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          <button
            onClick={handleCopyAll}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs ${
              copiedAll
                ? "bg-emerald-600 text-white"
                : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90"
            }`}
          >
            {copiedAll ? <CheckCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedAll ? "Copied All!" : "Copy All"}</span>
          </button>
        </div>
      </div>

      {/* Grid of Results */}
      <div className="grid grid-cols-1 gap-5">
        {/* 1. Tags / Hashtags Card */}
        {showTags && tagsResult && (
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs p-5 transition-all hover:border-slate-300 dark:hover:border-slate-700">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                  <Hash className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {platform === "youtube" ? "YouTube SEO Tags (Comma-Separated)" : "Hashtags Pack"}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {tagsResult.targetCountText}
                  </p>
                </div>
              </div>

              {/* Counters & Limits */}
              <div className="flex items-center gap-3">
                {platform === "youtube" ? (
                  <div className="text-right">
                    <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <span className={ytTagCharCount > 490 ? "text-amber-500" : "text-emerald-500"}>
                        {ytTagCharCount}
                      </span>
                      <span className="text-slate-400"> / {ytTagMax} chars</span>
                    </div>
                    <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${ytPercentage}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {tagsResult.itemCount} tags
                  </div>
                )}

                <button
                  onClick={() => copyToClipboard(tagsResult.raw, "tags")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    copiedKey === "tags"
                      ? "bg-emerald-600 text-white"
                      : "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100"
                  }`}
                >
                  {copiedKey === "tags" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === "tags" ? "Copied!" : "Copy Tags"}</span>
                </button>
              </div>
            </div>

            {/* Individual Chips view with competition pills */}
            <div className="flex flex-wrap gap-1.5 mb-3.5">
              {tagsResult.items.map((item, idx) => {
                const tierColor =
                  item.tier === "high"
                    ? "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900/50"
                    : item.tier === "medium"
                    ? "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900/50"
                    : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/50";

                return (
                  <button
                    key={idx}
                    onClick={() => copyToClipboard(item.tag, `chip-${idx}`)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition-transform active:scale-95 ${tierColor}`}
                    title={`Click to copy: ${item.tag} (${item.estimatedPosts || item.tier})`}
                  >
                    <span>{item.tag}</span>
                    {copiedKey === `chip-${idx}` && <Check className="w-3 h-3 text-emerald-600" />}
                  </button>
                );
              })}
            </div>

            {/* Raw String View in Code Block */}
            <div className="relative group">
              <pre className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-800 dark:text-slate-200 whitespace-pre-wrap break-words">
                {tagsResult.raw}
              </pre>
            </div>
          </div>
        )}

        {/* 2. Title / Hook Card */}
        {showTitle && title && (
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs p-5 transition-all hover:border-slate-300 dark:hover:border-slate-700">
            <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                  <Type className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {platform === "instagram" || platform === "tiktok" ? "Hook / Caption Opener" : "Video / Post Title"}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    High CTR front-loaded keywords
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  <span className={titleCharCount > titleLimit ? "text-rose-500" : "text-slate-900 dark:text-white"}>
                    {titleCharCount}
                  </span>
                  /{titleLimit} chars
                </span>

                <button
                  onClick={() => copyToClipboard(title, "title")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    copiedKey === "title"
                      ? "bg-emerald-600 text-white"
                      : "bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 hover:bg-purple-100"
                  }`}
                >
                  {copiedKey === "title" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === "title" ? "Copied!" : "Copy Title"}</span>
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white">
              {title}
            </div>
          </div>
        )}

        {/* 3. Description Card */}
        {showDescription && description && (
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs p-5 transition-all hover:border-slate-300 dark:hover:border-slate-700">
            <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {platform === "youtube" ? "Optimized YouTube Description" : "Post Description & Body"}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Includes keyword placement, timestamps & CTA
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  {description.split(/\s+/).filter(Boolean).length} words • {description.length} chars
                </span>

                <button
                  onClick={() => copyToClipboard(description, "description")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    copiedKey === "description"
                      ? "bg-emerald-600 text-white"
                      : "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100"
                  }`}
                >
                  {copiedKey === "description" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === "description" ? "Copied!" : "Copy Description"}</span>
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
              {description}
            </div>
          </div>
        )}

        {/* 4. Bio / About Card */}
        {showBio && bio && (
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs p-5 transition-all hover:border-slate-300 dark:hover:border-slate-700">
            <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {platform === "facebook" ? "Page About / Bio" : "Profile Bio"}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Character limit: Max {bioLimit} characters
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  <span className={bioCharCount > bioLimit ? "text-rose-500 font-bold" : "text-emerald-500 font-bold"}>
                    {bioCharCount}
                  </span>
                  /{bioLimit} chars
                </span>

                <button
                  onClick={() => copyToClipboard(bio, "bio")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    copiedKey === "bio"
                      ? "bg-emerald-600 text-white"
                      : "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 hover:bg-amber-100"
                  }`}
                >
                  {copiedKey === "bio" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === "bio" ? "Copied!" : "Copy Bio"}</span>
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
              {bio}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
