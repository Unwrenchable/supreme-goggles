# AtomicFizzCaps Universal Naming Service 🌐

A **Web3 naming platform** supporting **Solana and EVM chains** - Register ANY domain extension you want with lifetime ownership!

![Next.js](https://img.shields.io/badge/Next.js-16+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4+-38B2AC?style=flat-square&logo=tailwind-css)
[![Deploy with Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com/new/clone?repository-url=https://github.com/Unwrenchable/supreme-goggles)

## 🎯 What Makes This Special?

**Not just multi-chain - UNLIMITED extensions!**

- ✅ Popular chains: `.fizz` `.eth` `.sol` `.bnb` `.arb` `.op` `.poly` `.avax` `.ftm`
- ✅ Web3 standards: `.crypto` `.nft` `.dao` `.web3` `.blockchain`
- ✅ **ANY custom extension**: `.myname` `.cool` `.whatever` `.anything!`

### Why Unlimited Extensions?

- 🎨 **Total Freedom** - Want `.mycompany`? `.mycommunity`? Just register it!
- 💎 **First Mover Advantage** - Be the first to own an entire new extension
- 🔮 **Future-Proof** - Support for extensions that don't even exist yet
- 🌐 **True Web3** - No gatekeepers deciding which extensions are "valid"

## 🚀 Quick Start

### Option 1: Deploy to Vercel (5 minutes)

1. Get a [WalletConnect Project ID](https://cloud.walletconnect.com/) (free)
2. Click the "Deploy with Vercel" button above
3. Add environment variable:
   ```env
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
   NEXT_PUBLIC_USE_PRODUCTION_MODE=false
   ```
4. Deploy! 🎉

**Detailed guide**: See [QUICK_DEPLOY.md](./QUICK_DEPLOY.md)

### Option 2: Run Locally

```bash
# Install dependencies
npm install --legacy-peer-deps

# Create environment file
cp .env.example .env.local
# Edit .env.local and add your WalletConnect Project ID

# Start development server
npm run dev

# Open http://localhost:3000
```

### Option 3: Deploy Smart Contracts

To enable real blockchain transactions (not demo mode):

**EVM Chains (Ethereum, Polygon, BSC, etc.):**
```bash
# Quick deploy to Polygon testnet (free)
npm run deploy:mumbai

# Or deploy to mainnet
npm run deploy:polygon
```

**Solana:**
```bash
# If scripts aren't executable, run this one-liner first:
chmod +x scripts/*.sh scripts/*.js 2>/dev/null || find scripts -type f \( -name "*.sh" -o -name "*.js" \) -exec chmod +x {} \;

# Then build and deploy to Solana devnet
./scripts/build-solana.sh --deploy devnet --treasury YOUR_WALLET_ADDRESS

# If you still get errors, see: scripts/README.md or SOLANA_DEPLOYMENT_TROUBLESHOOTING.md
```

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for full instructions on all chains.

## 📚 Documentation

| Document | What's Inside |
|----------|---------------|
| **[QUICK_DEPLOY.md](./QUICK_DEPLOY.md)** | 5-minute Vercel deployment guide |
| **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** | Deploy smart contracts to blockchains |
| **[scripts/README.md](./scripts/README.md)** | **Deployment scripts guide & quick fixes** |
| **[SOLANA_BUILD_GUIDE.md](./SOLANA_BUILD_GUIDE.md)** | **Build & deploy Solana programs (fixes common errors)** |
| **[SOLANA_DEPLOYMENT_TROUBLESHOOTING.md](./SOLANA_DEPLOYMENT_TROUBLESHOOTING.md)** | **Troubleshoot Solana deployment issues** |
| **[SOLANA_QUICK_REFERENCE.md](./SOLANA_QUICK_REFERENCE.md)** | **Quick reference for Solana build commands** |
| **[ARCHITECTURE.md](./ARCHITECTURE.md)** | Technical architecture and design |
| **[MOBILE_WALLET_GUIDE.md](./MOBILE_WALLET_GUIDE.md)** | Mobile wallet connection (Phantom, MetaMask) |
| **[CONSOLE_WARNINGS.md](./CONSOLE_WARNINGS.md)** | Explanation of common build warnings |
| **[SECURITY.md](./SECURITY.md)** | Security considerations and best practices |
| **[CONTRIBUTING.md](./CONTRIBUTING.md)** | How to contribute to this project |

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** with App Router
- **React 19** with TypeScript 5
- **Tailwind CSS 4** for styling
- **TanStack Query** for data management

### Blockchain Integration

**Solana:**
- `@solana/wallet-adapter` - Wallet connections
- `@solana/web3.js` - Blockchain interactions
- Supports: Phantom, Solflare, Torus, Ledger

**EVM (Ethereum, Polygon, BSC, etc.):**
- `wagmi` + `viem` - Wallet and contract interactions
- `RainbowKit` - Beautiful wallet connection UI
- Supports: MetaMask, WalletConnect (300+ wallets)

### Key Features

- ✅ **Dual Chain Support** - Seamless switching between Solana and EVM
- ✅ **Mobile-First** - QR codes and deep links for mobile wallets
- ✅ **Lifetime Ownership** - One-time payment, no renewals
- ✅ **Demo Mode** - Test without deploying contracts
- ✅ **Production Ready** - Full smart contract support

## 🏗️ Architecture

This is a **full-stack Web3 application**:

### Frontend (`/app` + `/components`)
- React components with TypeScript
- Real-time wallet connection status
- Domain search and registration UI
- User dashboard

### Backend (`/app/api`)
- Next.js API routes
- Domain availability checking
- Registration validation
- Health monitoring

### Smart Contracts (`/contracts`)
- Solidity contracts for EVM chains
- Deployment scripts for all networks
- ABIs for frontend integration

**More details**: [ARCHITECTURE.md](./ARCHITECTURE.md)

## 🌍 Supported Blockchains

### EVM Chains
- **Ethereum** - The original
- **Polygon** - Fast & cheap (~$0.05/deploy)
- **BSC** - Binance Smart Chain (~$1/deploy)
- **Arbitrum** - L2 scaling
- **Optimism** - L2 scaling
- **Base** - Coinbase L2
- **Avalanche** - High throughput
- **Fantom** - Fast finality

### Solana
- **Mainnet-Beta** - Solana production
- **Devnet** - For testing

## 💡 Usage Examples

### Demo Mode (No Blockchain Required)
```bash
# Uses mock data for testing UI/UX
NEXT_PUBLIC_USE_PRODUCTION_MODE=false
```

Perfect for:
- Testing the UI
- Development
- Showcasing features

### Production Mode (Real Blockchain)
```bash
# Requires deployed smart contracts
NEXT_PUBLIC_USE_PRODUCTION_MODE=true
NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS=0x...
```

Perfect for:
- Real domain registration
- Collecting payments
- Production deployment

## 📱 Mobile Wallet Support

Fully integrated mobile wallet support:

### Solana Mobile
- **Phantom Mobile** - Deep links + QR codes
- **Solflare Mobile** - WalletConnect
- Seamless desktop ↔️ mobile switching

### EVM Mobile
- **MetaMask Mobile** - Deep links + QR codes
- **Trust Wallet** - WalletConnect
- **300+ wallets** via WalletConnect

**Setup guide**: [MOBILE_WALLET_GUIDE.md](./MOBILE_WALLET_GUIDE.md)

## 🔧 Development

### Prerequisites
- Node.js 18+ or 20+
- npm or yarn
- Git

### Scripts

```bash
# Development
npm run dev              # Start dev server

# Building
npm run build            # Build for production
npm start                # Run production build
npm run lint             # Lint code

# Deployment Verification
npm run verify-deployment  # Check if ready to deploy
npm run check-deployment   # Health check deployed app

# Smart Contract Deployment
npm run compile:contracts  # Compile Solidity contracts
npm run deploy:polygon     # Deploy to Polygon
npm run deploy:bsc         # Deploy to BSC
# ... more networks available
```

### Project Structure

```
supreme-goggles/
├── app/                   # Next.js App Router
│   ├── api/              # Backend API routes
│   ├── dashboard/        # User dashboard
│   ├── register/         # Domain registration
│   └── search/           # Domain search
├── components/           # React components
│   ├── Navbar.tsx
│   ├── DomainSearch.tsx
│   └── DualWalletConnect.tsx
├── lib/                  # Utilities
│   ├── wagmi.ts         # EVM wallet config
│   ├── solana.ts        # Solana wallet config
│   └── blockchain.ts    # Blockchain interactions
├── contracts/           # Smart contracts
│   ├── DomainRegistry.sol
│   └── ABIs/
└── public/              # Static assets
```

## 🐛 Known Issues & Warnings

### "indexedDB is not defined" during build

**This is expected and harmless!** 

- Occurs during Next.js static page generation
- Build still completes successfully
- Application works perfectly at runtime
- Detailed explanation: [CONSOLE_WARNINGS.md](./CONSOLE_WARNINGS.md)

### Wallet adapter warnings

Some console warnings from wallet adapters are normal. See [CONSOLE_WARNINGS.md](./CONSOLE_WARNINGS.md) for details.

## 🔐 Security

- ✅ No private keys in code
- ✅ Environment variables for sensitive data
- ✅ Smart contract validation
- ✅ Input sanitization
- ✅ CORS properly configured

**Full security guide**: [SECURITY.md](./SECURITY.md)

## 🤝 Contributing

Contributions welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the MIT License.

## 💰 Deployment Costs

### Platform Deployment (Vercel)
- **Free tier** works great for most projects
- Upgrade to Pro ($20/month) only if needed

### Smart Contract Deployment (One-time)
- **Polygon**: ~$0.05
- **BSC**: ~$1.00
- **Arbitrum**: ~$2.00
- **Solana**: ~$5.00
- **Ethereum**: ~$50-100 (not recommended)

**No ongoing costs** - users pay gas for their own transactions

## 🆘 Need Help?

1. **Quick answers**: Check [QUICK_DEPLOY.md](./QUICK_DEPLOY.md)
2. **Technical details**: See [ARCHITECTURE.md](./ARCHITECTURE.md)
3. **Mobile wallets**: Read [MOBILE_WALLET_GUIDE.md](./MOBILE_WALLET_GUIDE.md)
4. **Issues**: Open a GitHub issue

## 🌟 Features

- ✅ Unlimited domain extensions
- ✅ Dual chain support (Solana + EVM)
- ✅ Mobile wallet integration
- ✅ Lifetime ownership (no renewals)
- ✅ Multi-chain deployment
- ✅ Beautiful UI with Tailwind CSS
- ✅ TypeScript for type safety
- ✅ Demo mode for testing
- ✅ Production-ready smart contracts

## 🚀 Roadmap

- [ ] ENS integration
- [ ] Domain marketplace
- [ ] Subdomain support
- [ ] DNS integration
- [ ] IPFS content hosting

---

**Made with ❤️ for the Web3 community**

**Deploy now**: [Quick Deploy Guide](./QUICK_DEPLOY.md) | **Star us on GitHub!** ⭐
