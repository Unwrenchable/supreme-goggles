# Smart Contracts - Production Ready

This directory contains production-ready smart contracts for the AtomicFizzCaps Universal Naming Service platform, supporting both **EVM chains** (Ethereum, Polygon, BSC, etc.) and **Solana**.

## 📁 Directory Structure

```
contracts/
├── solidity/              # EVM smart contracts
│   └── DomainRegistry.sol # Main domain registration contract
├── solana/               # Solana program
│   ├── lib.rs           # Rust program for Solana
│   ├── Cargo.toml       # Rust dependencies
│   └── Anchor.toml      # Anchor configuration
├── DomainRegistry.json   # Compiled ABI and bytecode
└── README.md            # This file
```

## 🚀 Quick Start

### EVM Chains (Ethereum, Polygon, BSC, etc.)

1. **Set up environment:**
```bash
cp .env.example .env
# Edit .env and set:
# - PRIVATE_KEY (your deployer wallet)
# - TREASURY_ADDRESS (where payments go)
# - REGISTRATION_FEE (in wei, 0 for free)
```

2. **Compile contract:**
```bash
node scripts/compile.js
```

3. **Deploy to testnet:**
```bash
# Polygon Mumbai testnet
npm run deploy:mumbai

# BSC Testnet
npm run deploy:bsc-testnet

# Sepolia (Ethereum testnet)
npm run deploy:sepolia
```

4. **Deploy to mainnet:**
```bash
# Polygon
npm run deploy:polygon

# BSC
npm run deploy:bsc

# Arbitrum
npm run deploy:arbitrum
```

### Solana

> **⚠️ Important:** See [SOLANA_BUILD_GUIDE.md](../SOLANA_BUILD_GUIDE.md) for detailed instructions and troubleshooting.
> 
> **Common Error:** Do NOT use `cargo build-sbf --target=...` - it will fail. Use `anchor build` or `cargo build-sbf` (without --target).

1. **Quick Method - Use our helper script:**
```bash
# Build only
./scripts/build-solana.sh

# Build and deploy to devnet
./scripts/build-solana.sh --deploy devnet --treasury YOUR_TREASURY_PUBKEY
```

2. **Manual Method - Install Anchor:**
```bash
cargo install --git https://github.com/coral-xyz/anchor anchor-cli --locked
```

3. **Build the program:**
```bash
cd contracts/solana
anchor build
```

4. **Deploy:**
```bash
# Devnet
./scripts/deploy-solana.sh devnet YOUR_TREASURY_PUBKEY 100000

# Mainnet
./scripts/deploy-solana.sh mainnet-beta YOUR_TREASURY_PUBKEY 100000
```

## 📋 Features

### EVM Contract Features

- ✅ **Lifetime Ownership** - Pay once, own forever (no renewal fees)
- ✅ **Custom Extensions** - Support ANY domain extension (.fizz, .eth, .custom, etc.)
- ✅ **Domain Records** - Wallet addresses, IPFS hashes, social links
- ✅ **Domain Transfers** - Transfer ownership to other addresses
- ✅ **Admin Controls** - Pause, update fees, change treasury
- ✅ **Gas Optimized** - Using calldata, custom errors, efficient storage
- ✅ **Security** - ReentrancyGuard, access controls, emergency pause

### Solana Program Features

- ✅ **Custom Treasury Address** - Payments go directly to your wallet
- ✅ **Lifetime Ownership** - No expiration dates
- ✅ **Domain Records** - Store wallet, IPFS, social media info
- ✅ **Transfer Support** - Transfer domains between accounts
- ✅ **Admin Functions** - Update treasury, fees, pause/unpause
- ✅ **Events** - Comprehensive event logging

## 💰 Payment Flow

### EVM Chains

```
User → registerDomain() + payment → Treasury (instantly)
                                  → Domain registered
```

Payments are sent directly to the treasury address on registration. The contract doesn't hold funds.

### Solana

```
User → register_domain + SOL → Treasury (your wallet)
                             → Domain PDA created
```

Same instant payment flow. Payments transferred directly to treasury.

## 🔧 Contract Configuration

### Constructor Parameters (EVM)

```solidity
constructor(
    address _treasury,      // Your wallet address
    uint256 _registrationFee // Fee in wei (0 for free)
)
```

**Example:**
- Treasury: `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb`
- Fee: `5000000000000000` (0.005 ETH)

### Initialize Parameters (Solana)

```rust
initialize(
    treasury: Pubkey,      // Your Solana wallet
    registration_fee: u64  // Fee in lamports
)
```

**Example:**
- Treasury: `YourWallet...` (base58 pubkey)
- Fee: `100000` (0.0001 SOL)

## 📝 Usage Examples

### Register a Domain (EVM)

```javascript
const tx = await domainRegistry.registerDomain(
  "myname.fizz",     // Full domain name
  ".fizz",           // Extension
  { value: ethers.parseEther("0.005") }
);
```

### Set Records (EVM)

```javascript
// Set wallet address
await domainRegistry.setWalletAddress("myname.fizz", "0x123...");

// Set IPFS hash
await domainRegistry.setIPFSHash("myname.fizz", "Qm...");

// Set social records
await domainRegistry.setSocialRecords("myname.fizz", "@twitter", "discord#1234");
```

### Transfer Domain (EVM)

```javascript
await domainRegistry.transferDomain("myname.fizz", "0xNewOwner...");
```

### Check Availability (EVM)

```javascript
const available = await domainRegistry.checkAvailability("myname.fizz");
// returns: true (available) or false (taken)
```

### Register Domain (Solana)

```typescript
await program.methods
  .registerDomain("myname", ".fizz")
  .accounts({
    registry: registryPda,
    domain: domainPda,
    payer: wallet.publicKey,
    treasury: treasuryAddress,
    systemProgram: SystemProgram.programId,
  })
  .rpc();
```

## 🔐 Security Features

### EVM Contract

1. **Access Control** - Only owner can update treasury/fees
2. **Pause Mechanism** - Emergency stop functionality
3. **Custom Errors** - Gas-efficient error handling
4. **Reentrancy Protection** - Direct transfers, no external calls
5. **Input Validation** - Checks for zero addresses, empty strings
6. **Emergency Withdraw** - Recover stuck funds (if any)

### Solana Program

1. **PDA Verification** - Proper seed derivation
2. **Ownership Checks** - Only domain owner can update
3. **Authority Controls** - Admin functions protected
4. **Pause Mechanism** - Can disable registrations
5. **Input Validation** - String length checks

## 💸 Deployment Costs

### EVM Chains (Estimated)

| Chain | Gas Price | Deployment Cost | Per Registration |
|-------|-----------|-----------------|------------------|
| Polygon | 50 gwei | ~$0.05 | ~$0.001 |
| BSC | 3 gwei | ~$1 | ~$0.01 |
| Arbitrum | 0.1 gwei | ~$2 | ~$0.01 |
| Optimism | 0.001 gwei | ~$2 | ~$0.01 |
| Base | 0.001 gwei | ~$2 | ~$0.01 |
| Avalanche | 25 nAVAX | ~$2 | ~$0.02 |
| Ethereum | 30 gwei | ~$50-100 | ~$5-10 |

**Recommendation:** Start with Polygon (cheapest) or BSC

### Solana

- **Program Deployment:** ~0.05 SOL (~$5)
- **Per Registration:** Transaction fee only (~0.000005 SOL)
- **Account Rent:** ~0.002 SOL per domain (one-time)

## 🛠️ Admin Functions

### Update Treasury (EVM)

```javascript
await domainRegistry.updateTreasury("0xNewTreasuryAddress");
```

### Update Registration Fee (EVM)

```javascript
await domainRegistry.updateRegistrationFee(ethers.parseEther("0.01"));
```

### Pause/Unpause (EVM)

```javascript
await domainRegistry.setPaused(true);  // Pause
await domainRegistry.setPaused(false); // Unpause
```

### Update Treasury (Solana)

```typescript
await program.methods
  .updateTreasury(newTreasuryPubkey)
  .accounts({
    registry: registryPda,
    authority: authority.publicKey,
  })
  .rpc();
```

## 📊 Events

### EVM Events

- `DomainRegistered(domain, owner, amount, extension, timestamp)`
- `DomainTransferred(domain, from, to, timestamp)`
- `RecordUpdated(domain, recordType, value, timestamp)`
- `PaymentReceived(from, amount, domain, timestamp)`
- `TreasuryUpdated(oldTreasury, newTreasury, timestamp)`
- `RegistrationFeeUpdated(oldFee, newFee, timestamp)`
- `Paused(paused, timestamp)`
- `OwnershipTransferred(previousOwner, newOwner)`

### Solana Events

- `DomainRegisteredEvent` - New domain registered
- `RecordUpdatedEvent` - Domain records updated
- `DomainTransferredEvent` - Domain ownership transferred
- `TreasuryUpdatedEvent` - Treasury address changed
- `FeeUpdatedEvent` - Registration fee updated
- `PausedEvent` - Contract paused/unpaused

## 🔍 Verification

### Verify on Block Explorer (EVM)

```bash
npx hardhat verify --network polygon \
  CONTRACT_ADDRESS \
  "TREASURY_ADDRESS" \
  "REGISTRATION_FEE"
```

Example:
```bash
npx hardhat verify --network polygon \
  0x123...abc \
  "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb" \
  "5000000000000000"
```

### Verify on Solana Explorer

Program automatically shows on [Solana Explorer](https://explorer.solana.com/) after deployment. Use your program ID.

## 🧪 Testing

### Test EVM Contract Locally

```bash
# Start local node
npx hardhat node

# In another terminal, deploy
npx hardhat run scripts/deploy.ts --network localhost

# Test registration
npx hardhat test
```

### Test Solana Program Locally

```bash
cd contracts/solana
anchor test
```

## 📖 Integration with Frontend

After deployment, update your `.env.local`:

### EVM Configuration

```env
# Example for Polygon
NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS=0x123...abc
NEXT_PUBLIC_USE_PRODUCTION_MODE=true
```

### Solana Configuration

```env
NEXT_PUBLIC_SOLANA_CONTRACT_ADDRESS=YourProgramId...
NEXT_PUBLIC_SOLANA_PAYMENT_ADDRESS=YourTreasuryWallet...
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
NEXT_PUBLIC_USE_PRODUCTION_MODE=true
```

## 🆘 Troubleshooting

### "Out of Gas" Error

Increase gas limit in deployment script or use a higher gas price.

### "Nonce Too High"

Reset your account nonce:
```bash
npx hardhat node --reset
```

### Solana "Insufficient Funds"

Get SOL for deployment:
```bash
# Devnet
solana airdrop 2 --url devnet

# Mainnet
# Transfer SOL to your wallet
```

### Contract Too Large

The contract is optimized and should fit within the 24KB limit. If you add features and exceed this:
1. Remove unused functions
2. Shorten error messages
3. Use libraries for common functions

## 📚 Additional Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [Anchor Documentation](https://www.anchor-lang.com/)
- [Solidity by Example](https://solidity-by-example.org/)
- [Solana Cookbook](https://solanacookbook.com/)

## 🤝 Support

For issues or questions:
1. Check [ARCHITECTURE.md](../ARCHITECTURE.md)
2. See [DEPLOYMENT_LOGS.md](../DEPLOYMENT_LOGS.md)
3. Review [SECURITY.md](../SECURITY.md)

## ⚖️ License

MIT License - Use for your Web3 naming platform!
