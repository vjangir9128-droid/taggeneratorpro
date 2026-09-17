"use client";

import Link from "next/link";
import { Hash, BookOpen, MessageSquare, Menu, X, Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Hash className="w-5 h-5 font-bold" />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">
              TagGenerator<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-indigo-500">Pro</span>
            </span>
            <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 leading-tight">
              100% Free Social Media SEO Suite
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            Generator
          </Link>
          <Link
            href="/blog"
            className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>SEO Guides</span>
          </Link>
          <Link
            href="/contact"
            className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Contact & Support</span>
          </Link>

          {/* 100% Free Pill */}
          <div className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-500" />
            <span>100% Free Tool</span>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 space-y-2 animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Generator
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>SEO Guides</span>
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact & Support</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
