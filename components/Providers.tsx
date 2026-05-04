'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { config } from '@/lib/wagmi';
import { SolanaWalletProvider } from '@/components/SolanaWalletProvider';
import { useState } from 'react';
import type { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Client-side providers component
 *
 * Wraps the application with all necessary context providers for:
 * - EVM wallets (wagmi + RainbowKit)
 * - Solana wallets (wallet-adapter)
 * - Data fetching (TanStack Query)
 *
 * Kept separate from the root layout so the layout can remain a
 * server component and export Next.js metadata.
 */
export default function Providers({ children }: ProvidersProps) {
  // QueryClient is created inside useState to avoid sharing state across requests
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          theme={darkTheme({
            accentColor: '#7c3aed',
            accentColorForeground: 'white',
            borderRadius: 'large',
            fontStack: 'system',
            overlayBlur: 'small',
          })}
          showRecentTransactions={true}
          coolMode={true}
        >
          <SolanaWalletProvider>
            {children}
          </SolanaWalletProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
