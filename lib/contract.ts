import { ethers } from 'ethers';
import DomainRegistryABI from '@/contracts/DomainRegistry.json';

export const DOMAIN_REGISTRY_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';

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
  atomicfizzcaps: ['.fizz', '.atomic'],
  ethereum: ['.eth', '.arb', '.op'],
  multichain: ['.sol', '.bnb', '.poly', '.avax', '.ftm'],
  web3: ['.crypto', '.nft', '.dao', '.web3', '.blockchain'],
} as const;

// Extension descriptions
export const EXTENSION_INFO: Record<string, { name: string; chain: string; description: string }> = {
  '.fizz': { name: 'Fizz', chain: 'AtomicFizzCaps', description: 'Official AtomicFizzCaps identity' },
  '.atomic': { name: 'Atomic', chain: 'AtomicFizzCaps', description: 'Premium AtomicFizzCaps identity' },
  '.eth': { name: 'ETH', chain: 'Ethereum', description: 'Ethereum Name Service' },
  '.sol': { name: 'SOL', chain: 'Solana', description: 'Solana Name Service' },
  '.bnb': { name: 'BNB', chain: 'BNB Chain', description: 'BNB Chain domains' },
  '.arb': { name: 'ARB', chain: 'Arbitrum', description: 'Arbitrum domains' },
  '.op': { name: 'OP', chain: 'Optimism', description: 'Optimism domains' },
  '.poly': { name: 'POLY', chain: 'Polygon', description: 'Polygon domains' },
  '.avax': { name: 'AVAX', chain: 'Avalanche', description: 'Avalanche domains' },
  '.ftm': { name: 'FTM', chain: 'Fantom', description: 'Fantom domains' },
  '.crypto': { name: 'CRYPTO', chain: 'Multi-Chain', description: 'Unstoppable Domains' },
  '.nft': { name: 'NFT', chain: 'Multi-Chain', description: 'NFT identity domains' },
  '.dao': { name: 'DAO', chain: 'Multi-Chain', description: 'DAO organization domains' },
  '.web3': { name: 'WEB3', chain: 'Multi-Chain', description: 'Generic Web3 domains' },
  '.blockchain': { name: 'BLOCKCHAIN', chain: 'Multi-Chain', description: 'Blockchain domains' },
};

export const REGISTRATION_PRICE_PER_YEAR = ethers.parseEther('0.01'); // 0.01 ETH per year
