import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/blog-posts";
import { ArrowLeft, Calendar, Clock, Sparkles, Share2 } from "lucide-react";
import AdBanner from "@/components/AdBanner";
import Footer from "@/components/Footer";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | TagGeneratorPro`,
    description: post.description,
    alternates: {
      canonical: `https://www.taggeneratorpro.online/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: "2026-03-15T00:00:00.000Z",
      url: `https://www.taggeneratorpro.online/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors">
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/blog"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Guides</span>
          </Link>
          <Link
            href="/"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:opacity-90 transition-opacity"
          >
            Try Generator →
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-4 py-10 w-full">
        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
            <span>{post.category}</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-500">
              <Calendar className="w-3.5 h-3.5" /> {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-500">
              <Clock className="w-3.5 h-3.5" /> {post.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            {post.title}
          </h1>

          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed border-l-4 border-indigo-500 pl-4 py-1 italic bg-indigo-50/50 dark:bg-indigo-950/20 rounded-r-lg">
            {post.description}
          </p>
        </div>

        {/* Top Ad Unit */}
        <AdBanner slot="top-banner" />

        {/* Content Body */}
        <article className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed space-y-5 my-8">
          {post.content.split("\n\n").map((block, idx) => {
            if (block.startsWith("## ")) {
              return (
                <h2 key={idx} className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white pt-4 pb-1">
                  {block.replace("## ", "")}
                </h2>
              );
            }
            if (block.startsWith("### ")) {
              return (
                <h3 key={idx} className="text-lg font-bold text-slate-900 dark:text-white pt-3 pb-1">
                  {block.replace("### ", "")}
                </h3>
              );
            }
            if (block.startsWith("1. ") || block.startsWith("- ")) {
              return (
                <div key={idx} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs sm:text-sm whitespace-pre-wrap leading-loose">
                  {block}
                </div>
              );
            }
            return (
              <p key={idx} className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {block}
              </p>
            );
          })}
        </article>

        {/* Inline Ad Unit */}
        <AdBanner slot="inline" />

        {/* CTA Callout */}
        <div className="my-10 p-6 rounded-2xl bg-gradient-to-r from-indigo-900/40 via-purple-900/40 to-rose-900/40 border border-indigo-500/30 text-center space-y-3">
          <div className="inline-flex p-2 rounded-xl bg-indigo-600 text-white">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Ready to Generate Viral Tags & Hashtags?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
            Use TagGeneratorPro for free. Optimize your tags, titles, and descriptions for YouTube, Instagram, Facebook, and TikTok.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-md"
            >
              Start Generating Free →
            </Link>
          </div>
        </div>

        {/* Footer Ad Unit */}
        <AdBanner slot="footer" />
      </main>

      <Footer />
    </div>
  );
}
