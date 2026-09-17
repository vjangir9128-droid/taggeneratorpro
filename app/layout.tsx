import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.taggeneratorpro.online"),
  alternates: {
    canonical: "https://www.taggeneratorpro.online",
  },
  title: "TagGeneratorPro | Free Social Media Tag, Hashtag & Bio Generator",
  description:
    "Free social media tag, hashtag, keyword, title, description, and bio generator for YouTube, Instagram, TikTok, and Facebook. Maximize your SEO reach and engagement.",
  keywords: [
    "free hashtag generator",
    "youtube tag generator",
    "instagram caption generator",
    "tiktok hashtag generator",
    "social media bio generator",
    "youtube seo tags 500 characters",
    "tri tier instagram hashtags",
    "facebook post tags",
  ],
  authors: [{ name: "TagGeneratorPro Team" }],
  creator: "TagGeneratorPro",
  publisher: "TagGeneratorPro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.taggeneratorpro.online",
    title: "TagGeneratorPro | Free Tag, Hashtag & Caption Generator for Creators",
    description:
      "Generate platform-compliant tags for YouTube (500 chars), Instagram (tri-tier 30 hashtags), TikTok (FYP hooks), and Facebook.",
    siteName: "TagGeneratorPro",
  },
  twitter: {
    card: "summary_large_image",
    title: "TagGeneratorPro | Free Social Media Tag & Hashtag Generator",
    description:
      "Generate YouTube SEO tags, Instagram hashtags, TikTok captions, and bios in seconds.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "TagGeneratorPro",
    url: "https://www.taggeneratorpro.online",
    description:
      "A free social media tag, hashtag, keyword, title, description, and bio generator for YouTube, Instagram, Facebook, and TikTok.",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "YouTube 500-character SEO Tag Generator",
      "Instagram Tri-Tier 30 Hashtag Generator",
      "TikTok Trending FYP Hashtag & Hook Generator",
      "Facebook Post Title & Discussion Generator",
      "Multi-platform Profile Bio Generator",
      "Character Counter with Live Limit Warning",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const saved = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (saved === 'dark' || (!saved && prefersDark)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-[var(--bg-main)] text-[var(--text-primary)] antialiased transition-colors">
        {children}
      </body>
    </html>
  );
}
