# 📱 Mobile Wallet Connection Guide

## QR Code Support for Mobile Wallets

AtomicFizzCaps Universal Naming Service supports seamless mobile wallet connections via QR codes for both Solana and EVM chains.

### Supported Mobile Wallets

#### 🟣 Solana Wallets (For .fizz, .atomic, .sol domains)

**Primary Solana Wallets:**
- **Phantom** - Most popular Solana wallet, user-friendly mobile app
- **Solflare** - Feature-rich Solana wallet with staking support
- **Backpack** - Modern Solana wallet with xNFT support
- **Glow** - Solana-focused wallet with governance features
- **Ultimate** - Multi-chain wallet with strong Solana support

**Solana Wallet Features:**
- Native SOL and SPL token support
- Fast, low-cost transactions on Solana
- Perfect for .fizz and .atomic domain registrations
- NFT and token management
- In-app staking and DeFi access

#### 🦊 EVM Wallets (For Ethereum, Polygon, BSC, Arbitrum, etc.)

Connect using WalletConnect-compatible mobile wallets:
- **MetaMask Mobile** - Most popular Ethereum wallet
- **Trust Wallet** - Multi-chain mobile wallet
- **Rainbow Wallet** - User-friendly Ethereum wallet  
- **Coinbase Wallet** - Coinbase's self-custody wallet
- **Ledger Live** - Hardware wallet companion app
- **SafePal** - Secure multi-chain wallet
- **And 300+ other wallets** - Any WalletConnect-enabled app

### How to Connect Your Mobile Wallet

#### Step 1: Click "Connect Wallet"
Click the "Connect Wallet" button in the top-right corner of the navigation bar.

#### Step 2: Select WalletConnect or Your Wallet
In the RainbowKit modal that appears, you'll see:
- Desktop wallet options (MetaMask browser extension, etc.)
- **WalletConnect** option for mobile wallets
- Specific mobile wallet options

Select either "WalletConnect" or your specific mobile wallet from the list.

#### Step 3: QR Code Appears
A **QR code will automatically display** in the modal window. This QR code is unique to your connection session.

#### Step 4: Scan with Mobile App

**For Solana Wallets (Phantom, Solflare, etc.):**
1. Open your Solana wallet app on your phone
2. Tap the scan icon or "Connect" button
3. Point your phone's camera at the QR code on your computer screen
4. The app will automatically detect and scan the code

**For EVM Wallets (MetaMask, Trust Wallet, etc.):**
1. Open your mobile wallet app on your phone
2. Look for the "WalletConnect" or "Scan" option (usually in settings or top menu)
3. Point your phone's camera at the QR code on your computer screen
4. The app will automatically detect and scan the code

#### Step 5: Approve Connection
1. Your mobile wallet will show a connection request
2. Review the connection details (app name, permissions)
3. Tap "Connect" or "Approve" in your mobile wallet
4. You're now connected! 🎉

### 🟣 Connecting with Phantom Wallet (Solana)

Phantom is the most popular Solana wallet and recommended for .fizz, .atomic, and .sol domain registrations.

#### Quick Phantom Connection:
1. **Download Phantom** - Get it from App Store (iOS) or Google Play (Android)
2. **Open Phantom app** - Tap the scan icon in the top right
3. **Scan QR code** - Point your camera at the QR code on your computer
4. **Approve connection** - Tap "Connect" when prompted
5. **Done!** - You're connected and ready to register Solana domains

#### Phantom Features:
- 🚀 Fast Solana transactions
- 💎 Low fees (fractions of a cent)
- 🎨 NFT gallery and management
- 💰 Token swaps built-in
- 🔒 Biometric security (Face ID/Fingerprint)

#### Why Phantom for .fizz domains?
- Native Solana support (not bridged)
- Fastest domain registration experience
- Cheapest transaction costs
- Best mobile UX in the Solana ecosystem

### Tips for Best Experience

✅ **Same Network**: For the fastest connection, ensure your phone and computer are on the same WiFi network

✅ **Good Lighting**: Make sure there's good lighting so your phone can clearly scan the QR code

✅ **Valid Project ID**: The platform needs a valid WalletConnect Project ID configured (already set up in production)

✅ **Keep App Open**: Keep your mobile wallet app open while using the platform for the best experience

✅ **Reconnection**: If disconnected, simply repeat the process - your previous domains and settings are preserved

### Other Solana Wallets

In addition to Phantom, these Solana wallets also work great with the platform:

#### Solflare
- Advanced features for Solana power users
- Built-in staking and DeFi access
- Hardware wallet support (Ledger)
- Available on iOS and Android

#### Backpack
- Modern, sleek interface
- xNFT support (executable NFTs)
- Multi-wallet management
- Growing ecosystem support

#### Glow
- Focus on Solana governance
- Vote on proposals directly
- Clean, minimalist design
- Strong security features

#### Ultimate
- Multi-chain support (Solana + EVM)
- One wallet for all your chains
- Cross-chain swaps
- Unified portfolio view

### Technical Details

**How It Works:**
1. Platform generates unique WalletConnect session URI
2. URI is encoded into QR code
3. Mobile wallet scans QR code to get session URI
4. Encrypted peer-to-peer connection established via WalletConnect bridge
5. All transaction signing happens on your mobile device

**Security:**
- End-to-end encrypted communication
- No private keys transmitted
- You maintain full custody of funds
- Session expires after disconnection

### Troubleshooting

#### QR Code Not Appearing
- Ensure WalletConnect Project ID is configured in environment variables
- Check browser console for any errors
- Try refreshing the page

#### Mobile Wallet Won't Scan
- Ensure QR code is fully visible and not cut off
- Try increasing screen brightness
- Make sure your wallet app has camera permissions
- Try a different wallet app

#### Connection Keeps Dropping
- Check your network connection stability
- Ensure you're not using VPN that might block WebSocket connections
- Try connecting to a more stable WiFi network
- Some corporate networks may block WalletConnect - try mobile data

#### Transaction Not Showing on Mobile
- Ensure your mobile wallet is still open and unlocked
- Check if you need to approve the connection again
- Try reconnecting if the session expired

### Platform Configuration

For developers deploying their own instance:

#### Environment Setup
```env
# Required: Get from https://cloud.walletconnect.com/
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

#### RainbowKit Configuration
```typescript
// Already configured in lib/wagmi.ts
export const config = getDefaultConfig({
  appName: 'AtomicFizzCaps Domain Registry',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  chains: [...],
  ssr: true,
});
```

#### WalletConnect Features Enabled
- ✅ QR code display for mobile wallets
- ✅ Deep linking to specific mobile apps
- ✅ Recent transaction history
- ✅ Cool mode animations
- ✅ Session persistence across page reloads

### Benefits of Mobile Wallet Connection

**Security:**
- Private keys never leave your mobile device
- Transaction signing happens on secured mobile hardware
- Biometric authentication (Face ID, fingerprint) support

**Convenience:**
- Use the same wallet across devices
- Quick access from your phone
- Portable identity and funds

**Multi-Device:**
- Use desktop interface with mobile signing
- Large screen for browsing, phone for security
- Best of both worlds

### Supported Platforms

**Desktop Browsers (for QR display):**
- Chrome, Firefox, Safari, Edge, Brave
- Any modern browser with JavaScript enabled

**Mobile Devices (for scanning):**
- iOS 12+ (iPhone, iPad)
- Android 8+ (all manufacturers)
- Any device with camera and WalletConnect-compatible wallet app

---

## Additional Resources

- [WalletConnect Documentation](https://docs.walletconnect.com/)
- [RainbowKit Documentation](https://www.rainbowkit.com/)
- [List of Compatible Wallets](https://explorer.walletconnect.com/)

## Need Help?

If you're having trouble connecting your mobile wallet:
1. Check our troubleshooting guide above
2. Ensure you're using a supported wallet app
3. Verify your WalletConnect Project ID is valid
4. Contact support through our community channels

---

**Note:** QR code functionality is built into the platform and works automatically. No additional configuration needed for users!
