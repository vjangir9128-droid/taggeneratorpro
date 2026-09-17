import Link from "next/link";
import { Hash, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full mt-20 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-rose-500 flex items-center justify-center text-white">
                <Hash className="w-4 h-4 font-bold" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                TagGenerator<span className="text-rose-500">Pro</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              The free multi-platform social media asset generator. Optimize your reach across YouTube, Instagram, TikTok, and Facebook with algorithmic tags and AI copy.
            </p>
            <p className="text-[11px] text-slate-400">
              Deployed at <span className="font-semibold text-slate-700 dark:text-slate-300">taggeneratorpro.online</span>
            </p>
          </div>

          {/* Tools by Platform */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Platform Tools
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/?platform=youtube" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  YouTube Tag Generator (500 Chars)
                </Link>
              </li>
              <li>
                <Link href="/?platform=instagram" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Instagram Hashtags (Tri-Tier Strategy)
                </Link>
              </li>
              <li>
                <Link href="/?platform=tiktok" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  TikTok Viral Hashtag Generator
                </Link>
              </li>
              <li>
                <Link href="/?platform=facebook" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Facebook Post & Caption Generator
                </Link>
              </li>
              <li>
                <Link href="/?content=bio" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Social Media Bio Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* SEO & Guides */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Growth Guides
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/blog/best-instagram-hashtags-2026" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Best Instagram Hashtags in 2026
                </Link>
              </li>
              <li>
                <Link href="/blog/youtube-tags-seo-guide-2026" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  How to Get Views with YouTube Tags
                </Link>
              </li>
              <li>
                <Link href="/blog/tiktok-algorithm-hashtag-secrets" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  TikTok Hashtag Algorithm Secrets
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
                  View All Guides →
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Monetization Note */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              About & Legal
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <span className="cursor-default">Privacy Policy</span>
              </li>
              <li>
                <span className="cursor-default">Terms of Service</span>
              </li>
              <li>
                <span className="cursor-default">Contact & Support</span>
              </li>
              <li>
                <span className="cursor-default text-slate-400 dark:text-slate-500">
                  Google AdSense Compliant
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} TagGeneratorPro. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built for creators worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
