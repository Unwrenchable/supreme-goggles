#!/bin/bash

# Setup Status Checker for AtomicFizzCaps Devnet Deployment

echo "========================================"
echo "🔍 Checking Setup Status"
echo "========================================"
echo ""

# Set up environment
export PATH="/tmp/solana-release/bin:/home/codespace/.cargo/bin:$PATH"

# Check Rust
echo -n "Rust... "
if command -v rustc &> /dev/null; then
    echo "✅ $(rustc --version)"
else
    echo "❌ Not installed"
fi

# Check Solana CLI
echo -n "Solana CLI... "
if command -v solana &> /dev/null; then
    echo "✅ $(solana --version 2>&1 | head -1)"
else
    echo "❌ Not installed"
fi

# Check Anchor
echo -n "Anchor CLI... "
if command -v anchor &> /dev/null; then
    VERSION=$(anchor --version 2>&1)
    if [[ $VERSION == *"Error"* ]]; then
        echo "⚠️  Installed but not configured (run: avm use 0.29.0)"
    else
        echo "✅ $VERSION"
    fi
else
    echo "❌ Not installed"
fi

# Check Solana config
echo ""
echo "Solana Configuration:"
if command -v solana &> /dev/null; then
    solana config get
    echo ""

    # Check balance
    echo -n "Wallet Balance: "
    BALANCE=$(solana balance 2>&1)
    if [[ $BALANCE == *"Error"* ]]; then
        echo "❌ Error getting balance"
    elif [[ $BALANCE == "0 SOL" ]]; then
        echo "⚠️  $BALANCE - Need devnet SOL!"
        echo "   Get from: https://faucet.solana.com"
        echo "   Wallet: $(solana address)"
    else
        echo "✅ $BALANCE"
    fi
fi

echo ""
echo "========================================"
echo "📋 Status Summary"
echo "========================================"

READY=true

if ! command -v solana &> /dev/null; then
    echo "❌ Solana CLI not installed"
    READY=false
fi

if ! command -v anchor &> /dev/null; then
    echo "❌ Anchor CLI not installed"
    READY=false
fi

if command -v solana &> /dev/null; then
    BALANCE=$(solana balance 2>&1)
    if [[ $BALANCE == "0 SOL" ]]; then
        echo "⚠️  No devnet SOL - get from https://faucet.solana.com"
        READY=false
    fi
fi

echo ""
if [ "$READY" = true ]; then
    echo "✅ ALL SYSTEMS READY! You can run: ./deploy-devnet.sh"
else
    echo "⚠️  Setup incomplete - follow the steps above"
fi

echo ""
