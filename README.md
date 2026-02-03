# AtomicFizzCaps Universal Naming Service 🌐

A **Web3 naming platform** supporting **Solana and EVM chains** - Register ANY domain extension you want with lifetime ownership!

![Next.js](https://img.shields.io/badge/Next.js-16+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript)
![Solana](https://img.shields.io/badge/Solana-Supported-9945FF?style=flat-square&logo=solana)

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

```
supreme-goggles/
├── app/                         # Next.js App Router
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Landing page
│   ├── search/                 # Domain search
│   ├── register/               # Domain registration
│   ├── dashboard/              # User dashboard
│   └── manage/[domain]/        # Domain management
├── components/                  # React components
│   ├── Navbar.tsx              # Navigation with dual wallet
│   ├── DualWalletConnect.tsx   # Solana/EVM wallet toggle
│   └── SolanaWalletProvider.tsx # Solana wallet context
├── lib/                         # Utilities and configs
│   ├── wagmi.ts                # EVM wallet config
│   ├── solana.ts               # Solana wallet config
│   ├── blockchain.ts           # Blockchain interactions
│   ├── contract.ts             # Contract utilities
│   └── mockData.ts             # Demo data
└── contracts/                   # Smart contract ABIs
    └── DomainRegistry.json     # Domain registry ABI
```

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

## 💰 Smart Contracts

This is **YOUR naming service platform**. You need to:

1. **Deploy DomainRegistry contracts** on each blockchain
2. **Configure contract addresses** in `.env.local`
3. **Set payment recipient** to your wallet address
4. **Collect payments** when users register domains

### Deployment Costs (Estimates)
- Polygon: ~$0.05
- BSC: ~$1
- Avalanche: ~$2
- Ethereum: ~$50-100 (use L2s instead)
- Solana: ~0.05 SOL

See `contracts/DomainRegistryExample.sol` for reference contract.

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

## 📄 License

MIT License - Use for your own Web3 naming platform!

## 🔗 Links

- **Website:** atomicfizzcaps.xyz
- **GitHub:** [Unwrenchable/supreme-goggles](https://github.com/Unwrenchable/supreme-goggles)

---

Built with ❤️ for the Web3 community
