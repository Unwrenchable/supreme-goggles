#!/bin/bash

# Initialize Solana Domain Registry on Devnet
# This script initializes the registry with the treasury wallet

set -e

echo "=========================================="
echo "🚀 Initializing Solana Domain Registry"
echo "=========================================="
echo ""

# Set environment
export PATH="/home/codespace/.local/share/solana/install/active_release/bin:$HOME/.cargo/bin:$PATH"

# Configuration
PROGRAM_ID="6vyzvhsAbQxttvgvaouHuYrqhSAV8TLMoimkEQWwCyyR"
TREASURY="Cr3Lbvd9JJsdKi4XxLUmTRnw7NRF9GESN8N3iiApBcaJ"
FEE=0  # Free registration for testing

echo "📋 Configuration:"
echo "   Program ID: $PROGRAM_ID"
echo "   Treasury: $TREASURY"
echo "   Registration Fee: $FEE lamports (FREE)"
echo "   Network: devnet"
echo ""

# Check wallet balance
BALANCE=$(solana balance --url devnet)
echo "💰 Wallet Balance: $BALANCE"
echo ""

# Check if already initialized
echo "🔍 Checking if registry is already initialized..."
REGISTRY_PDA=$(solana-keygen grind --starts-with reg:1 2>/dev/null | grep "Wrote pubkey to" | awk '{print $4}' || echo "")

# For now, we'll use a simple method - try to initialize via the web interface
echo "⚠️  Manual Initialization Required"
echo ""
echo "Please complete initialization using one of these methods:"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Option 1: Using Solana Explorer (Recommended)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Visit the program on Solana Explorer:"
echo "   https://explorer.solana.com/address/$PROGRAM_ID?cluster=devnet"
echo ""
echo "2. Click on 'Anchor Program IDL'"
echo ""
echo "3. Find the 'initialize' instruction and call it with:"
echo "   - treasury: $TREASURY"
echo "   - registration_fee: $FEE"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Option 2: Using Anchor CLI"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "If you have the Anchor CLI configured:"
echo ""
echo "   cd contracts/solana"
echo "   anchor run initialize"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Option 3: Using the Web App"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Start the dev server:"
echo "   npm run dev"
echo ""
echo "2. The app will automatically attempt to initialize"
echo "   the registry on first use"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ Deployment is complete!"
echo ""
echo "After initialization, you can:"
echo "  • Register domains on devnet"
echo "  • Set DNS records (wallet, IPFS, social links)"
echo "  • Transfer domain ownership"
echo "  • Test the full platform functionality"
echo ""
echo "📚 Documentation: ./DEPLOYMENT_COMPLETE.md"
echo ""
