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
  
  // Turbopack is enabled by default in Next.js 16.
  // The empty config acknowledges Turbopack usage while still keeping
  // the webpack config as a fallback for older/custom build tooling.
  // Turbopack automatically handles Node.js built-in fallbacks for
  // browser code, so no extra polyfill config is needed here.
  turbopack: {},
  
  // Configure webpack for Web3 packages (used when --webpack flag is passed)
  webpack: (config, { isServer }) => {
    // Polyfill / disable Node.js built-ins that are not available in the browser
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        path: false,
        os: false,
        http: false,
        https: false,
        zlib: false,
      };
    }
    
    // Externalize server-only packages that cause issues when bundled
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
    // Enable optimized package imports for better tree-shaking
    optimizePackageImports: ['@solana/web3.js', 'ethers', 'viem'],
  },
};

export default nextConfig;
