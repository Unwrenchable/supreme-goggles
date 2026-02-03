'use client';

import { useAccount, usePublicClient } from 'wagmi';
import { useState, useEffect } from 'react';
import { getDomainsByOwner as getMockDomains, Domain } from '@/lib/mockData';
import { getUserDomainsFromChain } from '@/lib/blockchain';
import { USE_PRODUCTION_MODE } from '@/lib/contract';
import DomainCard from '@/components/DomainCard';
import WalletQRInfo from '@/components/WalletQRInfo';
import Link from 'next/link';

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  
  const [userDomains, setUserDomains] = useState<Domain[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDomains = async () => {
      if (!address) {
        setUserDomains([]);
        setIsLoading(false);
        setFetchError(null);
        return;
      }

      setIsLoading(true);
      setFetchError(null);

      try {
        // Fetch domains from blockchain or mock data
        const domains = await getUserDomainsFromChain(
          address,
          publicClient as any
        );

        setUserDomains(domains);
      } catch (error) {
        console.error('Failed to fetch domains:', error);
        // Set error state to inform user
        setFetchError('Failed to fetch domains from blockchain. Showing cached data.');
        // Fallback to mock data
        const mockDomains = getMockDomains(address);
        setUserDomains(mockDomains);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDomains();
  }, [address, publicClient]);

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <WalletQRInfo />
          
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-12 text-center">
            <svg className="w-20 h-20 mx-auto mb-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h1 className="text-3xl font-bold text-white mb-4">Connect Your Wallet</h1>
            <p className="text-gray-400 mb-6">
              Please connect your wallet to view and manage your domains
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">My Domains</h1>
        <p className="text-gray-400">
          Manage your Web3 domains • Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
        </p>
        {!USE_PRODUCTION_MODE && (
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-lg">
            <span className="text-amber-400 text-sm">ℹ️ Demo Mode</span>
          </div>
        )}
      </div>

      {fetchError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-red-400 text-xl">⚠️</span>
            <div>
              <p className="text-red-400 font-semibold mb-1">Fetch Error</p>
              <p className="text-red-300 text-sm">
                {fetchError}
              </p>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-12 text-center">
          <div className="flex items-center justify-center gap-3">
            <svg className="animate-spin h-8 w-8 text-purple-400" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-purple-300 text-lg">Loading your domains...</span>
          </div>
        </div>
      ) : userDomains.length === 0 ? (
        <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-12 text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-white mb-4">No Domains Yet</h2>
          <p className="text-gray-400 mb-6">
            You haven&apos;t registered any domains yet. Start building your Web3 identity!
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-lg transition shadow-lg shadow-purple-500/50"
          >
            Search for Domains
          </Link>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {userDomains.map((domain, idx) => (
              <DomainCard key={idx} domain={domain} />
            ))}
          </div>

          <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20 rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-4">Want more domains?</h3>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg transition"
            >
              Register Another Domain
            </Link>
          </div>
        </>
      )}
    </div>
  );
}