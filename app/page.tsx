import DomainSearch from '@/components/DomainSearch';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 border border-violet-500/30 text-violet-300 text-sm font-semibold rounded-full mb-6 uppercase tracking-wide">
          Powered by Multi-Chain Technology
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
            Register ANY Extension
          </span>
          <br />
          <span className="text-white">Truly Unlimited Web3 Identity</span>
        </h1>
        <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
          Choose from .fizz (Solana), .eth (Ethereum), .sol, and 15+ chains - or create your own .anything extension. 
          <span className="text-violet-300 font-semibold"> Lifetime ownership</span>, pay in native currency, completely future-proof.
        </p>
        <DomainSearch />
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-20">
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-violet-500/50 transition-all duration-300 hover:scale-[1.02]">
          <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-violet-700 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-violet-500/20">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-3">ANY Extension</h3>
          <p className="text-slate-400 leading-relaxed">
            Not limited to preset extensions - register .anything you want! Be the first to own your custom extension.
          </p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-indigo-500/50 transition-all duration-300 hover:scale-[1.02]">
          <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-indigo-500/20">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Lifetime Ownership</h3>
          <p className="text-slate-400 leading-relaxed">
            Pay once, own forever. No renewal fees, no expiration dates - permanent blockchain ownership.
          </p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:scale-[1.02]">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-blue-500/20">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Native Chain Payments</h3>
          <p className="text-slate-400 leading-relaxed">
            Pay in SOL for Solana domains, ETH for Ethereum, BNB for BNB Chain - each domain uses its native currency.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-slate-900/50 to-slate-900/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-12 text-center mb-12">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="text-5xl font-bold text-transparent bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text mb-2">
              10,000+
            </div>
            <div className="text-slate-400 font-medium">Domains Registered</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-transparent bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text mb-2">
              5,000+
            </div>
            <div className="text-slate-400 font-medium">Active Users</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text mb-2">
              99.9%
            </div>
            <div className="text-slate-400 font-medium">Platform Uptime</div>
          </div>
        </div>
      </div>

      {/* Supported Chains */}
      <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-6">Supported Blockchains</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {['Ethereum', 'Solana', 'BNB Chain', 'Polygon', 'Arbitrum', 'Optimism', 'Avalanche', 'Fantom'].map((chain) => (
            <span key={chain} className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 text-slate-300 rounded-lg text-sm font-medium hover:border-violet-500/50 transition-all">
              {chain}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
