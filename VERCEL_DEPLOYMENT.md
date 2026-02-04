# Vercel Fullstack Deployment Guide

This guide provides comprehensive instructions for deploying the AtomicFizzCaps Universal Naming Service platform on Vercel.

## 📋 Prerequisites

Before deploying to Vercel, ensure you have:

1. **GitHub Account** connected to Vercel
2. **WalletConnect Project ID** (required) - Get from [cloud.walletconnect.com](https://cloud.walletconnect.com/)
3. **Deployed Smart Contracts** (for production mode) - See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
4. **Vercel Account** - Free tier is sufficient for testing

## 🚀 Quick Deploy to Vercel

### Option 1: Deploy from GitHub (Recommended)

1. **Push your code to GitHub** (if not already done)

2. **Import to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select your GitHub repository: `Unwrenchable/supreme-goggles`
   - Click "Import"

3. **Configure Project Settings**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: Leave empty (project is at root)
   - **Build Command**: `npm run build` (auto-configured)
   - **Install Command**: `npm install --legacy-peer-deps` (configured in vercel.json)
   - **Output Directory**: `.next` (auto-configured)
   - **Node.js Version**: 24.x (or 20.x minimum)

4. **Add Environment Variables** (see section below)

5. **Click "Deploy"**

### Option 2: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## 🔐 Environment Variables Configuration

### Required Variables (Demo Mode)

At minimum, configure these variables in Vercel Project Settings → Environment Variables:

```env
# Required for all deployments
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here

# Mode setting
NEXT_PUBLIC_USE_PRODUCTION_MODE=false
```

### Production Mode Variables

For production deployment with real blockchain transactions, add all contract addresses:

```env
# Mode
NEXT_PUBLIC_USE_PRODUCTION_MODE=true

# WalletConnect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here

# Solana Configuration
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
NEXT_PUBLIC_SOLANA_CONTRACT_ADDRESS=your_solana_program_id
NEXT_PUBLIC_SOLANA_PAYMENT_ADDRESS=your_solana_wallet

# EVM Contract Addresses
NEXT_PUBLIC_ETHEREUM_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_BSC_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_ARBITRUM_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_OPTIMISM_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_BASE_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_AVALANCHE_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_FANTOM_CONTRACT_ADDRESS=0x...

# Payment Configuration
NEXT_PUBLIC_PAYMENT_RECIPIENT_ADDRESS=0x...
```

### Adding Environment Variables in Vercel

**Via Web Dashboard**:
1. Go to your project in Vercel
2. Click "Settings" → "Environment Variables"
3. Add each variable with name and value
4. Select environments: Production, Preview, Development
5. Click "Save"

**Via CLI**:
```bash
# Add a single variable
vercel env add NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

# Pull environment variables to local
vercel env pull .env.local
```

## ⚙️ Vercel Project Settings

### Recommended Settings

Configure these in your Vercel Project Settings:

#### Build & Development Settings
- **Framework Preset**: Next.js
- **Build Command**: `npm run build` (auto-configured from vercel.json)
- **Install Command**: `npm install --legacy-peer-deps` (configured in vercel.json)
- **Output Directory**: `.next` (auto-configured)
- **Development Command**: `npm run dev`

#### Root Directory
- **Root Directory**: Leave empty (project at root)
- **Include source files outside root**: Unchecked
- **Skip deployments with no changes**: Checked (optional)

#### Node.js Version
- **Node.js Version**: 24.x (recommended) or 20.x (minimum)

#### Build Machine
For this Web3 application:
- **Standard performance** (4 vCPUs, 8 GB): Sufficient for most cases
- **Enhanced performance** (8 vCPUs, 16 GB): Use if builds are slow
- Cost: ~$0.014-0.03 per build minute

#### On-Demand Concurrent Builds
- **Recommended**: "Run up to one build per branch"
- This prevents build queue bottlenecks for active development

#### Ignored Build Step
- **Behavior**: Automatic (recommended)
- Or use custom: `git diff HEAD^ HEAD --quiet . ':(exclude).md'` to skip builds when only docs change

### Performance Optimizations

The `vercel.json` configuration includes:

```json
{
  "regions": ["iad1"],  // Deploy to US East (change based on your users)
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm install --legacy-peer-deps"
}
```

### Available Regions

Change the `regions` array in `vercel.json` based on your users:

- **North America**: `iad1` (Washington DC), `sfo1` (San Francisco)
- **Europe**: `fra1` (Frankfurt), `lhr1` (London)
- **Asia**: `hnd1` (Tokyo), `sin1` (Singapore)
- **Global**: Use `["iad1", "fra1", "sin1"]` for worldwide coverage (Pro plan)

## 🔧 Advanced Configuration

### Custom Domain Setup

1. Go to Project Settings → Domains
2. Add your custom domain: `yourdomain.com`
3. Follow DNS configuration instructions
4. Vercel automatically provisions SSL certificate

### API Routes Configuration

The `vercel.json` includes CORS headers for API routes:

```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {"key": "Access-Control-Allow-Origin", "value": "*"}
      ]
    }
  ]
}
```

Modify the CORS origin in production for better security:

```json
{"key": "Access-Control-Allow-Origin", "value": "https://yourdomain.com"}
```

### Deployment Protection

For sensitive deployments:

1. Go to Project Settings → Deployment Protection
2. Enable "Vercel Authentication" for preview deployments
3. Configure allowed email domains or specific users

## 📊 Monitoring & Logging

### Vercel Analytics

Enable Vercel Analytics for performance monitoring:

1. Go to Project Settings → Analytics
2. Enable "Web Analytics"
3. View real-time performance data in Analytics tab

### Function Logs

View serverless function logs:

1. Go to Deployments
2. Click on a deployment
3. Click "Functions" tab
4. View logs for each API route

### Error Tracking

For production, consider integrating:
- **Sentry**: Error tracking and performance monitoring
- **LogRocket**: Session replay and debugging
- **Datadog**: Full observability platform

## 🔄 Continuous Deployment

### Automatic Deployments

Vercel automatically deploys:
- **Production**: On push to `main` branch
- **Preview**: On push to any branch or pull request
- **Development**: On `vercel dev` command locally

### Branch Preview Deployments

Each pull request gets a unique preview URL:
- Automatic deployment on PR creation
- Updated on each push
- Comments added to GitHub PR with preview link

### Deployment Contexts

```env
# Different env vars per context
NEXT_PUBLIC_USE_PRODUCTION_MODE=false  # Preview/Development
NEXT_PUBLIC_USE_PRODUCTION_MODE=true   # Production
```

Configure different values for Production vs Preview in Environment Variables settings.

## 🧪 Testing Your Deployment

### Pre-Deployment Checklist

Before deploying to production:

- [ ] Test build locally: `npm run build && npm start`
- [ ] Verify environment variables are set correctly
- [ ] Test wallet connections (both Solana and EVM)
- [ ] Verify smart contract addresses
- [ ] Test domain registration flow
- [ ] Check mobile wallet compatibility
- [ ] Review API endpoint functionality
- [ ] Test on multiple browsers
- [ ] Verify SSL certificate
- [ ] Check performance with Lighthouse

### Local Build Test

```bash
# Install dependencies
npm install --legacy-peer-deps

# Create .env.local with your variables
cp .env.example .env.local
# Edit .env.local with your values

# Build for production
npm run build

# Start production server
npm start

# Test at http://localhost:3000
```

### Vercel CLI Testing

```bash
# Test build in Vercel environment
vercel build

# Run production build locally
vercel dev --prod
```

## 🚨 Troubleshooting

### Build Failures

**Issue**: `npm ERR! ERESOLVE could not resolve`

**Solution**: The `vercel.json` is configured with `--legacy-peer-deps`. If still failing, add to Build Settings:
```
npm install --legacy-peer-deps && npm run build
```

**Issue**: `Module not found: Can't resolve 'fs'`

**Solution**: Already configured in `next.config.ts` with webpack fallbacks. Should not occur.

**Issue**: Build timeout

**Solution**: 
- Upgrade to Enhanced performance build machine
- Optimize dependencies
- Use `output: 'standalone'` (already configured)

### Runtime Errors

**Issue**: `process is not defined`

**Solution**: Webpack config in `next.config.ts` handles this. Ensure you're not using Node.js APIs in client-side code.

**Issue**: Environment variables not working

**Solution**:
- Verify variables are prefixed with `NEXT_PUBLIC_`
- Redeploy after adding environment variables
- Clear cache: `vercel env pull` then redeploy

**Issue**: API routes returning 404

**Solution**:
- Verify files are in `app/api/` directory
- Check `vercel.json` rewrites configuration
- Ensure `route.ts` files export proper HTTP methods

### Wallet Connection Issues

**Issue**: WalletConnect not working

**Solution**:
- Verify `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` is set
- Check project ID is valid at cloud.walletconnect.com
- Enable required networks in WalletConnect dashboard

**Issue**: Solana wallet adapter errors

**Solution**:
- Verify `NEXT_PUBLIC_SOLANA_NETWORK` is set correctly
- Check Solana RPC endpoints are accessible
- Ensure wallet adapter packages are properly installed

## 📈 Performance Optimization

### Recommended Configurations

1. **Enable Image Optimization**:
   - Vercel automatically optimizes images
   - Use `next/image` component throughout

2. **Enable Edge Caching**:
   - Static pages cached at edge by default
   - Configure `Cache-Control` headers for API routes if needed

3. **Use Edge Functions** (Pro plan):
   - Convert lightweight API routes to Edge Functions
   - Lower latency, global distribution

4. **Optimize Bundle Size**:
   ```bash
   # Analyze bundle
   npm run build
   # Check .next/analyze/client.html
   ```

5. **Lazy Loading**:
   - Already using dynamic imports in components
   - Wallet adapters loaded on-demand

## 🔐 Security Best Practices

### Environment Variables

- ✅ Never commit `.env.local` or `.env`
- ✅ Use Vercel Environment Variables for secrets
- ✅ Different values for Production vs Preview
- ✅ Rotate WalletConnect Project ID periodically

### API Security

- ✅ Validate all inputs in API routes
- ✅ Rate limit API endpoints (use Vercel Pro)
- ✅ Implement CORS properly (configure in `vercel.json`)
- ✅ Use HTTPS only (automatic on Vercel)

### Smart Contract Security

- ✅ Verify contract addresses before deployment
- ✅ Use multi-sig wallets for treasury
- ✅ Test thoroughly on testnet first
- ✅ Implement pause mechanisms

## 📚 Additional Resources

- [Vercel Next.js Documentation](https://vercel.com/docs/frameworks/nextjs)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)

## 🆘 Support

### Vercel Support

- Community: [Vercel Discussions](https://github.com/vercel/vercel/discussions)
- Documentation: [vercel.com/docs](https://vercel.com/docs)
- Status: [vercel-status.com](https://www.vercel-status.com/)

### Project Support

- Issues: GitHub Issues in this repository
- Documentation: See `ARCHITECTURE.md`, `DEPLOYMENT_GUIDE.md`
- Smart Contracts: See `CONTRACT_SUMMARY.md`

## ✅ Post-Deployment Checklist

After successful deployment:

- [ ] Verify production URL is accessible
- [ ] Test wallet connections (Phantom, MetaMask)
- [ ] Test domain registration flow
- [ ] Check all API endpoints respond correctly
- [ ] Verify environment variables loaded correctly
- [ ] Test on mobile devices
- [ ] Set up custom domain (optional)
- [ ] Enable Vercel Analytics
- [ ] Configure deployment notifications
- [ ] Document deployment details
- [ ] Monitor initial user activity
- [ ] Set up error tracking (Sentry, etc.)

## 🎉 Success!

Your AtomicFizzCaps Universal Naming Service platform is now deployed on Vercel!

**Next Steps**:
1. Share your deployment URL
2. Monitor performance and errors
3. Iterate based on user feedback
4. Scale as needed (upgrade Vercel plan if needed)

---

**Need help?** Check our other documentation files or open an issue on GitHub.
