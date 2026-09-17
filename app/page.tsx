"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PlatformSelector from "@/components/PlatformSelector";
import ContentTypeTabs from "@/components/ContentTypeTabs";
import GeneratorForm from "@/components/GeneratorForm";
import OutputCards from "@/components/OutputCards";
import TrialTracker from "@/components/TrialTracker";
import AdBanner from "@/components/AdBanner";
import AuthModal from "@/components/AuthModal";
import Footer from "@/components/Footer";
import { Platform, GeneratedTagsResult } from "@/lib/hashtag-engine";
import { ContentType, GenerationOptions } from "@/lib/llm-provider";
import { GenerateResponseData } from "@/app/api/generate/route";
import { ChevronDown, AlertCircle, Mail, Sparkles } from "lucide-react";

export default function HomePage() {
  const [platform, setPlatform] = useState<Platform>("youtube");
  const [contentType, setContentType] = useState<ContentType>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 7-Day Trial State
  const [trialEmail, setTrialEmail] = useState<string>("");
  const [isTrialVerified, setIsTrialVerified] = useState(false);
  const [trialDaysLeft, setTrialDaysLeft] = useState(7);
  const [trialHoursLeft, setTrialHoursLeft] = useState(168);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Output State
  const [lastGeneratedTopic, setLastGeneratedTopic] = useState("");
  const [tagsResult, setTagsResult] = useState<GeneratedTagsResult | undefined>();
  const [title, setTitle] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [bio, setBio] = useState<string | undefined>();

  // FAQ open state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Check trial status from local storage and backend API
  const refreshTrialStatus = async (storedEmail?: string) => {
    try {
      const email = storedEmail || localStorage.getItem("tagpro_trial_email") || "";
      if (!email) {
        setIsTrialVerified(false);
        setTrialEmail("");
        return;
      }

      setTrialEmail(email);

      const res = await fetch(`/api/auth/status?email=${encodeURIComponent(email)}`);
      const data = await res.json();

      if (res.ok && data.success && data.trialStatus) {
        setIsTrialVerified(data.trialStatus.isActive);
        setTrialDaysLeft(data.trialStatus.daysLeft || 0);
        setTrialHoursLeft(data.trialStatus.hoursLeft || 0);
      }
    } catch (e) {
      console.warn("Trial status check failed:", e);
    }
  };

  useEffect(() => {
    refreshTrialStatus();
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("tagpro_trial_email");
      localStorage.removeItem("tagpro_trial_verified");
    } catch (e) {
      console.warn(e);
    }
    setTrialEmail("");
    setIsTrialVerified(false);
    setTrialDaysLeft(7);
  };

  const handleGenerate = async (topic: string, options: GenerationOptions) => {
    setError(null);
    setIsLoading(true);

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (trialEmail) {
        headers["x-trial-email"] = trialEmail;
      }

      const res = await fetch("/api/generate", {
        method: "POST",
        headers,
        body: JSON.stringify({
          platform,
          contentType,
          topic,
          options,
          email: trialEmail,
        }),
      });

      const data: GenerateResponseData = await res.json();

      if (!res.ok || !data.success) {
        if (data.requiresVerification) {
          setIsAuthModalOpen(true);
        }
        throw new Error(data.error || "Generation failed. Please try again.");
      }

      // Update output state
      setLastGeneratedTopic(topic);
      setTagsResult(data.tagsResult);
      setTitle(data.title);
      setDescription(data.description);
      setBio(data.bio);

      // Sync trial state
      if (data.trial) {
        setIsTrialVerified(data.trial.isActive);
        setTrialDaysLeft(data.trial.daysLeft);
        setTrialHoursLeft(data.trial.hoursLeft);
      }
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
      q: "How does the 7-day free trial work?",
      a: "TagGeneratorPro is 100% free for everyone. When you enter your email, we send a secure verification link to your inbox. Once clicked, you get 7 days of unlimited daily generations across YouTube, TikTok, Instagram, and Facebook with zero charges and no credit card required.",
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
      a: "Yes! All verified trial users can export tags and captions to CSV or JSON in 1 click, or copy formatted outputs directly to their clipboard for YouTube Creator Studio and TikTok captions.",
    },
    {
      q: "How do I optimize TikTok FYP reach with this tool?",
      a: "TikTok favors 5 to 8 focused hashtags rather than 30 tags. Select 'TikTok' as your platform, and our engine will generate punchy video hooks, trending community tags (#Tok), and high-retention captions designed for search indexing.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors">
      {/* Navigation Header */}
      <Navbar
        isVerified={isTrialVerified}
        daysLeft={trialDaysLeft}
        email={trialEmail}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

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

          {/* Verification / Error notification */}
          {error && (
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs font-medium text-amber-800 dark:text-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-500" />
                <span>{error}</span>
              </div>
              {!isTrialVerified && (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Verify Email (Free 7 Days)</span>
                </button>
              )}
            </div>
          )}

          {/* 7-Day Free Trial Tracker */}
          <TrialTracker
            isVerified={isTrialVerified}
            daysLeft={trialDaysLeft}
            hoursLeft={trialHoursLeft}
            email={trialEmail}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onLogout={handleLogout}
          />
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

      {/* Email Verification / Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          refreshTrialStatus();
        }}
      />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
