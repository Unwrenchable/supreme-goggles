'use client';

import { Domain } from '@/lib/mockData';
import Link from 'next/link';

interface DomainCardProps {
  domain: Domain;
}

export default function DomainCard({ domain }: DomainCardProps) {
  const fullDomain = `${domain.name}${domain.extension}`;
  const registeredDate = new Date(domain.registeredAt);
  
  return (
    <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-lg p-6 hover:border-purple-500/60 transition">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-bold text-white mb-1">{fullDomain}</h3>
          <p className="text-gray-400 text-sm">
            Owner: {domain.owner.slice(0, 6)}...{domain.owner.slice(-4)}
          </p>
          {domain.chain && (
            <p className="text-xs text-purple-400 mt-1">
              {domain.chain === 'Solana' ? '🟣' : '⛓️'} {domain.chain}
            </p>
          )}
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/50">
          ✨ Lifetime
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Registered:</span>
          <span className="text-white">{registeredDate.toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Status:</span>
          <span className="text-green-400 font-semibold">Permanent Ownership</span>
        </div>
      </div>

      {Object.keys(domain.records).length > 0 && (
        <div className="mb-4">
          <p className="text-gray-400 text-xs mb-2">Records:</p>
          <div className="space-y-1">
            {Object.entries(domain.records).slice(0, 2).map(([key, value]) => (
              <div key={key} className="text-xs bg-black/30 px-2 py-1 rounded">
                <span className="text-purple-400">{key}:</span>{' '}
                <span className="text-gray-300">{value.slice(0, 30)}...</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <Link
        href={`/manage/${fullDomain}`}
        className="block w-full text-center px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition mb-2"
      >
        Manage Domain
      </Link>
      
      {domain.chain === 'Solana' && (
        <a
          href={`https://explorer.solana.com/address/${domain.records.wallet}?cluster=devnet`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center px-4 py-2 bg-purple-900/50 hover:bg-purple-900/70 text-purple-300 rounded-lg transition text-sm border border-purple-500/30"
        >
          View on Solana Explorer →
        </a>
      )}
    </div>
  );
}
