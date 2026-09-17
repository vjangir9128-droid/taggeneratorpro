# Deploying TagGeneratorPro on Hostinger 🚀

This guide walks you through deploying **TagGeneratorPro** on Hostinger, whether you are using **Hostinger VPS** (recommended for full performance and Node.js process management) or **Hostinger Cloud / Web Hosting with hPanel Node.js**.

---

## Method 1: Deploying on Hostinger VPS (Recommended)

Hostinger VPS provides full root access, allowing your Next.js application to run with PM2, automated process restarts, and high-performance Nginx reverse proxy with free SSL.

### Step 1: Connect to Your Hostinger VPS via SSH
Open PowerShell or Terminal:
```bash
ssh root@YOUR_SERVER_IP
```

### Step 2: Install Node.js (v20 LTS), PM2 & Nginx
Run the following commands on your server:
```bash
# Update package list
apt update && apt upgrade -y

# Install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs git nginx

# Verify installation
node -v
npm -v

# Install PM2 globally to keep the app running 24/7
npm install -g pm2
```

### Step 3: Clone or Upload Your Code
Navigate to `/var/www` and clone your project:
```bash
cd /var/www
git clone https://github.com/YOUR_GITHUB_USERNAME/taggeneratorpro.git
cd taggeneratorpro
```
*(Or upload the project folder directly via Hostinger File Manager / SFTP using FileZilla to `/var/www/taggeneratorpro`)*.

### Step 4: Install Dependencies & Build
```bash
npm install
npm run build
```

### Step 5: Start the App with PM2
We have included a pre-configured `ecosystem.config.js`:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```
*(Run the command that `pm2 startup` displays to enable auto-restart upon server reboots)*.

### Step 6: Configure Nginx Reverse Proxy for Domain
Create an Nginx configuration file for your domain:
```bash
nano /etc/nginx/sites-available/taggeneratorpro.online
```

Paste the following configuration:
```nginx
server {
    server_name taggeneratorpro.online www.taggeneratorpro.online;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the configuration and reload Nginx:
```bash
ln -s /etc/nginx/sites-available/taggeneratorpro.online /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### Step 7: Install Free Let's Encrypt SSL
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d taggeneratorpro.online -d www.taggeneratorpro.online
```
Follow the prompt to enter your email. Certbot will automatically install SSL and redirect HTTP to HTTPS!

---

## Method 2: Deploying via Hostinger hPanel (Web / Cloud Hosting)

If your Hostinger plan includes the **Node.js** feature in **hPanel**:

### Step 1: Open Node.js in hPanel
1. Log in to **Hostinger hPanel**.
2. Go to **Websites** -> click **Manage** on your domain (`taggeneratorpro.online`).
3. In the sidebar search, type **Node.js** and click on it.

### Step 2: Create a New Node.js Application
Fill in the configuration fields:
- **Node.js Version**: Select **20.x** (or 18.x).
- **Application Mode**: **Production**.
- **Application Root**: `taggeneratorpro` (or `/public_html`).
- **Application Startup File**: `node_modules/next/dist/bin/next` or `.next/standalone/server.js`.
- Click **Create**.

### Step 3: Upload Project Files
1. In hPanel, open **File Manager**.
2. Navigate to your application directory (e.g. `taggeneratorpro`).
3. Upload your project files:
   - `app/`
   - `components/`
   - `data/`
   - `lib/`
   - `public/`
   - `package.json`
   - `next.config.ts`
   - `tsconfig.json`
   - `ecosystem.config.js`
   *(Do NOT upload the local `node_modules` folder; install them in hPanel)*.

### Step 4: Run NPM Install & Build in hPanel Terminal
Open the **SSH / Web Terminal** in hPanel:
```bash
cd ~/taggeneratorpro
npm install
npm run build
```

### Step 5: Start the Application
In the hPanel Node.js dashboard, click **Start Application** or **Restart**.

---

## Method 3: Deploying with Standalone Build (Lightweight & Portable)

Because `next.config.ts` has `output: "standalone"`, Next.js creates a portable bundle inside `.next/standalone/`:
1. Run `npm run build` locally.
2. The folder `.next/standalone/` contains a self-contained `server.js` and all required runtime packages.
3. Copy `.next/static` to `.next/standalone/.next/static`.
4. Copy `public` to `.next/standalone/public`.
5. Upload `.next/standalone` to Hostinger and run:
   ```bash
   PORT=3000 node server.js
   ```

---

## Verifying Your Deployment
Once deployed, visit your domain:
- Homepage: `https://taggeneratorpro.online`
- Test Verification: `https://taggeneratorpro.online/verify-email?token=...`
- API Health: `https://taggeneratorpro.online/api/auth/status`
