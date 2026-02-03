# 🚀 Production Setup Guide

This guide will walk you through setting up your AtomicFizzCaps Universal Naming Service platform for production use with real blockchain payments.

---

## 📋 Overview

The platform can operate in two modes:

### Demo Mode (Default)
- Uses mock data for demonstration
- No blockchain interaction required
- Perfect for testing UI/UX
- Shows alert messages instead of real transactions

### Production Mode
- **Real blockchain transactions**
- **Real payments collected**
- Users pay in native currencies (ETH, SOL, BNB, etc.)
- Domains registered permanently on-chain
- Requires smart contract deployment

---

## ⚡ Quick Start (Enable Production Mode)

### Step 1: Set Environment Variable

In your `.env.local` file:

```env
NEXT_PUBLIC_USE_PRODUCTION_MODE=true
```

### Step 2: Configure Contract Addresses

Deploy your smart contracts and add their addresses:

```env
# Example for Ethereum
NEXT_PUBLIC_ETHEREUM_CONTRACT_ADDRESS=0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb

# Example for Polygon
NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS=0x...your_polygon_contract_address

# Add more chains as needed
```

### Step 3: Set Your Payment Recipient Address

This is YOUR wallet where payments will be sent:

```env
NEXT_PUBLIC_PAYMENT_RECIPIENT_ADDRESS=0x...your_ethereum_wallet_address
NEXT_PUBLIC_SOLANA_PAYMENT_ADDRESS=...your_solana_wallet_address
```

### Step 4: Restart Your Application

```bash
npm run dev  # Development
# or
npm run build && npm start  # Production
```

---

## 🔧 Detailed Setup Instructions

### 1. Smart Contract Deployment

You need to deploy the `DomainRegistry` contract to each blockchain you want to support.

#### Contract Location
- **Solidity Contract**: `contracts/DomainRegistryExample.sol`
- **ABI**: `contracts/DomainRegistry.json`

#### Deployment Tools

**Option A: Hardhat (Recommended)**
```bash
# Install Hardhat
npm install --save-dev hardhat @nomiclabs/hardhat-ethers

# Create Hardhat config
npx hardhat

# Deploy to Sepolia testnet (for testing)
npx hardhat run scripts/deploy.js --network sepolia

# Deploy to mainnet
npx hardhat run scripts/deploy.js --network mainnet
```

**Option B: Remix IDE**
1. Go to [remix.ethereum.org](https://remix.ethereum.org)
2. Copy `contracts/DomainRegistryExample.sol` into Remix
3. Compile with Solidity 0.8.0+
4. Deploy with your treasury address as constructor parameter
5. Copy the deployed contract address

**Option C: Foundry**
```bash
forge create DomainRegistry --constructor-args YOUR_TREASURY_ADDRESS
```

#### Deploy to Multiple Chains

You need separate deployments for each chain:

```bash
# Ethereum Mainnet
forge create DomainRegistry --rpc-url $ETHEREUM_RPC --constructor-args $TREASURY

# Polygon
forge create DomainRegistry --rpc-url $POLYGON_RPC --constructor-args $TREASURY

# Arbitrum
forge create DomainRegistry --rpc-url $ARBITRUM_RPC --constructor-args $TREASURY

# BSC
forge create DomainRegistry --rpc-url $BSC_RPC --constructor-args $TREASURY
```

**Important**: Save each deployed contract address!

### 2. Configure Environment Variables

Create or update `.env.local` in your project root:

```env
# ===================================================================
# PRODUCTION MODE - Enable Real Blockchain Transactions
# ===================================================================
NEXT_PUBLIC_USE_PRODUCTION_MODE=true

# ===================================================================
# WALLETCONNECT (Required)
# ===================================================================
# Get your project ID from https://cloud.walletconnect.com/
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id

# ===================================================================
# SMART CONTRACT ADDRESSES (Deploy contracts first!)
# ===================================================================

# Ethereum & L2s
NEXT_PUBLIC_ETHEREUM_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_ARBITRUM_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_OPTIMISM_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_BASE_CONTRACT_ADDRESS=0x...

# Other EVM Chains
NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_BSC_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_AVALANCHE_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_FANTOM_CONTRACT_ADDRESS=0x...

# Testnet (for testing before mainnet)
NEXT_PUBLIC_SEPOLIA_CONTRACT_ADDRESS=0x...

# Solana
NEXT_PUBLIC_SOLANA_CONTRACT_ADDRESS=...
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta

# ===================================================================
# PAYMENT COLLECTION (YOUR WALLET ADDRESSES)
# ===================================================================

# EVM Chains - Where ETH/BNB/MATIC payments go
NEXT_PUBLIC_PAYMENT_RECIPIENT_ADDRESS=0x...your_wallet

# Solana - Where SOL payments go
NEXT_PUBLIC_SOLANA_PAYMENT_ADDRESS=...your_solana_wallet

# Optional: Multi-sig Treasury (RECOMMENDED for production)
NEXT_PUBLIC_TREASURY_ADDRESS=0x...your_multisig_wallet
```

### 3. Testing on Testnet (HIGHLY RECOMMENDED)

Before deploying to mainnet, test everything on testnet:

#### Get Testnet Tokens (FREE)

**Ethereum Sepolia:**
- Faucet: https://sepoliafaucet.com/
- Get free test ETH

**Polygon Mumbai:**
- Faucet: https://faucet.polygon.technology/
- Get free test MATIC

**Solana Devnet:**
```bash
solana airdrop 2  # Get 2 SOL on devnet
```

#### Test Configuration

```env
NEXT_PUBLIC_USE_PRODUCTION_MODE=true
NEXT_PUBLIC_SEPOLIA_CONTRACT_ADDRESS=0x...your_testnet_contract
NEXT_PUBLIC_PAYMENT_RECIPIENT_ADDRESS=0x...your_test_wallet
```

#### Test Workflow

1. Deploy contract to testnet
2. Update .env.local with testnet addresses
3. Restart app
4. Try registering a domain
5. Verify transaction on block explorer
6. Check that payment arrived in your test wallet
7. Verify domain shows in dashboard
8. Try updating domain records

### 4. Mainnet Deployment

Once testing is successful:

1. **Deploy contracts to mainnet** (Ethereum, Polygon, etc.)
2. **Update environment variables** with mainnet addresses
3. **Verify your payment wallet** is correct
4. **Test with small amount first**
5. **Monitor transactions closely**

---

## 🔒 Security Best Practices

### 1. Use Multi-Signature Wallets

For production, use a multi-sig wallet like Gnosis Safe:

1. Go to https://gnosis-safe.io/
2. Create a new Safe
3. Add 2-3 team members as signers
4. Require 2-of-3 signatures for withdrawals
5. Use Safe address as `NEXT_PUBLIC_PAYMENT_RECIPIENT_ADDRESS`

### 2. Contract Security

- **Audit your contracts** before mainnet deployment
- Use established auditors (OpenZeppelin, Trail of Bits)
- Implement emergency pause function
- Test extensively on testnet

### 3. Private Key Management

- **NEVER commit private keys** to git
- Use hardware wallets (Ledger, Trezor) for deployment
- Keep environment variables secure
- Use different wallets for testing vs production

### 4. Monitoring

Set up monitoring for:
- Incoming payments
- Failed transactions
- Unusual activity
- Contract events

---

## 💰 Payment Flow Verification

### How to Verify Payments Are Working

1. **Register a test domain** on testnet
2. **Check block explorer** for transaction
3. **Verify payment received** in your wallet
4. **Check domain ownership** via contract call

### Block Explorers by Chain

| Chain | Explorer |
|-------|----------|
| Ethereum | https://etherscan.io |
| Polygon | https://polygonscan.com |
| Arbitrum | https://arbiscan.io |
| Optimism | https://optimistic.etherscan.io |
| BSC | https://bscscan.com |
| Avalanche | https://snowtrace.io |
| Fantom | https://ftmscan.com |
| Sepolia | https://sepolia.etherscan.io |

### Verify Contract Interaction

On Etherscan (or equivalent):
1. Go to your contract address
2. Click "Contract" → "Read Contract"
3. Use `getUserDomains(address)` to see domains owned by an address
4. Use `getDomainInfo(domainName)` to get domain details

---

## 🧪 Testing Checklist

Before going live:

### Testnet Testing
- [ ] Contract deployed to testnet
- [ ] Environment variables configured
- [ ] WalletConnect working
- [ ] Can register domain with test tokens
- [ ] Payment received in test wallet
- [ ] Domain shows in dashboard
- [ ] Can update domain records
- [ ] Transaction links work
- [ ] Error handling works (rejected transactions, insufficient funds)

### Mainnet Testing
- [ ] Contracts deployed to mainnet
- [ ] Small test transaction successful
- [ ] Payment received correctly
- [ ] Domain registered on-chain
- [ ] All features working
- [ ] Multi-sig setup (if using)
- [ ] Monitoring configured

---

## 🔄 Switching Between Demo and Production

### Enable Production Mode
```env
NEXT_PUBLIC_USE_PRODUCTION_MODE=true
```

### Return to Demo Mode
```env
NEXT_PUBLIC_USE_PRODUCTION_MODE=false
# or simply delete the line
```

The app will automatically:
- Show demo mode banner when in demo mode
- Use mock data when contracts not configured
- Gracefully handle missing configurations

---

## 🐛 Troubleshooting

### "Production mode is not configured" Error

**Cause**: Missing contract addresses or payment recipients

**Fix**: 
1. Check .env.local has all required addresses
2. Ensure USE_PRODUCTION_MODE=true
3. Restart your application

### Transactions Failing

**Possible Causes**:
- Wrong network selected in wallet
- Insufficient gas
- Contract not deployed
- Wrong contract address

**Debug Steps**:
1. Check wallet is on correct network
2. Verify contract address in .env.local
3. Check contract exists on block explorer
4. Ensure wallet has enough native tokens for gas

### Payments Not Arriving

**Check**:
1. Transaction succeeded on block explorer
2. Payment recipient address is correct
3. Check receiving wallet for balance
4. Verify contract's treasury address matches your wallet

### Domain Not Showing in Dashboard

**Possible Causes**:
- Transaction still pending
- Wrong RPC endpoint
- Cache issue

**Fix**:
1. Wait for transaction confirmation (1-3 minutes)
2. Refresh the page
3. Check transaction on block explorer
4. Clear browser cache

---

## 📊 Monitoring & Analytics

### Track Revenue

Use block explorers to monitor:
- Total domains registered
- Total revenue collected
- Revenue by chain
- Transaction history

### Set Up Alerts

Use services like:
- **Dune Analytics**: Custom dashboards
- **Tenderly**: Transaction monitoring
- **OpenZeppelin Defender**: Security monitoring

### Export Data

Export transaction history for:
- Accounting
- Tax reporting
- Analytics
- Customer support

---

## 🎯 Next Steps

After setup:

1. **Monitor first transactions** closely
2. **Set up customer support** for issues
3. **Create documentation** for users
4. **Implement analytics** tracking
5. **Plan for scaling** (more chains, features)

---

## 💡 Tips & Best Practices

### Start Small
- Begin with testnet
- Do small mainnet test first
- Gradually increase limits

### Document Everything
- Keep track of all deployed addresses
- Document deployment process
- Save transaction hashes

### Stay Updated
- Monitor smart contract security news
- Update dependencies regularly
- Follow blockchain ecosystem updates

### User Experience
- Clear error messages
- Transaction status feedback
- Help documentation
- Support channels

---

## 📞 Support Resources

### Smart Contract Development
- OpenZeppelin: https://openzeppelin.com/contracts
- Hardhat: https://hardhat.org
- Foundry: https://getfoundry.sh

### Security Auditing
- OpenZeppelin: https://openzeppelin.com/security-audits
- Trail of Bits: https://trailofbits.com
- Consensys Diligence: https://consensys.net/diligence

### Community
- Ethereum Stack Exchange: https://ethereum.stackexchange.com
- Web3 Developer Discord servers
- GitHub Issues for this repository

---

## ⚠️ Important Reminders

1. **Test on testnet first** - Always!
2. **Audit your contracts** before mainnet
3. **Use multi-sig wallets** for production
4. **Never commit private keys** to git
5. **Monitor transactions** constantly
6. **Start with small amounts** initially
7. **Have emergency procedures** ready
8. **Keep backups** of all deployment info

---

## 🎉 You're Ready!

Once you've completed this setup:

✅ Your platform accepts real payments  
✅ Domains are registered on blockchain  
✅ Users own their domains permanently  
✅ You receive payments automatically  
✅ Everything is secure and monitored  

Welcome to production! 🚀

For questions or issues, please:
- Check the troubleshooting section
- Review PAYMENTS.md
- Open an issue on GitHub
- Reach out to the community
