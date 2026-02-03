# Visual Guide: QR Code Mobile Wallet Connection

## Component Preview

The WalletQRInfo component displays as a beautiful card with:

```
┌─────────────────────────────────────────────────────────────────┐
│  [QR Icon]  📱 Connect with Mobile Wallet                       │
│             ─────────────────────────────                       │
│             Use your mobile wallet app to connect by            │
│             scanning the QR code:                               │
│                                                                 │
│             ① Click "Connect Wallet" button above              │
│             ② Select "WalletConnect" or your preferred wallet  │
│             ③ Open your mobile wallet app                      │
│             ④ Scan the QR code that appears                    │
│             ⑤ Approve the connection in your wallet            │
│                                                                 │
│             ───────────────────────────────────────────        │
│             💡 Tip: Make sure your phone and computer are      │
│             on the same network. Supports 300+ wallets.        │
└─────────────────────────────────────────────────────────────────┘
```

## Where It Appears

### 1. Dashboard Page (when not connected)
```
Dashboard
─────────────────────────────────────────────

[QR Code Instructions Card - shown above]

┌────────────────────────────────────┐
│    🔒                              │
│    Connect Your Wallet             │
│    Please connect your wallet to  │
│    view and manage your domains    │
└────────────────────────────────────┘
```

### 2. Register Page (when not connected)
```
Register Domain
─────────────────────────────────────────────

[QR Code Instructions Card - shown above]

⚠️ Please connect your wallet to continue

[Registration form grayed out until connected]
```

## RainbowKit Modal with QR Code

When users click "Connect Wallet", RainbowKit displays:

```
┌─────────────────────────────────┐
│   Connect a Wallet              │
│                                 │
│   [MetaMask]                    │
│   [Coinbase Wallet]             │
│   [WalletConnect]  ← Click here │
│   [More wallets...]             │
└─────────────────────────────────┘
```

After selecting WalletConnect:

```
┌──────────────────────────────────┐
│   Scan with your Phone           │
│                                  │
│   ╔═══════════════════╗          │
│   ║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║          │
│   ║ ▓▓ QR CODE ▓▓▓▓▓ ║          │
│   ║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║          │
│   ║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║          │
│   ╚═══════════════════╝          │
│                                  │
│   Scan this QR code with your    │
│   WalletConnect-compatible app   │
│                                  │
│   [Copy to clipboard]            │
└──────────────────────────────────┘
```

## Styling Details

- **Purple/Blue Gradient Background**: Matches platform branding
- **Numbered Steps**: Clear, easy-to-follow instructions
- **Icons**: QR code icon in gradient circle
- **Responsive**: Works on all screen sizes
- **Accessible**: High contrast, clear text

## Supported Wallets

The QR code works with 300+ wallets including:
- MetaMask Mobile
- Trust Wallet  
- Rainbow Wallet
- Coinbase Wallet
- Ledger Live
- SafePal
- Argent
- And many more!

## Technical Flow

```
User                Platform              WalletConnect         Mobile Wallet
│                   │                     │                     │
├─Click Connect────>│                     │                     │
│                   ├─Generate Session───>│                     │
│                   │<─Return URI─────────┤                     │
│                   ├─Display QR Code─────┤                     │
│                   │                     │                     │
│                   │                     │<─Scan QR Code──────┤
│                   │                     ├─Establish Session──>│
│                   │<─Connection Ready───┤<─Approve Connection─┤
│<─Wallet Connected─┤                     │                     │
│                   │                     │                     │
```

## User Experience Flow

1. **User visits dashboard/register page** (not connected)
   - Sees clear QR code instructions
   - Understands they can use mobile wallet

2. **User clicks "Connect Wallet"**
   - RainbowKit modal opens
   - Multiple wallet options displayed

3. **User selects "WalletConnect"**
   - QR code automatically appears
   - Code is unique to this session

4. **User opens mobile wallet**
   - Taps scan/connect option
   - Points camera at QR code

5. **Mobile wallet scans code**
   - Connection request shown
   - User approves on phone

6. **Connection established**
   - User sees wallet connected on desktop
   - Can now interact with platform

## Benefits

✅ **Secure**: Private keys never leave mobile device
✅ **Convenient**: Use desktop interface with mobile signing  
✅ **Universal**: Works with 300+ wallets
✅ **User-Friendly**: Clear step-by-step guide
✅ **Professional**: Matches platform branding
