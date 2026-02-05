# 🚀 AtomicFizzCaps Solana Devnet Deployment Guide

## ✅ Setup Complete!

All tools and configurations are ready for devnet deployment:
- ✅ Rust 1.93.0
- ✅ Solana CLI 1.18.26
- ✅ Anchor CLI 0.29.0
- ✅ Wallet configured for devnet
- ✅ Anchor.toml configured

## 🪙 Get Devnet SOL (REQUIRED)

Your wallet address: `9xo7H86E8vs7wZt4EMbyUSwkFJrj98sCKxg5tmNttgvP`

**Option 1: Web Faucet (Recommended)**
1. Visit: https://faucet.solana.com
2. Paste your wallet address: `9xo7H86E8vs7wZt4EMbyUSwkFJrj98sCKxg5tmNttgvP`
3. Request 2 SOL for devnet

**Option 2: Command Line**
```bash
export PATH="/tmp/solana-release/bin:$PATH"
solana airdrop 2
```

## 🚀 Deploy to Devnet

Once you have SOL, run:

```bash
./deploy-devnet.sh
```

This script will:
1. Build your Solana program
2. Deploy to Solana devnet
3. Generate your Program ID
4. Save deployment info
5. Provide environment variables for your frontend

## 📝 After Deployment

1. **Update Program ID in Source Code**
   - File: `contracts/solana/lib.rs` (line 6)
   - The deploy script will show you the exact line to update

2. **Update Environment Variables**
   - The script will output the exact values to add to `.env.local`
   - For production mode, set: `NEXT_PUBLIC_USE_PRODUCTION_MODE=true`

3. **Initialize the Registry**
   - You'll need to call the `initialize` function with:
     - Treasury address (your wallet)
     - Registration fee (0 for free, or amount in lamports)

4. **Test Your Domain Registration**
   - Start your Next.js frontend: `npm run dev`
   - Connect your Phantom/Solflare wallet
   - Try registering a test domain!

## 🔍 Check Setup Status Anytime

```bash
./check-setup.sh
```

## 📊 Useful Commands

```bash
# Check balance
export PATH="/tmp/solana-release/bin:$PATH"
solana balance

# View your wallet address
solana address

# Check Solana network config
solana config get

# View program on Solana Explorer
# After deployment, visit:
# https://explorer.solana.com/address/YOUR_PROGRAM_ID?cluster=devnet
```

## 🐛 Troubleshooting

**"Anchor CLI not found"**
```bash
export PATH="/home/codespace/.npm-global/bin:$PATH"
anchor --version
```

**"Solana CLI not found"**
```bash
export PATH="/tmp/solana-release/bin:$PATH"
solana --version
```

**"Insufficient funds for deployment"**
- You need at least 2 SOL for deployment
- Get more from https://faucet.solana.com

## 🎯 Quick Start (Once you have SOL)

```bash
# 1. Check setup
./check-setup.sh

# 2. Deploy to devnet
./deploy-devnet.sh

# 3. Follow the post-deployment instructions printed by the script
```

## 📚 Additional Resources

- Solana Explorer: https://explorer.solana.com/?cluster=devnet
- Solana Devnet Faucet: https://faucet.solana.com
- Anchor Docs: https://www.anchor-lang.com
- Solana Docs: https://docs.solana.com

---

**Ready to scale to mainnet?**

Once testing is complete:
1. Get real SOL for mainnet
2. Update `Anchor.toml` cluster to `Mainnet`
3. Run deployment with mainnet config
4. Update environment variables for production
