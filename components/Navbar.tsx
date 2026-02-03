'use client';

import DualWalletConnect from './DualWalletConnect';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="border-b border-purple-500/20 bg-black/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                AtomicFizzCaps
              </h1>
              <p className="text-xs text-gray-400">Universal Naming</p>
            </div>
          </Link>
          
          <div className="flex space-x-6 items-center">
            <Link href="/" className="text-gray-300 hover:text-purple-400 transition">
              Search
            </Link>
            <Link href="/dashboard" className="text-gray-300 hover:text-purple-400 transition">
              My Identities
            </Link>
            <Link href="#" className="text-gray-300 hover:text-purple-400 transition">
              About
            </Link>
          </div>

          <DualWalletConnect />
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Top Row: Logo + Brand */}
          <div className="flex items-center justify-between mb-3">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  AtomicFizzCaps
                </h1>
                <p className="text-xs text-gray-400">Universal Naming</p>
              </div>
            </Link>
          </div>

          {/* Wallet Connect Section */}
          <div className="mb-3">
            <DualWalletConnect />
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex justify-around text-sm border-t border-purple-500/20 pt-2">
            <Link href="/" className="text-gray-300 hover:text-purple-400 transition py-1">
              Search
            </Link>
            <Link href="/dashboard" className="text-gray-300 hover:text-purple-400 transition py-1">
              Identities
            </Link>
            <Link href="#" className="text-gray-300 hover:text-purple-400 transition py-1">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
