# Solana Program Build & Deploy Guide

This guide provides step-by-step instructions for building and deploying the Solana domain registry program to devnet (test network) and mainnet.

> **💡 Having Issues?** See [SOLANA_DEPLOYMENT_TROUBLESHOOTING.md](./SOLANA_DEPLOYMENT_TROUBLESHOOTING.md) for solutions to common problems like "No such file or directory" errors.

## 🚨 Common Error: Using `cargo build-sbf` Incorrectly

**❌ WRONG:**
```bash
cargo build-sbf --manifest-path=Cargo.toml --target=x86_64-pc-windows-gnu
```

**Error:** `Found argument '--target' which wasn't expected`

**Why it fails:** The `cargo build-sbf` command doesn't accept the `--target` flag like standard Cargo. Solana programs are built specifically for the BPF target, and the target is automatically set.

## ✅ Correct Build Methods

### Method 1: Using Anchor (Recommended)

Anchor is the recommended framework for building Solana programs. It handles all the build configuration automatically.

```bash
# Navigate to the Solana contract directory
cd contracts/solana

# Build the program
anchor build
```

This will:
- Automatically set the correct target (`sbf-solana-solana`)
- Compile your Rust program
- Generate IDL files
- Create the program binary in `target/deploy/`

### Method 2: Using cargo build-sbf (Without --target flag)

If you prefer to use `cargo build-sbf` directly, **do not** specify a target:

```bash
# Navigate to the Solana contract directory
cd contracts/solana

# Build WITHOUT --target flag
cargo build-sbf --manifest-path=Cargo.toml
```

The `cargo build-sbf` command automatically uses the correct Solana BPF target. You don't need to (and shouldn't) specify `--target`.

## 📋 Prerequisites

Before building, ensure you have:

### 1. Rust and Cargo
```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Verify installation
rustc --version
cargo --version
```

### 2. Solana CLI Tools
```bash
# Install Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"

# Add to PATH (add to ~/.bashrc or ~/.zshrc)
export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"

# Verify installation
solana --version
```

### 3. Anchor CLI (Recommended)
```bash
# Install Anchor CLI
cargo install --git https://github.com/coral-xyz/anchor anchor-cli --locked

# Verify installation
anchor --version
```

### 4. Solana BPF Tools
```bash
# Install BPF SDK (required for cargo build-sbf)
solana install

# This installs the BPF toolchain needed for building Solana programs
```

## 🔨 Building the Program

### Step 1: Navigate to Contract Directory
```bash
cd contracts/solana
```

### Step 2: Build
```bash
# Using Anchor (recommended)
anchor build

# OR using cargo build-sbf (without --target!)
cargo build-sbf
```

### Step 3: Verify Build
```bash
# Check that the program was built
ls -la target/deploy/

# You should see:
# - domain_registry.so (the compiled program)
# - domain_registry-keypair.json (the program keypair)
```

## 🚀 Deploying to Testnet

### Step 1: Configure Solana CLI for Devnet
```bash
# Set cluster to devnet
solana config set --url devnet

# Verify configuration
solana config get
```

### Step 2: Create/Check Your Wallet
```bash
# Check your wallet address
solana address

# Check balance
solana balance

# If balance is 0, request airdrop (devnet only)
solana airdrop 2
```

### Step 3: Get Program ID
```bash
# Get the program ID from the keypair
solana address -k target/deploy/domain_registry-keypair.json
```

### Step 4: Deploy Using Helper Script
```bash
# From project root
./scripts/deploy-solana.sh devnet YOUR_TREASURY_WALLET_ADDRESS 100000

# Example:
# ./scripts/deploy-solana.sh devnet 8mKKZjQ4qvF3jZ9p7S6L5nX2R4W1M3fY5tH6uG7eV8wP 100000
```

### Step 5: Verify Deployment
```bash
# Check the program was deployed
solana program show YOUR_PROGRAM_ID --url devnet

# View on Solana Explorer
# https://explorer.solana.com/address/YOUR_PROGRAM_ID?cluster=devnet
```

## 🌐 Deploying to Mainnet

**⚠️ WARNING:** Deploying to mainnet costs real SOL. Make sure you've tested thoroughly on devnet first!

### Step 1: Switch to Mainnet
```bash
# Set cluster to mainnet-beta
solana config set --url mainnet-beta

# Verify
solana config get
```

### Step 2: Ensure You Have Sufficient SOL
```bash
# Check balance (you need ~2-5 SOL for deployment, depending on program size)
solana balance

# If insufficient, transfer SOL to your wallet
```

**Note:** Deployment cost depends on program size. Typical costs are 1-3 SOL, but having 5 SOL provides a comfortable buffer for larger programs or multiple deployment attempts.

### Step 3: Deploy
```bash
# Deploy to mainnet
./scripts/deploy-solana.sh mainnet-beta YOUR_TREASURY_WALLET_ADDRESS 100000
```

### Step 4: Update Your .env.local
```bash
# Add to .env.local
NEXT_PUBLIC_SOLANA_CONTRACT_ADDRESS=YOUR_PROGRAM_ID
NEXT_PUBLIC_SOLANA_PAYMENT_ADDRESS=YOUR_TREASURY_WALLET
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
NEXT_PUBLIC_USE_PRODUCTION_MODE=true
```

## 🛠️ Quick Build Script

We've also included a helper script for easier building:

```bash
# Make the script executable
chmod +x scripts/build-solana.sh

# Build the program
./scripts/build-solana.sh

# Build and deploy to devnet
./scripts/build-solana.sh --deploy devnet YOUR_TREASURY_ADDRESS
```

## ❌ Common Errors and Solutions

### Error: `cargo build-sbf: command not found`

**Solution:** Install Solana CLI tools:
```bash
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
solana install
```

### Error: `--target flag not recognized`

**Solution:** Remove the `--target` flag. Don't use:
```bash
# ❌ WRONG
cargo build-sbf --target=x86_64-pc-windows-gnu
```

Use instead:
```bash
# ✅ CORRECT
cargo build-sbf
# or better:
anchor build
```

### Error: `could not find Cargo.toml`

**Solution:** Make sure you're in the `contracts/solana` directory:
```bash
cd contracts/solana
anchor build
```

### Error: `Insufficient funds`

**Solution:** For devnet, request an airdrop:
```bash
solana airdrop 2 --url devnet
```

For mainnet, transfer SOL to your wallet.

### Error: `Program modify data: Invalid argument`

**Solution:** The program may already be deployed. Use `--force` flag:
```bash
anchor deploy --force --provider.cluster devnet
```

### Error: `Anchor.toml: No such file`

**Solution:** Anchor.toml should be in the `contracts/solana` directory. Make sure you're running commands from there.

## 📁 Build Artifacts

After a successful build, you'll find:

```
contracts/solana/target/
├── deploy/
│   ├── domain_registry.so          # Compiled program (deploy this)
│   └── domain_registry-keypair.json # Program keypair (keep safe!)
└── idl/
    └── domain_registry.json         # Interface Definition Language file
```

**Important:** Keep `domain_registry-keypair.json` secure! This is needed to upgrade your program.

## 🔍 Testing Your Deployment

After deployment, test the program:

```bash
# Test on devnet
solana program show YOUR_PROGRAM_ID --url devnet

# Interact with your program using Anchor
cd contracts/solana
anchor test --provider.cluster devnet
```

## 📚 Additional Resources

- [Solana Documentation](https://docs.solana.com/)
- [Anchor Documentation](https://www.anchor-lang.com/)
- [Solana Cookbook](https://solanacookbook.com/)
- [Solana Program Library](https://spl.solana.com/)

## 🆘 Need Help?

1. Check this guide for common errors
2. Review [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
3. See [contracts/README.md](./contracts/README.md)
4. Open a GitHub issue

## 🎯 Quick Reference

```bash
# Build
cd contracts/solana && anchor build

# Deploy to devnet
./scripts/deploy-solana.sh devnet YOUR_TREASURY 100000

# Deploy to mainnet
solana config set --url mainnet-beta
./scripts/deploy-solana.sh mainnet-beta YOUR_TREASURY 100000

# Check deployment
solana program show YOUR_PROGRAM_ID
```

---

**Remember:** Never use `--target` flag with `cargo build-sbf`. Use `anchor build` instead for the best experience! 🚀
