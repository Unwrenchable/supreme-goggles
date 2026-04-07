'use client';

import { useAccount, useWalletClient } from 'wagmi';
import { useWallet } from '@solana/wallet-adapter-react';
import { useState, useEffect } from 'react';
import { getDomainsByOwner as getMockDomains, Domain } from '@/lib/mockData';
import { getUserDomainsFromChain } from '@/lib/blockchain';
import { USE_PRODUCTION_MODE } from '@/lib/contract';
import DomainCard from '@/components/DomainCard';
import WalletQRInfo from '@/components/WalletQRInfo';
import Link from 'next/link';

export default function DashboardPage() {
  // EVM wallet
  const { address: evmAddress, isConnected: evmConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  
  // Solana wallet
  const solanaWallet = useWallet();
  const solanaAddress = solanaWallet.publicKey?.toBase58();
  
  const [userDomains, setUserDomains] = useState<Domain[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Determine which wallet is connected
  const isConnected = evmConnected || solanaWallet.connected;
  const displayAddress = solanaWallet.connected ? solanaAddress : evmAddress;

  useEffect(() => {
    const fetchDomains = async () => {
      setIsLoading(true);
      setFetchError(null);

      try {
        let domains: Domain[] = [];

        // Fetch Solana domains if Solana wallet connected
        if (solanaWallet.connected && solanaWallet.publicKey && USE_PRODUCTION_MODE) {
          const { Connection, PublicKey } = await import('@solana/web3.js');
          const connection = new Connection(
            process.env.NEXT_PUBLIC_SOLANA_NETWORK === 'mainnet-beta'
              ? 'https://api.mainnet-beta.solana.com'
              : 'https://api.devnet.solana.com',
            'confirmed'
          );
          
          const programId = new PublicKey(
            process.env.NEXT_PUBLIC_SOLANA_CONTRACT_ADDRESS || 
            '6vyzvhsAbQxttvgvaouHuYrqhSAV8TLMoimkEQWwCyyR'
          );

          // Get all program accounts
          const accounts = await connection.getProgramAccounts(programId, {
            filters: [
              {
                memcmp: {
                  offset: 8, // Skip 8-byte discriminator
                  bytes: solanaWallet.publicKey.toBase58(),
                },
              },
            ],
          });

          // Parse domain accounts
          for (const { pubkey, account } of accounts) {
            try {
              const data = account.data;
              if (data.length < 8) continue;

              // Parse domain data (simplified - you may need to adjust based on your struct layout)
              // Skip discriminator (8 bytes) + owner pubkey (32 bytes)
              let offset = 40;
              
              // Read domain_name (4-byte length + string)
              const nameLen = data.readUInt32LE(offset);
              offset += 4;
              const domainName = data.slice(offset, offset + nameLen).toString('utf-8');
              offset += nameLen;
              
              // Read extension (4-byte length + string)
              const extLen = data.readUInt32LE(offset);
              offset += 4;
              const extension = data.slice(offset, offset + extLen).toString('utf-8');
              
              domains.push({
                name: domainName,
                extension: extension,
                owner: solanaWallet.publicKey.toBase58(),
                registeredAt: Date.now(),
                isActive: true,
                records: {
                  wallet: solanaWallet.publicKey.toBase58(),
                },
                chain: 'Solana',
              });
            } catch (parseError) {
              console.error('Error parsing domain:', parseError);
            }
          }
        }
        // Fetch EVM domains if EVM wallet connected
        else if (evmConnected && evmAddress) {
          // In production mode, build a JsonRpcProvider matched to the user's chain.
          // This avoids querying the wrong network when the wallet switches chains.
          let evmProvider: import('ethers').Provider | undefined;
          if (USE_PRODUCTION_MODE) {
            try {
              const { ethers } = await import('ethers');
              // Public RPC fallbacks per chain — prefer env vars when set
              const rpcByChainId: Record<number, string> = {
                1:        process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL  || 'https://eth.llamarpc.com',
                10:       process.env.NEXT_PUBLIC_OPTIMISM_RPC_URL  || 'https://mainnet.optimism.io',
                56:       process.env.NEXT_PUBLIC_BSC_RPC_URL       || 'https://bsc-dataseed.binance.org',
                137:      process.env.NEXT_PUBLIC_POLYGON_RPC_URL   || 'https://polygon-rpc.com',
                250:      process.env.NEXT_PUBLIC_FANTOM_RPC_URL    || 'https://rpcapi.fantom.network',
                8453:     process.env.NEXT_PUBLIC_BASE_RPC_URL      || 'https://mainnet.base.org',
                42161:    process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL  || 'https://arb1.arbitrum.io/rpc',
                43114:    process.env.NEXT_PUBLIC_AVALANCHE_RPC_URL || 'https://api.avax.network/ext/bc/C/rpc',
                11155111: process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL   || 'https://rpc.sepolia.org',
              };
              // walletClient.chain.id carries the currently connected chain
              const chainId = (walletClient as { chain?: { id?: number } } | null)?.chain?.id ?? 1;
              const rpcUrl = rpcByChainId[chainId] ?? rpcByChainId[1];
              evmProvider = new ethers.JsonRpcProvider(rpcUrl);
            } catch {
              // provider creation failed; getUserDomainsFromChain will fall back to mock
            }
          }
          domains = await getUserDomainsFromChain(evmAddress, evmProvider);
        }
        // Demo mode fallback
        else if (!USE_PRODUCTION_MODE && displayAddress) {
          domains = getMockDomains(displayAddress);
        }

        setUserDomains(domains);
      } catch (error) {
        console.error('Failed to fetch domains:', error);
        setFetchError('Failed to fetch domains from blockchain. Showing cached data.');
        
        // Fallback to mock data
        if (displayAddress) {
          const mockDomains = getMockDomains(displayAddress);
          setUserDomains(mockDomains);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (isConnected) {
      fetchDomains();
    } else {
      setUserDomains([]);
      setIsLoading(false);
      setFetchError(null);
    }
  }, [solanaWallet.connected, solanaWallet.publicKey, evmConnected, evmAddress, displayAddress, walletClient]);

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
          Manage your Web3 domains • Connected: {displayAddress?.slice(0, 6)}...{displayAddress?.slice(-4)}
          {solanaWallet.connected && <span className="ml-2 text-purple-400">(Solana)</span>}
          {evmConnected && <span className="ml-2 text-blue-400">(EVM)</span>}
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
            {userDomains.map((domain) => (
              <DomainCard key={`${domain.name}${domain.extension}`} domain={domain} />
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