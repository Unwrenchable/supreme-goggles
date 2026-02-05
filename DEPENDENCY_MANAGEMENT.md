# Dependency Management Guide

This document explains how dependencies are managed in this project and how to resolve common dependency conflicts.

## Current Configuration

### NPM Configuration (`.npmrc`)
```
legacy-peer-deps=true
```

This setting tells npm to bypass strict peer dependency version checking, which is necessary for Web3 projects due to the complex dependency trees of wallet adapters and blockchain libraries.

### Vercel Configuration (`vercel.json`)
```json
{
  "installCommand": "npm install --legacy-peer-deps"
}
```

This ensures Vercel uses the same installation method during deployment.

### Package Overrides
The following package overrides are configured in `package.json` for security and compatibility:

```json
"overrides": {
  "valtio": "^2.3.0",      // Fixes compatibility with React 19
  "lodash": "^4.17.23",    // Security fix for CVE-2021-23337
  "elliptic": "^6.6.1"     // Security fix for CVE-2020-28498
}
```

## Current Dependency Versions

### Core Dependencies
- **Next.js**: 16.1.6
- **React**: 19.2.3
- **TypeScript**: 5.9.x

### Blockchain Libraries
- **Hardhat**: 3.1.6
- **@nomicfoundation/hardhat-toolbox-mocha-ethers**: 3.0.2
- **ethers**: 6.16.0
- **wagmi**: 2.19.5
- **viem**: 2.45.1

### Wallet Adapters
- **@solana/wallet-adapter-react**: 0.15.39
- **@solana/web3.js**: 1.98.4
- **@rainbow-me/rainbowkit**: 2.2.10

## Why --legacy-peer-deps?

### The Problem
Web3 and blockchain libraries often have complex dependency trees with peer dependencies that may not align perfectly:
- Wallet adapters depend on specific React versions
- Blockchain SDKs may require different versions of common libraries
- Multiple wallet providers may have conflicting peer dependencies

### The Solution
Using `--legacy-peer-deps` allows npm to:
1. Install packages even when peer dependencies don't match exactly
2. Use a more lenient resolution algorithm (similar to npm v6)
3. Avoid blocking the installation due to minor version mismatches

### When It's Safe
This approach is safe when:
- The actual code works correctly (tested)
- Build completes successfully
- Runtime behavior is as expected
- Only **minor** version mismatches exist

## Installation Instructions

### Local Development
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Or just (uses .npmrc automatically)
npm install
```

### Vercel Deployment
Vercel automatically uses the `installCommand` from `vercel.json`:
```json
"installCommand": "npm install --legacy-peer-deps"
```

No additional configuration needed!

### CI/CD Pipelines
If adding CI/CD, use:
```yaml
- name: Install dependencies
  run: npm ci --legacy-peer-deps
```

Or add `.npmrc` with `legacy-peer-deps=true` to the repository.

## Troubleshooting

### "ERESOLVE unable to resolve dependency tree"

**Symptom**: npm install fails with peer dependency errors

**Solution**:
1. Ensure `.npmrc` contains `legacy-peer-deps=true`
2. Use `npm install --legacy-peer-deps`
3. If still failing, try `npm install --force` (use cautiously)

### "peer dep missing" warnings

**Status**: Expected and harmless

**Explanation**: Some packages may warn about missing peer dependencies, but npm will install compatible versions automatically.

### Clean Installation Needed

```bash
# Remove all installed packages
rm -rf node_modules package-lock.json

# Reinstall with legacy peer deps
npm install --legacy-peer-deps

# Verify build works
npm run build
```

### Checking for Conflicts

```bash
# See all peer dependency warnings
npm install --loglevel verbose 2>&1 | grep -i peer

# Check dependency tree
npm ls

# Check for unmet dependencies
npm ls | grep -i "UNMET"

# Check specific package
npm explain <package-name>
```

## Updating Dependencies

### Safe Updates
```bash
# Check for outdated packages
npm outdated

# Update specific package
npm install <package>@latest --save --legacy-peer-deps

# Update all minor/patch versions
npm update --legacy-peer-deps
```

### Major Updates
For major version updates, be cautious:
1. Read the changelog
2. Check for breaking changes
3. Test locally first
4. Update one package at a time

### Hardhat Ecosystem
When updating Hardhat or related packages, ensure version compatibility:

```bash
# Check compatible versions
npm info @nomicfoundation/hardhat-toolbox-mocha-ethers peerDependencies

# Current compatible set (as of this writing):
# hardhat: ^3.0.0
# @nomicfoundation/hardhat-toolbox-mocha-ethers: ^3.0.2
```

## Best Practices

### DO ✅
- Use `--legacy-peer-deps` for Web3 projects
- Keep `package-lock.json` committed
- Test build after dependency updates
- Document any version constraints
- Use overrides for security patches

### DON'T ❌
- Use `--force` unless absolutely necessary
- Mix npm, yarn, and pnpm (stick to one)
- Commit `node_modules` directory
- Update all dependencies at once
- Ignore security warnings

## Security Considerations

### Audit Regularly
```bash
# Check for vulnerabilities
npm audit

# Fix non-breaking issues
npm audit fix

# Fix all issues (may break things)
npm audit fix --force
```

### Known Acceptable Vulnerabilities
- Low severity issues in dev dependencies (Hardhat ecosystem)
- Issues in wallet adapter libraries awaiting upstream fixes
- Run `npm audit` to see current status

### Package Overrides for Security
The `overrides` section in package.json forces specific versions for security:
- Updates transitive dependencies to secure versions
- Ensures vulnerable packages are replaced
- Applied automatically during installation

## Version Compatibility Matrix

### Hardhat Ecosystem (v3.x)
| Package | Version | Peer Dependencies |
|---------|---------|-------------------|
| hardhat | 3.1.6 | Node.js ≥18 |
| @nomicfoundation/hardhat-toolbox-mocha-ethers | 3.0.2 | hardhat ^3.0.0, ethers ^6.14.0 |
| ethers | 6.16.0 | - |

### React Ecosystem
| Package | Version | Peer Dependencies |
|---------|---------|-------------------|
| next | 16.1.6 | react ^19, react-dom ^19 |
| react | 19.2.3 | - |
| react-dom | 19.2.3 | react 19.2.3 |

### Blockchain SDKs
| Package | Version | Peer Dependencies |
|---------|---------|-------------------|
| wagmi | 2.19.5 | react ≥18, viem ≥2.x |
| @solana/wallet-adapter-react | 0.15.39 | react ≥16.8 |

## Historical Context

### Previous Conflicts
- **Hardhat 2.x vs 3.x**: Earlier versions of this project may have used Hardhat 2.x with incompatible toolbox versions
- **Resolution**: Upgraded to Hardhat 3.x ecosystem with matching toolbox version 3.x
- **Current Status**: All dependencies are compatible

### Why Not Just Use Exact Versions?
Using range specifiers (^) in package.json allows:
- Automatic security patches
- Bug fixes from patch updates
- Flexibility for downstream dependencies

The `package-lock.json` ensures reproducible builds while still allowing flexibility.

## Getting Help

### If Installation Fails
1. Check `.npmrc` exists with `legacy-peer-deps=true`
2. Delete `node_modules` and `package-lock.json`
3. Run `npm install --legacy-peer-deps`
4. If still failing, open an issue with:
   - Full error message
   - Node.js version (`node --version`)
   - npm version (`npm --version`)
   - Operating system

### If Build Fails After Installation
1. Check `CONSOLE_WARNINGS.md` for expected warnings
2. Verify environment variables are set
3. Run `npm run build` and share the full output
4. Check Next.js compatibility with React 19

## Resources

- [npm peer dependencies documentation](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#peerdependencies)
- [Hardhat installation troubleshooting](https://hardhat.org/hardhat-runner/docs/getting-started#troubleshooting)
- [Next.js deployment documentation](https://nextjs.org/docs/deployment)
- [Vercel configuration reference](https://vercel.com/docs/projects/project-configuration)

---

**Last Updated**: 2026-02-05  
**Status**: All dependencies compatible and working ✅
