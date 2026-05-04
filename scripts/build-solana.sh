#!/bin/bash

# Solana Program Build Helper Script
# This script provides an easy way to build and optionally deploy the Solana program

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}🔨 Solana Program Build Helper${NC}\n"

# Function to show usage
show_usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  --help              Show this help message"
    echo "  --deploy NETWORK    Deploy after building (devnet|mainnet-beta)"
    echo "  --treasury ADDRESS  Treasury address (required with --deploy)"
    echo "  --fee LAMPORTS      Registration fee in lamports (default: 100000)"
    echo ""
    echo "Examples:"
    echo "  $0                                            # Just build"
    echo "  $0 --deploy devnet --treasury ADDR123         # Build and deploy to devnet"
    echo "  $0 --deploy mainnet-beta --treasury ADDR      # Build and deploy to mainnet"
    echo ""
    exit 0
}

# Parse arguments
DEPLOY=""
TREASURY=""
FEE="100000"

while [[ $# -gt 0 ]]; do
    case $1 in
        --help)
            show_usage
            ;;
        --deploy)
            DEPLOY="$2"
            shift 2
            ;;
        --treasury)
            TREASURY="$2"
            shift 2
            ;;
        --fee)
            FEE="$2"
            shift 2
            ;;
        *)
            echo -e "${RED}❌ Unknown option: $1${NC}"
            show_usage
            ;;
    esac
done

# Navigate to Solana contracts directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SOLANA_DIR="$PROJECT_ROOT/contracts/solana"

echo -e "${BLUE}📂 Project root: $PROJECT_ROOT${NC}"
echo -e "${BLUE}📂 Solana contracts: $SOLANA_DIR${NC}\n"

if [ ! -d "$SOLANA_DIR" ]; then
    echo -e "${RED}❌ Solana contracts directory not found: $SOLANA_DIR${NC}"
    exit 1
fi

cd "$SOLANA_DIR"

# Check if Anchor is installed
if ! command -v anchor &> /dev/null; then
    echo -e "${YELLOW}⚠️  Anchor CLI not found. Trying cargo build-sbf...${NC}"
    
    if ! command -v cargo-build-sbf &> /dev/null; then
        echo -e "${RED}❌ Neither Anchor nor cargo-build-sbf found${NC}"
        echo ""
        echo "Please install one of the following:"
        echo ""
        echo "Option 1 - Anchor CLI (Recommended):"
        echo "  cargo install --git https://github.com/coral-xyz/anchor anchor-cli --locked"
        echo ""
        echo "Option 2 - Solana CLI with BPF tools:"
        echo "  sh -c \"\$(curl -sSfL https://release.solana.com/stable/install)\""
        echo "  solana install"
        echo ""
        exit 1
    fi
    
    # Use cargo build-sbf (without --target flag!)
    echo -e "${YELLOW}🔨 Building with cargo build-sbf...${NC}"
    cargo build-sbf --manifest-path=Cargo.toml
else
    # Use Anchor (recommended)
    echo -e "${YELLOW}🔨 Building with Anchor...${NC}"
    anchor build
fi

# Check if build was successful
if [ -f "target/deploy/domain_registry.so" ]; then
    echo -e "${GREEN}✅ Build successful!${NC}\n"
    
    # Show build artifacts
    echo -e "${BLUE}📦 Build artifacts:${NC}"
    ls -lh target/deploy/domain_registry.so
    
    if [ -f "target/deploy/domain_registry-keypair.json" ]; then
        echo -e "${BLUE}🔑 Program keypair:${NC}"
        ls -lh target/deploy/domain_registry-keypair.json
        
        # Show program ID
        PROGRAM_ID=$(solana address -k target/deploy/domain_registry-keypair.json 2>/dev/null || echo "")
        if [ -n "$PROGRAM_ID" ]; then
            echo -e "${GREEN}🆔 Program ID: $PROGRAM_ID${NC}"
        else
            echo -e "${YELLOW}⚠️  Could not retrieve Program ID${NC}"
            echo -e "${YELLOW}   This may mean Solana CLI is not installed or the keypair file is invalid${NC}"
            echo -e "${YELLOW}   You can get the program ID later with: solana address -k target/deploy/domain_registry-keypair.json${NC}"
        fi
    fi
    echo ""
else
    echo -e "${RED}❌ Build failed - program binary not found${NC}"
    exit 1
fi

# Deploy if requested
if [ -n "$DEPLOY" ]; then
    echo -e "${YELLOW}🚀 Deploying to $DEPLOY...${NC}\n"
    
    if [ -z "$TREASURY" ]; then
        echo -e "${RED}❌ Treasury address required for deployment${NC}"
        echo "Use: $0 --deploy $DEPLOY --treasury YOUR_WALLET_ADDRESS"
        exit 1
    fi
    
    # Check if deploy script exists
    DEPLOY_SCRIPT="$PROJECT_ROOT/scripts/deploy-solana.sh"
    if [ ! -f "$DEPLOY_SCRIPT" ]; then
        echo -e "${RED}❌ Deploy script not found: $DEPLOY_SCRIPT${NC}"
        exit 1
    fi
    
    # Make sure deploy script is executable
    chmod +x "$DEPLOY_SCRIPT"
    
    # Run deployment
    cd "$PROJECT_ROOT"
    ./scripts/deploy-solana.sh "$DEPLOY" "$TREASURY" "$FEE"
else
    echo -e "${GREEN}🎉 Build complete!${NC}\n"
    echo -e "${BLUE}📋 Next steps:${NC}"
    echo "  1. Deploy to devnet for testing:"
    echo "     ./scripts/deploy-solana.sh devnet YOUR_TREASURY_ADDRESS 100000"
    echo ""
    echo "  2. Or build and deploy in one command:"
    echo "     $0 --deploy devnet --treasury YOUR_TREASURY_ADDRESS"
    echo ""
    echo "  3. For mainnet deployment:"
    echo "     solana config set --url mainnet-beta"
    echo "     $0 --deploy mainnet-beta --treasury YOUR_TREASURY_ADDRESS"
    echo ""
fi

echo -e "${BLUE}💡 Tip: See SOLANA_BUILD_GUIDE.md for detailed instructions${NC}"
echo -e "${BLUE}📚 Documentation: https://github.com/Unwrenchable/supreme-goggles${NC}"
