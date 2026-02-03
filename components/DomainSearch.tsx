'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DOMAIN_EXTENSIONS } from '@/lib/contract';

export default function DomainSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExtension, setSelectedExtension] = useState('.fizz');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?domain=${encodeURIComponent(searchTerm)}&ext=${encodeURIComponent(selectedExtension)}`);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1 flex rounded-lg overflow-hidden border-2 border-purple-500/30 bg-black/40 backdrop-blur-sm focus-within:border-purple-500 transition">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for your perfect identity..."
            className="flex-1 px-4 py-3 bg-transparent text-white placeholder-gray-400 outline-none"
          />
          <select
            value={selectedExtension}
            onChange={(e) => setSelectedExtension(e.target.value)}
            className="px-3 bg-purple-900/50 text-purple-200 border-l border-purple-500/30 outline-none cursor-pointer"
          >
            {DOMAIN_EXTENSIONS.map((ext) => (
              <option key={ext} value={ext} className="bg-gray-900">
                {ext}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-lg transition shadow-lg shadow-purple-500/50"
        >
          Search
        </button>
      </form>
      
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-gray-400 text-sm">Popular:</span>
        {['defi', 'nft', 'web3', 'dao', 'metaverse'].map((term) => (
          <button
            key={term}
            onClick={() => setSearchTerm(term)}
            className="px-3 py-1 bg-purple-900/30 text-purple-300 rounded-full text-sm hover:bg-purple-900/50 transition"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}
