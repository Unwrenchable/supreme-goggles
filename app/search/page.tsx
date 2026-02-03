'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { checkDomainAvailability, getDomainPrice } from '@/lib/mockData';
import { EXTENSION_INFO, getCurrencyUSDRate } from '@/lib/contract';
import Link from 'next/link';

function SearchResults() {
  const searchParams = useSearchParams();
  const domain = searchParams.get('domain') || '';
  const ext = searchParams.get('ext') || '.web3';
  
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [priceInfo, setPriceInfo] = useState<{ price: number; currency: string; currencySymbol: string }>({ price: 0, currency: 'ETH', currencySymbol: 'ETH' });

  useEffect(() => {
    if (domain) {
      const available = checkDomainAvailability(domain, ext);
      setIsAvailable(available);
      setPriceInfo(getDomainPrice(domain, ext));
    }
  }, [domain, ext]);

  const fullDomain = `${domain}${ext}`;
  const extensionInfo = EXTENSION_INFO[ext as keyof typeof EXTENSION_INFO] || {
    name: ext.toUpperCase().replace('.', ''),
    chain: 'Custom Extension',
    description: 'Your unique custom extension',
    currency: 'ETH',
    currencySymbol: 'ETH',
  };
  
  const usdRate = getCurrencyUSDRate(priceInfo.currency);
  const usdValue = priceInfo.price * usdRate;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">Search Results</h1>
        <p className="text-slate-400 mb-8">Review domain availability and pricing</p>
        
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex-1 min-w-[250px]">
              <h2 className="text-3xl font-bold text-white mb-2">{fullDomain}</h2>
              <p className="text-slate-400 text-sm">
                {domain.length} characters • {extensionInfo.chain} • {extensionInfo.chain === 'Custom Extension' ? '✨ First of its kind!' : 'Premium identity'}
              </p>
              <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-full">
                <span className="text-indigo-300 text-xs font-medium">💎 Pay in {priceInfo.currencySymbol}</span>
              </div>
            </div>
            <div className={`px-6 py-3 rounded-xl font-bold text-lg border-2 ${
              isAvailable 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/50'
                : 'bg-red-500/10 text-red-400 border-red-500/50'
            }`}>
              {isAvailable ? '✓ Available' : '✗ Taken'}
            </div>
          </div>

          {isAvailable ? (
            <>
              <div className="bg-slate-950/50 rounded-xl p-8 mb-6 text-center border border-slate-800/50">
                <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-semibold rounded-full mb-4 uppercase tracking-wide">
                  ✨ Lifetime Ownership
                </div>
                {extensionInfo.chain === 'Custom Extension' && (
                  <p className="text-emerald-400 text-sm mb-4 font-medium">
                    🎉 Be the FIRST to own a {ext} extension! Set the trend!
                  </p>
                )}
                <p className="text-slate-400 text-sm mb-3">One-time purchase • Yours forever</p>
                <p className="text-5xl font-bold text-white mb-2">{priceInfo.price.toFixed(3)} {priceInfo.currencySymbol}</p>
                <p className="text-slate-400 text-lg">≈ ${usdValue.toFixed(2)} USD</p>
                <p className="text-violet-300 text-sm mt-4 bg-violet-500/5 border border-violet-500/20 rounded-lg py-2 px-4 inline-block">
                  No renewals • No expiry • Permanent blockchain ownership
                </p>
              </div>

              <Link
                href={`/register?domain=${domain}&ext=${ext}`}
                className="block w-full text-center px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-lg rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/50 hover:shadow-violet-500/70 hover:scale-[1.02]"
              >
                Register {fullDomain} - Pay in {priceInfo.currencySymbol}
              </Link>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="mb-4 inline-block p-4 bg-red-500/10 rounded-full">
                <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p className="text-slate-300 mb-6 text-lg">
                This domain is already registered and not available for purchase.
              </p>
              <Link
                href="/"
                className="inline-block px-8 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg"
              >
                Search Another Domain
              </Link>
            </div>
          )}
        </div>

        {/* Alternative Suggestions */}
        <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-6">Similar Available Domains</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: `${domain}`, ext: '.eth' },
              { name: `${domain}`, ext: '.sol' },
              { name: `${domain}`, ext: '.fizz' },
              { name: `${domain}`, ext: '.bnb' },
            ].map((suggestion, idx) => {
              const suggestionPrice = getDomainPrice(suggestion.name, suggestion.ext);
              const suggestionInfo = EXTENSION_INFO[suggestion.ext as keyof typeof EXTENSION_INFO];
              return (
                <Link
                  key={idx}
                  href={`/search?domain=${suggestion.name}&ext=${suggestion.ext}`}
                  className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl hover:bg-slate-800/50 transition-all duration-200 border border-slate-700/30 hover:border-violet-500/40 hover:scale-[1.02]"
                >
                  <div>
                    <p className="text-white font-semibold mb-1">{suggestion.name}{suggestion.ext}</p>
                    <p className="text-slate-400 text-sm">
                      {suggestionPrice.price.toFixed(3)} {suggestionPrice.currencySymbol} • Lifetime • {suggestionInfo?.chain || 'Multi-Chain'}
                    </p>
                  </div>
                  <span className="text-emerald-400 text-sm font-medium px-3 py-1 bg-emerald-500/10 rounded-full">Available</span>
                </Link>
              );
            })}
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