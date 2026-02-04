#!/bin/bash

# Solana Domain Registry Deployment Script
# This script deploys the domain registry program to Solana

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Solana Domain Registry Deployment${NC}\n"

# Check if Anchor is installed
if ! command -v anchor &> /dev/null; then
    echo -e "${RED}❌ Anchor CLI not found${NC}"
    echo "Please install Anchor: https://www.anchor-lang.com/docs/installation"
    exit 1
fi

# Check if Solana CLI is installed
if ! command -v solana &> /dev/null; then
    echo -e "${RED}❌ Solana CLI not found${NC}"
    echo "Please install Solana CLI: https://docs.solana.com/cli/install-solana-cli-tools"
    exit 1
fi

# Get deployment parameters
NETWORK="${1:-devnet}"
TREASURY_ADDRESS="${2}"

echo -e "${YELLOW}📋 Configuration:${NC}"
echo "   Network: $NETWORK"

if [ -z "$TREASURY_ADDRESS" ]; then
    echo -e "${RED}❌ Treasury address required${NC}"
    echo "Usage: ./deploy-solana.sh [network] [treasury_address] [fee_in_lamports]"
    echo "Example: ./deploy-solana.sh devnet YourWalletAddress123 100000"
    exit 1
fi

echo "   Treasury: $TREASURY_ADDRESS"

# Set registration fee (default to 0 if not provided)
REGISTRATION_FEE="${3:-0}"
echo "   Fee: $REGISTRATION_FEE lamports"
echo ""

# Check wallet balance
BALANCE=$(solana balance --url $NETWORK 2>/dev/null || echo "0")
echo -e "${YELLOW}💰 Wallet Balance: $BALANCE${NC}"

if [ "$BALANCE" == "0 SOL" ] || [ "$BALANCE" == "0" ]; then
    echo -e "${RED}❌ Insufficient balance${NC}"
    echo "Please fund your wallet:"
    echo "Devnet: solana airdrop 2 --url devnet"
    echo "Mainnet: Transfer SOL to your wallet"
    exit 1
fi

# Build the program
echo -e "\n${YELLOW}🔨 Building program...${NC}"
anchor build

# Get the program ID
PROGRAM_ID=$(solana address -k target/deploy/domain_registry-keypair.json 2>/dev/null || echo "")

if [ -z "$PROGRAM_ID" ]; then
    echo -e "${RED}❌ Failed to get program ID${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Program ID: $PROGRAM_ID${NC}"

# Deploy to selected network
echo -e "\n${YELLOW}⏳ Deploying to $NETWORK...${NC}"
anchor deploy --provider.cluster $NETWORK

echo -e "${GREEN}✅ Program deployed!${NC}"

# Initialize the registry
echo -e "\n${YELLOW}⏳ Initializing registry...${NC}"

# Create initialization transaction (you'll need to implement this in your client code)
echo "To initialize the registry, run your TypeScript client with:"
echo "  Treasury: $TREASURY_ADDRESS"
echo "  Fee: $REGISTRATION_FEE lamports"

# Save deployment information
DEPLOY_INFO="deployments/solana-$NETWORK-$(date +%s).json"
mkdir -p deployments

cat > $DEPLOY_INFO << EOF
{
  "network": "$NETWORK",
  "programId": "$PROGRAM_ID",
  "treasury": "$TREASURY_ADDRESS",
  "registrationFee": "$REGISTRATION_FEE",
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "cluster": "$NETWORK"
}
EOF

echo -e "${GREEN}💾 Deployment info saved to: $DEPLOY_INFO${NC}"

# Print configuration for .env
echo -e "\n${YELLOW}📝 Add to your .env.local:${NC}"
echo "========================================"
echo "NEXT_PUBLIC_SOLANA_CONTRACT_ADDRESS=$PROGRAM_ID"
echo "NEXT_PUBLIC_SOLANA_PAYMENT_ADDRESS=$TREASURY_ADDRESS"
echo "NEXT_PUBLIC_SOLANA_NETWORK=$NETWORK"
echo "========================================"

echo -e "\n${GREEN}🎉 Deployment complete!${NC}"
echo -e "\n${YELLOW}📚 Next steps:${NC}"
echo "1. Initialize the registry with the provided treasury address and fee"
echo "2. Update your frontend configuration with the program ID"
echo "3. Test domain registration on $NETWORK"
echo ""
echo "Program Explorer: https://explorer.solana.com/address/$PROGRAM_ID?cluster=$NETWORK"
