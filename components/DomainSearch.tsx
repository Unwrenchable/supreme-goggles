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
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex rounded-xl overflow-hidden border-2 border-slate-700/50 bg-slate-900/50 backdrop-blur-sm focus-within:border-violet-500/50 transition-all shadow-lg">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for your perfect identity..."
              className="flex-1 px-5 py-4 bg-transparent text-white placeholder-slate-500 outline-none text-lg"
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
                className="px-4 bg-slate-800/80 text-violet-200 border-l border-slate-700/50 outline-none cursor-pointer font-medium hover:bg-slate-800 transition-colors"
              >
                {DOMAIN_EXTENSIONS.map((ext) => (
                  <option key={ext} value={ext} className="bg-slate-900">
                    {ext}
                  </option>
                ))}
                <option value="custom" className="bg-slate-900 text-emerald-400">
                  ✨ Custom .anything
                </option>
              </select>
            ) : (
              <div className="flex items-center bg-slate-800/80 border-l border-slate-700/50">
                <input
                  type="text"
                  value={customExtension}
                  onChange={(e) => setCustomExtension(e.target.value)}
                  placeholder=".anything"
                  className="w-32 px-4 py-4 bg-transparent text-violet-200 placeholder-violet-400/50 outline-none font-medium"
                />
                <button
                  type="button"
                  onClick={() => {
                    setUseCustom(false);
                    setCustomExtension('');
                  }}
                  className="px-3 text-slate-400 hover:text-slate-300 transition-colors"
                  title="Back to preset extensions"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="px-10 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/50 hover:shadow-violet-500/70 hover:scale-[1.02]"
          >
            Search
          </button>
        </div>
        
        {useCustom && (
          <div className="text-center bg-emerald-500/10 border border-emerald-500/30 rounded-xl py-3 px-4">
            <p className="text-sm text-emerald-400 font-medium mb-1">
              ✨ Custom Extension Mode - Register ANY extension you want!
            </p>
            <p className="text-xs text-slate-400">
              Be the first to own your unique .{customExtension || 'anything'} identity
            </p>
          </div>
        )}
      </form>
      
      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        <span className="text-slate-400 text-sm font-medium">Popular searches:</span>
        {['defi', 'nft', 'web3', 'dao', 'metaverse'].map((term) => (
          <button
            key={term}
            onClick={() => setSearchTerm(term)}
            className="px-4 py-1.5 bg-slate-800/50 border border-slate-700/50 text-slate-300 rounded-lg text-sm hover:bg-slate-800 hover:border-violet-500/30 hover:text-violet-300 transition-all"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}
