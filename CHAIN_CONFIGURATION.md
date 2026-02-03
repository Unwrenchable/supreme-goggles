# 🔧 Adding New Blockchain Networks - Developer Guide

This guide shows you how to easily add support for new blockchain networks to the AtomicFizzCaps Universal Naming Service platform. The architecture is designed for scalability - adding a new chain requires updating just 4 files.

---

## 🎯 Quick Overview

To add a new blockchain network, you need to:

1. **Add environment variable** for contract address (`.env.example`)
2. **Update contract configuration** (`lib/contract.ts`)
3. **Add Wagmi chain support** (`lib/wagmi.ts`)
4. **Update blockchain utilities** (`lib/blockchain.ts`)

Total time: ~15-30 minutes per chain

---

## 📋 Step-by-Step Guide

### Step 1: Add Environment Variable

**File:** `.env.example`

Add your new chain's contract address variable:

```bash
# Example: Adding Celo support
NEXT_PUBLIC_CELO_CONTRACT_ADDRESS=

# Pattern: NEXT_PUBLIC_{CHAIN_NAME}_CONTRACT_ADDRESS
```

**Location:** Add it in the appropriate section (Ethereum L2s, Other EVM Chains, etc.)

---

### Step 2: Update Contract Configuration

**File:** `lib/contract.ts`

#### 2a. Add Contract Address Mapping

Find the `CONTRACT_ADDRESSES` object and add your chain:

```typescript
export const CONTRACT_ADDRESSES = {
  // Ethereum Mainnet & L2s
  ethereum: process.env.NEXT_PUBLIC_ETHEREUM_CONTRACT_ADDRESS || '',
  arbitrum: process.env.NEXT_PUBLIC_ARBITRUM_CONTRACT_ADDRESS || '',
  // ... existing chains ...
  
  // Add your new chain here
  celo: process.env.NEXT_PUBLIC_CELO_CONTRACT_ADDRESS || '',
} as const;
```

#### 2b. Add Extension Mapping (if adding new extension)

If your chain has a specific domain extension (like `.celo`), add it to `getChainForExtension`:

```typescript
export const getChainForExtension = (extension: string): string => {
  const extensionMap: Record<string, string> = {
    '.fizz': 'solana',
    '.eth': 'ethereum',
    // ... existing extensions ...
    
    // Add your new extension
    '.celo': 'celo',
  };
  
  return extensionMap[extension] || 'ethereum';
};
```

#### 2c. Add Domain Extension (optional)

If you want a preset extension for quick selection:

```typescript
export const DOMAIN_EXTENSIONS = [
  '.fizz',
  '.eth',
  // ... existing extensions ...
  '.celo',  // Add your new extension
] as const;
```

#### 2d. Add Extension Info

Add display information for your chain:

```typescript
export const EXTENSION_INFO: Record<string, { 
  name: string; 
  chain: string; 
  description: string;
  currency: string;
  currencySymbol: string;
}> = {
  '.fizz': { /* ... */ },
  // ... existing extensions ...
  
  // Add your new chain info
  '.celo': { 
    name: 'CELO', 
    chain: 'Celo', 
    description: 'Celo mobile-first blockchain', 
    currency: 'CELO', 
    currencySymbol: 'CELO' 
  },
};
```

#### 2e. Add Currency Rate (optional)

For USD conversion in the UI:

```typescript
export const getCurrencyUSDRate = (currency: string): number => {
  const rates: Record<string, number> = {
    'ETH': 3000,
    'SOL': 100,
    // ... existing rates ...
    'CELO': 0.60,  // Add your currency rate
  };
  return rates[currency] || 3000;
};
```

---

### Step 3: Add Wagmi Chain Support

**File:** `lib/wagmi.ts`

#### 3a. Import the Chain

At the top of the file, import your chain from `wagmi/chains`:

```typescript
import { 
  mainnet, 
  polygon, 
  // ... existing imports ...
  celo,  // Add your chain import
} from 'wagmi/chains';
```

**Note:** Check [wagmi.sh/react/chains](https://wagmi.sh/react/chains) for available chains.

#### 3b. Add to Chains Array

Add your chain to the Wagmi configuration:

```typescript
export const config = getDefaultConfig({
  appName: 'AtomicFizzCaps Domain Registry',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: [
    mainnet,
    polygon,
    // ... existing chains ...
    celo,  // Add your new chain
  ],
  ssr: true,
});
```

---

### Step 4: Update Blockchain Utilities

**File:** `lib/blockchain.ts`

#### 4a. Add Block Explorer URL

Add your chain's block explorer:

```typescript
const getBlockExplorerUrl = (txHash: string, chain: string): string => {
  const explorers: Record<string, string> = {
    ethereum: `https://etherscan.io/tx/${txHash}`,
    polygon: `https://polygonscan.com/tx/${txHash}`,
    // ... existing explorers ...
    celo: `https://celoscan.io/tx/${txHash}`,  // Add your explorer
  };
  
  return explorers[chain] || `https://etherscan.io/tx/${txHash}`;
};
```

#### 4b. Add Chain ID

Add your chain's numeric ID:

```typescript
export const getChainIdForChain = (chainName: string): number => {
  const chainIds: Record<string, number> = {
    ethereum: 1,
    polygon: 137,
    // ... existing chain IDs ...
    celo: 42220,  // Add your chain ID
  };
  
  return chainIds[chainName] || 1;
};
```

**Where to find Chain IDs:** Check [chainlist.org](https://chainlist.org/)

---

## 📝 Complete Example: Adding Gnosis Chain

Here's a complete example showing all changes needed to add Gnosis Chain support:

### 1. `.env.example`
```bash
# Gnosis Chain
NEXT_PUBLIC_GNOSIS_CONTRACT_ADDRESS=
```

### 2. `lib/contract.ts`
```typescript
// Add to CONTRACT_ADDRESSES
export const CONTRACT_ADDRESSES = {
  // ... existing chains ...
  gnosis: process.env.NEXT_PUBLIC_GNOSIS_CONTRACT_ADDRESS || '',
} as const;

// Add to extension mapping (if using .gno extension)
export const getChainForExtension = (extension: string): string => {
  const extensionMap: Record<string, string> = {
    // ... existing mappings ...
    '.gno': 'gnosis',
  };
  return extensionMap[extension] || 'ethereum';
};

// Add to DOMAIN_EXTENSIONS
export const DOMAIN_EXTENSIONS = [
  // ... existing extensions ...
  '.gno',
] as const;

// Add to EXTENSION_INFO
export const EXTENSION_INFO = {
  // ... existing info ...
  '.gno': { 
    name: 'GNO', 
    chain: 'Gnosis', 
    description: 'Gnosis Chain domains', 
    currency: 'xDAI', 
    currencySymbol: 'xDAI' 
  },
};

// Add to currency rates
export const getCurrencyUSDRate = (currency: string): number => {
  const rates: Record<string, number> = {
    // ... existing rates ...
    'xDAI': 1.00,  // Stable coin pegged to USD
  };
  return rates[currency] || 3000;
};
```

### 3. `lib/wagmi.ts`
```typescript
import { 
  mainnet,
  // ... other imports ...
  gnosis,  // Add import
} from 'wagmi/chains';

export const config = getDefaultConfig({
  // ... config ...
  chains: [
    mainnet,
    // ... other chains ...
    gnosis,  // Add to array
  ],
  ssr: true,
});
```

### 4. `lib/blockchain.ts`
```typescript
// Add block explorer
const getBlockExplorerUrl = (txHash: string, chain: string): string => {
  const explorers: Record<string, string> = {
    // ... existing explorers ...
    gnosis: `https://gnosisscan.io/tx/${txHash}`,
  };
  return explorers[chain] || `https://etherscan.io/tx/${txHash}`;
};

// Add chain ID
export const getChainIdForChain = (chainName: string): number => {
  const chainIds: Record<string, number> = {
    // ... existing IDs ...
    gnosis: 100,
  };
  return chainIds[chainName] || 1;
};
```

### 5. Deploy Contract & Update .env.local
```bash
# Deploy DomainRegistry to Gnosis Chain
forge create DomainRegistry \
  --rpc-url https://rpc.gnosischain.com \
  --constructor-args YOUR_TREASURY_ADDRESS \
  --private-key YOUR_PRIVATE_KEY

# Add to .env.local
NEXT_PUBLIC_GNOSIS_CONTRACT_ADDRESS=0xYourDeployedContractAddress
```

**Done!** The platform now supports Gnosis Chain.

---

## 🧪 Testing Your New Chain

### 1. Add to Testnet First

Most chains have testnets. Add the testnet first:

```typescript
// Example: Adding Gnosis Chiado testnet
import { gnosisChiado } from 'wagmi/chains';

chains: [
  // ... mainnets ...
  gnosisChiado,  // Testnet
]
```

### 2. Get Testnet Tokens

Find the faucet for your testnet (usually on the chain's official docs).

### 3. Deploy to Testnet

```bash
forge create DomainRegistry \
  --rpc-url https://rpc.chiadochain.net \
  --constructor-args YOUR_TEST_TREASURY \
  --private-key YOUR_PRIVATE_KEY
```

### 4. Test All Features

- [ ] Connect wallet to new chain
- [ ] Register a domain
- [ ] Verify payment received
- [ ] Check domain appears in dashboard
- [ ] Transfer domain
- [ ] Update domain records

### 5. Deploy to Mainnet

Once everything works on testnet, deploy to mainnet.

---

## 🔍 Chain Information Resources

### Where to Find Chain Details

| Information | Resource |
|-------------|----------|
| **Chain IDs** | [chainlist.org](https://chainlist.org/) |
| **Wagmi Chains** | [wagmi.sh/react/chains](https://wagmi.sh/react/chains) |
| **RPC Endpoints** | Chain's official documentation |
| **Block Explorers** | Chain's official website |
| **Faucets (Testnet)** | Chain's official docs or ecosystem page |
| **Gas Prices** | Chain's block explorer |

### Example Chain Documentation

- **Polygon:** polygon.technology/developers
- **Arbitrum:** docs.arbitrum.io
- **Optimism:** docs.optimism.io
- **BSC:** docs.bnbchain.org

---

## 🚀 Adding Popular Chains

### Quick Reference for Common Chains

#### Celo
```typescript
// Chain ID: 42220
// RPC: https://forno.celo.org
// Explorer: https://celoscan.io
// Currency: CELO
```

#### zkSync Era
```typescript
// Chain ID: 324
// RPC: https://mainnet.era.zksync.io
// Explorer: https://explorer.zksync.io
// Currency: ETH
```

#### Linea
```typescript
// Chain ID: 59144
// RPC: https://rpc.linea.build
// Explorer: https://lineascan.build
// Currency: ETH
```

#### Scroll
```typescript
// Chain ID: 534352
// RPC: https://rpc.scroll.io
// Explorer: https://scrollscan.com
// Currency: ETH
```

#### Mantle
```typescript
// Chain ID: 5000
// RPC: https://rpc.mantle.xyz
// Explorer: https://explorer.mantle.xyz
// Currency: MNT
```

---

## 🎨 UI Considerations

### Extension Categories

If you want to organize extensions in the UI, update `EXTENSION_CATEGORIES`:

```typescript
export const EXTENSION_CATEGORIES = {
  atomicfizzcaps: ['.fizz', '.atomic'],
  ethereum: ['.eth', '.arb', '.op'],
  solana: ['.sol'],
  multichain: ['.bnb', '.poly', '.avax', '.ftm'],
  web3: ['.crypto', '.nft', '.dao', '.web3', '.blockchain'],
  
  // Add new category
  emerging: ['.celo', '.gno', '.zksync'],
} as const;
```

### Chain Icons (Optional)

You can add chain logos to `public/chains/` and reference them in your UI components.

---

## 🔒 Non-EVM Chains (Special Cases)

### Solana

Solana uses a different contract model (Rust-based):

1. Write contract in Rust using Anchor framework
2. Deploy using Solana CLI
3. Update `lib/contract.ts` with program address
4. Implement Solana-specific transaction logic

**Note:** Current codebase uses EVM-compatible chains. Solana requires separate implementation.

### Near Protocol

Near uses AssemblyScript or Rust:

1. Write contract in AssemblyScript/Rust
2. Deploy using Near CLI
3. Add Near-specific wallet integration
4. Implement Near-specific transaction logic

### Cosmos-based Chains

Cosmos chains use CosmWasm:

1. Write CosmWasm contract
2. Deploy using wasmd
3. Add Cosmos wallet support (Keplr)
4. Implement Cosmos-specific transaction logic

**Recommendation:** Focus on EVM chains first (much easier), add non-EVM chains later.

---

## 📊 Scalability Best Practices

### 1. Use Type-Safe Configuration

All chain configurations use TypeScript types:
```typescript
export const CONTRACT_ADDRESSES = {
  /* ... */
} as const;

// This gives you autocomplete and type checking
```

### 2. Centralize Chain Logic

All chain-specific logic is in these files:
- `lib/contract.ts` - Contract addresses and extensions
- `lib/wagmi.ts` - Wallet/chain connections
- `lib/blockchain.ts` - Blockchain interactions

### 3. Use Environment Variables

All contract addresses come from environment variables:
- Easy to update without code changes
- Different addresses for dev/staging/production
- Secure (not committed to git)

### 4. Graceful Fallbacks

The code handles missing configurations:
```typescript
return CONTRACT_ADDRESSES[chainKey] || '';  // Returns empty string if not configured
```

### 5. Mock Data Support

Demo mode works without any deployed contracts:
```typescript
if (!isProductionConfigured(extension)) {
  return checkMockAvailability(domainName, extension);
}
```

---

## 🐛 Troubleshooting

### Issue: "Chain not found in Wagmi config"

**Solution:** Make sure you imported and added the chain to `wagmi.ts`:
```typescript
import { yourChain } from 'wagmi/chains';
chains: [mainnet, yourChain]
```

### Issue: "RPC URL not working"

**Solution:** Check the chain's official docs for the correct RPC URL. Some require API keys.

### Issue: "Transaction fails on new chain"

**Solution:** 
1. Verify contract is deployed to that chain
2. Check contract address in `.env.local`
3. Ensure wallet is connected to correct network
4. Verify sufficient gas tokens

### Issue: "Block explorer link broken"

**Solution:** Check the explorer URL format for your chain. Some use `/tx/`, others use `/transaction/`.

---

## ✅ New Chain Checklist

Before marking a new chain as "production ready":

- [ ] Testnet deployed and tested
- [ ] All 4 files updated (`contract.ts`, `wagmi.ts`, `blockchain.ts`, `.env.example`)
- [ ] Contract deployed to mainnet
- [ ] Contract verified on block explorer
- [ ] Environment variable added to `.env.local`
- [ ] Wallet connects successfully
- [ ] Domain registration works
- [ ] Payment received in treasury
- [ ] Domain shows in dashboard
- [ ] Block explorer link works
- [ ] Extension info displays correctly
- [ ] Currency conversion works (if applicable)
- [ ] Documentation updated (README, deployment guides)

---

## 📚 Additional Resources

### Deployment Tools
- **Foundry:** [getfoundry.sh](https://getfoundry.sh/)
- **Hardhat:** [hardhat.org](https://hardhat.org/)
- **Remix:** [remix.ethereum.org](https://remix.ethereum.org/)

### Chain Directories
- **Chain List:** [chainlist.org](https://chainlist.org/)
- **L2Beat:** [l2beat.com](https://l2beat.com/)
- **DeFi Llama Chains:** [defillama.com/chains](https://defillama.com/chains)

### Wallet Support
- **Wagmi Chains:** [wagmi.sh/react/chains](https://wagmi.sh/react/chains)
- **RainbowKit:** [rainbowkit.com](https://www.rainbowkit.com/)
- **WalletConnect:** [walletconnect.com](https://walletconnect.com/)

---

## 🎯 Summary

Adding a new blockchain network is straightforward:

1. **4 files to update** - contract.ts, wagmi.ts, blockchain.ts, .env.example
2. **Deploy contract** - Use Foundry, Hardhat, or Remix
3. **Test thoroughly** - Start with testnet
4. **Update docs** - Keep deployment costs and guides current

The architecture is designed for scalability - you can add dozens of chains following this same pattern.

**Time per chain:** 15-30 minutes (excluding deployment time)

**Difficulty:** Easy (if you follow this guide)

---

**Need help adding a specific chain? Open an issue on GitHub with the chain name and we'll help you out!**
