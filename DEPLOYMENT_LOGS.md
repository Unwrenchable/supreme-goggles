# Deployment Logs and Monitoring

This document explains how to check deployment logs and monitor the health of your AtomicFizzCaps deployment.

## Quick Check

The repository includes a deployment health check script:

```bash
npm run check-deployment
```

Or specify a custom URL:

```bash
node scripts/check-deployment.js https://your-deployment-url.vercel.app
```

## What Gets Checked

The health check script validates:

1. **Health Check API** (`/api/health`)
   - Confirms the backend API is running
   - Returns service status, version, and timestamp

2. **Homepage** (`/`)
   - Verifies the frontend is accessible
   - Checks main UI loads correctly

3. **Domain Check API** (`/api/domains/check`)
   - Tests domain availability checking
   - Validates API endpoint functionality

## Vercel Deployment Logs

### Via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Select your project
3. Navigate to the "Deployments" tab
4. Click on any deployment to view:
   - Build logs
   - Runtime logs
   - Function logs
   - Edge logs

### Via Vercel CLI

Install Vercel CLI:
```bash
npm i -g vercel
```

View recent deployments:
```bash
vercel list
```

View logs for specific deployment:
```bash
vercel logs [deployment-url]
```

Follow logs in real-time:
```bash
vercel logs --follow
```

### Important Log Locations

**Build Logs**: Shows compilation output, dependency installation, and build errors
- Look for: TypeScript errors, missing dependencies, build failures

**Runtime Logs**: Shows errors during application execution
- Look for: API errors, unhandled exceptions, network issues

**Function Logs**: Shows serverless function invocations
- Look for: API route errors, slow queries, timeout issues

## Common Issues and Solutions

### Issue: "getaddrinfo ENOTFOUND"

**Symptom**: The health check script reports DNS not found

**Possible Causes**:
1. Deployment doesn't exist yet
2. URL is incorrect
3. Domain not propagated

**Solution**:
```bash
# Verify deployment exists in Vercel dashboard
vercel list

# Or check specific project
vercel ls [project-name]
```

### Issue: Build Failures

**Symptom**: Deployment fails during build

**Check**:
1. Review build logs in Vercel dashboard
2. Ensure all environment variables are set
3. Check for TypeScript errors locally:
   ```bash
   npm run build
   ```

**Common Fixes**:
- Add missing environment variables in Vercel dashboard
- Fix TypeScript errors shown in logs
- Update dependencies if needed

### Issue: Runtime Errors

**Symptom**: App builds but crashes when accessed

**Check**:
1. Runtime logs in Vercel
2. Browser console for frontend errors
3. API endpoint responses

**Common Fixes**:
- Verify environment variables are correct
- Check for missing dependencies
- Review CORS configuration

### Issue: Slow Response Times

**Symptom**: Health check shows high response times

**Check**:
1. Vercel analytics for performance metrics
2. Function execution time in logs
3. Database query performance (if applicable)

**Solutions**:
- Enable Vercel Edge Network
- Optimize database queries
- Add caching where appropriate

## Environment Variables Checklist

Required for production deployment:

### Essential
- ✅ `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` - WalletConnect setup

### Solana (if using)
- `NEXT_PUBLIC_SOLANA_NETWORK` - Network selection (devnet/mainnet-beta)
- `NEXT_PUBLIC_SOLANA_CONTRACT_ADDRESS` - Deployed contract
- `NEXT_PUBLIC_SOLANA_PAYMENT_ADDRESS` - Payment wallet

### EVM (if using)
- `NEXT_PUBLIC_ETHEREUM_CONTRACT_ADDRESS` - Ethereum contract
- `NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS` - Polygon contract
- `NEXT_PUBLIC_BSC_CONTRACT_ADDRESS` - BSC contract
- [Add more chains as needed]

### Configuration
- `NEXT_PUBLIC_USE_PRODUCTION_MODE` - Set to `true` for production
- `NEXT_PUBLIC_PAYMENT_RECIPIENT_ADDRESS` - Payment destination

## Monitoring Best Practices

### 1. Set Up Alerts

Configure Vercel to notify you:
- Build failures
- High error rates
- Increased response times

### 2. Regular Health Checks

Add to your monitoring:
```bash
# Run daily health check
node scripts/check-deployment.js https://your-url.vercel.app
```

### 3. Monitor Analytics

Check Vercel Analytics for:
- Page views and user traffic
- Performance metrics (Web Vitals)
- Function invocation counts
- Bandwidth usage

### 4. Check API Endpoints

Test critical endpoints:
```bash
# Health check
curl https://your-url.vercel.app/api/health

# Domain check
curl "https://your-url.vercel.app/api/domains/check?domain=test&extension=.fizz"
```

## Log Analysis Tips

### Finding Errors

Search logs for:
- `Error:`
- `TypeError:`
- `Failed`
- Status codes: `500`, `502`, `503`

### Performance Issues

Look for:
- Function execution times > 10s (approaching timeout)
- High memory usage warnings
- Cold start delays

### Security Issues

Watch for:
- Repeated failed authentication attempts
- Unusual traffic patterns
- Unauthorized API access attempts

## Automated Monitoring

### GitHub Actions Workflow

Create `.github/workflows/health-check.yml`:

```yaml
name: Deployment Health Check

on:
  schedule:
    - cron: '0 */6 * * *'  # Every 6 hours
  workflow_dispatch:

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Run health check
        run: node scripts/check-deployment.js ${{ secrets.DEPLOYMENT_URL }}
```

### Uptime Monitoring Services

Consider using:
- **Vercel Analytics** (built-in)
- **UptimeRobot** (free tier available)
- **Pingdom**
- **StatusCake**

## Troubleshooting Checklist

When deployment issues occur:

- [ ] Check Vercel deployment status
- [ ] Review build logs
- [ ] Verify environment variables
- [ ] Test API endpoints manually
- [ ] Check browser console for frontend errors
- [ ] Review runtime logs
- [ ] Verify DNS configuration
- [ ] Test wallet connections (Solana and EVM)
- [ ] Validate smart contract addresses

## Getting Help

If issues persist:

1. **Check Vercel Status**: [vercel-status.com](https://www.vercel-status.com)
2. **Review Logs**: Detailed error messages in Vercel dashboard
3. **Community**: Vercel Discord, GitHub Discussions
4. **Support**: Vercel support for pro/enterprise plans

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Debugging Guide](https://nextjs.org/docs/advanced-features/debugging)
- [Web3 Debugging Tips](./ARCHITECTURE.md#troubleshooting)
- [Environment Variables Guide](./.env.example)

---

**Last Updated**: 2024
**Script Location**: `scripts/check-deployment.js`
**Health Endpoint**: `/api/health`
