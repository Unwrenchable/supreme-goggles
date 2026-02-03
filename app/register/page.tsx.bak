'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';
import { useAccount } from 'wagmi';
import { getDomainPrice } from '@/lib/mockData';

function RegisterForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { address, isConnected } = useAccount();
  
  const domain = searchParams.get('domain') || '';
  const ext = searchParams.get('ext') || '.web3';
  const fullDomain = `${domain}${ext}`;
  
  const [isRegistering, setIsRegistering] = useState(false);

  const price = getDomainPrice(domain);

  const handleRegister = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    setIsRegistering(true);
    
    setTimeout(() => {
      setIsRegistering(false);
      alert(`Successfully registered ${fullDomain} with lifetime ownership!`);
      router.push('/dashboard');
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Register Domain</h1>
        
        <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-8 mb-8">
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-bold rounded-full mb-4">
              ✨ LIFETIME OWNERSHIP
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{fullDomain}</h2>
            <p className="text-gray-400">Own it forever • No renewals required</p>
          </div>

          <div className="bg-black/40 rounded-lg p-6 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Registration Type</span>
              <span className="text-purple-300 font-semibold">Lifetime Ownership</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Expiration</span>
              <span className="text-green-400 font-semibold">Never</span>
            </div>
            <div className="border-t border-purple-500/30 mt-4 pt-4">
              <div className="flex justify-between">
                <span className="text-white font-bold text-lg">One-Time Payment</span>
                <div className="text-right">
                  <p className="text-white font-bold text-lg">{price.toFixed(4)} ETH</p>
                  <p className="text-gray-400 text-sm">${(price * 3000).toFixed(2)} USD</p>
                </div>
              </div>
            </div>
          </div>

          {!isConnected ? (
            <div className="text-center py-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg mb-6">
              <p className="text-yellow-400">Please connect your wallet to continue</p>
            </div>
          ) : (
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mb-6">
              <p className="text-purple-300 text-sm">
                <strong>Connected:</strong> {address?.slice(0, 6)}...{address?.slice(-4)}
              </p>
            </div>
          )}

          <button
            onClick={handleRegister}
            disabled={!isConnected || isRegistering}
            className={`w-full px-8 py-4 font-bold text-lg rounded-lg transition shadow-lg ${
              isConnected && !isRegistering
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-purple-500/50'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isRegistering ? 'Processing...' : `Register for ${price.toFixed(4)} ETH - Lifetime`}
          </button>
        </div>

        <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-3">What you get with Lifetime Ownership:</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">✓</span>
              Permanent ownership on the blockchain - yours forever
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">✓</span>
              No renewal fees or expiration dates
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">✓</span>
              Link your wallet, IPFS, and social accounts
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">✓</span>
              Use across multiple Web3 platforms
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">✓</span>
              Transfer or sell your domain anytime
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