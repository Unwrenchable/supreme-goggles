'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState } from 'react';

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
 */
export default function DualWalletConnect() {
  const [activeChain, setActiveChain] = useState<'evm' | 'solana'>('solana');

  return (
    <div className="flex flex-col sm:flex-row gap-2 items-center">
      {/* Chain Toggle */}
      <div className="hidden sm:flex bg-black/30 rounded-lg p-1 gap-1">
        <button
          onClick={() => setActiveChain('solana')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            activeChain === 'solana'
              ? 'bg-purple-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
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
        >
          EVM
        </button>
      </div>

      {/* Wallet Buttons */}
      <div className="flex gap-2">
        {activeChain === 'solana' ? (
          <div className="solana-wallet-button">
            <WalletMultiButton />
          </div>
        ) : (
          <ConnectButton />
        )}
      </div>

      {/* Mobile: Show both buttons stacked */}
      <div className="sm:hidden flex flex-col gap-2 w-full">
        <div className="solana-wallet-button">
          <WalletMultiButton />
        </div>
        <ConnectButton />
      </div>
    </div>
  );
}
