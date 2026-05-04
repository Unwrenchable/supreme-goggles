# Solana Build Quick Reference

> **💡 Script Permission Error?** If you get "No such file or directory" when running `./scripts/build-solana.sh`:
> - Run `bash scripts/setup-scripts.sh` first to fix permissions
> - OR run `bash scripts/build-solana.sh` instead of `./scripts/build-solana.sh`
> - See [SOLANA_DEPLOYMENT_TROUBLESHOOTING.md](./SOLANA_DEPLOYMENT_TROUBLESHOOTING.md) for more help

## ❌ Common Error: Using --target Flag

### The Problem
```bash
# ❌ THIS WILL FAIL:
cargo build-sbf --manifest-path=Cargo.toml --target=x86_64-pc-windows-gnu

# Error: Found argument '--target' which wasn't expected
```

### Why It Fails
The `cargo build-sbf` command is specifically for building Solana programs for the BPF (Berkeley Packet Filter) target. It **automatically** sets the target to `sbf-solana-solana`. You don't need to (and can't) specify a custom target.

## ✅ Correct Solutions

### Solution 1: Use Anchor (Recommended)
```bash
cd contracts/solana
anchor build
```

### Solution 2: Use cargo build-sbf WITHOUT --target
```bash
cd contracts/solana
cargo build-sbf --manifest-path=Cargo.toml
# or simply:
cargo build-sbf
```

### Solution 3: Use Our Helper Script (Easiest)
```bash
# Build only
./scripts/build-solana.sh

# Build and deploy to devnet
./scripts/build-solana.sh --deploy devnet --treasury YOUR_WALLET_ADDRESS

# Build and deploy to mainnet
./scripts/build-solana.sh --deploy mainnet-beta --treasury YOUR_WALLET_ADDRESS
```

## 📋 Prerequisites Checklist

- [ ] Rust installed: `rustc --version`
- [ ] Solana CLI installed: `solana --version`
- [ ] Anchor CLI installed (recommended): `anchor --version`
- [ ] BPF tools installed: `solana install`
- [ ] Wallet configured: `solana address`
- [ ] Sufficient SOL balance: `solana balance`

## 🚀 Complete Build & Deploy Flow

### Devnet (Testing)
```bash
# 1. Configure for devnet
solana config set --url devnet

# 2. Get some SOL
solana airdrop 2

# 3. Build and deploy
./scripts/build-solana.sh --deploy devnet --treasury YOUR_WALLET_ADDRESS
```

### Mainnet (Production)
```bash
# 1. Configure for mainnet
solana config set --url mainnet-beta

# 2. Check balance (need ~5-10 SOL)
solana balance

# 3. Build and deploy
./scripts/build-solana.sh --deploy mainnet-beta --treasury YOUR_WALLET_ADDRESS
```

## 🆘 Quick Troubleshooting

| Error | Solution |
|-------|----------|
| `No such file or directory` | Run `bash scripts/setup-scripts.sh` or use `bash scripts/build-solana.sh` |
| `--target flag not recognized` | Remove `--target` flag or use `anchor build` |
| `cargo build-sbf: command not found` | Install Solana CLI: `sh -c "$(curl -sSfL https://release.solana.com/stable/install)"` |
| `anchor: command not found` | Install Anchor: `cargo install --git https://github.com/coral-xyz/anchor anchor-cli --locked` |
| `Insufficient funds` | **Devnet:** `solana airdrop 2` **Mainnet:** Transfer SOL to wallet |
| `could not find Cargo.toml` | Make sure you're in `contracts/solana` directory |
| `Program modify data: Invalid argument` | Program already deployed, use `--force` flag |

**For more solutions, see [SOLANA_DEPLOYMENT_TROUBLESHOOTING.md](./SOLANA_DEPLOYMENT_TROUBLESHOOTING.md)**

## 📖 Full Documentation

For more details, see:
- [SOLANA_BUILD_GUIDE.md](./SOLANA_BUILD_GUIDE.md) - Complete guide with explanations
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Multi-chain deployment guide
- [contracts/README.md](./contracts/README.md) - Smart contract documentation

## 💡 Pro Tips

1. **Always test on devnet first** before deploying to mainnet
2. **Keep your program keypair safe** (`domain_registry-keypair.json`) - you need it for upgrades
3. **Use the helper script** (`build-solana.sh`) to avoid common mistakes
4. **Check your network** with `solana config get` before deploying
5. **Verify deployment** on Solana Explorer after deployment

## 🔗 Useful Links

- [Solana Documentation](https://docs.solana.com/)
- [Anchor Documentation](https://www.anchor-lang.com/)
- [Solana Explorer (Devnet)](https://explorer.solana.com/?cluster=devnet)
- [Solana Explorer (Mainnet)](https://explorer.solana.com/)
- [Solana Cookbook](https://solanacookbook.com/)

---

**Need more help?** See [SOLANA_BUILD_GUIDE.md](./SOLANA_BUILD_GUIDE.md) for detailed instructions! 🚀
