import { ethers } from 'ethers';
import DomainRegistryABI from '@/contracts/DomainRegistry.json';

export const DOMAIN_REGISTRY_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';

// IMPORTANT: Payment Collection Configuration
// This is where YOU receive payments when users register domains
// In production, this should be YOUR wallet address or a multi-sig treasury
export const PAYMENT_RECIPIENT_ADDRESS = process.env.NEXT_PUBLIC_PAYMENT_RECIPIENT_ADDRESS || '0x0000000000000000000000000000000000000000';

// For Solana-based domains (.fizz, .atomic, .sol)
export const SOLANA_PAYMENT_ADDRESS = process.env.NEXT_PUBLIC_SOLANA_PAYMENT_ADDRESS || '';

/**
 * PAYMENT FLOW:
 * 1. User pays in native currency (SOL, ETH, BNB, etc.)
 * 2. Smart contract receives payment
 * 3. Smart contract immediately transfers to PAYMENT_RECIPIENT_ADDRESS
 * 4. Domain is registered to user
 * 
 * See PAYMENTS.md for complete payment setup guide
 */

export const getDomainRegistryContract = (signerOrProvider: ethers.Provider | ethers.Signer) => {
  return new ethers.Contract(
    DOMAIN_REGISTRY_ADDRESS,
    DomainRegistryABI.abi,
    signerOrProvider
  );
};

// Multi-Chain Naming Service Extensions
export const DOMAIN_EXTENSIONS = [
  // AtomicFizzCaps Official (Primary)
  '.fizz',      // AtomicFizzCaps primary extension
  '.atomic',    // AtomicFizzCaps premium extension
  
  // Major Blockchain Naming Services
  '.eth',       // Ethereum Name Service (ENS)
  '.sol',       // Solana Name Service
  '.bnb',       // BNB Chain (BSC) domains
  '.arb',       // Arbitrum domains
  '.op',        // Optimism domains
  '.poly',      // Polygon domains
  '.avax',      // Avalanche domains
  '.ftm',       // Fantom domains
  
  // Additional Web3 Extensions
  '.crypto',    // Unstoppable Domains
  '.nft',       // NFT domains
  '.dao',       // DAO domains
  '.web3',      // Generic Web3
  '.blockchain', // Blockchain domains
] as const;

export type DomainExtension = typeof DOMAIN_EXTENSIONS[number];

// Extension categories for UI organization
export const EXTENSION_CATEGORIES = {
  atomicfizzcaps: ['.fizz', '.atomic'], // On Solana testnet
  ethereum: ['.eth', '.arb', '.op'],
  solana: ['.sol'],
  multichain: ['.bnb', '.poly', '.avax', '.ftm'],
  web3: ['.crypto', '.nft', '.dao', '.web3', '.blockchain'],
} as const;

// Extension descriptions with payment currency
export const EXTENSION_INFO: Record<string, { 
  name: string; 
  chain: string; 
  description: string;
  currency: string;
  currencySymbol: string;
}> = {
  '.fizz': { name: 'Fizz', chain: 'Solana (Testnet)', description: 'Official AtomicFizzCaps identity', currency: 'SOL', currencySymbol: 'SOL' },
  '.atomic': { name: 'Atomic', chain: 'Solana (Testnet)', description: 'Premium AtomicFizzCaps identity', currency: 'SOL', currencySymbol: 'SOL' },
  '.eth': { name: 'ETH', chain: 'Ethereum', description: 'Ethereum Name Service', currency: 'ETH', currencySymbol: 'ETH' },
  '.sol': { name: 'SOL', chain: 'Solana', description: 'Solana Name Service', currency: 'SOL', currencySymbol: 'SOL' },
  '.bnb': { name: 'BNB', chain: 'BNB Chain', description: 'BNB Chain domains', currency: 'BNB', currencySymbol: 'BNB' },
  '.arb': { name: 'ARB', chain: 'Arbitrum', description: 'Arbitrum domains', currency: 'ETH', currencySymbol: 'ETH' },
  '.op': { name: 'OP', chain: 'Optimism', description: 'Optimism domains', currency: 'ETH', currencySymbol: 'ETH' },
  '.poly': { name: 'POLY', chain: 'Polygon', description: 'Polygon domains', currency: 'MATIC', currencySymbol: 'MATIC' },
  '.avax': { name: 'AVAX', chain: 'Avalanche', description: 'Avalanche domains', currency: 'AVAX', currencySymbol: 'AVAX' },
  '.ftm': { name: 'FTM', chain: 'Fantom', description: 'Fantom domains', currency: 'FTM', currencySymbol: 'FTM' },
  '.crypto': { name: 'CRYPTO', chain: 'Multi-Chain', description: 'Unstoppable Domains', currency: 'ETH', currencySymbol: 'ETH' },
  '.nft': { name: 'NFT', chain: 'Multi-Chain', description: 'NFT identity domains', currency: 'ETH', currencySymbol: 'ETH' },
  '.dao': { name: 'DAO', chain: 'Multi-Chain', description: 'DAO organization domains', currency: 'ETH', currencySymbol: 'ETH' },
  '.web3': { name: 'WEB3', chain: 'Multi-Chain', description: 'Generic Web3 domains', currency: 'ETH', currencySymbol: 'ETH' },
  '.blockchain': { name: 'BLOCKCHAIN', chain: 'Multi-Chain', description: 'Blockchain domains', currency: 'ETH', currencySymbol: 'ETH' },
};

export const REGISTRATION_PRICE_PER_YEAR = ethers.parseEther('0.01'); // 0.01 ETH per year

// Helper function to get currency info for an extension
export const getCurrencyForExtension = (extension: string): { currency: string; symbol: string } => {
  const info = EXTENSION_INFO[extension];
  if (info) {
    return { currency: info.currency, symbol: info.currencySymbol };
  }
  // Default to ETH for custom extensions
  return { currency: 'ETH', symbol: 'ETH' };
};

// Helper to get approximate USD conversion rate for different currencies
export const getCurrencyUSDRate = (currency: string): number => {
  const rates: Record<string, number> = {
    'ETH': 3000,
    'SOL': 100,
    'BNB': 300,
    'MATIC': 0.80,
    'AVAX': 35,
    'FTM': 0.50,
  };
  return rates[currency] || 3000; // Default to ETH rate
};
