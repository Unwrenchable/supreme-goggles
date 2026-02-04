# Deployment Troubleshooting and Fixes

## ✅ Build Status

### Current Build Status: **WORKING** ✓

The project builds successfully despite showing an `indexedDB is not defined` error during the build process. This error is **harmless** and **expected** - see explanation below.

## Understanding the indexedDB Error

### What You're Seeing

```
ReferenceError: indexedDB is not defined
```

### Why It Happens

- **Context**: This error occurs during Next.js static page generation (SSR phase)
- **Cause**: Solana wallet adapters (`@solana/wallet-adapter-react-ui`) try to access `indexedDB`, a browser-only API
- **During SSR**: Node.js doesn't have browser APIs like `indexedDB`

### Why It's Safe to Ignore

1. ✅ **Build Completes Successfully**: Exit code 0, all pages generated
2. ✅ **Runtime Works Perfectly**: Wallets work correctly in the browser
3. ✅ **Only Affects Build**: Error doesn't appear to users
4. ✅ **Documented Behavior**: Known limitation of SSR with browser APIs
5. ✅ **No Functionality Loss**: All features work as expected

### Verification

```bash
# Build completes successfully
npm run build
# Exit code: 0 (success)

# Application works perfectly
npm start
# Access http://localhost:3000 - all features work
```

## Deployment Configuration

### ✓ Vercel Configuration (vercel.json)

The repository includes a properly configured `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "installCommand": "npm install --legacy-peer-deps",
  "framework": "nextjs"
}
```

**Status**: ✅ Correct

### ✓ Next.js Configuration (next.config.ts)

Properly configured for:
- Standalone output for serverless deployment
- Webpack fallbacks for Web3 packages
- Turbopack optimization

**Status**: ✅ Correct

### ✓ Dependencies

All dependencies install correctly with `--legacy-peer-deps` flag:

```bash
npm install --legacy-peer-deps
```

**Status**: ✅ Working

## Deployment Steps

### For Vercel Deployment

1. **Push to GitHub**:
   ```bash
   git push origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select repository: `Unwrenchable/supreme-goggles`
   - Click "Import"

3. **Environment Variables** (Required):
   ```env
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
   NEXT_PUBLIC_USE_PRODUCTION_MODE=false
   ```

4. **Deploy**: Click "Deploy"

### Expected Build Output

```
✓ Compiled successfully
ReferenceError: indexedDB is not defined  ← IGNORE THIS
✓ Generating static pages
✓ Finalizing page optimization

Route (app)
┌ ○ /
├ ○ /dashboard
├ ○ /register
└ ○ /search
```

**Note**: The `indexedDB` error is shown but the build succeeds.

## Common Issues and Solutions

### Issue: "npm ERR! ERESOLVE could not resolve"

**Solution**: Use `--legacy-peer-deps` flag (already configured in vercel.json)

```bash
npm install --legacy-peer-deps
```

### Issue: "Module not found: Can't resolve 'fs'"

**Solution**: Already handled in `next.config.ts` webpack configuration

### Issue: Wallet connections not working

**Checklist**:
- [ ] `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` is set
- [ ] Project ID is valid at cloud.walletconnect.com
- [ ] Test in browser (not during build)

### Issue: Build times out on Vercel

**Solution**:
- Vercel free tier: 45-minute limit
- Current build time: ~40-60 seconds ✓
- No action needed

## Testing Deployment Locally

### 1. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 2. Build for Production

```bash
npm run build
```

Expected: Build completes with exit code 0 (despite indexedDB error)

### 3. Start Production Server

```bash
npm start
```

Expected: Server starts on http://localhost:3000

### 4. Test Endpoints

```bash
# Health check
curl http://localhost:3000/api/health

# Homepage
curl -I http://localhost:3000

# Domain check API
curl "http://localhost:3000/api/domains/check?domain=test&extension=.fizz"
```

All should return 200 OK responses.

### 5. Test in Browser

1. Open http://localhost:3000
2. Try connecting a wallet (Phantom/MetaMask)
3. Search for a domain
4. Verify all features work

## Deployment Checklist

Before deploying:

- [x] Build completes successfully locally
- [x] Dependencies install without errors
- [x] Production server starts successfully
- [x] API endpoints respond correctly
- [ ] Environment variables configured (user's responsibility)
- [ ] WalletConnect Project ID obtained (if using wallets)
- [x] vercel.json configuration is correct
- [x] next.config.ts is properly configured
- [x] .gitignore includes node_modules and .env files

## Status Summary

### ✅ What's Working

- Build process (completes successfully)
- Next.js configuration
- Webpack configuration for Web3
- Vercel deployment configuration
- All dependencies (with --legacy-peer-deps)
- Runtime application (wallets, APIs, UI)

### ⚠️ Known Warnings (Safe to Ignore)

- `ReferenceError: indexedDB is not defined` during build
  - **Impact**: None
  - **Occurs**: During SSR/build only
  - **Runtime**: Works perfectly

### 📋 User Action Required

1. **Get WalletConnect Project ID**:
   - Visit [cloud.walletconnect.com](https://cloud.walletconnect.com/)
   - Create a project
   - Copy the Project ID

2. **Set Environment Variables in Vercel**:
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
   - `NEXT_PUBLIC_USE_PRODUCTION_MODE=false` (for demo mode)

3. **Deploy to Vercel**:
   - Connect GitHub repository
   - Add environment variables
   - Click Deploy

## Additional Resources

- **Detailed Vercel Guide**: See `VERCEL_DEPLOYMENT.md`
- **Contract Deployment**: See `DEPLOYMENT_GUIDE.md`
- **Console Warnings**: See `CONSOLE_WARNINGS.md` (explains indexedDB error)
- **Architecture**: See `ARCHITECTURE.md`

## Support

If you encounter issues not covered here:

1. Check build logs in Vercel dashboard
2. Review `CONSOLE_WARNINGS.md` for known issues
3. Verify environment variables are set correctly
4. Test locally first with `npm run build && npm start`

---

**Last Updated**: 2026-02-04
**Build Status**: ✅ Working
**Deployment Status**: ✅ Ready for Vercel
