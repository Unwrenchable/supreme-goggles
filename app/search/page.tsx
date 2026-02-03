'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { checkDomainAvailability, getDomainPrice } from '@/lib/mockData';
import { EXTENSION_INFO } from '@/lib/contract';
import Link from 'next/link';

function SearchResults() {
  const searchParams = useSearchParams();
  const domain = searchParams.get('domain') || '';
  const ext = searchParams.get('ext') || '.web3';
  
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    if (domain) {
      const available = checkDomainAvailability(domain, ext);
      setIsAvailable(available);
      setPrice(getDomainPrice(domain));
    }
  }, [domain, ext]);

  const fullDomain = `${domain}${ext}`;
  const extensionInfo = EXTENSION_INFO[ext as keyof typeof EXTENSION_INFO];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Search Results</h1>
        
        <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{fullDomain}</h2>
              <p className="text-gray-400">
                {domain.length} characters • {extensionInfo ? extensionInfo.chain : 'Multi-Chain'} • Premium identity
              </p>
            </div>
            <div className={`px-6 py-3 rounded-full font-bold text-lg ${
              isAvailable 
                ? 'bg-green-500/20 text-green-400 border-2 border-green-500'
                : 'bg-red-500/20 text-red-400 border-2 border-red-500'
            }`}>
              {isAvailable ? '✓ Available' : '✗ Taken'}
            </div>
          </div>

          {isAvailable ? (
            <>
              <div className="bg-black/30 rounded-lg p-6 mb-6 text-center">
                <div className="inline-block px-4 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-bold rounded-full mb-4">
                  ✨ LIFETIME OWNERSHIP
                </div>
                <p className="text-gray-400 text-sm mb-2">One-time purchase, yours forever</p>
                <p className="text-4xl font-bold text-white mb-2">{price.toFixed(3)} ETH</p>
                <p className="text-gray-400 text-lg">${(price * 3000).toFixed(2)} USD</p>
                <p className="text-purple-300 text-sm mt-4">
                  No renewals • No expiry • Permanent ownership on the blockchain
                </p>
              </div>

              <Link
                href={`/register?domain=${domain}&ext=${ext}`}
                className="block w-full text-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-lg rounded-lg transition shadow-lg shadow-purple-500/50"
              >
                Register {fullDomain} - Lifetime Ownership
              </Link>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">
                This domain is already registered and not available for purchase.
              </p>
              <Link
                href="/"
                className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg transition"
              >
                Search Another Domain
              </Link>
            </div>
          )}
        </div>

        {/* Alternative Suggestions */}
        <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20 rounded-xl p-8">
          <h3 className="text-xl font-bold text-white mb-4">Similar Available Domains</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: `${domain}`, ext: '.eth', price: 0.080 },
              { name: `${domain}`, ext: '.sol', price: 0.065 },
              { name: `${domain}`, ext: '.crypto', price: 0.095 },
              { name: `${domain}`, ext: '.bnb', price: 0.055 },
            ].map((suggestion, idx) => (
              <Link
                key={idx}
                href={`/search?domain=${suggestion.name}&ext=${suggestion.ext}`}
                className="flex items-center justify-between p-4 bg-black/30 rounded-lg hover:bg-black/50 transition border border-purple-500/20 hover:border-purple-500/40"
              >
                <div>
                  <p className="text-white font-semibold">{suggestion.name}{suggestion.ext}</p>
                  <p className="text-gray-400 text-sm">
                    {suggestion.price} ETH - Lifetime • {EXTENSION_INFO[suggestion.ext as keyof typeof EXTENSION_INFO]?.chain}
                  </p>
                </div>
                <span className="text-green-400 text-sm">Available</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-purple-400">Loading...</div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}