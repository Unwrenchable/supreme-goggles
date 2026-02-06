'use client';

/**
 * WalletQRInfo Component
 * 
 * Displays helpful information about connecting mobile wallets via QR code
 * Shows on pages where wallet connection is important
 */
export default function WalletQRInfo() {
  return (
    <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl p-6 mb-8">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <svg 
              className="w-7 h-7 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" 
              />
            </svg>
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            📱 Connect with Mobile Wallet
          </h3>
          <p className="text-gray-300 text-sm mb-3">
            Use your mobile wallet app to connect by scanning the QR code:
          </p>
          
          <ol className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-300 text-xs font-bold">1</span>
              <span>Click <strong className="text-white">"Connect Wallet"</strong> button above</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-300 text-xs font-bold">2</span>
              <span>Select <strong className="text-white">"WalletConnect"</strong> or your preferred mobile wallet</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-300 text-xs font-bold">3</span>
              <span>Open your mobile wallet app on your phone</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-300 text-xs font-bold">4</span>
              <span>Scan the <strong className="text-white">QR code</strong> that appears in the popup</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-300 text-xs font-bold">5</span>
              <span>Approve the connection in your mobile wallet</span>
            </li>
          </ol>
          
          <div className="mt-4 pt-4 border-t border-purple-500/20">
            <p className="text-xs text-gray-400 mb-3">
              <strong className="text-purple-300">Supported Mobile Wallets (EVM Chains):</strong>
              <br />
              <span className="inline-flex items-center gap-2 mt-1">
                🦊 <strong className="text-white">MetaMask</strong> • Trust Wallet • Rainbow • Coinbase Wallet
              </span>
              <br />
              <span className="inline-flex items-center gap-2 mt-1">
                🟣 <strong className="text-white">Phantom</strong> (EVM + Solana) • 300+ WalletConnect wallets
              </span>
            </p>
            <p className="text-xs text-gray-400">
              <strong className="text-purple-300">Supported Networks:</strong>
              <br />
              <span className="inline-flex items-center gap-2 mt-1">
                <strong className="text-purple-400">Solana</strong> (devnet/mainnet) • Ethereum • Polygon • Arbitrum • Optimism • Base • BSC • Avalanche • Fantom
              </span>
            </p>
            <p className="text-xs text-gray-400 mt-3">
              💡 <strong className="text-purple-300">Tip:</strong> Make sure your phone and computer are on the same network for the best connection experience.
            </p>
            <p className="text-xs text-green-400/80 mt-2">
              ✅ <strong>Note:</strong> Native Solana wallet connections are now fully supported! Use Phantom to connect and register Solana domains (.fizz, .sol, etc.).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
