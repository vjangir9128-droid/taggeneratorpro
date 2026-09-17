import Link from "next/link";
import { Metadata } from "next";
import { BLOG_POSTS } from "@/data/blog-posts";
import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";
import AdBanner from "@/components/AdBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Social Media Growth & SEO Guides (2026) | TagGeneratorPro",
  description:
    "Expert guides on YouTube SEO tags, Instagram hashtag tri-tier algorithms, TikTok viral growth, and social media copywriting.",
  openGraph: {
    title: "Social Media Growth & SEO Guides (2026) | TagGeneratorPro",
    description:
      "Expert guides on YouTube SEO tags, Instagram hashtag tri-tier algorithms, TikTok viral growth, and social media copywriting.",
    url: "https://taggeneratorpro.online/blog",
  },
};

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors">
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-extrabold text-lg">
            <span>TagGenerator</span>
            <span className="text-rose-500">Pro</span>
          </Link>
          <Link
            href="/"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:opacity-90 transition-opacity"
          >
            Open Generator →
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 py-10 w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>SEO & Creator Growth Guides</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            Master the Social Media Algorithms
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Actionable, data-backed strategies for cracking the YouTube, Instagram, and TikTok discovery engines in 2026.
          </p>
        </div>

        {/* Top Ad Unit */}
        <AdBanner slot="top-banner" />

        {/* Articles List */}
        <div className="grid grid-cols-1 gap-6 my-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-800 transition-all shadow-xs hover:shadow-md group"
            >
              <div className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400 mb-2">
                <span className="px-2.5 py-0.5 rounded-full font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                  {post.category}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {post.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {post.readTime}
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {post.description}
              </p>

              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:underline"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </article>
          ))}
        </div>

        {/* Footer Ad Unit */}
        <AdBanner slot="footer" />
      </main>

      <Footer />
    </div>
  );
}
