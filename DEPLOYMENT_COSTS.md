# 💰 Smart Contract Deployment Costs Guide

This guide provides estimated costs for deploying the DomainRegistry smart contract to each supported blockchain network. Start with the cheapest chains for testing, then expand to others as your business grows.

---

## 📊 Quick Reference: Chains Ranked by Cost (Cheapest First)

| Rank | Chain | Estimated Deployment Cost (USD) | Native Currency | Gas Cost | Best For |
|------|-------|--------------------------------|-----------------|----------|----------|
| 1 | **Polygon** | **$0.01 - $0.10** | MATIC | ~2-5M gas | ✅ **START HERE** - Production ready, very cheap |
| 2 | **BSC** | **$0.50 - $2** | BNB | ~2-5M gas | ✅ Great for production, low cost |
| 3 | **Avalanche** | **$1 - $5** | AVAX | ~2-5M gas | Good balance of cost/speed |
| 4 | **Fantom** | **$1 - $5** | FTM | ~2-5M gas | Cheap, fast, reliable |
| 5 | **Arbitrum** | **$2 - $10** | ETH | ~2-5M gas | L2, cheaper than Ethereum |
| 6 | **Optimism** | **$3 - $12** | ETH | ~2-5M gas | L2, cheaper than Ethereum |
| 7 | **Base** | **$2 - $10** | ETH | ~2-5M gas | Coinbase L2, growing ecosystem |
| 8 | **Ethereum** | **$50 - $300** | ETH | ~2-5M gas | Most expensive, but largest user base |
| 9 | **Solana** | **$0.10 - $1** | SOL | Varies | Cheap, but requires different contract (Rust) |

### 🏆 Recommended Deployment Strategy

**Phase 1 - Testing & Initial Launch ($2-10 total)**
1. Deploy to **Polygon** first (~$0.05)
2. Deploy to **BSC** second (~$1)
3. Test thoroughly with real users

**Phase 2 - Expand to Mid-Tier Chains ($10-30 total)**
4. Add **Avalanche** (~$2)
5. Add **Fantom** (~$2)
6. Add **Arbitrum** (~$5)

**Phase 3 - Premium Chains (Once Profitable)**
7. Add **Optimism** (~$8)
8. Add **Base** (~$5)
9. Add **Ethereum Mainnet** ($100-300) - only when you have significant demand

---

## 📋 Detailed Breakdown by Chain

### 1. Polygon (MATIC) - ✅ BEST STARTING POINT

**Why Start Here:**
- Extremely cheap deployment (<$0.10)
- Fast transactions (2-3 seconds)
- Large user base
- Production-ready and reliable
- Compatible with Ethereum tooling

**Deployment Cost Estimate:**
- Gas Needed: ~2-3 million gas
- Gas Price: ~30-100 gwei (varies)
- MATIC Price: ~$0.80
- **Total Cost: $0.01 - $0.10** ✅

**How to Deploy:**
```bash
# Using Hardhat
npx hardhat run scripts/deploy.js --network polygon

# Using Foundry
forge create DomainRegistry \
  --rpc-url https://polygon-rpc.com \
  --constructor-args YOUR_TREASURY_ADDRESS \
  --private-key YOUR_PRIVATE_KEY
```

**RPC Endpoints:**
- Public: https://polygon-rpc.com
- Alchemy: https://polygon-mainnet.g.alchemy.com/v2/YOUR-API-KEY
- Infura: https://polygon-mainnet.infura.io/v3/YOUR-API-KEY

**Block Explorer:**
- https://polygonscan.com

---

### 2. BSC (BNB Chain) - ✅ SECOND BEST OPTION

**Why Deploy Here:**
- Very cheap ($0.50-$2)
- Large user base in Asia
- Fast transactions
- Low transaction fees for users

**Deployment Cost Estimate:**
- Gas Needed: ~2-3 million gas
- Gas Price: ~5-10 gwei
- BNB Price: ~$300
- **Total Cost: $0.50 - $2** ✅

**How to Deploy:**
```bash
forge create DomainRegistry \
  --rpc-url https://bsc-dataseed1.binance.org \
  --constructor-args YOUR_TREASURY_ADDRESS \
  --private-key YOUR_PRIVATE_KEY
```

**RPC Endpoints:**
- Public: https://bsc-dataseed1.binance.org
- Official: https://bsc-dataseed.binance.org

**Block Explorer:**
- https://bscscan.com

---

### 3. Avalanche (AVAX)

**Why Deploy Here:**
- Relatively cheap ($1-$5)
- Very fast (sub-second finality)
- Growing DeFi ecosystem

**Deployment Cost Estimate:**
- Gas Needed: ~2-3 million gas
- Gas Price: ~25-50 nAVAX
- AVAX Price: ~$35
- **Total Cost: $1 - $5**

**How to Deploy:**
```bash
forge create DomainRegistry \
  --rpc-url https://api.avax.network/ext/bc/C/rpc \
  --constructor-args YOUR_TREASURY_ADDRESS \
  --private-key YOUR_PRIVATE_KEY
```

**RPC Endpoints:**
- Public: https://api.avax.network/ext/bc/C/rpc

**Block Explorer:**
- https://snowtrace.io

---

### 4. Fantom (FTM)

**Why Deploy Here:**
- Very cheap ($1-$5)
- Fast transactions
- Active DeFi community

**Deployment Cost Estimate:**
- Gas Needed: ~2-3 million gas
- Gas Price: ~100-300 gwei
- FTM Price: ~$0.50
- **Total Cost: $1 - $5**

**How to Deploy:**
```bash
forge create DomainRegistry \
  --rpc-url https://rpc.ftm.tools \
  --constructor-args YOUR_TREASURY_ADDRESS \
  --private-key YOUR_PRIVATE_KEY
```

**RPC Endpoints:**
- Public: https://rpc.ftm.tools
- Official: https://rpcapi.fantom.network

**Block Explorer:**
- https://ftmscan.com

---

### 5. Arbitrum (Layer 2)

**Why Deploy Here:**
- Cheaper than Ethereum ($2-$10)
- Ethereum-compatible
- Large L2 ecosystem
- Uses ETH for gas

**Deployment Cost Estimate:**
- Gas Needed: ~2-3 million gas
- Gas Price: ~0.1-0.5 gwei
- ETH Price: ~$3,000
- **Total Cost: $2 - $10**

**How to Deploy:**
```bash
forge create DomainRegistry \
  --rpc-url https://arb1.arbitrum.io/rpc \
  --constructor-args YOUR_TREASURY_ADDRESS \
  --private-key YOUR_PRIVATE_KEY
```

**RPC Endpoints:**
- Public: https://arb1.arbitrum.io/rpc
- Alchemy: https://arb-mainnet.g.alchemy.com/v2/YOUR-API-KEY

**Block Explorer:**
- https://arbiscan.io

---

### 6. Optimism (Layer 2)

**Why Deploy Here:**
- Cheaper than Ethereum ($3-$12)
- Ethereum-compatible
- Strong ecosystem
- Uses ETH for gas

**Deployment Cost Estimate:**
- Gas Needed: ~2-3 million gas
- Gas Price: ~0.1-0.5 gwei
- ETH Price: ~$3,000
- **Total Cost: $3 - $12**

**How to Deploy:**
```bash
forge create DomainRegistry \
  --rpc-url https://mainnet.optimism.io \
  --constructor-args YOUR_TREASURY_ADDRESS \
  --private-key YOUR_PRIVATE_KEY
```

**RPC Endpoints:**
- Public: https://mainnet.optimism.io
- Alchemy: https://opt-mainnet.g.alchemy.com/v2/YOUR-API-KEY

**Block Explorer:**
- https://optimistic.etherscan.io

---

### 7. Base (Coinbase Layer 2)

**Why Deploy Here:**
- Moderate cost ($2-$10)
- Backed by Coinbase
- Growing ecosystem
- Good for onboarding new users

**Deployment Cost Estimate:**
- Gas Needed: ~2-3 million gas
- Gas Price: ~0.1-0.5 gwei
- ETH Price: ~$3,000
- **Total Cost: $2 - $10**

**How to Deploy:**
```bash
forge create DomainRegistry \
  --rpc-url https://mainnet.base.org \
  --constructor-args YOUR_TREASURY_ADDRESS \
  --private-key YOUR_PRIVATE_KEY
```

**RPC Endpoints:**
- Public: https://mainnet.base.org
- Alchemy: https://base-mainnet.g.alchemy.com/v2/YOUR-API-KEY

**Block Explorer:**
- https://basescan.org

---

### 8. Ethereum Mainnet - ⚠️ DEPLOY LAST

**Why Wait:**
- VERY EXPENSIVE ($50-$300+)
- Only deploy when you have proven demand
- Most users are on L2s now
- Can always add later

**Deployment Cost Estimate:**
- Gas Needed: ~2-3 million gas
- Gas Price: ~20-100 gwei (varies wildly)
- ETH Price: ~$3,000
- **Total Cost: $50 - $300** ⚠️

**Cost During Different Conditions:**
- Low traffic (20 gwei): ~$60
- Normal traffic (50 gwei): ~$150
- High traffic (100 gwei): ~$300
- Extreme (200+ gwei): $600+

**How to Deploy:**
```bash
forge create DomainRegistry \
  --rpc-url https://eth-mainnet.g.alchemy.com/v2/YOUR-API-KEY \
  --constructor-args YOUR_TREASURY_ADDRESS \
  --private-key YOUR_PRIVATE_KEY
```

**RPC Endpoints:**
- Alchemy: https://eth-mainnet.g.alchemy.com/v2/YOUR-API-KEY
- Infura: https://mainnet.infura.io/v3/YOUR-API-KEY

**Block Explorer:**
- https://etherscan.io

---

### 9. Solana - Special Case

**Why Different:**
- Requires Rust-based contract (not Solidity)
- Different deployment process
- Very cheap ($0.10-$1)
- Fast and efficient

**Deployment Cost Estimate:**
- Rent Deposit: ~0.002-0.01 SOL
- Transaction Fees: ~0.00001 SOL
- SOL Price: ~$100
- **Total Cost: $0.10 - $1**

**Note:** The current DomainRegistry.sol contract is for EVM chains only. Solana requires a separate Rust implementation.

---

## 🧪 Testnet Deployment (FREE - Start Here!)

Before deploying to mainnet, ALWAYS test on testnets:

### Free Testnet Options

| Testnet | Chain | Get Free Tokens | Deployment Cost |
|---------|-------|-----------------|-----------------|
| **Sepolia** | Ethereum | [sepoliafaucet.com](https://sepoliafaucet.com) | FREE |
| **Mumbai** | Polygon | [faucet.polygon.technology](https://faucet.polygon.technology) | FREE |
| **BSC Testnet** | BSC | [testnet.bnbchain.org/faucet](https://testnet.bnbchain.org/faucet-smart) | FREE |
| **Fuji** | Avalanche | [faucet.avax.network](https://faucet.avax.network) | FREE |
| **Devnet** | Solana | `solana airdrop 2` | FREE |

**Testing Strategy:**
1. Deploy to Sepolia (Ethereum testnet) - FREE
2. Test all functionality thoroughly
3. Deploy to mainnet starting with Polygon
4. Gradually expand to other chains

---

## 💡 Cost-Saving Tips

### 1. Deploy During Off-Peak Hours
- Ethereum gas is cheaper on weekends and late nights (EST)
- Can save 30-50% on deployment costs

### 2. Use Optimized Solidity
- Current contract is already optimized
- ~220 lines, relatively simple
- Should cost 2-3 million gas on most chains

### 3. Batch Deployments
- Deploy to multiple cheap chains in one session
- Keep private keys loaded in your deployment tool

### 4. Use Testnet First
- Always test on testnet (FREE)
- Catch bugs before paying for mainnet deployment

### 5. Monitor Gas Prices
- Ethereum: https://etherscan.io/gastracker
- Polygon: https://polygonscan.com/gastracker
- BSC: https://bscscan.com/gastracker

### 6. Use Multi-Sig for Treasury
- Deploy with a Gnosis Safe address as treasury
- More secure for production
- Only slight increase in deployment cost

---

## 📈 Recommended Deployment Timeline

### Week 1: Testing ($0 total)
- Deploy to Sepolia testnet (FREE)
- Deploy to Mumbai testnet (FREE)
- Test all features thoroughly
- Fix any bugs found

### Week 2: Initial Launch ($2-3 total)
- Deploy to **Polygon** (~$0.05)
- Deploy to **BSC** (~$1)
- Launch with 2 chains
- Monitor user activity

### Month 2: First Expansion ($5-10 total)
- Add **Avalanche** (~$2)
- Add **Fantom** (~$2)
- Add **Arbitrum** (~$5)
- Now supporting 5 chains

### Month 3+: Premium Chains ($15-30 total)
- Add **Optimism** (~$8)
- Add **Base** (~$5)
- Now supporting 7 chains

### When Profitable: Ethereum
- Deploy to **Ethereum** ($100-300)
- Only after you have proven demand
- Premium positioning

---

## 🔧 Deployment Tools & Setup

### Option 1: Foundry (Recommended)

Install Foundry:
```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

Create deployment script:
```bash
# Save this as deploy.sh
#!/bin/bash

# Your treasury address (where payments go)
TREASURY="0xYourWalletAddress"

# Deploy to Polygon (cheap!)
forge create contracts/DomainRegistryExample.sol:DomainRegistry \
  --rpc-url https://polygon-rpc.com \
  --constructor-args $TREASURY \
  --private-key $PRIVATE_KEY
```

### Option 2: Hardhat

Install Hardhat:
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
```

Create hardhat.config.js:
```javascript
module.exports = {
  networks: {
    polygon: {
      url: "https://polygon-rpc.com",
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
```

### Option 3: Remix IDE (Easiest for Beginners)

1. Go to https://remix.ethereum.org
2. Copy DomainRegistryExample.sol into Remix
3. Compile (Solidity 0.8.0+)
4. Connect MetaMask to desired network
5. Deploy with your treasury address
6. Copy deployed contract address

---

## 📊 Total Cost Estimates by Strategy

### Conservative Strategy (Start Small)
- Polygon + BSC: **$1-3 total**
- Perfect for testing with real users
- Can handle thousands of registrations

### Balanced Strategy (Multi-Chain)
- Polygon + BSC + Avalanche + Fantom + Arbitrum: **$10-25 total**
- Good coverage across ecosystems
- Appeals to diverse user base

### Aggressive Strategy (Full Deployment)
- All chains including Ethereum: **$100-400 total**
- Maximum reach
- Only recommended when profitable

---

## ⚠️ Important Considerations

### Gas Price Volatility
- Costs shown are estimates
- Actual costs vary based on network congestion
- Always check current gas prices before deploying

### Contract Size
- Current contract: ~220 lines
- Deployment gas: ~2-3 million gas
- No external dependencies
- Relatively cheap to deploy

### Treasury Address
- Use a secure wallet (hardware wallet recommended)
- Consider multi-sig (Gnosis Safe) for production
- Can update treasury address after deployment

### Testing Requirements
- ALWAYS test on testnet first (FREE)
- Verify contract on block explorer
- Test all functions before going live

---

## 🎯 Recommended Deployment Order

For most projects, follow this order:

1. **Sepolia Testnet** - FREE testing ✅
2. **Polygon** - $0.05 - Cheapest production chain ✅
3. **BSC** - $1 - Second cheapest, large user base ✅
4. **Avalanche** - $2 - Fast and growing
5. **Fantom** - $2 - DeFi focused
6. **Arbitrum** - $5 - Major L2
7. **Optimism** - $8 - Major L2
8. **Base** - $5 - Coinbase ecosystem
9. **Ethereum** - $100-300 - Only when proven demand

**Total cost for first 5 chains: ~$10**  
**Total cost for all 8 EVM chains: ~$130-350**

---

## 🔍 How to Verify Costs Before Deploying

### Check Real-Time Gas Prices

**Ethereum:**
```bash
# Check current gas price
curl https://api.etherscan.io/api?module=gastracker&action=gasoracle
```

**Polygon:**
```bash
# Check Polygon gas
curl https://api.polygonscan.com/api?module=gastracker&action=gasoracle
```

### Estimate Deployment Gas

```bash
# Using Foundry to estimate
forge create DomainRegistry \
  --constructor-args YOUR_TREASURY \
  --estimate-only
```

### Calculate Cost

```
Cost = (Gas Used × Gas Price × Native Token Price)

Example for Polygon:
- Gas: 2,500,000
- Gas Price: 50 gwei (0.00000005 MATIC)
- MATIC Price: $0.80

Cost = 2,500,000 × 0.00000005 × 0.80 = $0.10
```

---

## 📞 Need Help?

- Gas too high? Wait for off-peak hours or use a cheaper chain
- Deployment failing? Check you have enough native tokens for gas
- Contract verification? Use block explorer's verification tool
- Questions? Open an issue on GitHub

---

## ✅ Deployment Checklist

Before deploying to any mainnet:

- [ ] Contract tested on testnet
- [ ] Treasury address verified (YOUR wallet)
- [ ] Sufficient native tokens for gas
- [ ] Private key secured (hardware wallet recommended)
- [ ] Gas price checked (not during congestion)
- [ ] Backup of deployment transaction hash
- [ ] Contract verified on block explorer
- [ ] Contract address added to .env.local
- [ ] Frontend tested with new contract

---

**Last Updated:** February 2026  
**Note:** Gas prices and token prices fluctuate. Always check current prices before deploying.
