# Deployment Scripts

This directory contains scripts for building and deploying the Solana domain registry program.

## 🚨 Quick Fix: "No such file or directory" Error

If you get this error when trying to run `./scripts/build-solana.sh` or `bash scripts/setup-scripts.sh`:

```bash
bash: scripts/setup-scripts.sh: No such file or directory
```

**This happens because:**
- You downloaded the repository as a ZIP file (loses file permissions and may not have latest files)
- The files need executable permissions
- You're on an older version without the setup script

### ✅ Instant Fix (Copy & Paste This)

Run this ONE command to fix all script permissions:

```bash
chmod +x scripts/*.sh scripts/*.js 2>/dev/null || find scripts -type f \( -name "*.sh" -o -name "*.js" \) -exec chmod +x {} \;
```

This command:
- Makes all `.sh` and `.js` files in the scripts directory executable
- Works even if some files don't exist
- Handles both simple and complex directory structures

After running it, you can use the scripts normally:

```bash
./scripts/build-solana.sh --deploy devnet --treasury YOUR_WALLET_ADDRESS
```

## 📋 Available Scripts

### `build-solana.sh` - Build and Deploy Solana Program

Build the Solana domain registry program, optionally deploying it to devnet or mainnet.

**Usage:**
```bash
# Just build
./scripts/build-solana.sh

# Build and deploy to devnet
./scripts/build-solana.sh --deploy devnet --treasury YOUR_WALLET_ADDRESS

# Build and deploy to mainnet
./scripts/build-solana.sh --deploy mainnet-beta --treasury YOUR_WALLET_ADDRESS --fee 100000
```

**Options:**
- `--deploy NETWORK` - Deploy after building (devnet|mainnet-beta)
- `--treasury ADDRESS` - Treasury wallet address (required with --deploy)
- `--fee LAMPORTS` - Registration fee in lamports (default: 100000)
- `--help` - Show help message

**Example:**
```bash
./scripts/build-solana.sh --deploy devnet --treasury 4tsFwST3JXsGvnf7KM76U9jCtC5cSTapU4BH7rQ2ydYX
```

### `deploy-solana.sh` - Deploy Only

Deploy an already-built Solana program.

**Usage:**
```bash
./scripts/deploy-solana.sh NETWORK TREASURY_ADDRESS [FEE_IN_LAMPORTS]
```

**Example:**
```bash
./scripts/deploy-solana.sh devnet 4tsFwST3JXsGvnf7KM76U9jCtC5cSTapU4BH7rQ2ydYX 100000
```

### `setup-scripts.sh` - Fix Script Permissions

Makes all deployment scripts executable (useful after downloading as ZIP).

**Usage:**
```bash
bash scripts/setup-scripts.sh
```

**Note:** If this script doesn't exist in your download, use the one-liner fix above instead.

### `verify-deployment-ready.js` - Verify Deployment Readiness

Checks if the project is ready for deployment to Vercel or other platforms.

**Usage:**
```bash
node scripts/verify-deployment-ready.js
```

### `check-deployment.js` - Check Deployment Status

Verifies the deployment configuration and environment variables.

**Usage:**
```bash
node scripts/check-deployment.js
```

## 🔧 Alternative: Run Without Execute Permissions

If you can't or don't want to change permissions, run scripts with `bash` directly:

```bash
# Instead of ./scripts/build-solana.sh
bash scripts/build-solana.sh --deploy devnet --treasury YOUR_WALLET

# Instead of ./scripts/deploy-solana.sh
bash scripts/deploy-solana.sh devnet YOUR_WALLET 100000
```

This works because `bash` reads the file content directly without needing the executable flag.

## 📚 Prerequisites

Before running deployment scripts, ensure you have:

- **Rust** - `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`
- **Solana CLI** - `sh -c "$(curl -sSfL https://release.solana.com/stable/install)"`
- **Anchor CLI** (recommended) - `cargo install --git https://github.com/coral-xyz/anchor anchor-cli --locked`
- **Wallet with SOL** - Devnet: `solana airdrop 2`, Mainnet: Transfer SOL

Verify installations:
```bash
rustc --version
solana --version
anchor --version  # optional but recommended
```

## 🌍 Network Configuration

### Devnet (Testing)
```bash
# Configure for devnet
solana config set --url devnet

# Get free test SOL
solana airdrop 2

# Check balance
solana balance

# Deploy
./scripts/build-solana.sh --deploy devnet --treasury YOUR_WALLET
```

### Mainnet (Production)
```bash
# Configure for mainnet
solana config set --url mainnet-beta

# Check balance (you need real SOL)
solana balance

# Deploy
./scripts/build-solana.sh --deploy mainnet-beta --treasury YOUR_WALLET
```

## 🆘 Troubleshooting

### "No such file or directory"
**Solution:** Use the one-liner fix at the top of this README.

### "anchor: command not found"
**Solution:** 
```bash
cargo install --git https://github.com/coral-xyz/anchor anchor-cli --locked
```
Or the script will automatically use `cargo build-sbf` instead.

### "cargo build-sbf: command not found"
**Solution:**
```bash
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
solana install
```

### "Insufficient balance" or "Insufficient funds"
**Solution:**
```bash
# For devnet (free test SOL)
solana config set --url devnet
solana airdrop 2

# For mainnet (need real SOL)
# Transfer SOL to your wallet from an exchange
```

### "Permission denied"
**Solution:** Run the one-liner fix at the top of this README, or use `bash scripts/script-name.sh` instead.

## 📖 Full Documentation

For comprehensive guides, see:

- **[SOLANA_BUILD_GUIDE.md](../SOLANA_BUILD_GUIDE.md)** - Complete build instructions
- **[SOLANA_DEPLOYMENT_TROUBLESHOOTING.md](../SOLANA_DEPLOYMENT_TROUBLESHOOTING.md)** - Detailed troubleshooting
- **[SOLANA_QUICK_REFERENCE.md](../SOLANA_QUICK_REFERENCE.md)** - Quick command reference
- **[DEPLOYMENT_GUIDE.md](../DEPLOYMENT_GUIDE.md)** - Multi-chain deployment

## 🔒 Security Notes

- **Never commit private keys** - Keep your wallet's private key secure
- **Test on devnet first** - Always test deployments on devnet before mainnet
- **Backup keypairs** - Save `domain_registry-keypair.json` securely
- **Verify addresses** - Double-check wallet addresses before deploying

## 💡 Pro Tips

1. **Use devnet for testing** - It's free and identical to mainnet
2. **Keep deployment info** - The scripts save deployment details in `deployments/`
3. **Update program ID** - After deployment, update `declare_id!()` in `contracts/solana/lib.rs`
4. **Check Solana Explorer** - Verify deployment at https://explorer.solana.com/
5. **Save environment variables** - Scripts output the exact `.env.local` values needed

## 🚀 Quick Start

Complete workflow from scratch:

```bash
# 1. Fix permissions (if needed)
chmod +x scripts/*.sh scripts/*.js 2>/dev/null || find scripts -type f \( -name "*.sh" -o -name "*.js" \) -exec chmod +x {} \;

# 2. Configure Solana
solana config set --url devnet

# 3. Get test SOL
solana airdrop 2

# 4. Deploy
./scripts/build-solana.sh --deploy devnet --treasury YOUR_WALLET_ADDRESS

# 5. Copy the program ID and environment variables from the output
# 6. Update .env.local with the values
# 7. Done! 🎉
```

---

**Need help?** Open an issue on GitHub or check the troubleshooting guides!
