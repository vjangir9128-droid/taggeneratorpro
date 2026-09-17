# Deploying TagGeneratorPro to Vercel 🚀

Vercel is the native platform for Next.js. Deploying takes less than 2 minutes and includes automatic HTTPS, global CDN edge caching, and serverless API execution.

---

## Method 1: Deploy with Vercel CLI (Direct from Terminal)

Open your terminal in `c:\Users\vkjan\OneDrive\Desktop\taggeneratorpro` and run:

```bash
npx vercel
```

### What happens:
1. **Log in**: Vercel will ask you to press `ENTER` to open your browser and log into your Vercel account (via GitHub, Google, or Email).
2. **Setup Questions** (press `Enter` to accept defaults):
   - *Set up and deploy?* → Type **Y** and press Enter.
   - *Which scope?* → Select your personal account or team.
   - *Link to existing project?* → Type **N**.
   - *What's your project's name?* → Press Enter (`taggeneratorpro`).
   - *In which directory is your code located?* → Press Enter (`./`).
   - *Want to modify settings?* → Type **N**.
3. Vercel will upload and deploy your preview build!

To deploy directly to your live production domain:
```bash
npx vercel --prod
```

---

## Method 2: Deploy via GitHub (Recommended for Automated CI/CD)

1. **Create a GitHub Repository**:
   - Go to [github.com/new](https://github.com/new) and name it `taggeneratorpro`.
2. **Push your code**:
   ```bash
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/taggeneratorpro.git
   git branch -M main
   git push -u origin main
   ```
3. **Import to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new).
   - Click **Import** next to your `taggeneratorpro` repository.
   - Click **Deploy**!

---

## Connecting Your Domain: `taggeneratorpro.online`

Once deployed on Vercel:
1. Go to your **Project Dashboard** on Vercel.
2. Click **Settings** -> **Domains**.
3. Enter `taggeneratorpro.online` and click **Add**.
4. Vercel will show your DNS records:
   - **Type**: `A`
   - **Name**: `@`
   - **Value**: `76.76.21.21`
   - **CNAME**: `www` → `cname.vercel-dns.com`
5. Go to your **Hostinger DNS Zone Editor** for `taggeneratorpro.online`:
   - Update the `@` A-record to `76.76.21.21`.
   - Update the `www` CNAME record to `cname.vercel-dns.com`.
6. Vercel will automatically generate and install a free SSL certificate within a few minutes!
