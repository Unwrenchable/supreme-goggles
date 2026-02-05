# Solana Deployment Troubleshooting Guide

This guide addresses common issues when deploying the Solana domain registry program to devnet or mainnet.

## ⚡ Quick Fix (Copy & Paste)

**If you're getting "No such file or directory" errors, run this ONE command:**

```bash
chmod +x scripts/*.sh scripts/*.js 2>/dev/null || find scripts -type f \( -name "*.sh" -o -name "*.js" \) -exec chmod +x {} \;
```

This fixes all permission issues instantly. After running it, try your deployment command again!

---

## 🚨 Common Error: "No such file or directory" when running scripts

### Problem
```bash
$ ./scripts/build-solana.sh --deploy devnet --treasury YOUR_WALLET
-bash: ./scripts/build-solana.sh: No such file or directory
```

### Why This Happens
This error occurs when the script files don't have executable permissions, which commonly happens when:
- You downloaded the repository as a ZIP file (loses Unix file permissions)
- You cloned on Windows without proper Git configuration
- The files were copied without preserving permissions

### Solution 1: One-Liner Fix (Fastest)
```bash
# Copy and paste this single command:
chmod +x scripts/*.sh scripts/*.js 2>/dev/null || find scripts -type f \( -name "*.sh" -o -name "*.js" \) -exec chmod +x {} \;
```

This command makes all scripts executable in one go. Works even if some files don't exist.

### Solution 2: Run the Setup Script
```bash
# If the setup script exists, run it:
bash scripts/setup-scripts.sh
```

**Note:** If you get "No such file or directory" for setup-scripts.sh itself, use Solution 1 instead.

### Solution 3: Manually Set Permissions
```bash
# Make all scripts executable
chmod +x scripts/build-solana.sh
chmod +x scripts/deploy-solana.sh
chmod +x scripts/setup-scripts.sh

# Now you can run them
./scripts/build-solana.sh --deploy devnet --treasury YOUR_WALLET
```

### Solution 4: Run with bash Directly
You can always run scripts directly with bash, even without execute permissions:
```bash
bash scripts/build-solana.sh --deploy devnet --treasury YOUR_WALLET
```

### Solution 5: Clone Repository with Git (Best Practice)
Instead of downloading as ZIP, clone with Git to preserve all file attributes:
```bash
# Clone the repository
git clone https://github.com/Unwrenchable/supreme-goggles.git
cd supreme-goggles

# Scripts will already have correct permissions
./scripts/build-solana.sh --deploy devnet --treasury YOUR_WALLET
```

## 🔍 Verify File Exists
Before running, verify the script exists:
```bash
# List scripts directory
ls -la scripts/

# Should show files like:
# -rwxrwxr-x build-solana.sh
# -rwxrwxr-x deploy-solana.sh
# -rwxrwxr-x setup-scripts.sh
```

If you see `-rw-rw-r--` instead of `-rwxrwxr-x`, the files are not executable (missing the `x` permission).

## 📋 Other Common Issues

### Issue: "anchor: command not found"
**Solution:**
```bash
# Install Anchor CLI
cargo install --git https://github.com/coral-xyz/anchor anchor-cli --locked

# Or use cargo build-sbf instead (Anchor is optional)
# The script will automatically fall back to cargo build-sbf
```

### Issue: "cargo build-sbf: command not found"
**Solution:**
```bash
# Install Solana CLI tools
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"

# Add to PATH
export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"

# Install BPF tools
solana install
```

### Issue: "Insufficient balance" or "Insufficient funds"
**Solution:**
```bash
# For devnet, get free test SOL
solana config set --url devnet
solana airdrop 2

# Check your balance
solana balance

# For mainnet, you need to fund your wallet with real SOL
```

### Issue: "could not find Cargo.toml"
**Solution:**
```bash
# Make sure you're running the script from the project root
cd /path/to/supreme-goggles
./scripts/build-solana.sh

# The script will automatically navigate to contracts/solana
```

### Issue: Build fails with "error: package `anchor-lang v0.29.0` cannot be built"
**Solution:**
```bash
# Update Rust to the latest version
rustup update

# Clean build cache
cd contracts/solana
cargo clean

# Try building again
anchor build
```

### Issue: "Found argument '--target' which wasn't expected"
**Solution:**
This happens if you try to use `--target` flag with `cargo build-sbf`. The scripts handle this correctly.

**Don't do this:**
```bash
cargo build-sbf --target=x86_64-pc-windows-gnu  # ❌ WRONG
```

**Correct usage:**
```bash
cargo build-sbf  # ✅ No --target flag needed
# or
anchor build     # ✅ Recommended
```

### Issue: "Program ID mismatch" after deployment
**Solution:**
After deploying, you need to update the program ID in two places:

1. **Update `contracts/solana/lib.rs`:**
```rust
// Replace the placeholder with your actual program ID
declare_id!("YourActualProgramIdHere123456789");
```

2. **Update `contracts/solana/Anchor.toml`:**
```toml
[programs.devnet]
domain_registry = "YourActualProgramIdHere123456789"
```

Get your program ID:
```bash
solana address -k target/deploy/domain_registry-keypair.json
```

Then rebuild and redeploy:
```bash
anchor build
anchor deploy --provider.cluster devnet
```

## 🔧 Complete Setup Checklist

Use this checklist to ensure everything is configured correctly:

- [ ] **Rust installed**: `rustc --version`
- [ ] **Solana CLI installed**: `solana --version`
- [ ] **Anchor CLI installed** (optional): `anchor --version`
- [ ] **BPF tools installed**: `solana install`
- [ ] **Scripts are executable**: `ls -la scripts/*.sh` (should show `-rwxrwxr-x`)
- [ ] **Wallet has funds**: `solana balance` (devnet: use airdrop)
- [ ] **Network configured**: `solana config get` (should show devnet or mainnet)
- [ ] **In project root**: `pwd` (should end with `/supreme-goggles`)

## 🚀 Quick Start After Troubleshooting

Once everything is set up:

```bash
# 1. Configure for devnet
solana config set --url devnet

# 2. Get test SOL
solana airdrop 2

# 3. Build and deploy
./scripts/build-solana.sh --deploy devnet --treasury YOUR_WALLET_ADDRESS

# 4. Save the program ID from the output
# 5. Update .env.local with the values shown
```

## 📞 Still Having Issues?

If you're still experiencing problems:

1. **Check the build logs** for specific error messages
2. **Review [SOLANA_BUILD_GUIDE.md](./SOLANA_BUILD_GUIDE.md)** for detailed build instructions
3. **Check Solana documentation**: https://docs.solana.com/
4. **Check Anchor documentation**: https://www.anchor-lang.com/
5. **Open an issue** on GitHub with:
   - Your operating system
   - Error message (full output)
   - Commands you ran
   - Output of `solana --version`, `anchor --version`, `rustc --version`

## 🔗 Additional Resources

- [SOLANA_BUILD_GUIDE.md](./SOLANA_BUILD_GUIDE.md) - Comprehensive build instructions
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Multi-chain deployment guide
- [SOLANA_QUICK_REFERENCE.md](./SOLANA_QUICK_REFERENCE.md) - Quick command reference
- [Solana Documentation](https://docs.solana.com/)
- [Anchor Documentation](https://www.anchor-lang.com/)

---

**Last Updated**: February 2026
