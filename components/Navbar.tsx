'use client';

import DualWalletConnect from './DualWalletConnect';

export default function Navbar() {
  return (
    <nav className="border-b border-purple-500/20 bg-black/50 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              AtomicFizzCaps
            </h1>
            <p className="text-xs text-gray-400">Universal Naming</p>
          </div>
        </div>
        
        <div className="hidden md:flex space-x-6 items-center">
          <a href="/" className="text-gray-300 hover:text-purple-400 transition">
            Search
          </a>
          <a href="/dashboard" className="text-gray-300 hover:text-purple-400 transition">
            My Identities
          </a>
          <a href="#" className="text-gray-300 hover:text-purple-400 transition">
            About
          </a>
        </div>

        <DualWalletConnect />
      </div>
    </nav>
  );
}
