# Payments Guide

This document explains how payments work in the AtomicFizzCaps Universal Naming Service.

## Payment Flow

1. **User selects a domain** — e.g., `myname.fizz`
2. **User connects their wallet** — Phantom for Solana, MetaMask/WalletConnect for EVM
3. **User clicks "Register"** — wallet popup shows the exact payment amount
4. **Smart contract receives payment** — funds are immediately forwarded to the treasury
5. **Domain is minted** — registered to the user's wallet address with lifetime ownership

## Payment Configuration

All payment recipients are configured via environment variables in `.env.local`:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_PAYMENT_RECIPIENT_ADDRESS` | EVM treasury address (receives ETH/BNB/MATIC/etc.) |
| `NEXT_PUBLIC_SOLANA_PAYMENT_ADDRESS` | Solana treasury address (receives SOL) |
| `NEXT_PUBLIC_TREASURY_ADDRESS` | Optional multi-sig or secondary treasury |

> ⚠️ **Never commit `.env.local`** to version control. Copy `.env.example` to `.env.local` and fill in your own addresses.

## Pricing

Domain prices are set per-chain and denominated in the chain's native currency:

| Chain | Currency | Default Price |
|-------|---------|---------------|
| Solana (`.fizz`, `.atomic`, `.sol`) | SOL | 0.05 SOL |
| Ethereum (`.eth`) | ETH | 0.01 ETH |
| Arbitrum (`.arb`) | ETH | 0.01 ETH |
| Optimism (`.op`) | ETH | 0.01 ETH |
| Base (`.base`) | ETH | 0.01 ETH |
| Polygon (`.poly`) | MATIC | 10 MATIC |
| BNB Chain (`.bnb`) | BNB | 0.05 BNB |
| Avalanche (`.avax`) | AVAX | 0.3 AVAX |
| Fantom (`.ftm`) | FTM | 20 FTM |

Registration fees are configured in the smart contract at deployment time via:
- EVM: `REGISTRATION_FEE` environment variable (in wei) → `hardhat.config.ts`
- Solana: `registration_fee` in the Anchor program (in lamports)

To change the fee after deployment, the contract owner calls:
- EVM: `updateRegistrationFee(newFeeInWei)` 
- Solana: `update_fee` instruction

## USD Pricing Reference

The app shows approximate USD prices. Exchange rates are stored in `lib/contract.ts → getCurrencyUSDRate()`. Update these values when deploying to reflect current market rates.

## Setting Up Treasury

### EVM Treasury
Your treasury receives all registration payments instantly. It can be:
- A plain EOA wallet (simple, gas-free receiving)
- A multi-sig safe (e.g., [Safe](https://safe.global)) for team-controlled funds
- A smart contract with custom distribution logic

Set the treasury address in `.env.local`:
```bash
NEXT_PUBLIC_PAYMENT_RECIPIENT_ADDRESS=0xYourTreasuryAddressHere
```

### Solana Treasury
Your Solana treasury receives SOL immediately. Use a standard wallet (Phantom, Solflare) or a program-controlled account.

```bash
NEXT_PUBLIC_SOLANA_PAYMENT_ADDRESS=YourSolanaPublicKeyHere
```

## Updating Treasury Address

If you need to change the treasury after deployment:

**EVM:**
```solidity
// Call as contract owner
DomainRegistry.updateTreasury(newTreasuryAddress);
```

**Solana:**
```bash
# Via anchor CLI or custom script
anchor run update-treasury -- --treasury <newAddress>
```

## Refunds

The smart contract does **not** support refunds — all payments are immediately forwarded to the treasury. If you wish to support refunds, implement that logic at the treasury address or in a separate refund contract.

## Demo Mode

When `NEXT_PUBLIC_USE_PRODUCTION_MODE=false` (the default), no real payments occur. The app uses mock data and simulates the registration flow without wallet interaction.

To enable real payments:
1. Deploy the smart contracts (see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md))
2. Set `NEXT_PUBLIC_USE_PRODUCTION_MODE=true` in `.env.local`
3. Set all contract addresses and treasury addresses
4. Restart the Next.js dev server
