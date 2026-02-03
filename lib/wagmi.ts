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
 * IMPORTANT: This configuration supports EVM (Ethereum Virtual Machine) wallets ONLY
 * 
 * Supported Mobile Wallets (via WalletConnect QR Code):
 * - MetaMask Mobile - Most popular Ethereum wallet
 * - Trust Wallet - Multi-chain mobile wallet
 * - Rainbow Wallet - User-friendly Ethereum wallet
 * - Coinbase Wallet - Coinbase's self-custody wallet
 * - Phantom (EVM chains only) - Note: Phantom on mobile can connect to EVM chains via WalletConnect
 * - 300+ other WalletConnect-enabled mobile wallets
 * 
 * Desktop Browser Extensions:
 * - MetaMask
 * - Coinbase Wallet
 * - WalletConnect
 * - Injected wallets
 * 
 * Note: Solana-specific features (native Solana transactions) are not yet supported.
 * For Solana support, additional wallet adapters would need to be integrated.
 * 
 * Mobile Connection Process:
 * 1. Click "Connect Wallet" button
 * 2. Select "WalletConnect" or specific wallet from the modal
 * 3. QR code appears automatically
 * 4. Scan with your mobile wallet app
 * 5. Approve the connection on your phone
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
