'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState } from 'react';

interface DualWalletConnectProps {
  defaultChain?: 'evm' | 'solana';
}

/**
 * Dual Wallet Connect Component
 * 
 * Provides wallet connection for both:
 * - EVM chains (Ethereum, Polygon, BSC, etc.) via RainbowKit
 * - Solana via Solana Wallet Adapter
 * 
 * Mobile Support:
 * - EVM wallets: QR code via WalletConnect
 * - Solana wallets: Deep links and QR codes via wallet apps
 * 
 * @param defaultChain - Which chain to show by default ('solana' or 'evm')
 */
export default function DualWalletConnect({ defaultChain = 'solana' }: DualWalletConnectProps = {}) {
  const [activeChain, setActiveChain] = useState<'evm' | 'solana'>(defaultChain);

  return (
    <div className="flex items-center gap-2">
      {/* Desktop: Chain Toggle + Active Wallet Button */}
      <div className="hidden sm:flex items-center gap-2">
        {/* Chain Toggle */}
        <div className="bg-black/30 rounded-lg p-1 flex gap-1">
          <button
            onClick={() => setActiveChain('solana')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              activeChain === 'solana'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
            aria-label="Switch to Solana wallet"
          >
            Solana
          </button>
          <button
            onClick={() => setActiveChain('evm')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              activeChain === 'evm'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
            aria-label="Switch to EVM wallet"
          >
            EVM
          </button>
        </div>

        {/* Active Wallet Button */}
        {activeChain === 'solana' ? (
          <div className="solana-wallet-button">
            <WalletMultiButton />
          </div>
        ) : (
          <ConnectButton />
        )}
      </div>

      {/* Mobile: Tabbed Interface */}
      <div className="sm:hidden w-full">
        {/* Mobile Tabs */}
        <div className="flex bg-black/30 rounded-lg p-1 mb-2">
          <button
            onClick={() => setActiveChain('solana')}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${
              activeChain === 'solana'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400'
            }`}
          >
            Solana
          </button>
          <button
            onClick={() => setActiveChain('evm')}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${
              activeChain === 'evm'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400'
            }`}
          >
            EVM
          </button>
        </div>

        {/* Mobile Wallet Button */}
        {activeChain === 'solana' ? (
          <div className="solana-wallet-button w-full">
            <WalletMultiButton />
          </div>
        ) : (
          <div className="w-full">
            <ConnectButton />
          </div>
        )}
      </div>
    </div>
  );
}
