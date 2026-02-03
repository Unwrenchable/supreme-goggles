# AtomicFizzCaps Universal Naming Service 🌐

The **official universal naming service hub** for Web3 identities across all blockchains. Built for the atomicfizzcaps.xyz ecosystem with **lifetime ownership** - pay once, own forever. No renewals, no expiration dates.

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-38B2AC?style=flat-square&logo=tailwind-css)

## 🎯 What is AtomicFizzCaps Universal Naming Service?

AtomicFizzCaps is the **one-stop hub for all Web3 identities** across every major blockchain. Register .fizz, .eth, .sol, .bnb, and 15+ other extensions - all from one platform, all with lifetime ownership.

### 🌟 Why Universal?

- **🔗 All Chains, One Platform** - Ethereum, Solana, BNB, Arbitrum, Optimism, Polygon, Avalanche, Fantom, and more
- **🏠 Official AtomicFizzCaps Hub** - Home of .fizz and .atomic extensions
- **💎 Lifetime Ownership** - Pay once, own forever - no renewals across ALL chains
- **🚀 Future-Proof** - New chains and extensions added as they emerge

## 🆔 Supported Naming Services

### AtomicFizzCaps Official (Primary)
- **`.fizz`** - Official AtomicFizzCaps identity (flagship extension)
- **`.atomic`** - Premium AtomicFizzCaps identity for projects & organizations

### Major Blockchain Naming Services
- **`.eth`** - Ethereum Name Service (ENS)
- **`.sol`** - Solana Name Service
- **`.bnb`** - BNB Chain domains
- **`.arb`** - Arbitrum domains
- **`.op`** - Optimism domains
- **`.poly`** - Polygon domains
- **`.avax`** - Avalanche domains
- **`.ftm`** - Fantom domains

### Additional Web3 Extensions
- **`.crypto`** - Unstoppable Domains
- **`.nft`** - NFT identity domains
- **`.dao`** - DAO organization domains
- **`.web3`** - Generic Web3 domains
- **`.blockchain`** - Blockchain domains

*More chains and extensions added regularly!*

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
2. Choose from 15+ extensions (.fizz, .eth, .sol, .bnb, etc.)
3. Check availability across all chains
4. Connect wallet
5. Complete one-time payment transaction
6. Your universal identity appears in dashboard with lifetime ownership

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

## 🌍 Why AtomicFizzCaps as Your Universal Hub?

1. **One Platform, All Chains** - No need to visit multiple sites for different naming services
2. **Lifetime Ownership Model** - Consistent pricing across all chains - pay once, own forever
3. **Unified Management** - Manage .fizz, .eth, .sol, and all your identities in one dashboard
4. **Official AtomicFizzCaps** - Home of the flagship .fizz and .atomic extensions
5. **Best Prices** - Competitive lifetime pricing without renewal fees

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
