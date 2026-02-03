export default function Footer() {
  return (
    <footer className="border-t border-purple-500/20 bg-black/50 backdrop-blur-md mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
              AtomicFizzCaps
            </h3>
            <p className="text-gray-400 text-sm">
              Your gateway to Web3 domain ownership on the blockchain.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-3">Domains</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/" className="hover:text-purple-400 transition">Search Domains</a></li>
              <li><a href="/dashboard" className="hover:text-purple-400 transition">My Domains</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">Popular Domains</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-purple-400 transition">Documentation</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">API</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-3">Community</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-purple-400 transition">Twitter</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">Discord</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">GitHub</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-purple-500/20 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; 2024 atomicfizzcaps.xyz. All rights reserved. Powered by blockchain technology.</p>
        </div>
      </div>
    </footer>
  );
}
