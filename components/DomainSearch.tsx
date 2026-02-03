'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DOMAIN_EXTENSIONS } from '@/lib/contract';

export default function DomainSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExtension, setSelectedExtension] = useState('.fizz');
  const [customExtension, setCustomExtension] = useState('');
  const [useCustom, setUseCustom] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const extension = useCustom && customExtension 
        ? (customExtension.startsWith('.') ? customExtension : `.${customExtension}`)
        : selectedExtension;
      router.push(`/search?domain=${encodeURIComponent(searchTerm)}&ext=${encodeURIComponent(extension)}`);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSearch} className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 flex rounded-lg overflow-hidden border-2 border-purple-500/30 bg-black/40 backdrop-blur-sm focus-within:border-purple-500 transition">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for your perfect identity..."
              className="flex-1 px-4 py-3 bg-transparent text-white placeholder-gray-400 outline-none"
            />
            {!useCustom ? (
              <select
                value={selectedExtension}
                onChange={(e) => {
                  if (e.target.value === 'custom') {
                    setUseCustom(true);
                  } else {
                    setSelectedExtension(e.target.value);
                  }
                }}
                className="px-3 bg-purple-900/50 text-purple-200 border-l border-purple-500/30 outline-none cursor-pointer"
              >
                {DOMAIN_EXTENSIONS.map((ext) => (
                  <option key={ext} value={ext} className="bg-gray-900">
                    {ext}
                  </option>
                ))}
                <option value="custom" className="bg-gray-900 text-green-400">
                  ✨ Custom .anything
                </option>
              </select>
            ) : (
              <div className="flex items-center bg-purple-900/50 border-l border-purple-500/30">
                <input
                  type="text"
                  value={customExtension}
                  onChange={(e) => setCustomExtension(e.target.value)}
                  placeholder=".anything"
                  className="w-32 px-3 py-3 bg-transparent text-purple-200 placeholder-purple-400 outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    setUseCustom(false);
                    setCustomExtension('');
                  }}
                  className="px-2 text-purple-400 hover:text-purple-300"
                  title="Back to preset extensions"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-lg transition shadow-lg shadow-purple-500/50"
          >
            Search
          </button>
        </div>
        
        {useCustom && (
          <div className="text-center">
            <p className="text-sm text-green-400 mb-1">
              ✨ Custom Extension Mode - Register ANY extension you want!
            </p>
            <p className="text-xs text-gray-500">
              Be the first to own your unique .{customExtension || 'anything'} identity
            </p>
          </div>
        )}
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
