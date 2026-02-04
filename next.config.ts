import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Output standalone build for optimized serverless deployment
  output: 'standalone',
  
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Optimize images
  images: {
    domains: [],
    unoptimized: false,
  },
  
  // Turbopack configuration (Next.js 16+)
  turbopack: {
    // Empty config to acknowledge Turbopack usage
  },
  
  // Configure webpack for Web3 packages (fallback for webpack builds)
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    // Externalize node modules that cause issues in browser
    // Ensure externals is an array before pushing
    if (!config.externals) {
      config.externals = [];
    }
    if (!Array.isArray(config.externals)) {
      config.externals = [config.externals];
    }
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    
    return config;
  },
  
  // Environment variables validation
  env: {
    NEXT_PUBLIC_APP_NAME: 'AtomicFizzCaps Universal Naming Service',
  },
  
  // Disable powered by header
  poweredByHeader: false,
  
  // Compression
  compress: true,
  
  // Production source maps (disable for smaller bundles)
  productionBrowserSourceMaps: false,
  
  // Optimize for Vercel deployment
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: ['@solana/web3.js', 'ethers', 'viem'],
  },
};

export default nextConfig;
