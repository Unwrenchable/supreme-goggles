# AtomicFizzCaps Web3 Domain Platform 🌐

A modern, GoDaddy-style Web3 domain registration platform built for the atomicfizzcaps.xyz ecosystem. Register, manage, and customize blockchain domains with beautiful UI and seamless wallet integration.

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

- 🔍 **Domain Search** - Search for available .web3 and .atom domains
- 💰 **Registration** - Register domains with flexible pricing (1, 2, or 5 years)
- 🎨 **Modern UI** - Beautiful purple/blue gradient theme with glassmorphism
- 👛 **Wallet Integration** - Connect with RainbowKit (MetaMask, WalletConnect, etc.)
- 📊 **Dashboard** - Manage all your domains in one place
- ⚙️ **Domain Management** - Update DNS records, wallet addresses, IPFS hashes
- 🔗 **Multi-Chain** - Support for Ethereum, Polygon, Optimism, Arbitrum
- ⚡ **Fast & Responsive** - Built with Next.js 14 App Router

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
1. Search for a domain
2. Check availability
3. Select registration period (1, 2, or 5 years)
4. Connect wallet
5. Complete transaction
6. Domain appears in dashboard

### Domain Management
- Update wallet addresses
- Set IPFS content hashes
- Link social media accounts
- Configure DNS records
- Transfer domain ownership
- Renew registration

## 🔌 Smart Contract Integration

The platform includes a complete Domain Registry smart contract ABI with the following functions:

- `registerDomain(domain, duration)` - Register a new domain
- `checkAvailability(domain)` - Check if domain is available
- `getDomainInfo(domain)` - Get domain ownership and expiry
- `setRecord(domain, recordType, value)` - Update domain records
- `getRecord(domain, recordType)` - Retrieve domain records
- `getUserDomains(owner)` - Get all domains owned by an address

## 🎨 Branding

The platform uses the atomicfizzcaps.xyz branding with:
- Purple (#8b5cf6) to Blue (#3b82f6) gradients
- Dark theme with glassmorphism effects
- Modern, clean typography
- Responsive design for all devices

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
