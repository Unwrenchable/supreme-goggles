# 📱 Mobile Wallet Connection Guide

## QR Code Support for Mobile Wallets

AtomicFizzCaps Universal Naming Service supports seamless mobile wallet connections via QR codes for EVM (Ethereum Virtual Machine) chains.

### Supported Mobile Wallets

#### 🦊 EVM Wallets (Ethereum, Polygon, BSC, Arbitrum, etc.)

**Primary Mobile Wallets:**
- **MetaMask Mobile** - Most popular Ethereum wallet
- **Trust Wallet** - Multi-chain mobile wallet
- **Rainbow Wallet** - User-friendly Ethereum wallet  
- **Coinbase Wallet** - Coinbase's self-custody wallet
- **Phantom** - Supports EVM chains via WalletConnect (Note: Native Solana not yet supported)
- **Ledger Live** - Hardware wallet companion app
- **SafePal** - Secure multi-chain wallet
- **And 300+ other wallets** - Any WalletConnect-enabled app

**EVM Wallet Features:**
- Support for all configured EVM chains (Ethereum, Polygon, BSC, Arbitrum, Optimism, Base, Avalanche, Fantom)
- Connect using WalletConnect QR codes
- Perfect for .eth, .crypto, and other EVM-based domain registrations
- NFT and token management
- Multi-chain support in a single wallet

#### 🟣 About Solana Wallet Support

**Current Status:** Native Solana wallet connections (for .sol, .fizz, .atomic domains) are not yet integrated.

**Why?** This app currently uses RainbowKit + Wagmi which are designed for EVM chains only. To add native Solana support, additional wallet adapters (like `@solana/wallet-adapter-react`) would need to be integrated.

**Workaround:** Some wallets like Phantom support both EVM and Solana. You can connect Phantom via WalletConnect for EVM chain interactions, but native Solana features are not available yet.

**Coming Soon:** We plan to add native Solana wallet support in a future update using the official Solana wallet adapter library.

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

**For All WalletConnect-Compatible Wallets (MetaMask, Trust Wallet, Phantom, etc.):**
1. Open your mobile wallet app on your phone
2. Look for the "WalletConnect" or "Scan" option (usually in settings, menu, or top toolbar)
3. Point your phone's camera at the QR code on your computer screen
4. The app will automatically detect and scan the code
5. Select which network/chain you want to connect with (if prompted)

#### Step 5: Approve Connection
1. Your mobile wallet will show a connection request
2. Review the connection details (app name, permissions)
3. Tap "Connect" or "Approve" in your mobile wallet
4. You're now connected! 🎉

### 🟣 Connecting with Phantom Wallet (EVM Chains)

Phantom is a popular multi-chain wallet that supports both Solana and EVM chains. Currently, this platform supports Phantom's **EVM functionality only**.

#### Quick Phantom Connection for EVM Chains:
1. **Download Phantom** - Get it from App Store (iOS) or Google Play (Android)
2. **Open Phantom app** - Ensure you have the EVM chains enabled in settings
3. **Click "Connect Wallet"** on the website and select "WalletConnect"
4. **Scan QR code** - Point your camera at the QR code on your computer
5. **Select Network** - Choose the EVM network you want to use (Ethereum, Polygon, etc.)
6. **Approve connection** - Tap "Connect" when prompted
7. **Done!** - You're connected and ready to register domains on EVM chains

#### Phantom EVM Features:
- 🌐 Multi-chain support (Ethereum, Polygon, and other EVM chains)
- 🔄 Easy network switching within the app
- 💰 Token and NFT management across chains
- 🔒 Biometric security (Face ID/Fingerprint)
- 🎨 Clean, modern interface

#### Important Notes About Phantom:
- ✅ **EVM chains supported**: Ethereum, Polygon, BSC, Arbitrum, Optimism, Base, Avalanche, Fantom
- ⚠️ **Native Solana not yet integrated**: While Phantom excels at Solana, this platform doesn't yet support native Solana wallet connections
- 💡 **Use for EVM domains**: Perfect for registering .eth, .crypto, .nft, .web3, .blockchain domains
- 🔮 **Future Solana support**: We plan to add native Solana integration in future updates

### Tips for Best Experience

✅ **Same Network**: For the fastest connection, ensure your phone and computer are on the same WiFi network

✅ **Good Lighting**: Make sure there's good lighting so your phone can clearly scan the QR code

✅ **Valid Project ID**: The platform needs a valid WalletConnect Project ID configured (already set up in production)

✅ **Keep App Open**: Keep your mobile wallet app open while using the platform for the best experience

✅ **Reconnection**: If disconnected, simply repeat the process - your previous domains and settings are preserved

### Alternative EVM-Compatible Mobile Wallets

In addition to Phantom and MetaMask, these wallets also work great with the platform via WalletConnect:

#### Trust Wallet
- Multi-chain support for 10+ blockchains
- Built-in DApp browser
- Token swaps and staking
- Available on iOS and Android

#### Rainbow Wallet
- Beautiful, user-friendly interface
- Ethereum-focused with L2 support
- NFT showcase gallery
- Strong privacy features

#### Coinbase Wallet
- Direct integration with Coinbase exchange
- Self-custody with easy recovery
- DeFi and NFT support
- Hardware wallet compatible

#### Ledger Live Mobile
- Companion app for Ledger hardware wallets
- Maximum security for large holdings
- Multi-chain support
- Transaction verification on device

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
