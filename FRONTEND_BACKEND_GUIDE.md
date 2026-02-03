# Frontend & Backend Quick Reference Guide

## Quick Answer: Do I Have a Frontend AND Backend?

**YES!** ✅ This AtomicFizzCaps application is a complete **full-stack Web3 application** built with Next.js 14. You have:

### ✅ Frontend (Client-Side)
- **Location**: `/app` and `/components` directories
- **Technology**: React 19 + Next.js 14 + TypeScript + Tailwind CSS
- **Purpose**: User interface, wallet connections, and interactions

### ✅ Backend (Server-Side)
- **Location**: `/app/api` and `/lib` directories
- **Technology**: Next.js API Routes + Server Components
- **Purpose**: Business logic, API endpoints, and server-side operations

### ✅ Smart Contracts (Blockchain)
- **Location**: `/contracts` directory
- **Technology**: Solidity smart contracts on multiple blockchains
- **Purpose**: Decentralized domain registration and ownership

## Understanding the Architecture

```
┌─────────────┐
│   FRONTEND  │  React UI in /app and /components
│  (Browser)  │  Users interact with this
└─────────────┘
       ↕
┌─────────────┐
│   BACKEND   │  Next.js Server in /app/api and /lib
│  (Server)   │  Your hosting (Vercel, VPS, etc.)
└─────────────┘
       ↕
┌─────────────┐
│  BLOCKCHAIN │  Smart contracts in /contracts
│ (On-Chain)  │  Deployed on Ethereum, Polygon, etc.
└─────────────┘
```

## What You Currently Have

### Frontend Components (/components)
```
components/
├── Navbar.tsx          - Navigation with wallet connect button
├── DomainSearch.tsx    - Domain search form
├── DomainCard.tsx      - Display registered domains
├── Footer.tsx          - Footer component
└── WalletQRInfo.tsx    - QR code for mobile wallets
```

### Frontend Pages (/app)
```
app/
├── page.tsx           - Homepage / Landing page
├── search/            - Domain search results page
├── register/          - Domain registration flow
├── dashboard/         - User's registered domains
└── manage/[domain]/   - Manage specific domain
```

### Backend API Routes (/app/api)
```
app/api/
├── domains/
│   └── check/         - Check domain availability (GET/POST)
└── health/            - Health check endpoint
```

### Backend Utilities (/lib)
```
lib/
├── wagmi.ts           - Web3 wallet configuration
├── contract.ts        - Smart contract addresses & config
├── blockchain.ts      - Blockchain transaction functions
└── mockData.ts        - Demo data for development
```

### Smart Contracts (/contracts)
```
contracts/
├── DomainRegistry.json           - Contract ABI (interface)
└── DomainRegistryExample.sol     - Solidity source code
```

## How to Use Each Layer

### Using the Frontend
Users access your frontend at your deployed URL (e.g., `yourplatform.com`):
```
1. User visits yourplatform.com
2. React pages load in browser
3. User searches for domains
4. User connects wallet (MetaMask, etc.)
5. User registers a domain
```

### Using the Backend API
Your backend provides REST API endpoints that can be called from:
- Frontend (internal calls)
- External applications
- Mobile apps
- Third-party integrations

**Example API Calls:**

```bash
# Check if domain is available (GET)
curl "https://yourplatform.com/api/domains/check?domain=myname&extension=.fizz"

# Check if domain is available (POST)
curl -X POST https://yourplatform.com/api/domains/check \
  -H "Content-Type: application/json" \
  -d '{"domain":"myname","extension":".fizz"}'

# Health check
curl https://yourplatform.com/api/health
```

**Example Frontend Usage:**

```typescript
// In your React component
const checkAvailability = async (domain: string, extension: string) => {
  const response = await fetch('/api/domains/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ domain, extension })
  });
  
  const data = await response.json();
  return data.available;
};
```

### Using Smart Contracts
Your smart contracts are deployed on blockchains and handle:
- Domain registration
- Payment collection
- Ownership verification
- Domain transfers

**Example from Frontend:**

```typescript
// In your React component with wagmi
import { useWriteContract } from 'wagmi';

const { writeContract } = useWriteContract();

const registerDomain = async () => {
  await writeContract({
    address: CONTRACT_ADDRESS,
    abi: DomainRegistryABI,
    functionName: 'registerDomain',
    args: ['myname.fizz', '.fizz'],
    value: parseEther('0.01') // Payment amount
  });
};
```

## Common Operations

### Frontend Development
```bash
# Run development server
npm run dev

# Access at http://localhost:3000
# Changes auto-reload in browser
```

### Backend Development
```bash
# API routes are automatically available when dev server runs
npm run dev

# Test API endpoints
curl http://localhost:3000/api/health
curl http://localhost:3000/api/domains/check?domain=test&extension=.fizz
```

### Full-Stack Deployment
```bash
# Build everything (frontend + backend)
npm run build

# Start production server
npm start

# Or deploy to Vercel (automatic)
vercel deploy
```

## Adding New Features

### Add a New Frontend Page
1. Create file in `/app/new-page/page.tsx`
2. Write your React component
3. Automatically available at `/new-page`

```typescript
// app/new-page/page.tsx
export default function NewPage() {
  return <h1>New Page</h1>;
}
```

### Add a New Backend API Endpoint
1. Create file in `/app/api/new-endpoint/route.ts`
2. Export GET/POST/PUT/DELETE functions
3. Automatically available at `/api/new-endpoint`

```typescript
// app/api/new-endpoint/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello from backend!' });
}
```

### Add Backend Logic
1. Create utility file in `/lib/my-utility.ts`
2. Export functions for reuse
3. Import in API routes or components

```typescript
// lib/my-utility.ts
export function calculatePrice(domainLength: number): number {
  return domainLength < 5 ? 0.05 : 0.01;
}
```

## Environment Variables

### Frontend Variables (Exposed to Browser)
Prefix with `NEXT_PUBLIC_`:
```bash
# .env.local
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_CONTRACT_ADDRESS=0x1234...
```

### Backend Variables (Server-Only)
No prefix needed:
```bash
# .env.local
DATABASE_URL=postgresql://...
API_SECRET_KEY=secret123
STRIPE_SECRET_KEY=sk_test_...
```

**Important**: Only `NEXT_PUBLIC_` variables are accessible in the browser. Regular variables are server-only (secure).

## Testing

### Test Frontend
1. Start dev server: `npm run dev`
2. Open browser: `http://localhost:3000`
3. Test UI interactions, wallet connections, etc.

### Test Backend APIs
```bash
# Start server
npm run dev

# Test in another terminal
curl http://localhost:3000/api/health
curl -X POST http://localhost:3000/api/domains/check \
  -H "Content-Type: application/json" \
  -d '{"domain":"test","extension":".fizz"}'
```

### Test Smart Contracts
1. Deploy contract to testnet (Sepolia, Mumbai, etc.)
2. Update `.env.local` with contract address
3. Test registration flow through frontend

## Common Questions

### Q: Where do I write backend code?
**A**: In `/app/api/` for API endpoints, or `/lib/` for reusable utilities.

### Q: Can the backend access a database?
**A**: Yes! Add Prisma, MongoDB, or any database. See [ARCHITECTURE.md](./ARCHITECTURE.md) for examples.

### Q: Do I need a separate backend server?
**A**: No! Next.js IS your backend. When you deploy Next.js, you deploy both frontend and backend together.

### Q: Can I use this as a REST API only?
**A**: Yes! Other apps can call your `/api/*` endpoints. You can disable the frontend if needed.

### Q: How does the blockchain fit in?
**A**: Your backend calls smart contracts using libraries like ethers.js or viem. The contracts run on blockchains (Ethereum, Polygon, etc.).

### Q: Where do payments go?
**A**: Payments go directly to your wallet address configured in the smart contract. Your backend monitors the transactions.

## File Organization Summary

```
Frontend Files:
- /app/**/*.tsx              (Pages)
- /components/**/*.tsx       (UI Components)
- /app/globals.css          (Styles)

Backend Files:
- /app/api/**/*.ts          (API Routes)
- /lib/**/*.ts              (Utilities & Logic)

Shared Files:
- /contracts/**/*.json      (Smart Contract ABIs)
- /contracts/**/*.sol       (Solidity Source)

Configuration:
- .env.local                (Environment Variables)
- next.config.ts            (Next.js Config)
- tsconfig.json             (TypeScript Config)
- package.json              (Dependencies)
```

## Need More Details?

- **Architecture Deep Dive**: See [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Deployment Guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Payment Setup**: See [PAYMENTS.md](./PAYMENTS.md)
- **Quick Start**: See [QUICKSTART.md](./QUICKSTART.md)

## Summary

✅ **Frontend**: React UI in `/app` and `/components` - what users see  
✅ **Backend**: API routes in `/app/api` and logic in `/lib` - server-side code  
✅ **Blockchain**: Smart contracts in `/contracts` - deployed on blockchains  

**You have a complete full-stack Web3 application!** 🎉

Everything works together in a single Next.js codebase, deployed as one unified application.

---

Built with ❤️ for the Web3 community
