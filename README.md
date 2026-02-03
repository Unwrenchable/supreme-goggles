# AtomicFizzCaps Universal Naming Service 🌐

The **truly unlimited Web3 naming hub** - register ANY extension you want! Choose from 15+ preset chains or create your own .anything extension. All with **lifetime ownership** - pay once, own forever.

> **🚀 Want to deploy your own instance? See [QUICKSTART.md](./QUICKSTART.md) for a 5-minute deployment guide!**
>
> **💰 What does deployment cost?** Check [DEPLOYMENT_COSTS.md](./DEPLOYMENT_COSTS.md) - Start with Polygon (~$0.05) or BSC (~$1)!

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-38B2AC?style=flat-square&logo=tailwind-css)

## 📚 Documentation Quick Links

| Guide | Description |
|-------|-------------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | **Full-stack architecture guide** - Frontend, Backend & Blockchain explained |
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

**Note about `NEXT_PUBLIC_` prefix:** This is a Next.js framework requirement. Variables with this prefix are accessible in the browser, which is necessary for wallet connections and blockchain interactions. Learn more in the `.env.example` file.

3. **Run the development server:**

\`\`\`bash
npm run dev
\`\`\`

4. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000)

### 📱 Mobile Wallet Connection

**Connect with QR Code:**
- Click "Connect Wallet" and select "WalletConnect"
- Scan the QR code with your mobile wallet app
- Approve the connection on your phone

**Supported Mobile Wallets (EVM Chains):** MetaMask Mobile, Trust Wallet, Rainbow, Coinbase Wallet, Phantom (EVM support), and 300+ WalletConnect-enabled wallets.

**Supported Networks:** Ethereum, Polygon, BSC, Arbitrum, Optimism, Base, Avalanche, Fantom

**Note:** Native Solana wallet connections are not yet supported. Phantom and other multi-chain wallets can connect via their EVM functionality.

📖 **See [MOBILE_WALLET_GUIDE.md](./MOBILE_WALLET_GUIDE.md) for detailed instructions and troubleshooting.**

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

The app currently runs with mock data for demonstration. To connect to a real smart contract and accept real payments:

### ⚠️ IMPORTANT: You Must Deploy Your Own Contracts

**This is YOUR naming service platform** - like creating your own GoDaddy or Namecheap for Web3 domains. You are NOT connecting to existing ENS (Ethereum Name Service) or Solana Name Service contracts. Instead:

- **YOU deploy your own DomainRegistry contracts** on each blockchain
- **YOU control the pricing and features** of your naming service
- **YOU receive the payments** when users register domains
- **YOU run your own competing naming service platform**

Think of it like this: ENS is one naming service, Unstoppable Domains is another, and this codebase lets you create YOUR OWN third option.

### Setup Steps:

1. **Deploy the Domain Registry contract** to your chosen network(s) - See `contracts/DomainRegistryExample.sol`
2. **Configure payment collection** - See [PAYMENTS.md](./PAYMENTS.md) for complete guide
3. Update `NEXT_PUBLIC_ETHEREUM_CONTRACT_ADDRESS` (or other chain) with YOUR deployed contract address in `.env.local`
4. Update `NEXT_PUBLIC_PAYMENT_RECIPIENT_ADDRESS` with your wallet address
5. Update chain configuration in `lib/wagmi.ts`
6. Integrate real blockchain transactions (replace mock alerts)

**💰 Deployment Costs**: See [DEPLOYMENT_COSTS.md](./DEPLOYMENT_COSTS.md) for estimated costs per blockchain (start with Polygon for ~$0.05!)

**💸 Payment Setup**: See [PAYMENTS.md](./PAYMENTS.md) for a complete guide on how to receive payments from domain registrations.

**🚀 Production Setup**: See [PRODUCTION_SETUP.md](./PRODUCTION_SETUP.md) for detailed contract deployment instructions.

**🔧 Adding New Chains**: See [CHAIN_CONFIGURATION.md](./CHAIN_CONFIGURATION.md) to learn how to easily add new blockchain networks.

## 📝 Environment Variables

Copy `.env.example` to `.env.local` and configure the following:

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect Cloud Project ID from [cloud.walletconnect.com](https://cloud.walletconnect.com/) | Yes | - |
| `NEXT_PUBLIC_CONTRACT_ADDRESS` | Domain Registry contract address | No | Uses mock data |
| `NEXT_PUBLIC_PAYMENT_RECIPIENT_ADDRESS` | **YOUR wallet address** where payments are sent | No | - |
| `NEXT_PUBLIC_NETWORK` | Blockchain network to connect to | No | mainnet |

**About the `NEXT_PUBLIC_` prefix:** All Web3-related variables in this project use the `NEXT_PUBLIC_` prefix because this is a Next.js framework requirement. Variables with this prefix are accessible to the client-side (browser) JavaScript code, which is necessary for Web3 wallet connections and smart contract interactions. See `.env.example` for more details.

**Payment Setup**: See [PAYMENTS.md](./PAYMENTS.md) for detailed payment collection configuration.

## 🚢 Deployment

**📖 See [DEPLOYMENT.md](./DEPLOYMENT.md) for the complete deployment guide with detailed instructions for all platforms.**

This Next.js application can be deployed to various platforms. You have multiple options depending on your needs and technical expertise.

### Understanding Web2 Hosting for Web3 Apps

**Important:** This Web3 naming service platform is a **Next.js web application** that needs to be hosted on traditional Web2 infrastructure (like Vercel, Netlify, or your own server). The Web3 part refers to the smart contracts and blockchain interactions, not the hosting.

**Here's how it works:**
1. **Deploy the web app** to a Web2 platform (Vercel, your own server, etc.)
2. **Access via your URL** (custom domain like `yourplatform.com` or provided subdomain)
3. **Users connect** their Web3 wallets through your hosted website
4. **Smart contracts** handle the blockchain/Web3 functionality

**You DO NOT need to "deploy to Web2 first then make your platform's new URL on the platform" - you simply:**
1. Deploy this Next.js app to any hosting provider
2. Configure your custom domain (optional)
3. Set up your smart contract addresses
4. Your platform is live!

### Option 1: Deploy to Vercel (Recommended - Easiest)

Vercel is the easiest way to deploy Next.js applications with zero configuration.

#### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Unwrenchable/supreme-goggles)

#### Manual Deploy

1. **Install Vercel CLI:**
   \`\`\`bash
   npm install -g vercel
   \`\`\`

2. **Build and deploy:**
   \`\`\`bash
   npm run build
   vercel deploy
   \`\`\`

3. **Set environment variables in Vercel dashboard:**
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add:
     - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
     - `NEXT_PUBLIC_CONTRACT_ADDRESS` (optional, uses mock data if not set)

4. **Redeploy after setting variables:**
   \`\`\`bash
   vercel deploy --prod
   \`\`\`

#### Using a Custom Domain with Vercel

1. Go to your Vercel project dashboard
2. Navigate to "Settings" → "Domains"
3. Add your custom domain (e.g., `yourplatform.com`)
4. Follow Vercel's instructions to update your DNS records
5. Your platform will be accessible at your custom domain!

**Vercel provides:** Free SSL, automatic deployments, serverless functions, and CDN.

### Option 2: Deploy to Netlify

Another excellent option for Next.js applications.

1. **Install Netlify CLI:**
   \`\`\`bash
   npm install -g netlify-cli
   \`\`\`

2. **Build and deploy:**
   \`\`\`bash
   npm run build
   netlify deploy --prod
   \`\`\`

3. **Set environment variables:**
   - Go to Site settings → Environment variables
   - Add your environment variables

4. **Custom domain:** Add in Site settings → Domain management

### Option 3: Self-Hosting (Your Own Server/VPS)

Deploy to your own server for complete control.

#### Requirements
- Node.js 18+ installed
- A server/VPS (DigitalOcean, AWS, etc.)
- Domain name (optional)
- SSL certificate (use Let's Encrypt with Certbot)

#### Steps

1. **Clone repository on your server:**
   \`\`\`bash
   git clone https://github.com/Unwrenchable/supreme-goggles.git
   cd supreme-goggles
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables:**
   \`\`\`bash
   cp .env.example .env.local
   # Edit .env.local with your values
   nano .env.local
   \`\`\`

4. **Build the application:**
   \`\`\`bash
   npm run build
   \`\`\`

5. **Start the production server:**
   \`\`\`bash
   npm start
   \`\`\`

   Or use PM2 for process management:
   \`\`\`bash
   npm install -g pm2
   pm2 start npm --name "supreme-goggles" -- start
   pm2 save
   pm2 startup
   \`\`\`

6. **Set up reverse proxy with Nginx:**
   \`\`\`nginx
   server {
       listen 80;
       server_name yourplatform.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   \`\`\`

7. **Set up SSL with Let's Encrypt:**
   \`\`\`bash
   sudo certbot --nginx -d yourplatform.com
   \`\`\`

### Option 4: Deploy to Other Platforms

This Next.js app can also be deployed to:
- **AWS Amplify:** Use the Amplify Console
- **Railway:** Connect your GitHub repo
- **Render:** Deploy with automatic deploys from GitHub
- **DigitalOcean App Platform:** One-click deployment
- **Heroku:** Use the Heroku CLI

### Custom Domain Configuration

**For any platform**, you can use your own custom domain:

1. **Purchase a domain** from any registrar (GoDaddy, Namecheap, Google Domains, etc.)
2. **Update DNS records** to point to your hosting platform:
   - For Vercel/Netlify: Follow their domain setup wizard
   - For self-hosted: Point A record to your server IP
3. **Wait for DNS propagation** (can take 24-48 hours)
4. **Your platform is live** at your custom domain!

### Environment Variables Configuration

After deployment, configure these required variables:

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect Cloud Project ID from [cloud.walletconnect.com](https://cloud.walletconnect.com/) | Yes | - |
| `NEXT_PUBLIC_CONTRACT_ADDRESS` | Domain Registry contract address | No | Uses mock data |
| `NEXT_PUBLIC_NETWORK` | Blockchain network (mainnet, sepolia, etc.) | No | mainnet |

### Connecting to Real Smart Contracts

To move from demo mode to production with real blockchain interactions:

1. **Deploy the Domain Registry contract** to your chosen blockchain network
2. **Update environment variables:**
   \`\`\`
   NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourContractAddress
   NEXT_PUBLIC_NETWORK=mainnet  # or your chosen network
   \`\`\`
3. **Update chain configuration** in `lib/wagmi.ts` if needed
4. **Redeploy** your application

### Troubleshooting Deployment

**Issue:** "Environment variables not working"
- **Solution:** Make sure you've set them in your platform's dashboard AND redeployed

**Issue:** "Wallet not connecting"
- **Solution:** Check your WalletConnect Project ID is valid and the app URL is added to allowed origins in WalletConnect Cloud

**Issue:** "Custom domain not working"
- **Solution:** Verify DNS records are correct and wait for propagation (up to 48 hours)

**Issue:** "Build failing"
- **Solution:** Ensure Node.js version is 18+ and all dependencies are installed correctly

**Issue:** "Contract interactions failing"
- **Solution:** Verify contract address and network configuration match your deployed contract

### Deployment Checklist

- [ ] Set up WalletConnect Project ID
- [ ] Configure environment variables
- [ ] Build application locally to test (`npm run build`)
- [ ] Deploy to chosen platform
- [ ] Configure custom domain (optional)
- [ ] Set environment variables in hosting platform
- [ ] Test wallet connection
- [ ] Test domain registration flow
- [ ] Set up SSL certificate (automatic on Vercel/Netlify)
- [ ] Monitor application logs for errors

### Need Help?

- Check the [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- Join our Discord (Coming soon)
- Open an issue on GitHub

## ❓ Frequently Asked Questions

### Can I deploy this on my own custom URL?

**Yes!** You can absolutely deploy this on your own custom domain like `yourplatform.com`. Here's how:

1. Deploy the application to any hosting platform (Vercel, Netlify, your own server, etc.)
2. Purchase a domain name from any registrar (GoDaddy, Namecheap, etc.)
3. Connect your custom domain to your hosting platform (all major platforms make this easy)
4. Your platform will be live at your custom URL!

See the [Deployment section](#-deployment) above for detailed instructions.

### Do I need to deploy to "Web 2" first?

**There's no two-step process!** When you deploy this Next.js application to ANY hosting platform (whether it's Vercel, Netlify, or your own server), you ARE deploying to Web2 infrastructure. That's the only deployment step needed for the frontend.

The Web3 part (blockchain interactions, smart contracts) happens automatically when users connect their wallets through your hosted website. You don't separately "deploy to Web3."

**Simple workflow:**
1. Deploy the web app to a hosting platform → This IS the "Web2" deployment
2. Users access your platform via your URL
3. Users connect Web3 wallets → Web3 functionality happens automatically
4. Done!

### What's the difference between the platform URL and domain names users register?

- **Your platform URL** (e.g., `yourplatform.com`): This is where you host THIS application - your Web3 naming service platform
- **User domain names** (e.g., `alice.fizz`, `bob.eth`): These are the Web3 identities users register THROUGH your platform

Your platform is the service that allows users to register and manage their Web3 names.

### Can I use the default Vercel/Netlify URL instead of buying a domain?

**Yes!** All hosting platforms provide free subdomains:
- Vercel: `your-app.vercel.app`
- Netlify: `your-app.netlify.app`
- Others: Similar patterns

You can launch with these free URLs and add a custom domain later whenever you want.

### Do I need a smart contract deployed to test the platform?

**No!** The platform includes mock data so you can test the full user experience without deploying any contracts. When you're ready for production, you can deploy the smart contract and update the environment variables.

### How much does deployment cost?

- **Vercel/Netlify:** Free tier available (sufficient for most projects)
- **Self-hosted:** Cost of your VPS ($5-20/month typically)
- **Custom domain:** $10-15/year (optional)
- **WalletConnect Project ID:** Free

### Can I deploy without Web3 functionality?

The application is designed as a Web3 naming platform, but you can deploy it and explore the UI/UX without connecting real smart contracts (it will use mock data). However, the core purpose is Web3 functionality.

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
