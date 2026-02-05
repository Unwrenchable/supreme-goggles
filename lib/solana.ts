import { useMemo } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import type { Adapter } from '@solana/wallet-adapter-base';

/**
 * Solana Wallet Configuration
 * 
 * This configuration sets up the Solana wallet adapters for the application.
 * It provides support for popular Solana wallets including:
 * - Phantom - Auto-detected via Wallet Standard (no explicit adapter needed)
 * - Solflare - Feature-rich Solana wallet
 * - Torus - Social login wallet
 * - Ledger - Hardware wallet support
 * 
 * Note: Phantom wallet now uses the Wallet Standard API and is automatically
 * detected. The explicit PhantomWalletAdapter has been removed to avoid warnings.
 * 
 * Mobile Support:
 * - Phantom Mobile via WalletConnect and deep links
 * - Solflare Mobile via WalletConnect
 * - Other WalletConnect-enabled Solana wallets
 */

/**
 * Get the Solana network based on environment configuration
 */
export const getSolanaNetwork = (): WalletAdapterNetwork => {
  const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet';
  
  switch (network) {
    case 'mainnet-beta':
    case 'mainnet':
      return WalletAdapterNetwork.Mainnet;
    case 'testnet':
      return WalletAdapterNetwork.Testnet;
    case 'devnet':
    default:
      return WalletAdapterNetwork.Devnet;
  }
};

/**
 * Get the Solana RPC endpoint
 * Uses custom endpoint if provided, otherwise defaults to public endpoints
 */
export const getSolanaEndpoint = (): string => {
  const customEndpoint = process.env.NEXT_PUBLIC_SOLANA_RPC_ENDPOINT;
  if (customEndpoint) {
    return customEndpoint;
  }
  
  const network = getSolanaNetwork();
  return clusterApiUrl(network);
};

/**
 * Hook to get configured Solana wallet adapters
 * This should be used within the WalletProvider context
 * 
 * Note: Phantom wallet is not explicitly included as it's now auto-detected
 * via the Wallet Standard API. This prevents duplicate registration warnings.
 * 
 * Wallet adapters are loaded dynamically to avoid SSR issues with indexedDB.
 * We import from individual packages rather than the umbrella package to
 * ensure we're only loading the wallets we explicitly need.
 */
export const useSolanaWallets = (): Adapter[] => {
  const network = getSolanaNetwork();
  
  const wallets = useMemo(
    () => {
      // Only initialize wallets on the client side to avoid SSR issues
      if (typeof window === 'undefined') {
        return [];
      }
      
      // Dynamically import wallet adapters to prevent SSR errors
      // Import from individual packages to avoid loading unused wallet code
      const adapters: Adapter[] = [];
      
      try {
        // Lazy load Solflare adapter from individual package
        const { SolflareWalletAdapter } = require('@solana/wallet-adapter-solflare');
        adapters.push(new SolflareWalletAdapter({ network }));
      } catch (e) {
        console.warn('Failed to load SolflareWalletAdapter:', e);
      }
      
      try {
        // Lazy load Torus adapter from individual package
        const { TorusWalletAdapter } = require('@solana/wallet-adapter-torus');
        adapters.push(new TorusWalletAdapter());
      } catch (e) {
        console.warn('Failed to load TorusWalletAdapter:', e);
      }
      
      try {
        // Lazy load Ledger adapter from individual package
        const { LedgerWalletAdapter } = require('@solana/wallet-adapter-ledger');
        adapters.push(new LedgerWalletAdapter());
      } catch (e) {
        console.warn('Failed to load LedgerWalletAdapter:', e);
      }
      
      return adapters;
    },
    [network]
  );
  
  return wallets;
};

/**
 * Check if Solana is configured and ready to use
 */
export const isSolanaConfigured = (): boolean => {
  // In development/demo mode, Solana is always available
  const useProduction = process.env.NEXT_PUBLIC_USE_PRODUCTION_MODE === 'true';
  if (!useProduction) {
    return true;
  }
  
  // In production, check if contract address is configured and valid
  const contractAddress = process.env.NEXT_PUBLIC_SOLANA_CONTRACT_ADDRESS;
  return !!(contractAddress && contractAddress.trim());
};

/**
 * Get Solana explorer URL for a transaction
 */
export const getSolanaExplorerUrl = (signature: string): string => {
  const network = getSolanaNetwork();
  const cluster = network === WalletAdapterNetwork.Mainnet ? '' : `?cluster=${network}`;
  return `https://explorer.solana.com/tx/${signature}${cluster}`;
};

/**
 * Get Solana explorer URL for an address
 */
export const getSolanaAddressExplorerUrl = (address: string): string => {
  const network = getSolanaNetwork();
  const cluster = network === WalletAdapterNetwork.Mainnet ? '' : `?cluster=${network}`;
  return `https://explorer.solana.com/address/${address}${cluster}`;
};

/**
 * Solana Domain Registry Functions
 * These functions are available for use in scripts or future implementations
 * Currently, registry initialization is done via Solana Explorer or CLI
 */

// Registry initialization functions are available in scripts/initialize-registry.ts
// For now, we direct users to use Solana Explorer for initialization

