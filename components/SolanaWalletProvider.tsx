'use client';

import React, { ReactNode, useMemo, useCallback, useEffect } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { WalletError } from '@solana/wallet-adapter-base';
import { getSolanaEndpoint, useSolanaWallets } from '@/lib/solana';

// Import Solana wallet adapter styles
import '@solana/wallet-adapter-react-ui/styles.css';

interface SolanaWalletProviderProps {
  children: ReactNode;
}

/**
 * Solana Wallet Provider Component
 * 
 * Wraps the application with Solana wallet connectivity
 * Provides support for:
 * - Phantom wallet (auto-detected via Wallet Standard - desktop & mobile)
 * - Solflare wallet (desktop & mobile)
 * - Torus wallet (social login)
 * - Ledger hardware wallet
 * - WalletConnect for mobile wallets
 * 
 * Note: Phantom is now auto-detected through the Wallet Standard API,
 * so we don't need to explicitly include the PhantomWalletAdapter.
 * This prevents duplicate registration warnings in the console.
 * 
 * Mobile Usage:
 * 1. Click the wallet button
 * 2. Select your preferred Solana wallet
 * 3. For mobile wallets like Phantom:
 *    - QR code will appear (on supported wallets)
 *    - Scan with your mobile Phantom app
 *    - Approve the connection
 */
export function SolanaWalletProvider({ children }: SolanaWalletProviderProps) {
  const endpoint = useMemo(() => getSolanaEndpoint(), []);
  const wallets = useSolanaWallets();

  // Suppress the harmless cross-extension noise emitted by MetaMask's
  // StreamMiddleware when Solflare probes for MetaMask's presence.
  // Solflare sends a JSON-RPC message with id "solflare-detect-metamask" and
  // MetaMask's inpage.js logs an error because it has no matching pending
  // request for that id.  This effect filters that specific message so it
  // never appears in the developer console.
  useEffect(() => {
    const originalConsoleError = console.error;
    console.error = (...args: unknown[]) => {
      if (
        typeof args[0] === 'string' &&
        args[0].includes('solflare-detect-metamask')
      ) {
        return;
      }
      originalConsoleError.apply(console, args);
    };
    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  // Handle wallet errors gracefully
  const onError = useCallback((error: WalletError) => {
    // User rejected the connection - this is expected behavior, not an error
    if (error.message?.includes('User rejected') || 
        error.message?.includes('rejected the request') ||
        error.name === 'WalletConnectionError') {
      // Log as info instead of error since user rejection is normal
      console.info('Wallet connection was declined by user');
      return;
    }
    
    // For other wallet errors, log as warnings with helpful context
    console.warn('Wallet error occurred:', {
      name: error.name,
      message: error.message,
    });
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect onError={onError}>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
