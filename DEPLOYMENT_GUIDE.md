# Contract Deployment Guide

This guide walks you through deploying the DomainRegistry smart contracts to EVM chains and Solana.

## 📋 Prerequisites

### For EVM Chains

- **Node.js 18+** installed
- **Wallet with funds** on the chain you want to deploy to
- **Private key** of the deployer wallet
- **Treasury address** where payments will be sent
- **RPC endpoint** (optional - defaults provided)

### For Solana

- **Rust and Cargo** installed
- **Solana CLI** installed ([guide](https://docs.solana.com/cli/install-solana-cli-tools))
- **Anchor CLI** installed ([guide](https://www.anchor-lang.com/docs/installation))
- **SOL** for deployment fees
- **Treasury wallet** for receiving payments

## 🚀 Quick Deployment - EVM Chains

### Step 1: Set Up Environment

Create `.env` file in project root:

```bash
cp .env.example .env
```

Edit `.env` and set:

```env
# Your deployer wallet private key (NEVER commit!)
PRIVATE_KEY=0x1234567890abcdef...

# Your treasury wallet (receives all payments)
TREASURY_ADDRESS=0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb

# Registration fee in wei (0 for free)
REGISTRATION_FEE=5000000000000000
```

**Fee Examples:**
- `0` = Free registration
- `1000000000000000` = 0.001 ETH/MATIC/BNB
- `5000000000000000` = 0.005 ETH/MATIC/BNB
- `10000000000000000` = 0.01 ETH/MATIC/BNB

### Step 2: Compile Contract

```bash
npm run compile:contracts
```

✅ You should see: "✅ Compilation successful!"

### Step 3: Deploy to Testnet (Recommended First)

**Polygon Mumbai (Free testnet):**

1. Get test MATIC: https://mumbaifaucet.com/
2. Deploy:
```bash
npm run deploy:mumbai
```

**BSC Testnet:**

1. Get test BNB: https://testnet.bnbchain.org/faucet-smart
2. Deploy:
```bash
npm run deploy:bsc-testnet
```

**Sepolia (Ethereum testnet):**

1. Get test ETH: https://sepoliafaucet.com/
2. Deploy:
```bash
npm run deploy:sepolia
```

### Step 4: Deploy to Mainnet

**⚠️ WARNING: You're deploying to mainnet with real money!**

Make sure:
- ✅ Contract tested on testnet
- ✅ Treasury address is correct
- ✅ You have enough funds for gas

**Polygon (Recommended - Cheapest ~$0.05):**
```bash
npm run deploy:polygon
```

**BSC (~$1):**
```bash
npm run deploy:bsc
```

**Arbitrum (~$2):**
```bash
npm run deploy:arbitrum
```

**Optimism (~$2):**
```bash
npm run deploy:optimism
```

**Base (~$2):**
```bash
npm run deploy:base
```

**Avalanche (~$2):**
```bash
npm run deploy:avalanche
```

**Ethereum (~$50-100, NOT recommended):**
```bash
npm run deploy:ethereum
```

### Step 5: Save Contract Address

After deployment, you'll see:

```
✅ DomainRegistry deployed to: 0xABC...123

📝 Add this to your .env.local file:
====================================
NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS=0xABC...123
====================================
```

Copy this to your `.env.local` file.

### Step 6: Verify Contract (Optional but Recommended)

Verify on block explorer for transparency:

```bash
npx hardhat verify --network polygon \
  0xYourContractAddress \
  "0xYourTreasuryAddress" \
  "5000000000000000"
```

Replace:
- `polygon` with your network (bsc, arbitrum, etc.)
- `0xYourContractAddress` with deployed address
- `0xYourTreasuryAddress` with your treasury
- `"5000000000000000"` with your fee in wei

### Step 7: Test the Contract

Test registration:

```bash
# Using Hardhat console
npx hardhat console --network polygon

# In console:
const DomainRegistry = await ethers.getContractFactory("DomainRegistry");
const contract = await DomainRegistry.attach("0xYourContractAddress");

# Test availability check
await contract.checkAvailability("test.fizz");
// Should return: true (available)

# Test registration (with payment)
await contract.registerDomain("test.fizz", ".fizz", {
  value: ethers.parseEther("0.005")
});
// Should emit DomainRegistered event

# Check if registered
await contract.checkAvailability("test.fizz");
// Should return: false (now taken)
```

## 🌐 Solana Deployment

### Step 1: Install Dependencies

```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"

# Install Anchor
cargo install --git https://github.com/coral-xyz/anchor anchor-cli --locked
```

### Step 2: Configure Solana CLI

```bash
# Set to devnet for testing
solana config set --url devnet

# Check your wallet
solana address

# Get SOL for deployment (devnet)
solana airdrop 2
```

### Step 3: Build Program

```bash
cd contracts/solana
anchor build
```

### Step 4: Deploy Program

**Devnet (Testing):**

```bash
# Deploy with your treasury address and fee
./scripts/deploy-solana.sh devnet YourTreasuryPublicKey 100000

# Example:
./scripts/deploy-solana.sh devnet 8mKKZjQ4qvF3jZ9p7S6L5nX2R4W1M3fY5tH6uG7eV8wP 100000
```

Fee is in lamports (1 SOL = 1,000,000,000 lamports):
- `0` = Free
- `100000` = 0.0001 SOL
- `1000000` = 0.001 SOL

**Mainnet:**

```bash
# Switch to mainnet
solana config set --url mainnet-beta

# Make sure you have SOL
solana balance

# Deploy
./scripts/deploy-solana.sh mainnet-beta YourTreasuryPublicKey 100000
```

### Step 5: Initialize Registry

After deployment, you need to initialize the program with your settings.

Create `scripts/initialize-solana.ts`:

```typescript
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { DomainRegistry } from "../target/types/domain_registry";

async function main() {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.DomainRegistry as Program<DomainRegistry>;
  
  // Your treasury wallet
  const treasury = new anchor.web3.PublicKey("YourTreasuryPublicKey");
  const registrationFee = new anchor.BN(100000); // lamports

  const [registryPda] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from("registry")],
    program.programId
  );

  console.log("Initializing registry...");
  
  const tx = await program.methods
    .initialize(treasury, registrationFee)
    .accounts({
      registry: registryPda,
      authority: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .rpc();

  console.log("✅ Registry initialized!");
  console.log("Transaction:", tx);
  console.log("Registry PDA:", registryPda.toBase58());
}

main();
```

Run:
```bash
anchor run initialize
```

### Step 6: Update .env.local

Add to your `.env.local`:

```env
NEXT_PUBLIC_SOLANA_CONTRACT_ADDRESS=YourProgramId
NEXT_PUBLIC_SOLANA_PAYMENT_ADDRESS=YourTreasuryWallet
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
NEXT_PUBLIC_USE_PRODUCTION_MODE=true
```

## 🔄 Post-Deployment

### Update Frontend Configuration

1. Edit `.env.local` with all deployed contract addresses
2. Set `NEXT_PUBLIC_USE_PRODUCTION_MODE=true`
3. Restart your Next.js server

### Test Full Flow

1. Connect wallet to your site
2. Search for a domain
3. Register with payment
4. Check domain appears in dashboard
5. Try setting records
6. Test domain transfer

## 📊 Multi-Chain Deployment

To support multiple chains, deploy to each one:

```bash
# Deploy to all major chains
npm run deploy:polygon
npm run deploy:bsc
npm run deploy:arbitrum
npm run deploy:optimism
npm run deploy:base

# And Solana
./scripts/deploy-solana.sh mainnet-beta YourWallet 100000
```

Update `.env.local` with all addresses:

```env
NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_BSC_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_ARBITRUM_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_OPTIMISM_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_BASE_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_SOLANA_CONTRACT_ADDRESS=...
```

## 🔐 Security Checklist

Before going live:

- [ ] Test on testnet thoroughly
- [ ] Verify treasury address is correct
- [ ] Set appropriate registration fee
- [ ] Verify contracts on block explorers
- [ ] Test pause mechanism works
- [ ] Test admin functions
- [ ] Set up monitoring/alerts
- [ ] Document contract addresses securely
- [ ] Consider using multi-sig for treasury
- [ ] Have emergency response plan

## 💰 Cost Summary

**One-time deployment costs:**

| Chain | Deployment | Total Chains | Total Cost |
|-------|-----------|--------------|------------|
| Polygon | $0.05 | 1 | $0.05 |
| BSC | $1.00 | 1 | $1.00 |
| Arbitrum | $2.00 | 1 | $2.00 |
| All 5 (recommended) | varies | 5 | ~$7-10 |
| With Solana | +$5 | 6 | ~$12-15 |

**Ongoing costs:** None! (Users pay gas for their own transactions)

## 🆘 Troubleshooting

### "Insufficient funds for gas"

You need more ETH/MATIC/BNB on the deployer wallet.

### "Nonce too high"

Reset your account:
```bash
npx hardhat clean
rm -rf cache artifacts
```

### "Contract creation code storage out of gas"

Increase gas limit in `hardhat.config.ts`.

### Solana: "Account not found"

Make sure you have SOL in your wallet:
```bash
solana balance
```

### "Treasury address invalid"

Check that your treasury address:
- Is a valid address (checksum correct)
- Is not zero address (0x0000...)
- Has correct format for the chain

## 📚 Next Steps

After deployment:

1. ✅ Update frontend with contract addresses
2. ✅ Test registration flow end-to-end
3. ✅ Set up monitoring
4. ✅ Announce launch
5. ✅ Monitor first transactions
6. ✅ Collect feedback

## 🤝 Support

Need help?
- Check [contracts/README.md](./contracts/README.md)
- Review [ARCHITECTURE.md](./ARCHITECTURE.md)
- See [SECURITY.md](./SECURITY.md)

---

**Ready to deploy?** Start with a testnet, then move to production. Good luck! 🚀
