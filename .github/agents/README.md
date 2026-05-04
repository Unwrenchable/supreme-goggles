# Custom Agents for AtomicFizzCaps

This directory contains custom agent configurations for GitHub Copilot to provide specialized assistance for this Web3 naming service platform.

## Available Agents

### 1. Web3 Development Specialist (`web3-specialist.md`)

**Purpose**: Expert assistance for Web3 development tasks specific to this repository.

**Expertise**:
- Next.js 16 with App Router and React 19
- TypeScript 5 and modern JavaScript
- Solana blockchain integration (@solana/wallet-adapter)
- EVM blockchain integration (wagmi, viem, RainbowKit, ethers.js)
- Web3 wallet connections (Phantom, MetaMask, WalletConnect)
- Multi-chain support (Ethereum, Polygon, BSC, Arbitrum, etc.)
- Domain name registration and management
- Smart contract interactions

**When to Use**:
- Making changes to blockchain integration code
- Updating wallet connection logic
- Modifying domain registration functionality
- Adding new blockchain network support
- Debugging Web3-specific issues
- Implementing new features related to domain management

**Example Tasks**:
```
"Add support for Base chain to the wallet connection"
"Fix Phantom wallet deep linking on mobile"
"Implement domain transfer functionality"
"Update the domain validation logic for custom extensions"
```

## How Custom Agents Work

GitHub Copilot uses these configuration files to provide more contextual and accurate assistance when working on this repository. The agents understand:

1. **Repository Structure**: Where to find components, API routes, utilities
2. **Tech Stack**: Specific versions and configurations used
3. **Best Practices**: Coding standards and patterns used in this project
4. **Common Patterns**: How to implement features consistent with existing code
5. **Testing Approach**: How to properly test Web3 functionality

## Benefits

- ✅ **Contextual Understanding**: Agents know the specific architecture and patterns
- ✅ **Faster Development**: Less explanation needed for common tasks
- ✅ **Consistent Code**: Follows established patterns and conventions
- ✅ **Web3 Expertise**: Understands blockchain-specific considerations
- ✅ **Security Aware**: Considers Web3 security best practices

## Creating New Custom Agents

To add a new custom agent for specific needs:

1. Create a new `.md` file in `.github/agents/`
2. Define the agent's role and expertise
3. Document common tasks and examples
4. Include relevant code patterns and best practices

### Template Structure

```markdown
# [Agent Name]

## Role
[Brief description of the agent's purpose]

## Expertise Areas
[List of specialized knowledge]

## Responsibilities
[What the agent should help with]

## Common Tasks
[Examples of tasks this agent handles]

## Best Practices
[Guidelines to follow]
```

## Usage Tips

1. **Be Specific**: Mention the type of work you're doing (e.g., "wallet integration", "domain registration")
2. **Reference Components**: Name specific files or components you're working with
3. **Ask for Patterns**: Request examples consistent with the codebase
4. **Security First**: Ask about security implications for Web3 changes

## Examples

### Good Prompts for Web3 Specialist

✅ "Help me add Avalanche C-Chain to the supported EVM networks in wagmi.ts"

✅ "I need to implement mobile wallet QR code scanning for Phantom wallet"

✅ "Update the domain registration to support multiple payment methods"

✅ "Add error handling for when MetaMask is not installed"

### Less Effective Prompts

❌ "Add a new feature" (too vague)

❌ "Fix the bug" (no context provided)

❌ "Make it better" (unclear objective)

## Maintenance

These agent configurations should be updated when:

- Major dependencies are upgraded (Next.js, React, wagmi, etc.)
- New blockchain networks are added
- Architecture changes significantly
- New patterns or best practices are established

## Related Documentation

- [ARCHITECTURE.md](../../ARCHITECTURE.md) - Full architecture overview
- [FRONTEND_BACKEND_GUIDE.md](../../FRONTEND_BACKEND_GUIDE.md) - Frontend/backend structure
- [MOBILE_WALLET_GUIDE.md](../../MOBILE_WALLET_GUIDE.md) - Mobile wallet integration
- [README.md](../../README.md) - General project information

## Feedback

If you find that the custom agents need improvements or additional capabilities, please update the relevant `.md` file and commit the changes.
