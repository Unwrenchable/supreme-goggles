# Vercel Project Settings - Quick Reference

This document provides the exact settings to configure in your Vercel project dashboard based on the problem statement requirements.

## 🎯 Framework Settings

### Framework Preset
- **Setting:** Next.js (Auto-detected)
- **Build Command:** `npm run build` (Configured in `vercel.json`)
- **Install Command:** `npm install --legacy-peer-deps` (Configured in `vercel.json`)
- **Output Directory:** `.next` (Next.js default)
- **Development Command:** `npm run dev`

> ✅ These settings are automatically configured via `vercel.json` and don't need manual entry.

## 📁 Root Directory

- **Root Directory:** Leave empty (project is at root level)
- **Include files outside root:** ❌ Unchecked
- **Skip deployments with no changes:** ✅ Checked (Recommended)

## 🔧 Build Configuration

### Ignored Build Step
- **Behavior:** Automatic (Recommended)
- **Alternative:** Custom command to skip docs-only changes:
  ```bash
  git diff HEAD^ HEAD --quiet . ':(exclude)*.md'
  ```

### Node.js Version
- **Required Version:** 20.x (minimum)
- **Recommended Version:** 24.x
- **Current Config:** Uses the latest Node.js LTS available on Vercel

> ⚠️ A new deployment is required after changing the Node.js version.

## ⚡ Build Performance

### On-Demand Concurrent Builds
**Recommended Setting:** "Run up to one build per branch"

Options explained:
1. **Run all builds immediately** - Skip queue for all builds (costs apply)
2. **Run up to one build per branch** - ✅ Recommended: Queue builds within a branch
3. **Disable on-demand concurrent builds** - Queue all builds, one at a time

### Build Machine
**Recommended for Web3 Apps:** Standard performance

| Option | Specs | Use Case | Cost |
|--------|-------|----------|------|
| **Standard performance** | 4 vCPUs, 8 GB | ✅ Recommended for this app | $0.014/min |
| Enhanced performance | 8 vCPUs, 16 GB | Large apps, slow builds | $0.03/min |
| Turbo performance | 30 vCPUs, 60 GB | Optimized for Turbopack | $0.126/min |

> 💡 Start with Standard. Upgrade only if builds consistently exceed 5 minutes.

## 🔐 Environment Variables

### Required for All Deployments

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

Get your free Project ID from: https://cloud.walletconnect.com/

### Mode Configuration

```env
# Demo mode (default) - no blockchain needed
NEXT_PUBLIC_USE_PRODUCTION_MODE=false

# Production mode - requires deployed contracts
NEXT_PUBLIC_USE_PRODUCTION_MODE=true
```

### Solana Configuration (Production Mode)

```env
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
NEXT_PUBLIC_SOLANA_CONTRACT_ADDRESS=your_program_id
NEXT_PUBLIC_SOLANA_PAYMENT_ADDRESS=your_solana_wallet
```

### EVM Configuration (Production Mode)

```env
NEXT_PUBLIC_ETHEREUM_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_BSC_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_ARBITRUM_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_OPTIMISM_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_BASE_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_AVALANCHE_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_FANTOM_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_PAYMENT_RECIPIENT_ADDRESS=0x...
```

### How to Add in Vercel Dashboard

1. Go to your project → **Settings** → **Environment Variables**
2. Click **Add New**
3. Enter **Name** and **Value**
4. Select environments: ✅ Production, ✅ Preview, ✅ Development
5. Click **Save**
6. **Redeploy** for changes to take effect

## 🌍 Deployment Regions

Configured in `vercel.json`:
```json
{
  "regions": ["iad1"]
}
```

**Available Regions:**
- **North America:** `iad1` (Washington DC), `sfo1` (San Francisco)
- **Europe:** `fra1` (Frankfurt), `lhr1` (London)
- **Asia:** `hnd1` (Tokyo), `sin1` (Singapore)

> 💡 Pro tip: Deploy to multiple regions for global performance (requires Vercel Pro)

## ✅ Deployment Checks

### Current Configuration
- **No checks configured** (Default)

### Optional: CI/CD Integration
Configure checks to auto-promote deployments:
1. Go to **Settings** → **Deployment Protection**
2. Configure GitHub Actions checks
3. Set required status checks
4. Deployments promote to production only when checks pass

## 📋 Configuration Files Included

This repository includes these Vercel-specific files:

| File | Purpose |
|------|---------|
| `vercel.json` | Complete Vercel configuration |
| `.vercelignore` | Files to exclude from deployment |
| `next.config.ts` | Next.js production optimizations |
| `VERCEL_DEPLOYMENT.md` | Comprehensive deployment guide |

## 🚀 Quick Deploy Checklist

- [ ] Push code to GitHub
- [ ] Import repository to Vercel
- [ ] Framework preset auto-detected as Next.js
- [ ] Add `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` environment variable
- [ ] (Optional) Add contract addresses for production mode
- [ ] Set Node.js version to 24.x
- [ ] Keep Root Directory empty
- [ ] Select "Standard performance" build machine
- [ ] Choose "Run up to one build per branch" for concurrent builds
- [ ] Deploy!

## 🔄 Syncing Production with Project Settings

The problem statement mentions: "Configuration Settings in the current Production deployment differ from your current Project Settings."

### How to Sync:
1. Update project settings in Vercel dashboard
2. Click **Deployments** → **...** (three dots) → **Redeploy**
3. Check "Use existing build cache" for faster redeploy
4. Click **Redeploy**

### What Gets Synced:
- ✅ Environment variables
- ✅ Build settings
- ✅ Node.js version
- ✅ Root directory configuration
- ✅ Framework preset

> ⚠️ Changes to build settings require a new deployment to take effect.

## 📊 Monitoring

### After Deployment:
1. **Analytics** - Enable Vercel Web Analytics for performance metrics
2. **Logs** - Check function logs in Deployments → Functions tab
3. **Domains** - Add custom domain in Settings → Domains
4. **SSL** - Automatic HTTPS via Let's Encrypt

## 🆘 Troubleshooting

### Build Fails with Dependency Errors
- **Cause:** Peer dependency conflicts
- **Solution:** Already configured with `--legacy-peer-deps` in `vercel.json`

### Environment Variables Not Working
- **Cause:** Variables not prefixed with `NEXT_PUBLIC_`
- **Solution:** All client-side variables must start with `NEXT_PUBLIC_`
- **Action:** Redeploy after adding variables

### API Routes Return 404
- **Cause:** Incorrect routing configuration
- **Solution:** Already configured in `vercel.json` with proper rewrites

### Build Timeout
- **Cause:** Complex dependencies or slow network
- **Solution:** Upgrade to "Enhanced performance" build machine

## 📚 Additional Resources

- Full deployment guide: [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
- Vercel documentation: https://vercel.com/docs
- Next.js deployment: https://nextjs.org/docs/deployment
- Smart contract deployment: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

**Ready to deploy?** Click the Deploy button:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Unwrenchable/supreme-goggles)
