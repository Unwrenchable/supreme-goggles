#!/bin/bash

# Script Setup Helper
# This script ensures all deployment scripts have the correct permissions
# Run this if you downloaded the repository as a ZIP file

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🔧 Setting up deployment scripts...${NC}\n"

# Get the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# List of scripts to make executable
SCRIPTS=(
    "build-solana.sh"
    "deploy-solana.sh"
    "check-deployment.js"
    "verify-deployment-ready.js"
)

echo -e "${BLUE}📋 Making scripts executable:${NC}"
for script in "${SCRIPTS[@]}"; do
    SCRIPT_PATH="$SCRIPT_DIR/$script"
    if [ -f "$SCRIPT_PATH" ]; then
        chmod +x "$SCRIPT_PATH"
        echo -e "  ✅ $script"
    else
        echo -e "  ⚠️  $script (not found)"
    fi
done

echo -e "\n${GREEN}✅ Setup complete!${NC}\n"
echo -e "${BLUE}📚 Next steps:${NC}"
echo "  1. Build the Solana program:"
echo "     ./scripts/build-solana.sh"
echo ""
echo "  2. Or build and deploy in one command:"
echo "     ./scripts/build-solana.sh --deploy devnet --treasury YOUR_WALLET_ADDRESS"
echo ""
echo -e "${YELLOW}💡 Tip: See SOLANA_BUILD_GUIDE.md for detailed instructions${NC}"
