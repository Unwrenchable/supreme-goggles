# 🚀 Quick Start - Deploy in 5 Minutes

**Want to get your own Web3 naming platform live quickly? Follow this guide!**

## Prerequisites

- GitHub account
- 5 minutes of your time
- That's it! (Seriously)

## Step-by-Step Deployment

### Step 1: Get a WalletConnect Project ID (2 minutes)

1. Go to [cloud.walletconnect.com](https://cloud.walletconnect.com/)
2. Sign up for a free account (or log in)
3. Click "Create New Project"
4. Give it a name (e.g., "My Web3 Platform")
5. Copy the **Project ID** - you'll need this!

### Step 2: Deploy to Vercel (2 minutes)

1. Click this button:

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Unwrenchable/supreme-goggles)

2. Log in to Vercel (or create a free account)
3. Click "Create" (accepts all defaults)
4. Wait for deployment (about 1 minute)
5. You'll get a URL like: `your-project.vercel.app`

### Step 3: Add Your WalletConnect ID (1 minute)

1. In Vercel, go to your project
2. Click "Settings" → "Environment Variables"
3. Add a new variable:
   - **Key:** `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
   - **Value:** [Paste the Project ID from Step 1]
   - **Environments:** Select all (Production, Preview, Development)
4. Click "Save"
5. Go to "Deployments" tab → Click the three dots (...) on the latest deployment → "Redeploy"

### Step 4: Configure WalletConnect Origins

1. Go back to [cloud.walletconnect.com](https://cloud.walletconnect.com/)
2. Open your project
3. Find "Allowed origins" or "Allowed URLs"
4. Add your Vercel URL: `https://your-project.vercel.app`
5. Save

### Step 5: Test Your Platform! ✅

1. Visit your deployed URL: `https://your-project.vercel.app`
2. Click "Connect Wallet" - it should work!
3. Try searching for a domain
4. You're live! 🎉

## What You Have Now

✅ A fully functional Web3 naming platform  
✅ Running on `your-project.vercel.app`  
✅ Free hosting with automatic HTTPS/SSL  
✅ Working wallet connections  
✅ All features available (using demo data)

## Next Steps (Optional)

### Add a Custom Domain

Want `yourplatform.com` instead of `your-project.vercel.app`?

1. Buy a domain from any registrar (GoDaddy, Namecheap, etc.)
2. In Vercel: Settings → Domains → Add your domain
3. Follow Vercel's DNS setup instructions
4. Done! (Usually takes 15 minutes to a few hours)

### Connect Real Smart Contracts

Currently using demo data. To connect real blockchain:

1. Deploy the Domain Registry smart contract to your chosen network
2. In Vercel: Settings → Environment Variables → Add:
   - `NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourContractAddress`
   - `NEXT_PUBLIC_NETWORK=mainnet` (or your network)
3. Redeploy

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed smart contract deployment.

## Troubleshooting

**Problem:** Wallet won't connect  
**Solution:** Make sure you added your Vercel URL to WalletConnect's allowed origins

**Problem:** Environment variable not working  
**Solution:** Did you redeploy after adding it? Vercel needs a new deployment to use new variables

**Problem:** Need more help?  
**Solution:** Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed guides or [README.md](./README.md) for FAQ

## Cost Breakdown

- **Vercel Hosting:** Free (hobby plan)
- **WalletConnect:** Free
- **Custom Domain:** ~$10-15/year (optional)
- **Total to get started:** $0 💰

## Alternative: Self-Host in 10 Minutes

Prefer your own server? See the "Self-Hosting" section in [DEPLOYMENT.md](./DEPLOYMENT.md).

---

**That's it!** You now have your own Web3 naming platform running. Pretty cool, right? 🎉

Need more details? Check out:
- [README.md](./README.md) - Full project documentation
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Detailed deployment guide for all platforms
