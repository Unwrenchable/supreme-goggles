import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { 
  mainnet, 
  polygon, 
  optimism, 
  arbitrum, 
  sepolia,
  base,
  bsc,
  avalanche,
  fantom
} from 'wagmi/chains';

/**
 * Wagmi configuration with RainbowKit
 * 
 * QR Code Support:
 * - RainbowKit automatically displays QR codes for WalletConnect-enabled wallets
 * - Solana Wallets: Users can scan with Phantom, Solflare, Backpack, Glow, Ultimate
 * - EVM Wallets: Users can scan with MetaMask, Trust Wallet, Rainbow, Coinbase, etc.
 * - QR codes appear in the wallet connection modal when selecting WalletConnect options
 */
export const config = getDefaultConfig({
  appName: 'AtomicFizzCaps Domain Registry',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    bsc,
    avalanche,
    fantom,
    sepolia, // testnet
  ],
  ssr: true,
});
