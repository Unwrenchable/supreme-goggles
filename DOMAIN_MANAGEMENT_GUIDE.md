# Domain Management Guide

## Managing Your Solana Domains

After registering a domain (e.g., `atomic.fizz`) on the Solana blockchain, you can manage its records to point to websites, wallets, IPFS content, and social media profiles.

## How to Manage Your Domain

### 1. Navigate to Your Domain Management Page

Visit: `https://your-app.vercel.app/manage/atomic.fizz`

(Replace `atomic.fizz` with your registered domain)

### 2. Connect Your Wallet

- The same wallet that registered the domain must be connected
- For Solana domains (.fizz, .sol, .bonk, etc.), connect your Phantom or Solana-compatible wallet
- For EVM domains (.eth, etc.), connect your MetaMask or Web3 wallet

### 3. View Existing Records

The dashboard will automatically load any existing records from the blockchain:
- Wallet Address
- IPFS Hash
- Website URL
- Email
- Twitter
- Discord
- Avatar URL
- GitHub

### 4. Add or Edit Records

#### To Point Your Domain to a Website (e.g., atomic.fizz → atomicfizzcaps.xyz):

1. Click the "Add New Record" section
2. Select **Website URL** from the dropdown
3. Enter `https://atomicfizzcaps.xyz` in the value field
4. Click **Add Record**

#### To Add Other Records:

- **Wallet Address**: Add your preferred payment wallet (Solana address, ETH address, etc.)
- **IPFS Hash**: Link to decentralized content (e.g., `QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG`)
- **Social Media**: Add Twitter handle, Discord username, GitHub profile
- **Avatar**: Link to your profile picture or NFT avatar

### 5. Save Changes

1. Review all your records
2. Click **Save Changes**
3. Approve the transaction in your wallet
4. Wait for blockchain confirmation (~10-30 seconds on Solana devnet)
5. See the success message with a link to view the transaction on Solana Explorer

## Example: Setting Up atomic.fizz

```
Domain: atomic.fizz
Owner: Cr3Lbvd9JJsdKi4XxLUmTRnw7NRF9GESN8N3iiApBcaJ

Records:
- Website: https://atomicfizzcaps.xyz
- Wallet: Cr3Lbvd9JJsdKi4XxLUmTRnw7NRF9GESN8N3iiApBcaJ
- Twitter: @atomicfizzcaps
- Email: contact@atomicfizzcaps.xyz
- Avatar: https://atomicfizzcaps.xyz/logo.png
```

## How It Works (Technical)

### Solana Implementation

1. **Domain Account Structure**: Each domain is a Program Derived Account (PDA) with:
   - 8-byte discriminator
   - 32-byte owner public key
   - Domain name (4-byte length + UTF-8 string)
   - Extension (4-byte length + UTF-8 string)
   - Optional records (each: 1-byte flag + 4-byte length + UTF-8 string)

2. **Update Records Instruction**:
   - Discriminator: `sha256("global:update_records")[0..8]` = `[0x13, 0x9e, 0xef, 0x58, 0x9c, 0x4c, 0x8c, 0x0d]`
   - Accounts: Domain PDA (writable), Owner (signer)
   - Data: Domain name + optional string fields

3. **Transaction Flow**:
   - User edits records in UI
   - Click Save → Build transaction with update_records instruction
   - Sign with Phantom wallet
   - Submit to Solana network
   - Confirm on devnet (or mainnet-beta)

### EVM Implementation

Similar flow using Ethereum smart contracts with `setRecord()` calls.

## Viewing Your Domains

Visit the **Dashboard** at `/dashboard` to see all domains you own:
- Domain name and extension
- Blockchain (🟣 Solana or ⛓️ EVM)
- Owner address
- Links to Solana Explorer or Etherscan

## Network Configuration

- **Demo Mode**: Uses mock data, no blockchain interaction
- **Production Mode**: Requires `NEXT_PUBLIC_USE_PRODUCTION_MODE=true`
- **Solana Network**: Devnet by default (`NEXT_PUBLIC_SOLANA_NETWORK=devnet`)
- **Solana Program ID**: Set via `NEXT_PUBLIC_SOLANA_PROGRAM_ID`

## Troubleshooting

### "Please connect your wallet"
- Ensure wallet is connected before accessing manage page
- Check that you're using the same wallet that registered the domain

### "Transaction failed"
- Verify you have enough SOL for transaction fees (~0.000005 SOL)
- Check that you're the domain owner
- Ensure Phantom wallet is set to devnet (Settings → Developer Settings → Change Network)

### Records not loading
- Wait a few seconds for blockchain query to complete
- Check browser console for errors
- Verify domain was registered successfully

### "Account not found"
- Domain may not exist on blockchain yet
- Check spelling of domain name
- Verify you're on the correct network (devnet vs mainnet)

## Demo Mode vs Production Mode

### Demo Mode (Default)
- No blockchain transactions
- Mock data for testing UI
- Instant save (no wallet required)
- Safe for testing and development

### Production Mode
- Real blockchain transactions
- Costs SOL for transaction fees
- Requires wallet signature
- Records persist permanently on-chain

## Cost Breakdown (Solana)

- **Domain Registration**: ~0.002-0.003 SOL (one-time)
- **Update Records**: ~0.000005 SOL per transaction
- **Account Rent**: Paid once during registration (lifetime ownership)

## Next Steps

1. Register more domains at `/register`
2. Build a custom resolver/DNS system to serve content
3. Integrate domain lookups into your dApp
4. Deploy to mainnet-beta for production use

## Support

- View transaction history on [Solana Explorer](https://explorer.solana.com/?cluster=devnet)
- Check domain ownership in `/dashboard`
- Read full documentation in [ARCHITECTURE.md](./ARCHITECTURE.md)

---

**Lifetime Ownership**: All AtomicFizzCaps domains are permanent. No renewal fees, no expiration!
