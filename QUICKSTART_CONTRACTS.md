# 🚀 Quick Start - Deploy Your Contracts

## ⚡ 60-Second Deployment (Testnet)

### 1. Set Treasury Address (Where payments go)
```bash
export TREASURY_ADDRESS="0xYourWalletAddress"
export REGISTRATION_FEE="0"  # Free for testing
echo "PRIVATE_KEY=your_private_key_here
TREASURY_ADDRESS=$TREASURY_ADDRESS
REGISTRATION_FEE=$REGISTRATION_FEE" > .env
```

### 2. Get Test Tokens
- Polygon Mumbai: https://mumbaifaucet.com/
- BSC Testnet: https://testnet.bnbchain.org/faucet-smart

### 3. Deploy
```bash
npm run compile:contracts
npm run deploy:mumbai  # or deploy:bsc-testnet
```

### 4. Update .env.local
Copy the contract address from deployment output to `.env.local`:
```env
NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS=0xYourContractAddress
NEXT_PUBLIC_USE_PRODUCTION_MODE=true
```

### 5. Test It! 
```bash
npm run dev
```
Visit http://localhost:3000 and try registering a domain!

---

## 🌐 Production Deployment

### EVM Chains (Choose One or All)

**Cheapest → Most Expensive:**

1. **Polygon** (~$0.05) - **RECOMMENDED**
   ```bash
   npm run deploy:polygon
   ```

2. **BSC** (~$1)
   ```bash
   npm run deploy:bsc
   ```

3. **Arbitrum** (~$2)
   ```bash
   npm run deploy:arbitrum
   ```

4. **Optimism** (~$2)
   ```bash
   npm run deploy:optimism
   ```

5. **Base** (~$2)
   ```bash
   npm run deploy:base
   ```

### Solana

```bash
# Install if needed
cargo install --git https://github.com/coral-xyz/anchor anchor-cli --locked

# Deploy
./scripts/deploy-solana.sh mainnet-beta YOUR_TREASURY_WALLET 100000
```

---

## 📋 Environment Variables Quick Reference

Create `.env` for deployment:
```env
PRIVATE_KEY=0x1234...          # Deployer wallet
TREASURY_ADDRESS=0x5678...     # Payment recipient
REGISTRATION_FEE=0             # Fee in wei
```

Update `.env.local` after deployment:
```env
# Use the addresses from deployment
NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS=0xABC...
NEXT_PUBLIC_SOLANA_CONTRACT_ADDRESS=DEF...
NEXT_PUBLIC_SOLANA_PAYMENT_ADDRESS=GHI...
NEXT_PUBLIC_USE_PRODUCTION_MODE=true
```

---

## ✅ Verification Checklist

Before going live:

- [ ] Tested on testnet
- [ ] Treasury address is YOUR wallet
- [ ] Contract deployed successfully
- [ ] Address added to .env.local
- [ ] Production mode enabled
- [ ] Domain registration works
- [ ] Payments received in treasury
- [ ] Contract verified on block explorer (optional)

---

## 🆘 Quick Troubleshooting

**"Insufficient funds"** → Need more ETH/MATIC/BNB in deployer wallet

**"Treasury address invalid"** → Check your wallet address is correct

**"Contract too large"** → This shouldn't happen, contact support

**"Deployment failed"** → Check your PRIVATE_KEY and TREASURY_ADDRESS in .env

---

## 📚 Full Documentation

- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Complete deployment guide
- [contracts/README.md](./contracts/README.md) - Contract documentation
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture

---

## 💡 Pro Tips

1. **Start with testnet** - Deploy to Mumbai or BSC Testnet first
2. **Use Polygon** - Cheapest for mainnet (~$0.05 vs $50+ on Ethereum)
3. **Set fee to 0** - Free registration to attract users, earn from volume
4. **Verify contract** - Builds trust, use `npx hardhat verify`
5. **Multi-chain** - Deploy to multiple chains for more reach

---

**Questions?** See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.
