"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PlatformSelector from "@/components/PlatformSelector";
import ContentTypeTabs from "@/components/ContentTypeTabs";
import GeneratorForm from "@/components/GeneratorForm";
import OutputCards from "@/components/OutputCards";
import AdBanner from "@/components/AdBanner";
import Footer from "@/components/Footer";
import { Platform, GeneratedTagsResult } from "@/lib/hashtag-engine";
import { ContentType, GenerationOptions } from "@/lib/llm-provider";
import { GenerateResponseData } from "@/app/api/generate/route";
import { ChevronDown, AlertCircle, Sparkles, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  const [platform, setPlatform] = useState<Platform>("youtube");
  const [contentType, setContentType] = useState<ContentType>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Output State
  const [lastGeneratedTopic, setLastGeneratedTopic] = useState("");
  const [tagsResult, setTagsResult] = useState<GeneratedTagsResult | undefined>();
  const [title, setTitle] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [bio, setBio] = useState<string | undefined>();

  // FAQ open state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleGenerate = async (topic: string, options: GenerationOptions) => {
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          platform,
          contentType,
          topic,
          options,
        }),
      });

      const data: GenerateResponseData = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Generation failed. Please try again.");
      }

      // Update output state
      setLastGeneratedTopic(topic);
      setTagsResult(data.tagsResult);
      setTitle(data.title);
      setDescription(data.description);
      setBio(data.bio);
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const faqs = [
    {
      q: "Is TagGeneratorPro completely free to use?",
      a: "Yes! TagGeneratorPro is 100% free for everyone. There are no paid plans, no subscriptions, no credit cards required, and no account registration needed. You have unlimited access to generate tags, titles, captions, and bios across all platforms.",
    },
    {
      q: "How does the YouTube Tag Generator ensure 500-character compliance?",
      a: "Our algorithm calculates exact byte lengths including commas and separators. It front-loads your primary exact-match topic, followed by high-volume search phrases, and dynamically truncates tags so you never exceed YouTube's strict 500-character ceiling.",
    },
    {
      q: "What is the Instagram Tri-Tier Hashtag strategy?",
      a: "Rather than using saturated 100M+ hashtags where your posts disappear in seconds, our engine automatically selects a balanced cocktail: 20% high-reach tags (500k-2M posts), 50% medium community tags (50k-500k posts), and 30% low-competition long-tail tags (5k-50k posts). This maximizes discovery across both search and Explore.",
    },
    {
      q: "Can I export my generated tags to CSV or JSON?",
      a: "Yes! You can export all generated assets (tags, titles, descriptions, bios) to CSV or JSON in 1 click, or copy formatted outputs directly to your clipboard for YouTube Creator Studio and TikTok captions.",
    },
    {
      q: "How do I optimize TikTok FYP reach with this tool?",
      a: "TikTok favors 5 to 8 focused hashtags rather than 30 tags. Select 'TikTok' as your platform, and our engine will generate punchy video hooks, trending community tags (#Tok), and high-retention captions designed for search indexing.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors">
      {/* Navigation Header */}
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-6 w-full space-y-8">
        {/* Top Sponsor Banner */}
        <AdBanner slot="top-banner" />

        {/* Hero Section */}
        <Hero />

        {/* Main Generator Card */}
        <div className="p-4 sm:p-7 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-emerald-500/5 space-y-6">
          {/* 1. Platform Switcher */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                1. Select Platform
              </label>
              <span className="text-xs text-slate-400">Target network</span>
            </div>
            <PlatformSelector selected={platform} onChange={setPlatform} />
          </div>

          {/* 2. Content Type Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                2. Select Asset Type
              </label>
              <span className="text-xs text-slate-400">
                Generate single or complete asset pack
              </span>
            </div>
            <ContentTypeTabs
              selected={contentType}
              onChange={setContentType}
              platform={platform}
            />
          </div>

          {/* 3. Input & Submit Form */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                3. Enter Topic, Niche or Keyword
              </label>
            </div>
            <GeneratorForm
              platform={platform}
              contentType={contentType}
              isLoading={isLoading}
              onGenerate={handleGenerate}
            />
          </div>

          {/* Error notification */}
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs font-medium text-rose-700 dark:text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Free feature bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Free & Unlimited: 500-char YouTube tags, IG tri-tier hashtags, TikTok hooks, and 1-click CSV export.</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Generation</span>
            </div>
          </div>
        </div>

        {/* Inline Showcase Unit */}
        <AdBanner slot="inline" />

        {/* Results Section */}
        {lastGeneratedTopic && (
          <OutputCards
            platform={platform}
            contentType={contentType}
            topic={lastGeneratedTopic}
            tagsResult={tagsResult}
            title={title}
            description={description}
            bio={bio}
          />
        )}

        {/* Educational / How It Works Section */}
        <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center font-bold text-sm mb-3">
              YT
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
              YouTube SEO Tags
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Strictly formats comma-separated tags under 500 characters, front-loading the exact match search term and category synonyms.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center font-bold text-sm mb-3">
              IG
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
              Instagram Tri-Tier Engine
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Blends high-volume tags (500k+) with targeted niche tags (50k-500k) and long-tail tags (5k-50k) so your content ranks in Explore.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-sm mb-3">
              TT
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
              TikTok & FYP Indexing
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Provides the ideal 5 to 8 focused tags, high-retention video openers, and concise profile bios compliant with TikTok limits.
            </p>
          </div>
        </div>

        {/* Frequently Asked Questions Section */}
        <div className="pt-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>100% Free For Creators</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-sm font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-emerald-500" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed animate-in fade-in duration-150">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Sponsor Unit */}
        <AdBanner slot="footer" />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
