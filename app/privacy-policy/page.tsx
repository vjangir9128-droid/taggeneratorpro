import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye, FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | TagGeneratorPro",
  description:
    "Read the Privacy Policy for TagGeneratorPro (taggeneratorpro.online). Learn how we handle information, cookies, and protect your privacy while using our free social media tag generator.",
  alternates: {
    canonical: "https://www.taggeneratorpro.online/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full space-y-8">
        {/* Header */}
        <div className="space-y-3 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40">
            <Shield className="w-3.5 h-3.5" />
            <span>LEGAL & COMPLIANCE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Last Updated: September 17, 2026 • Effective Date: January 1, 2026
          </p>
        </div>

        {/* Highlight Card */}
        <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 space-y-2">
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-800 dark:text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Our Privacy Guarantee</span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            TagGeneratorPro (accessible from <strong>taggeneratorpro.online</strong>) is 100% free. We do not require account registration, login credentials, or credit card information to use any of our social media generator tools. Your privacy and trust are our top priorities.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-8 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-emerald-500 font-mono text-sm">1.</span>
              Information We Collect
            </h2>
            <p>
              When you use TagGeneratorPro, we do not collect personal identifying information (such as your real name, address, or phone number) because you can use all features anonymously without creating an account.
            </p>
            <p>
              We may automatically collect standard non-identifying technical data via server logs, including:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-400">
              <li>Internet Protocol (IP) address (anonymized where possible).</li>
              <li>Browser type and version.</li>
              <li>Operating system and device category (mobile, tablet, desktop).</li>
              <li>Date and time stamps of requests.</li>
              <li>Referring and exit pages to help us diagnose technical issues.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-emerald-500 font-mono text-sm">2.</span>
              How We Use Your Information
            </h2>
            <p>
              Any technical information collected is used exclusively for the following operational purposes:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-400">
              <li>To provide, operate, and maintain our social media generator tools.</li>
              <li>To prevent abuse, spam bots, and distributed denial-of-service (DDoS) attacks.</li>
              <li>To understand search trends and optimize hashtag database coverage.</li>
              <li>To measure site performance, page load times, and improve overall creator experience.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-emerald-500 font-mono text-sm">3.</span>
              Cookies and Web Beacons
            </h2>
            <p>
              Like any modern web application, TagGeneratorPro uses standard browser cookies and local storage to store user preferences, such as:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-400">
              <li>Your light or dark theme mode preference.</li>
              <li>Your most recently selected platform (YouTube, Instagram, TikTok, or Facebook).</li>
            </ul>
            <p>
              You can choose to disable cookies through your individual browser options. Detailed information about cookie management with specific web browsers can be found at the browsers&apos; respective websites.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-emerald-500 font-mono text-sm">4.</span>
              Google DoubleClick DART Cookie & Third-Party Advertising
            </h2>
            <p>
              Google is one of our third-party vendors. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to taggeneratorpro.online and other sites on the internet.
            </p>
            <p>
              Visitors may choose to decline the use of DART cookies by visiting the Google Ad and Content Network Privacy Policy at the following URL:{" "}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 dark:text-emerald-400 underline font-medium"
              >
                https://policies.google.com/technologies/ads
              </a>.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-emerald-500 font-mono text-sm">5.</span>
              CCPA Privacy Rights (Do Not Sell My Personal Information)
            </h2>
            <p>
              Under the California Consumer Privacy Act (CCPA), California consumers have the right to request that a business disclose what personal data it collects, request deletion of personal data, and request that personal data not be sold.
            </p>
            <p>
              Because TagGeneratorPro does not collect, store, or sell personal consumer profiles, we fully adhere to CCPA requirements. If you make a request, we will respond within 30 days.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-emerald-500 font-mono text-sm">6.</span>
              GDPR Data Protection Rights
            </h2>
            <p>
              We want to make sure you are fully aware of all of your data protection rights under the General Data Protection Regulation (GDPR). Every user is entitled to the following:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-400">
              <li><strong>The right to access</strong>: You have the right to request copies of your personal data.</li>
              <li><strong>The right to rectification</strong>: You have the right to request correction of any inaccurate information.</li>
              <li><strong>The right to erasure</strong>: You have the right to request that we erase your personal data under certain conditions.</li>
              <li><strong>The right to restrict processing</strong>: You have the right to request that we restrict the processing of your data.</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-emerald-500 font-mono text-sm">7.</span>
              Children&apos;s Information (COPPA)
            </h2>
            <p>
              Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
            </p>
            <p>
              TagGeneratorPro does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, please contact us immediately and we will promptly remove such information.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-emerald-500 font-mono text-sm">8.</span>
              Contact Us Regarding Privacy
            </h2>
            <p>
              If you have any questions, suggestions, or concerns about our Privacy Policy or data handling practices, please reach out to us at:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-xs">
              Email: support@taggeneratorpro.online<br />
              Website: https://taggeneratorpro.online<br />
              Response Time: Within 24-48 business hours
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
