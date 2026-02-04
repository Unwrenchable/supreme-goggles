'use client';

import React, { ReactNode, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
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

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
