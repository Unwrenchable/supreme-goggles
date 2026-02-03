# AtomicFizzCaps Universal Naming Service 🌐

The **truly unlimited Web3 naming hub** - register ANY extension you want! Choose from 15+ preset chains or create your own .anything extension. All with **lifetime ownership** - pay once, own forever.

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-38B2AC?style=flat-square&logo=tailwind-css)

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

#### AtomicFizzCaps Official
- **`.fizz`** - Official AtomicFizzCaps identity (flagship)
- **`.atomic`** - Premium AtomicFizzCaps identity

#### Major Blockchain Naming Services
- **`.eth`** - Ethereum Name Service (ENS)
- **`.sol`** - Solana Name Service
- **`.bnb`** - BNB Chain domains
- **`.arb`** - Arbitrum domains
- **`.op`** - Optimism domains
- **`.poly`** - Polygon domains
- **`.avax`** - Avalanche domains
- **`.ftm`** - Fantom domains

#### Web3 Standards
- **`.crypto`** - Unstoppable Domains
- **`.nft`** - NFT identity domains
- **`.dao`** - DAO organization domains
- **`.web3`** - Generic Web3 domains
- **`.blockchain`** - Blockchain domains

### ✨ Custom Extensions (Unlimited Possibilities)

**The game changer:** Register literally ANY extension you can imagine!

Examples of custom extensions you could pioneer:
- `.myname` - Your personal brand
- `.cool` - For cool projects
- `.gaming` - Gaming communities
- `.music` - Music artists
- `.art` - Art collectives
- `.defi` - DeFi protocols
- `.launch` - New projects
- `.community` - Communities
- `.brand` - Brand protection
- **Literally anything!**

You're not limited - if you can think it, you can register it!

## 🌟 Why Lifetime Ownership?

Unlike traditional DNS services (like GoDaddy) or even some Web3 naming services that require renewals, AtomicFizzCaps SNS names are **permanent**:
- ✅ **Pay once, own forever** - No recurring fees
- ✅ **No expiration dates** - Your identity never expires
- ✅ **True decentralization** - Stored permanently on the blockchain
- ✅ **Full control** - Transfer or sell anytime without time pressure

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- A WalletConnect Project ID (free from [cloud.walletconnect.com](https://cloud.walletconnect.com/))

### Installation

1. **Clone and install dependencies:**

\`\`\`bash
cd /home/runner/work/supreme-goggles/supreme-goggles
npm install
\`\`\`

2. **Set up environment variables:**

\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit `.env.local` and add your WalletConnect Project ID:
\`\`\`
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
\`\`\`

3. **Run the development server:**

\`\`\`bash
npm run dev
\`\`\`

4. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

\`\`\`
supreme-goggles/
├── app/                      # Next.js 14 App Router
│   ├── layout.tsx           # Root layout with Web3 providers
│   ├── page.tsx             # Landing page
│   ├── search/              # Domain search results
│   ├── register/            # Domain registration
│   ├── dashboard/           # User dashboard
│   └── manage/[domain]/     # Domain management
├── components/              # Reusable React components
│   ├── Navbar.tsx          # Navigation with wallet connect
│   ├── DomainSearch.tsx    # Search bar component
│   ├── DomainCard.tsx      # Domain display card
│   └── Footer.tsx          # Footer component
├── lib/                     # Utilities and configs
│   ├── wagmi.ts            # Wagmi/RainbowKit config
│   ├── contract.ts         # Contract utilities
│   └── mockData.ts         # Mock data for demo
└── contracts/               # Smart contract ABIs
    └── DomainRegistry.json # Domain registry ABI
\`\`\`

## 🎨 Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Web3 Integration:**
  - [wagmi](https://wagmi.sh/) - React Hooks for Ethereum
  - [viem](https://viem.sh/) - TypeScript Interface for Ethereum
  - [RainbowKit](https://www.rainbowkit.com/) - Wallet Connection UI
  - [ethers.js](https://docs.ethers.org/) - Ethereum Library
- **State Management:** TanStack Query (React Query)

## 🎯 Key Features Explained

### Domain Search
Search for available .web3 or .atom domains with instant availability checking. See pricing based on domain length and registration period.

### Registration Flow
1. Search for your desired identity name
2. Choose from 15+ preset extensions OR type ANY custom .extension
3. Check availability - be the first for new extensions!
4. Connect wallet
5. Complete one-time payment transaction
6. Your identity appears in dashboard with lifetime ownership

### Identity Management
- Link wallet addresses to your name
- Set IPFS content hashes for decentralized websites
- Connect social media accounts
- Configure custom records
- Transfer name ownership (no expiry pressure!)
- Permanent ownership with no renewals

## 🔌 Smart Contract Integration

The platform includes a complete SNS Registry smart contract ABI with the following functions:

- `registerDomain(domain)` - Register a new identity with lifetime ownership
- `checkAvailability(domain)` - Check if name is available
- `getDomainInfo(domain)` - Get name ownership and registration date
- `setRecord(domain, recordType, value)` - Update identity records
- `getRecord(domain, recordType)` - Retrieve identity records
- `getUserDomains(owner)` - Get all names owned by an address
- `transferDomain(domain, newOwner)` - Transfer name to new owner

## 🎨 Branding

The platform uses the atomicfizzcaps.xyz official branding:
- Purple (#8b5cf6) to Blue (#3b82f6) gradients
- Dark theme with glassmorphism effects
- Modern, clean typography
- Responsive design for all devices

## 🚀 The Future of Universal Web3 Identity

AtomicFizzCaps Universal Naming Service is built for the future:
- **Truly Universal** - Support for ALL major blockchain naming services
- **AtomicFizzCaps Ecosystem** - Official home of .fizz and .atomic
- **Continuously Expanding** - New chains and extensions added as they launch
- **Community-Driven** - Shaped by the atomicfizzcaps.xyz community
- **Future-Proof** - One platform for your entire Web3 identity, forever

## 🌍 Why AtomicFizzCaps?

1. **Truly Unlimited** - ONLY platform supporting custom extensions - register .anything!
2. **One Platform, Everything** - Popular chains AND custom extensions in one place
3. **Lifetime Ownership** - Pay once, own forever - no renewal fees ever
4. **Unified Management** - Manage all identities (.fizz, .eth, .yourextension) in one dashboard
5. **First Mover Advantage** - Be the first to register entire new extension categories
6. **Future-Proof Forever** - Supports extensions that don't even exist yet!

## 🧪 Demo Mode

The app currently runs with mock data for demonstration. To connect to a real smart contract:

1. Deploy the Domain Registry contract to your chosen network
2. Update `NEXT_PUBLIC_CONTRACT_ADDRESS` in `.env.local`
3. Update chain configuration in `lib/wagmi.ts`
4. Remove mock data from components

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect Cloud Project ID | Yes |
| `NEXT_PUBLIC_CONTRACT_ADDRESS` | Domain Registry contract address | Yes |

## 🚢 Deployment

### Deploy to Vercel

\`\`\`bash
npm run build
vercel deploy
\`\`\`

Don't forget to set environment variables in your Vercel project settings!

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

MIT License - feel free to use this project for your own Web3 domain platform!

## 🔗 Links

- **Website:** atomicfizzcaps.xyz
- **Documentation:** Coming soon
- **Discord:** Coming soon

---

Built with ❤️ for the Web3 community
