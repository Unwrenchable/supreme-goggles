# Quick Deployment Guide

## 🚀 Deploy to Vercel in 5 Minutes

### Prerequisites
- GitHub account
- Vercel account (free tier works)
- [WalletConnect Project ID](https://cloud.walletconnect.com/) (required)

### Step 1: Verify Deployment Readiness

```bash
npm run verify-deployment
```

You should see: `🎉 READY FOR DEPLOYMENT!`

### Step 2: Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 3: Deploy to Vercel

#### Option A: Via Vercel Dashboard (Recommended)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Project"
3. Select your GitHub repository
4. Configure:
   - **Framework**: Next.js (auto-detected)
   - **Root Directory**: `.` (default)
   - **Build Command**: `npm run build` (auto-configured)
   - **Install Command**: `npm install --legacy-peer-deps` (from vercel.json)

5. **Add Environment Variables**:
   ```env
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_USE_PRODUCTION_MODE=false
   ```

6. Click **"Deploy"**

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# When prompted, set environment variables:
# - NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
# - NEXT_PUBLIC_USE_PRODUCTION_MODE=false
```

### Step 4: Verify Deployment

After deployment completes, Vercel will provide a URL like:
```
https://your-project.vercel.app
```

Test it:
```bash
# Replace with your actual URL
curl https://your-project.vercel.app/api/health
```

Expected response:
```json
{"status":"ok","timestamp":"...","version":"1.0.0"}
```

### Step 5: Test in Browser

1. Open your deployment URL
2. Try connecting a wallet (Phantom/MetaMask)
3. Search for a domain
4. Verify everything works

## Common Questions

### Q: I see "indexedDB is not defined" during build

**A**: This is expected and harmless. The build still succeeds. See [CONSOLE_WARNINGS.md](./CONSOLE_WARNINGS.md) for details.

### Q: Where do I get a WalletConnect Project ID?

**A**: 
1. Go to [cloud.walletconnect.com](https://cloud.walletconnect.com/)
2. Sign in with GitHub
3. Create a new project
4. Copy the Project ID
5. Add it to Vercel environment variables

### Q: What's the difference between production and demo mode?

**A**:
- **Demo Mode** (`NEXT_PUBLIC_USE_PRODUCTION_MODE=false`):
  - Uses mock data
  - No blockchain required
  - Perfect for testing UI/UX
  - Free to deploy

- **Production Mode** (`NEXT_PUBLIC_USE_PRODUCTION_MODE=true`):
  - Real blockchain transactions
  - Requires deployed smart contracts
  - Need contract addresses
  - See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

### Q: Can I use a custom domain?

**A**: Yes! In Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Vercel handles SSL automatically

### Q: How much does it cost?

**A**:
- Vercel Free Tier: $0/month
  - 100 GB bandwidth
  - 100 GB-hours serverless execution
  - More than enough for most projects

- If you exceed free tier, Vercel Pro starts at $20/month

### Q: Build is slow, how to speed it up?

**A**:
- Current build time: ~40-60 seconds (very fast!)
- If needed, enable caching in Vercel settings
- Consider Vercel Pro for faster build machines

## Troubleshooting

### Build fails with dependency errors

```bash
# Locally, clean and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run build
```

### Environment variables not working

1. Verify variables are prefixed with `NEXT_PUBLIC_`
2. Redeploy after adding variables (required)
3. Check Vercel logs for details

### Wallet connections fail

1. Verify `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` is set
2. Check project ID is valid at cloud.walletconnect.com
3. Test in an incognito window (clears cache)

## Advanced Configuration

### Multiple Environments

Vercel automatically creates:
- **Production**: `main` branch → your-project.vercel.app
- **Preview**: Other branches → unique preview URLs
- **Development**: Local with `vercel dev`

Set different environment variables per environment in Vercel settings.

### Custom Build Settings

Already configured in `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "installCommand": "npm install --legacy-peer-deps",
  "framework": "nextjs"
}
```

### Performance Optimization

The `next.config.ts` is pre-configured with:
- Standalone output for smaller deployments
- Webpack optimizations for Web3 packages
- Turbopack support (Next.js 16+)

## Next Steps After Deployment

1. ✅ Test all features in production
2. ✅ Share your deployment URL
3. ✅ Set up custom domain (optional)
4. ✅ Enable Vercel Analytics (optional)
5. ✅ Monitor deployment health

## Resources

- **Detailed Guide**: [DEPLOYMENT_TROUBLESHOOTING.md](./DEPLOYMENT_TROUBLESHOOTING.md)
- **Vercel Documentation**: [vercel.com/docs/frameworks/nextjs](https://vercel.com/docs/frameworks/nextjs)
- **Contract Deployment**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Architecture**: [ARCHITECTURE.md](./ARCHITECTURE.md)

## Need Help?

- Check [DEPLOYMENT_TROUBLESHOOTING.md](./DEPLOYMENT_TROUBLESHOOTING.md)
- Review build logs in Vercel dashboard
- Test locally first: `npm run build && npm start`
- Open an issue on GitHub

---

**Estimated Time**: 5-10 minutes for first deployment
**Difficulty**: Easy
**Cost**: Free (Vercel free tier)

🎉 **Happy deploying!**
