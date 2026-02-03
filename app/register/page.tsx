'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { BrowserProvider } from 'ethers';
import { getDomainPrice } from '@/lib/mockData';
import { EXTENSION_INFO, getCurrencyUSDRate, isProductionConfigured, USE_PRODUCTION_MODE } from '@/lib/contract';
import { registerDomainOnChain, formatTransactionError } from '@/lib/blockchain';

function RegisterForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  
  const domain = searchParams.get('domain') || '';
  const ext = searchParams.get('ext') || '.web3';
  const fullDomain = `${domain}${ext}`;
  
  const [isRegistering, setIsRegistering] = useState(false);
  const [txHash, setTxHash] = useState<string>('');
  const [txStatus, setTxStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const priceInfo = getDomainPrice(domain, ext);
  const extensionInfo = EXTENSION_INFO[ext as keyof typeof EXTENSION_INFO] || {
    name: ext.toUpperCase().replace('.', ''),
    chain: 'Custom Extension',
    description: 'Your unique custom extension',
    currency: 'ETH',
    currencySymbol: 'ETH',
  };
  
  const usdRate = getCurrencyUSDRate(priceInfo.currency);
  const usdValue = priceInfo.price * usdRate;
  
  const isProductionMode = USE_PRODUCTION_MODE && isProductionConfigured(ext);

  const handleRegister = async () => {
    if (!isConnected) {
      setErrorMessage('Please connect your wallet first');
      return;
    }

    setIsRegistering(true);
    setTxStatus('pending');
    setErrorMessage('');
    setTxHash('');
    
    try {
      // Production mode: Real blockchain transaction
      if (isProductionMode && walletClient) {
        // Convert walletClient to ethers signer
        const provider = new BrowserProvider(walletClient);
        const signer = await provider.getSigner();
        
        // Convert price to BigInt (wei/smallest unit)
        const paymentAmount = BigInt(Math.floor(priceInfo.price * 1e18));
        
        const result = await registerDomainOnChain(
          fullDomain,
          ext,
          paymentAmount,
          signer
        );
        
        if (result.success && result.transactionHash) {
          setTxHash(result.transactionHash);
          setTxStatus('success');
          
          // Redirect to dashboard after a short delay
          setTimeout(() => {
            router.push('/dashboard');
          }, 3000);
        } else {
          setTxStatus('error');
          setErrorMessage(result.error || 'Transaction failed');
        }
      } 
      // Demo mode: Simulate transaction
      else {
        await new Promise(resolve => setTimeout(resolve, 2000));
        setTxStatus('success');
        
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      setTxStatus('error');
      setErrorMessage(formatTransactionError(error));
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">Register Domain</h1>
        <p className="text-slate-400 mb-8">Secure your Web3 identity with lifetime ownership</p>
        
        {/* Demo Mode Banner */}
        {!isProductionMode && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-amber-400 text-xl">ℹ️</span>
              <div>
                <p className="text-amber-400 font-semibold mb-1">Demo Mode</p>
                <p className="text-amber-300 text-sm">
                  This is currently in demo mode. To enable real payments, see the <a href="/PAYMENTS.md" className="underline">payment setup guide</a>.
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-semibold rounded-full mb-4 uppercase tracking-wide">
              ✨ Lifetime Ownership
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{fullDomain}</h2>
            <p className="text-slate-400">Permanent • No Renewals • Transfer Anytime</p>
            <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/30 rounded-full">
              <span className="text-indigo-300 text-sm font-medium">💎 Pay in {priceInfo.currencySymbol}</span>
              <span className="text-slate-400 text-xs">• {extensionInfo.chain}</span>
            </div>
          </div>

          <div className="bg-slate-950/50 rounded-xl p-6 mb-6 border border-slate-800/50">
            <div className="flex justify-between mb-3 pb-3 border-b border-slate-800/50">
              <span className="text-slate-400 text-sm">Registration Type</span>
              <span className="text-violet-300 font-semibold">Lifetime</span>
            </div>
            <div className="flex justify-between mb-3 pb-3 border-b border-slate-800/50">
              <span className="text-slate-400 text-sm">Payment Currency</span>
              <span className="text-indigo-400 font-semibold">{priceInfo.currencySymbol}</span>
            </div>
            <div className="flex justify-between mb-3 pb-3 border-b border-slate-800/50">
              <span className="text-slate-400 text-sm">Network</span>
              <span className="text-blue-400 font-medium">{extensionInfo.chain}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 text-sm">Expiration</span>
              <span className="text-emerald-400 font-semibold">Never</span>
            </div>
            <div className="border-t border-slate-700/50 mt-6 pt-6">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold text-lg">Total Payment</span>
                <div className="text-right">
                  <p className="text-white font-bold text-2xl">{priceInfo.price.toFixed(4)} {priceInfo.currencySymbol}</p>
                  <p className="text-slate-400 text-sm">≈ ${usdValue.toFixed(2)} USD</p>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Status Messages */}
          {txStatus === 'pending' && (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <svg className="animate-spin h-5 w-5 text-blue-400" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <div>
                  <p className="text-blue-400 font-semibold">Transaction Pending</p>
                  <p className="text-blue-300 text-sm">
                    {isProductionMode ? 'Waiting for blockchain confirmation...' : 'Simulating registration...'}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {txStatus === 'success' && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 text-xl">✓</span>
                <div className="flex-1">
                  <p className="text-emerald-400 font-semibold mb-1">Successfully Registered!</p>
                  <p className="text-emerald-300 text-sm mb-2">
                    {fullDomain} is now registered with lifetime ownership!
                  </p>
                  {txHash && (
                    <a 
                      href={`https://etherscan.io/tx/${txHash}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-emerald-400 text-xs underline hover:text-emerald-300"
                    >
                      View transaction ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {txStatus === 'error' && errorMessage && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-red-400 text-xl">✕</span>
                <div>
                  <p className="text-red-400 font-semibold mb-1">Transaction Failed</p>
                  <p className="text-red-300 text-sm">{errorMessage}</p>
                </div>
              </div>
            </div>
          )}

          {!isConnected ? (
            <div className="text-center py-4 bg-amber-500/10 border border-amber-500/30 rounded-xl mb-6">
              <p className="text-amber-400 font-medium">Please connect your wallet to continue</p>
            </div>
          ) : (
            <div className="bg-violet-500/5 border border-violet-500/20 rounded-xl p-4 mb-6">
              <p className="text-violet-300 text-sm font-medium">
                <strong>Connected:</strong> {address?.slice(0, 6)}...{address?.slice(-4)}
              </p>
              <p className="text-indigo-300 text-xs mt-2 flex items-start gap-2">
                <span>💡</span>
                <span>Ensure your wallet is on {extensionInfo.chain} network to complete payment in {priceInfo.currencySymbol}</span>
              </p>
            </div>
          )}

          <button
            onClick={handleRegister}
            disabled={!isConnected || isRegistering || txStatus === 'success'}
            className={`w-full px-8 py-4 font-semibold text-base rounded-xl transition-all duration-200 shadow-lg ${
              isConnected && !isRegistering && txStatus !== 'success'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-violet-500/50 hover:shadow-violet-500/70 hover:scale-[1.02]'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            {isRegistering ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isProductionMode ? 'Processing Transaction...' : 'Processing...'}
              </span>
            ) : txStatus === 'success' ? (
              'Redirecting to Dashboard...'
            ) : (
              `Pay ${priceInfo.price.toFixed(4)} ${priceInfo.currencySymbol} - Register Now`
            )}
          </button>
        </div>

        <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Lifetime Ownership Benefits</h3>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-start gap-3">
              <span className="text-violet-400 text-lg">✓</span>
              <span>Permanent ownership recorded on the blockchain</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-violet-400 text-lg">✓</span>
              <span>No renewal fees or expiration dates ever</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-violet-400 text-lg">✓</span>
              <span>Link wallet addresses, IPFS content, and social profiles</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-violet-400 text-lg">✓</span>
              <span>Compatible across multiple Web3 platforms</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-violet-400 text-lg">✓</span>
              <span>Transfer or sell your domain whenever you choose</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-400 text-lg">💎</span>
              <span>
                <strong className="text-white">Native chain payment:</strong> Pay in {priceInfo.currencySymbol} for {extensionInfo.chain} domains
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-purple-400">Loading...</div>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}
