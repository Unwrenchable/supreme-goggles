# AtomicFizzCaps Universal Naming Service 🌐

A **Web3 naming platform** supporting **Solana and EVM chains** - Register ANY domain extension you want with lifetime ownership!

> **🏗️ Full-Stack Architecture:** This is a complete **frontend AND backend** application! See [FRONTEND_BACKEND_GUIDE.md](./FRONTEND_BACKEND_GUIDE.md) for details.
>
> **🚀 Want to deploy your own instance? See [QUICKSTART.md](./QUICKSTART.md) for a 5-minute deployment guide!**
>
> **💰 What does deployment cost?** Check [DEPLOYMENT_COSTS.md](./DEPLOYMENT_COSTS.md) - Start with Polygon (~$0.05) or BSC (~$1)!

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-38B2AC?style=flat-square&logo=tailwind-css)
[![Deploy with Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com/new/clone?repository-url=https://github.com/Unwrenchable/supreme-goggles)

## 📚 Documentation Quick Links

| Guide | Description |
|-------|-------------|
| [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) | **☁️ Vercel Deployment Guide** - Complete setup for production deployment on Vercel |
| [QUICKSTART_CONTRACTS.md](./QUICKSTART_CONTRACTS.md) | **⚡ 60-Second Contract Deployment** - Get started immediately! |
| [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) | **🚀 Complete Deployment Guide** - Step-by-step EVM & Solana deployment |
| [contracts/README.md](./contracts/README.md) | **📝 Smart Contract Documentation** - Contract features and API |
| [FRONTEND_BACKEND_GUIDE.md](./FRONTEND_BACKEND_GUIDE.md) | **Quick Reference** - "Do I have frontend AND backend?" - YES! |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | **Full-stack architecture guide** - Frontend, Backend & Blockchain explained |
| [DEPLOYMENT_LOGS.md](./DEPLOYMENT_LOGS.md) | **Monitoring & Logs** - How to check deployment health and troubleshoot issues |
| [CONSOLE_WARNINGS.md](./CONSOLE_WARNINGS.md) | **Console Warnings** - Explanation and fixes for wallet-related console messages |
| [QUICKSTART.md](./QUICKSTART.md) | 5-minute deployment guide |
| [DEPLOYMENT_COSTS.md](./DEPLOYMENT_COSTS.md) | **Cost estimates for each blockchain** (Polygon: $0.05, BSC: $1, etc.) |
| [CHAIN_CONFIGURATION.md](./CHAIN_CONFIGURATION.md) | **How to add new blockchains** (15-minute guide) |
| [PRODUCTION_SETUP.md](./PRODUCTION_SETUP.md) | Production deployment guide |
| [PAYMENTS.md](./PAYMENTS.md) | Payment collection setup |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Platform deployment options |

## 🎯 What Makes This Different?

**Not just multi-chain - UNLIMITED extensions!**

AtomicFizzCaps is the only platform where you can register:
- ✅ Popular chains: .fizz, .eth, .sol, .bnb, .arb, .op, .poly, .avax, .ftm
- ✅ Web3 standards: .crypto, .nft, .dao, .web3, .blockchain
- ✅ **ANY custom extension: .myname, .cool, .whatever, .anything!**

### 🚀 Why Unlimited Extensions?

- **🎨 Total Freedom** - Want .mycompany? .mycommunity? .myDAO? Just register it!
- **💎 First Mover Advantage** - Be the first to own an entire new extension
- **🔮 Future-Proof** - Support for extensions that don't even exist yet
- **🌐 True Web3** - No gatekeepers deciding which extensions are "valid"

## 🆔 Register ANY Extension You Want

### Preset Popular Extensions (Quick Select)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- WalletConnect Project ID (free from [cloud.walletconnect.com](https://cloud.walletconnect.com/))

### Installation

```bash
# Clone the repository (replace with your fork if you've forked it)
git clone https://github.com/Unwrenchable/supreme-goggles.git
cd supreme-goggles
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local and add your WalletConnect Project ID

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deploy to Production

### Deploy to Vercel (Recommended)

This project is optimized for Vercel deployment with a complete configuration:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Unwrenchable/supreme-goggles)

**What's Included:**
- ✅ `vercel.json` - Full Vercel configuration with optimal settings
- ✅ `next.config.ts` - Production-ready Next.js config with Turbopack
- ✅ `.vercelignore` - Excludes unnecessary files from deployment
- ✅ Standalone output for optimized serverless deployment

**Quick Deploy Steps:**
1. Click the "Deploy with Vercel" button above
2. Connect your GitHub account
3. Add environment variable: `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
4. Click "Deploy"

**📖 Complete Vercel Setup Guide:** See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for:
- Detailed configuration instructions
- Environment variables setup
- Custom domain configuration
- Production deployment checklist
- Troubleshooting guide

### Other Deployment Options
- **Netlify:** `npm run build && netlify deploy`
- **Railway/Render:** Connect GitHub repo for auto-deploy
- **Self-hosted:** `npm run build && npm start`

## 🎯 What Makes This Different?

### Dual Chain Support: Solana + EVM
- ✅ **Solana**: Native support for .sol, .fizz, .atomic domains
- ✅ **EVM Chains**: Ethereum, Polygon, BSC, Arbitrum, Optimism, Base, Avalanche, Fantom
- ✅ **Unlimited Extensions**: Register ANY custom extension (.myname, .cool, .gaming, etc.)
- ✅ **Lifetime Ownership**: Pay once, own forever - no renewal fees

### Mobile Wallet Support
**Solana Wallets:**
- Phantom Mobile (Recommended)
- Solflare, Backpack, and more
- Deep links + QR codes

**EVM Wallets:**
- MetaMask, Trust Wallet, Rainbow
- 300+ WalletConnect wallets
- QR code connection

📱 **See [MOBILE_WALLET_GUIDE.md](./MOBILE_WALLET_GUIDE.md) for detailed mobile setup**

## 🏗️ Project Structure

This is a **full-stack Web3 application** with both frontend and backend components. See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture guide.

\`\`\`
supreme-goggles/
├── app/                      # Next.js 14 App Router (Frontend Pages)
│   ├── layout.tsx           # Root layout with Web3 providers
│   ├── page.tsx             # Landing page
│   ├── search/              # Domain search results
│   ├── register/            # Domain registration
│   ├── dashboard/           # User dashboard
│   ├── manage/[domain]/     # Domain management
│   └── api/                 # Backend API Routes (Server-Side)
│       ├── domains/         # Domain-related endpoints
│       └── health/          # Health check endpoint
├── components/              # Reusable React components (Frontend)
│   ├── Navbar.tsx          # Navigation with wallet connect
│   ├── DomainSearch.tsx    # Search bar component
│   ├── DomainCard.tsx      # Domain display card
│   └── Footer.tsx          # Footer component
├── lib/                     # Backend utilities and configs
│   ├── wagmi.ts            # Wagmi/RainbowKit config
│   ├── contract.ts         # Contract utilities
│   ├── blockchain.ts       # Blockchain transaction functions
│   └── mockData.ts         # Mock data for demo
└── contracts/               # Smart contract ABIs (Blockchain Layer)
    ├── DomainRegistry.json # Domain registry ABI
    └── DomainRegistryExample.sol # Solidity source code
\`\`\`

### Architecture Overview

**Three-Tier Full-Stack Architecture:**

1. **Frontend (Client-Side)**: React components, pages, and UI in `/app` and `/components`
2. **Backend (Server-Side)**: Next.js API routes in `/app/api` and utilities in `/lib`
3. **Blockchain (Decentralized)**: Smart contracts in `/contracts` deployed on multiple blockchains

📖 **Read [ARCHITECTURE.md](./ARCHITECTURE.md) for complete details on the frontend/backend architecture.**

## 🎨 Tech Stack

- **Framework:** Next.js 16 with App Router & Turbopack
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Solana:** @solana/wallet-adapter, @solana/web3.js
- **EVM:** wagmi, viem, RainbowKit, ethers.js
- **State:** TanStack Query (React Query)

## 🌟 Key Features

### 1. Domain Search & Registration
- Search for available domains across Solana and EVM chains
- Check availability instantly
- Choose from 15+ preset extensions or create custom ones
- One-time payment with lifetime ownership

### 2. Dual Wallet Connection
- **Toggle between Solana and EVM mode** in the navbar
- Seamless wallet switching
- Mobile-optimized with QR codes and deep links
- Multiple wallet support (Phantom, MetaMask, 300+ more)

### 3. Domain Management
- Link wallet addresses
- Set IPFS content hashes
- Connect social media
- Transfer ownership
- All data stored on-chain

### 4. Multi-Chain Support
**Solana:**
- Mainnet, Devnet, Testnet
- Native SOL payments
- SPL token support

**EVM Chains:**
- Ethereum Mainnet
- Polygon, BSC
- Arbitrum, Optimism, Base
- Avalanche, Fantom
- Sepolia (testnet)

## ⚙️ Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
# Required: WalletConnect Project ID
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here

# Solana Configuration
NEXT_PUBLIC_SOLANA_NETWORK=devnet  # or mainnet-beta, testnet
NEXT_PUBLIC_SOLANA_CONTRACT_ADDRESS=your_solana_program_address
NEXT_PUBLIC_SOLANA_PAYMENT_ADDRESS=your_solana_wallet

# EVM Configuration (one per chain)
NEXT_PUBLIC_ETHEREUM_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_BSC_CONTRACT_ADDRESS=0x...
# ... add more as needed

# Payment Configuration
NEXT_PUBLIC_PAYMENT_RECIPIENT_ADDRESS=your_evm_wallet_address
NEXT_PUBLIC_USE_PRODUCTION_MODE=false  # true for production
```

### Demo Mode vs Production

**Demo Mode (Default):**
- Uses mock data
- No real transactions
- Perfect for testing UI/UX
- No smart contracts needed

**Production Mode:**
- Set `NEXT_PUBLIC_USE_PRODUCTION_MODE=true`
- Configure contract addresses
- Deploy your own DomainRegistry contracts
- Real blockchain transactions

## 🚢 Deployment

### Quick Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Unwrenchable/supreme-goggles)

**Or manually:**
```bash
npm run build
vercel deploy
```

### Other Platforms
- **Netlify:** `npm run build && netlify deploy`
- **Self-hosted:** Build and run with `npm start` on your server
- **Railway, Render, DigitalOcean:** Connect GitHub repo for auto-deploy

### Environment Variables Setup
After deployment, configure environment variables in your platform's dashboard:
1. Add `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` (required)
2. Add Solana and EVM contract addresses (for production)
3. Redeploy

## 💰 Smart Contracts - Production Ready!

This platform includes **production-ready smart contracts** for both EVM chains and Solana!

### ⚡ Quick Deploy

```bash
# 1. Set your payment wallet
export TREASURY_ADDRESS="0xYourWallet"

# 2. Compile contracts
npm run compile:contracts

# 3. Deploy to Polygon (cheapest, ~$0.05)
npm run deploy:polygon

# 4. Or deploy to Solana
./scripts/deploy-solana.sh mainnet-beta YourWallet 100000
```

### 📋 What's Included

✅ **EVM Contract** - Solidity contract for Ethereum, Polygon, BSC, Arbitrum, Optimism, Base, Avalanche, Fantom
✅ **Solana Program** - Rust program with custom treasury support  
✅ **Deployment Scripts** - One command deployment to any chain
✅ **Complete Documentation** - [QUICKSTART_CONTRACTS.md](./QUICKSTART_CONTRACTS.md)
✅ **Cost Optimized** - Deploy to Polygon for only ~$0.05!

### 🚀 Features

- **Lifetime Ownership** - Pay once, own forever (no renewal fees)
- **Custom Extensions** - Support ANY domain extension
- **Domain Records** - Wallet addresses, IPFS, social links
- **Custom Treasury** - **Payments go directly to YOUR wallet**
- **Multi-Chain** - Same contract on all EVM chains + Solana
- **Admin Controls** - Pause, update fees, change treasury

### 📚 Full Documentation

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete deployment instructions.

---

## 📱 Mobile Wallet Guide

### Connecting Solana Wallets
1. **Select "Solana"** mode in navbar toggle
2. **Click "Select Wallet"**
3. **Choose Phantom** (or your preferred wallet)
4. **Approve connection** via deep link or QR code
5. **Start registering** .sol, .fizz, .atomic domains

### Connecting EVM Wallets
1. **Select "EVM"** mode in navbar toggle
2. **Click "Connect Wallet"**
3. **Select "WalletConnect"**
4. **Scan QR code** with mobile wallet app
5. **Approve connection** on your phone

📖 Full guide: [MOBILE_WALLET_GUIDE.md](./MOBILE_WALLET_GUIDE.md)

## 🔧 Development

```bash
# Install dependencies
npm install

# Run development server (with Turbopack)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Check deployment health
npm run check-deployment
```

## 📝 How It Works

### Demo Mode (Default)
1. Users search for domains
2. Mock data shows availability
3. "Registration" shows success message
4. Perfect for testing without blockchain

### Production Mode
1. Users connect Solana or EVM wallet
2. Search queries your deployed contracts
3. Payment transaction sent to your wallet
4. Domain registered on-chain
5. Users manage domains from dashboard

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

### Custom GitHub Copilot Agents

This repository includes custom GitHub Copilot agent configurations to help with Web3 development tasks. See [.github/agents/README.md](./.github/agents/README.md) for details on available agents and how to use them effectively.

## 📄 License

MIT License - Use for your own Web3 naming platform!

## 🔗 Links

- **Website:** atomicfizzcaps.xyz
- **GitHub:** [Unwrenchable/supreme-goggles](https://github.com/Unwrenchable/supreme-goggles)

---

Built with ❤️ for the Web3 community
