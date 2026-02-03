# 🚀 Deployment Guide

Complete guide for deploying AtomicFizzCaps Universal Naming Service to various platforms.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Understanding the Architecture](#understanding-the-architecture)
3. [Deployment Options](#deployment-options)
4. [Custom Domain Setup](#custom-domain-setup)
5. [Environment Configuration](#environment-configuration)
6. [Post-Deployment Tasks](#post-deployment-tasks)
7. [Troubleshooting](#troubleshooting)

## Quick Start

**TL;DR:** You can deploy your own instance of this platform with your own custom URL:

1. Fork/clone this repository
2. Get a free WalletConnect Project ID from [cloud.walletconnect.com](https://cloud.walletconnect.com/)
3. Deploy to Vercel (easiest) or any other hosting platform
4. Set environment variables
5. (Optional) Connect your custom domain
6. Your platform is live!

## Understanding the Architecture

### Web2 Hosting + Web3 Functionality

This is a **hybrid application**:

- **Frontend/Backend (Web2):** The Next.js application must be hosted on traditional web infrastructure
- **Blockchain Interactions (Web3):** Smart contracts handle decentralized functionality

**You deploy the web app to a hosting platform, users access it via your URL, and the app connects to blockchain networks.**

### Do I Need to Deploy to "Web2" First?

**Short answer:** Yes, but it's not a two-step process. When you deploy this Next.js app to ANY hosting platform (Vercel, your server, etc.), you ARE deploying to "Web2." That's the only deployment you need.

**There is no separate Web3 deployment** for the frontend. The Web3 part happens automatically when users connect their wallets and interact with smart contracts through your hosted website.

### Can I Use My Own URL?

**Absolutely!** You have several options:

1. **Platform subdomain** (Free): `your-app.vercel.app`, `your-app.netlify.app`
2. **Custom domain** (Your own): `yourplatform.com`, `myawesomeplatform.io`
3. **Subdomain** (Your own): `platform.yourdomain.com`

All major hosting platforms support custom domains easily.

## Deployment Options

### 🥇 Option 1: Vercel (Recommended)

**Best for:** Quick deployment, zero configuration, automatic scaling

**Advantages:**
- ✅ Free tier available
- ✅ Automatic HTTPS/SSL
- ✅ Global CDN
- ✅ Automatic deployments from GitHub
- ✅ Easy custom domain setup
- ✅ Environment variables UI

**Steps:**

1. **One-click deploy:**
   
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Unwrenchable/supreme-goggles)

2. **Or deploy via CLI:**
   \`\`\`bash
   npm install -g vercel
   npm run build
   vercel
   \`\`\`

3. **Configure environment variables:**
   - Go to Project Settings → Environment Variables
   - Add: `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
   - (Optional) Add: `NEXT_PUBLIC_CONTRACT_ADDRESS`

4. **Redeploy to apply changes:**
   \`\`\`bash
   vercel --prod
   \`\`\`

5. **Your app is live at:** `your-project.vercel.app`

**Custom domain on Vercel:**
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. Done! Automatic SSL included.

### 🥈 Option 2: Netlify

**Best for:** Similar to Vercel, alternative platform

**Advantages:**
- ✅ Free tier available
- ✅ Automatic HTTPS/SSL
- ✅ Easy deployment
- ✅ Form handling and serverless functions

**Steps:**

1. **Deploy via CLI:**
   \`\`\`bash
   npm install -g netlify-cli
   npm run build
   netlify deploy --prod
   \`\`\`

2. **Or connect GitHub repository:**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Configure build settings (auto-detected for Next.js)
   - Deploy!

3. **Configure environment variables:**
   - Site settings → Environment variables
   - Add your variables

**Custom domain on Netlify:**
1. Site settings → Domain management
2. Add custom domain
3. Update DNS records
4. SSL is automatic

### 🥉 Option 3: Your Own Server (VPS/Dedicated)

**Best for:** Full control, specific requirements, existing infrastructure

**Advantages:**
- ✅ Complete control
- ✅ No platform limitations
- ✅ Use existing infrastructure
- ✅ Custom configurations

**Requirements:**
- Ubuntu/Debian server (or any Linux)
- Node.js 18+
- Domain name (optional)
- Basic Linux knowledge

**Detailed Steps:**

#### 1. Server Setup

\`\`\`bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+ (using NodeSource)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install Nginx
sudo apt install -y nginx

# Install Certbot (for SSL)
sudo apt install -y certbot python3-certbot-nginx
\`\`\`

#### 2. Deploy Application

\`\`\`bash
# Clone repository
cd /var/www
sudo git clone https://github.com/Unwrenchable/supreme-goggles.git
cd supreme-goggles

# Install dependencies
sudo npm install

# Set up environment variables
sudo cp .env.example .env.local
sudo nano .env.local  # Edit with your values

# Build application
sudo npm run build

# Install PM2 for process management
sudo npm install -g pm2

# Start application
pm2 start npm --name "supreme-goggles" -- start

# Save PM2 configuration
pm2 save

# Set PM2 to start on boot
pm2 startup
# Run the command that PM2 outputs
\`\`\`

#### 3. Configure Nginx

Create Nginx configuration:

\`\`\`bash
sudo nano /etc/nginx/sites-available/supreme-goggles
\`\`\`

Add this configuration:

\`\`\`nginx
server {
    listen 80;
    server_name yourplatform.com www.yourplatform.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
\`\`\`

Enable the site:

\`\`\`bash
sudo ln -s /etc/nginx/sites-available/supreme-goggles /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
\`\`\`

#### 4. Set Up SSL

\`\`\`bash
sudo certbot --nginx -d yourplatform.com -d www.yourplatform.com
\`\`\`

Follow the prompts. Certbot will automatically configure HTTPS and set up auto-renewal.

#### 5. Configure Firewall

\`\`\`bash
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
\`\`\`

**Your platform is now live at:** `https://yourplatform.com`

### 🏢 Option 4: Other Platforms

#### AWS Amplify

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click "New app" → "Host web app"
3. Connect your GitHub repository
4. Configure build settings (auto-detected)
5. Add environment variables
6. Deploy!

#### Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway auto-detects Next.js
5. Add environment variables in settings
6. Your app is deployed!

#### Render

1. Go to [render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Render auto-detects Next.js
5. Add environment variables
6. Deploy!

#### DigitalOcean App Platform

1. Go to [DigitalOcean](https://cloud.digitalocean.com/apps)
2. Click "Create App"
3. Connect GitHub repository
4. Configure (auto-detected for Next.js)
5. Add environment variables
6. Deploy!

## Custom Domain Setup

### Step 1: Purchase a Domain

Buy from any registrar:
- GoDaddy
- Namecheap
- Google Domains
- Cloudflare
- Name.com
- Porkbun

**Tip:** Look for `.com`, `.io`, `.xyz`, or `.app` extensions

### Step 2: Point Domain to Your Hosting

#### For Vercel/Netlify:
1. Go to domain settings in platform
2. Add your domain
3. Copy the DNS records provided
4. Add them to your domain registrar's DNS settings
5. Wait for propagation (15 mins - 48 hours)

#### For Self-Hosted Server:
1. Go to your domain registrar's DNS settings
2. Add an A record:
   - **Type:** A
   - **Name:** @ (or your domain)
   - **Value:** Your server's IP address
   - **TTL:** 3600
3. Add a CNAME record for www:
   - **Type:** CNAME
   - **Name:** www
   - **Value:** yourplatform.com
   - **TTL:** 3600
4. Wait for propagation

### Step 3: Enable HTTPS

- **Vercel/Netlify:** Automatic!
- **Self-hosted:** Use Let's Encrypt (Certbot) as shown in self-hosting section

## Environment Configuration

### Required Variables

#### NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

**Where to get it:**
1. Go to [cloud.walletconnect.com](https://cloud.walletconnect.com/)
2. Create a free account
3. Create a new project
4. Copy the Project ID
5. Add to your environment variables

**Important:** Add your deployment URL to "Allowed Origins" in WalletConnect Cloud settings.

#### NEXT_PUBLIC_CONTRACT_ADDRESS (Optional)

**When to set:**
- When you've deployed your own Domain Registry smart contract
- Leave blank/unset to use mock data for testing

**How to get:**
- Deploy the contract to your chosen blockchain
- Copy the deployed contract address
- Add to environment variables

#### NEXT_PUBLIC_NETWORK (Optional)

**Options:**
- `mainnet` (default) - Ethereum Mainnet
- `sepolia` - Ethereum Sepolia Testnet
- `polygon` - Polygon Mainnet
- `arbitrum` - Arbitrum One
- `optimism` - Optimism
- Or any other supported network

### Setting Environment Variables

#### Vercel:
1. Project Settings → Environment Variables
2. Add each variable
3. Choose which environments (Production, Preview, Development)
4. Redeploy for changes to take effect

#### Netlify:
1. Site settings → Environment variables
2. Add each variable
3. Redeploy

#### Self-Hosted:
1. Edit `.env.local` file:
   \`\`\`bash
   nano .env.local
   \`\`\`
2. Add variables:
   \`\`\`
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_id_here
   NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
   NEXT_PUBLIC_NETWORK=mainnet
   \`\`\`
3. Restart the application:
   \`\`\`bash
   pm2 restart supreme-goggles
   \`\`\`

## Post-Deployment Tasks

### 1. Test Wallet Connection

1. Visit your deployed site
2. Click "Connect Wallet"
3. Try connecting with different wallets (MetaMask, WalletConnect, etc.)
4. Verify connection works

### 2. Test Domain Registration Flow

1. Search for a domain
2. Try to register (will use mock data if no contract is set)
3. Verify the flow works end-to-end

### 3. Set Up Monitoring

- Enable platform monitoring (Vercel Analytics, etc.)
- Set up error tracking (Sentry, LogRocket)
- Monitor application logs

### 4. Configure WalletConnect Origins

1. Go to WalletConnect Cloud
2. Find your project
3. Add your deployment URL to "Allowed Origins":
   - `https://yourplatform.com`
   - `https://www.yourplatform.com`
   - `https://your-app.vercel.app` (if using default)

### 5. Update Smart Contract (Production)

When ready for production:

1. Deploy Domain Registry contract to mainnet
2. Verify contract on Etherscan/block explorer
3. Update `NEXT_PUBLIC_CONTRACT_ADDRESS`
4. Update `NEXT_PUBLIC_NETWORK` to `mainnet`
5. Redeploy application

## Troubleshooting

### Environment Variables Not Working

**Problem:** Changes to environment variables don't appear

**Solution:**
- Make sure you've redeployed after changing variables
- For Vercel: `vercel --prod`
- For Netlify: Trigger a new deployment
- For self-hosted: Restart the application with PM2

### Wallet Connection Failing

**Problem:** "Invalid Project ID" or wallet won't connect

**Solutions:**
1. Verify Project ID is correct in WalletConnect Cloud
2. Check that your deployment URL is in "Allowed Origins"
3. Make sure you're using HTTPS (required for WalletConnect)
4. Clear browser cache and try again

### Custom Domain Not Working

**Problem:** Domain doesn't point to your app

**Solutions:**
1. Verify DNS records are correct
2. Wait longer - DNS propagation can take up to 48 hours
3. Use DNS checker tools (whatsmydns.net)
4. Ensure you've added the domain in your hosting platform
5. Check for DNSSEC issues with your registrar

### SSL Certificate Issues

**Problem:** "Not Secure" warning or certificate errors

**Solutions:**
- **Vercel/Netlify:** Should be automatic, contact support if not working
- **Self-hosted:**
  \`\`\`bash
  sudo certbot renew --dry-run
  sudo certbot --nginx -d yourplatform.com
  \`\`\`

### Build Failures

**Problem:** Deployment fails during build

**Solutions:**
1. Check build logs for specific error
2. Verify Node.js version (needs 18+)
3. Test build locally: `npm run build`
4. Check all dependencies are installed
5. Verify environment variables are set correctly

### Application Crashes After Deployment

**Problem:** App works locally but crashes in production

**Solutions:**
1. Check application logs
2. Verify all environment variables are set
3. Check for missing dependencies in package.json
4. Ensure build completed successfully
5. For self-hosted: Check PM2 logs with `pm2 logs supreme-goggles`

### Contract Interactions Not Working

**Problem:** Can't register domains or interact with contract

**Solutions:**
1. Verify contract address is correct
2. Check network configuration matches contract deployment
3. Ensure wallet is on correct network
4. Verify contract ABI matches deployed contract
5. Check user has enough funds for gas

## Security Checklist

Before going live with real users:

- [ ] HTTPS is enabled (SSL certificate)
- [ ] Environment variables are secure (never commit to repo)
- [ ] CORS is properly configured
- [ ] Rate limiting is considered
- [ ] Contract addresses are verified on block explorer
- [ ] WalletConnect allowed origins are restricted
- [ ] Server firewall is configured (if self-hosted)
- [ ] Regular security updates scheduled
- [ ] Backup strategy in place (if self-hosted)
- [ ] Monitoring and alerting set up

## Performance Optimization

After deployment:

1. **Enable CDN** (automatic on Vercel/Netlify)
2. **Optimize images** using Next.js Image component
3. **Enable caching** for static assets
4. **Monitor load times** with analytics
5. **Consider load balancing** for high traffic (if self-hosted)

## Scaling Considerations

As your platform grows:

- **Vercel/Netlify:** Automatically scales
- **Self-hosted:** 
  - Use load balancer (Nginx, HAProxy)
  - Scale horizontally with multiple servers
  - Use Redis for session management
  - Consider Kubernetes for orchestration

## Support Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [WalletConnect Docs](https://docs.walletconnect.com)
- [Open an Issue](https://github.com/Unwrenchable/supreme-goggles/issues)

---

**Need help?** Open an issue on GitHub or join our Discord (coming soon)!
