#!/bin/bash

# Quick Devnet Deployment Script for AtomicFizzCaps
# This script will build and deploy your Solana domain registry to devnet

set -e

echo "========================================"
echo "🚀 AtomicFizzCaps Devnet Deployment"
echo "========================================"
echo ""

# Setup environment
export PATH="/tmp/solana-release/bin:/home/codespace/.cargo/bin:$PATH"

#Check balance
echo "📊 Checking wallet balance..."
BALANCE=$(solana balance)
echo "Current balance: $BALANCE"
echo ""

if [ "$BALANCE" == "0 SOL" ]; then
    echo "❌ No SOL in wallet. Please get devnet SOL from:"
    echo "   https://faucet.solana.com"
    echo "   Wallet: $(solana address)"
    echo ""
    exit 1
fi

# Check Anchor installation
if ! command -v anchor &> /dev/null; then
    echo "❌ Anchor not found. Waiting for installation to complete..."
    exit 1
fi

echo "✅ Anchor version: $(anchor --version)"
echo ""

# Navigate to Solana contracts directory
cd /workspaces/supreme-goggles/contracts/solana

# Build the program
echo "🔨 Building Solana program..."
anchor build
echo "✅ Build complete!"
echo ""

# Get the program ID
PROGRAM_ID=$(solana address -k ../../target/deploy/domain_registry-keypair.json)
echo "📋 Program ID: $PROGRAM_ID"
echo ""

# Deploy to devnet
echo "🚀 Deploying to devnet..."
anchor deploy --provider.cluster devnet
echo "✅ Deployment complete!"
echo ""

# Get wallet address for treasury
WALLET_ADDRESS=$(solana address)

# Save deployment info
TIMESTAMP=$(date +%s)
DEPLOY_FILE="../../deployments/solana-devnet-$TIMESTAMP.json"
mkdir -p ../../deployments

cat > $DEPLOY_FILE << EOF
{
  "network": "devnet",
  "programId": "$PROGRAM_ID",
  "treasury": "$WALLET_ADDRESS",
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "deployedBy": "$WALLET_ADDRESS",
  "cluster": "devnet"
}
EOF

echo "💾 Deployment info saved to: $DEPLOY_FILE"
echo ""

echo "========================================"
echo "✅ DEPLOYMENT SUCCESSFUL!"
echo "========================================"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Update your program ID in the source code:"
echo "   File: contracts/solana/lib.rs"
echo "   Change line 6 to: declare_id!(\"$PROGRAM_ID\");"
echo ""
echo "2. Add to .env.local:"
echo "   NEXT_PUBLIC_SOLANA_CONTRACT_ADDRESS=$PROGRAM_ID"
echo "   NEXT_PUBLIC_SOLANA_PAYMENT_ADDRESS=$WALLET_ADDRESS"
echo "   NEXT_PUBLIC_SOLANA_NETWORK=devnet"
echo "   NEXT_PUBLIC_USE_PRODUCTION_MODE=true"
echo ""
echo "3. Initialize the registry (run this in your frontend or write a script):"
echo "   Treasury: $WALLET_ADDRESS"
echo "   Fee: 0 (or your desired fee in lamports)"
echo ""
echo "4. View on Solana Explorer:"
echo "   https://explorer.solana.com/address/$PROGRAM_ID?cluster=devnet"
echo ""
