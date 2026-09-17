"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, MessageSquare, Clock, Send, CheckCircle2, HelpCircle, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Feedback / Question");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    // Simulate sending / support ticket generation
    setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WE ARE HERE TO HELP</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Contact & Support
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Have a question, feedback, feature request, or need help optimizing your social media reach? We would love to hear from you.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Official Email
            </h3>
            <p className="text-xs text-slate-500 font-mono">
              support@taggeneratorpro.online
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Response Time
            </h3>
            <p className="text-xs text-slate-500">
              Within 24 to 48 business hours
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Feature Requests
            </h3>
            <p className="text-xs text-slate-500">
              Open to suggestions from all creators
            </p>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs max-w-2xl mx-auto w-full">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                Send Us a Message
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Fill in the details below and our team will get back to you promptly.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Rivera"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alex@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="General Feedback / Question">General Feedback / Question</option>
                  <option value="Feature Request or Niche Addition">Feature Request or Niche Addition</option>
                  <option value="Bug Report / Tool Issue">Bug Report / Tool Issue</option>
                  <option value="Partnership or Advertising Inquiry">Partnership or Advertising Inquiry</option>
                  <option value="Other Inquiry">Other Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your inquiry, suggestion, or question here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-500 to-indigo-600 hover:opacity-95 shadow-md shadow-emerald-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-75"
              >
                <Send className="w-4 h-4" />
                <span>{isSending ? "Sending Your Message..." : "Submit Message"}</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4 animate-in fade-in zoom-in-95">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Message Received!
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                  Thank you <strong>{name}</strong>! We have received your note regarding &ldquo;{subject}&rdquo; and will respond to <strong>{email}</strong> within 24-48 hours.
                </p>
              </div>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setMessage("");
                }}
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline pt-2 inline-block"
              >
                Send another message
              </button>
            </div>
          )}
        </div>

        {/* Quick FAQ note */}
        <div className="text-center">
          <p className="text-xs text-slate-500">
            Looking for SEO guides and hashtag growth tips?{" "}
            <Link href="/blog" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
              Explore our free creator articles →
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
