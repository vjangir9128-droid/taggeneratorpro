# TagGeneratorPro ⚡

> The all-in-one AI & algorithmic social media tag, hashtag, keyword, title, description, and bio generator for **YouTube**, **Instagram**, **TikTok**, and **Facebook**.
> Deployed at: [taggeneratorpro.online](https://taggeneratorpro.online)

---

## 🌟 Key Features

1. **YouTube SEO Tags & Assets**:
   - Algorithmic comma-separated tags strictly respecting the **500-character** limit.
   - Front-loaded video titles (< 100 characters) for optimal mobile CTR.
   - Comprehensive descriptions (150-300 words) with timestamp placeholders and keyword placement.
   - Channel bio copy.

2. **Instagram Tri-Tier Hashtags**:
   - 20-30 curated hashtags mathematically divided into:
     - **High Reach (20%)**: Broad category signals (500k-2M+ posts).
     - **Medium Reach (50%)**: Targeted community hashtags (50k-500k posts).
     - **Low Competition (30%)**: Long-tail hashtags (5k-50k posts) for immediate #1 ranking.
   - Attention-grabbing captions and profile bios (< 150 characters).

3. **TikTok FYP Engine**:
   - 5-8 trending challenge and niche tags (`#Tok`).
   - Short, punchy hooks and captions (< 50 characters).
   - Profile bios under the 80-character limit.

4. **Facebook Content Optimizer**:
   - Conversational post headlines and discussion-provoking descriptions.
   - 3-5 focused hashtags and Facebook page "About" bios.

5. **Creator Productivity Tools**:
   - Live character and hashtag counters with visual platform threshold bars.
   - One-click individual card copy (using native Clipboard API).
   - "Copy All" formatted text bundle.
   - One-click CSV export for spreadsheets and scheduling tools.

6. **Monetization & Abuse Protection**:
   - Free tier: 10 daily generations with automatic midnight reset.
   - Google AdSense ready: Top banner, inline feed, sidebar, and footer ad units.
   - Pro tier architecture (`TagGeneratorPro Plus`): Unlimited generations, ad-free experience, bulk export.

7. **SEO Optimization**:
   - Dynamic `sitemap.xml` and `robots.txt`.
   - JSON-LD `WebApplication` structured data.
   - Static blog directory (`/blog`) with in-depth growth guides.
   - Fast, accessible, dark/light theme toggle.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16+ (App Router)](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with dark mode variant
- **Icons**: Lucide React
- **Hosting / Deploy**: Vercel

---

## 🚀 Quick Start (Run Locally)

### 1. Clone & Install Dependencies

```bash
cd taggeneratorpro
npm install
```

### 2. Configure Environment Variables (Optional)

TagGeneratorPro includes **smart heuristic generators** and **curated niche datasets** in `/data/niches` that work **100% out-of-the-box** without any external API keys required!

If you wish to connect external LLM providers (Gemini, OpenAI, Anthropic), copy `.env.example`:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Choose provider: gemini | openai | anthropic | auto
AI_PROVIDER=auto

# Optional API Keys
GEMINI_API_KEY=your_gemini_key_here
OPENAI_API_KEY=your_openai_key_here
ANTHROPIC_API_KEY=your_anthropic_key_here

# Optional: Google AdSense Client ID
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
taggeneratorpro/
├── app/
│   ├── api/
│   │   └── generate/        # POST /api/generate endpoint (Rate limiter & generation logic)
│   ├── blog/
│   │   ├── [slug]/          # Individual SEO article pages
│   │   └── page.tsx         # Blog index page
│   ├── globals.css          # Tailwind CSS v4 styles & dark mode
│   ├── layout.tsx           # Global SEO metadata, fonts & JSON-LD
│   ├── page.tsx             # Main generator UI
│   ├── robots.ts            # Dynamic robots.txt
│   └── sitemap.ts           # Dynamic sitemap.xml
├── components/
│   ├── AdBanner.tsx         # Google AdSense placeholder & live ad unit
│   ├── ContentTypeTabs.tsx  # Asset type selector tabs
│   ├── Footer.tsx           # Footer with SEO links and platform directory
│   ├── GeneratorForm.tsx    # Topic input, trending chips & tone options
│   ├── Hero.tsx             # Clean hero banner
│   ├── Navbar.tsx           # Navigation bar with quota pill & dark mode
│   ├── OutputCards.tsx      # Copyable result cards with character counters
│   ├── PlatformSelector.tsx # YouTube, Instagram, TikTok, Facebook selector
│   ├── ProModal.tsx         # Pro upgrade modal (Stripe-ready)
│   ├── ThemeToggle.tsx      # Dark / Light theme toggle
│   └── UsageTracker.tsx     # 10 daily generations progress tracker
├── data/
│   ├── blog-posts.ts        # Starter SEO articles
│   └── niches/              # Curated niche hashtag & tag datasets
│       ├── beauty.json
│       ├── business.json
│       ├── crypto.json
│       ├── education.json
│       ├── fashion.json
│       ├── fitness.json
│       ├── food.json
│       ├── gaming.json
│       ├── lifestyle.json
│       ├── tech.json
│       └── travel.json
├── lib/
│   ├── hashtag-engine.ts    # Algorithmic tag/hashtag engine & NLP fallback
│   ├── llm-provider.ts      # Swappable LLM bridge (Gemini/OpenAI/Anthropic/Heuristic)
│   └── rate-limiter.ts      # Server-side IP rate limiting (10/day)
└── README.md
```

---

## 🚢 Deploying to Vercel with Custom Domain (`taggeneratorpro.online`)

### Step 1: Push Code to GitHub / Git

```bash
git init
git add .
git commit -m "Initial commit of TagGeneratorPro"
git branch -M main
git remote add origin https://github.com/your-username/taggeneratorpro.git
git push -u origin main
```

### Step 2: Import into Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New Project"**.
2. Select your repository `taggeneratorpro`.
3. Framework Preset: **Next.js**.
4. (Optional) Add your Environment Variables (`GEMINI_API_KEY`, `AI_PROVIDER`, etc.).
5. Click **Deploy**.

### Step 3: Connect Custom Domain `taggeneratorpro.online`

1. In your Vercel project dashboard, navigate to **Settings** > **Domains**.
2. Enter `taggeneratorpro.online` and click **Add**.
3. Also add `www.taggeneratorpro.online` (select redirect to `taggeneratorpro.online`).
4. In your domain registrar (Namecheap, GoDaddy, Hostinger, Cloudflare):
   - **A Record**:
     - Name/Host: `@`
     - Value / Destination: `76.76.21.21`
   - **CNAME Record**:
     - Name/Host: `www`
     - Value / Destination: `cname.vercel-dns.com`
5. Vercel will automatically provision a free SSL certificate within a few minutes.

---

## 💰 Monetization: Google AdSense Setup

When your AdSense account is approved:
1. Open `.env.local` (or Vercel Environment Variables).
2. Set `NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX`.
3. Add the AdSense script tag to your `app/layout.tsx` `<head>`:
   ```html
   <script
     async
     src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
     crossOrigin="anonymous"
   ></script>
   ```
4. All placeholder ad units will automatically begin serving live ads!

---

## 📄 License

MIT License. Free for creators and developers.
