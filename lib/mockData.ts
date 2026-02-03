export interface Domain {
  name: string;
  extension: string;
  owner: string;
  registeredAt: number;
  isActive: boolean;
  records: Record<string, string>;
}

export const mockDomains: Domain[] = [
  {
    name: 'mysite',
    extension: '.web3',
    owner: '0x1234567890123456789012345678901234567890',
    registeredAt: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 days ago
    isActive: true,
    records: {
      wallet: '0x1234567890123456789012345678901234567890',
      ipfs: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG',
      website: 'https://mysite.com',
    },
  },
  {
    name: 'defi',
    extension: '.atom',
    owner: '0x9876543210987654321098765432109876543210',
    registeredAt: Date.now() - 60 * 24 * 60 * 60 * 1000, // 60 days ago
    isActive: true,
    records: {
      wallet: '0x9876543210987654321098765432109876543210',
      twitter: '@defi_user',
    },
  },
];

export const checkDomainAvailability = (domainName: string, extension: string): boolean => {
  const fullDomain = `${domainName}${extension}`;
  return !mockDomains.some(d => `${d.name}${d.extension}` === fullDomain);
};

export const getDomainsByOwner = (owner: string): Domain[] => {
  return mockDomains.filter(d => d.owner.toLowerCase() === owner.toLowerCase());
};

export const getDomainPrice = (domainName: string, extension: string = '.web3'): { price: number; currency: string; currencySymbol: string } => {
  const basePrice = 0.05; // Base price in native currency units
  const length = domainName.length;
  
  let multiplier = 1;
  if (length <= 3) multiplier = 10; // Premium short domains
  else if (length <= 4) multiplier = 5;
  else if (length <= 5) multiplier = 2;
  
  const calculatedPrice = basePrice * multiplier;
  
  // Determine currency based on extension
  const currencyMap: Record<string, { currency: string; symbol: string; priceMultiplier: number }> = {
    '.eth': { currency: 'ETH', symbol: 'ETH', priceMultiplier: 1 },
    '.fizz': { currency: 'SOL', symbol: 'SOL', priceMultiplier: 1.5 }, // On Solana testnet
    '.atomic': { currency: 'SOL', symbol: 'SOL', priceMultiplier: 1.5 }, // On Solana testnet
    '.arb': { currency: 'ETH', symbol: 'ETH', priceMultiplier: 1 },
    '.op': { currency: 'ETH', symbol: 'ETH', priceMultiplier: 1 },
    '.sol': { currency: 'SOL', symbol: 'SOL', priceMultiplier: 1.5 }, // SOL is cheaper, so need more units
    '.bnb': { currency: 'BNB', symbol: 'BNB', priceMultiplier: 0.5 }, // BNB pricing
    '.poly': { currency: 'MATIC', symbol: 'MATIC', priceMultiplier: 60 }, // MATIC is much cheaper
    '.avax': { currency: 'AVAX', symbol: 'AVAX', priceMultiplier: 4 }, // AVAX pricing
    '.ftm': { currency: 'FTM', symbol: 'FTM', priceMultiplier: 90 }, // FTM is cheap
    '.crypto': { currency: 'ETH', symbol: 'ETH', priceMultiplier: 1 },
    '.nft': { currency: 'ETH', symbol: 'ETH', priceMultiplier: 1 },
    '.dao': { currency: 'ETH', symbol: 'ETH', priceMultiplier: 1 },
    '.web3': { currency: 'ETH', symbol: 'ETH', priceMultiplier: 1 },
    '.blockchain': { currency: 'ETH', symbol: 'ETH', priceMultiplier: 1 },
  };
  
  const currencyInfo = currencyMap[extension] || { currency: 'ETH', symbol: 'ETH', priceMultiplier: 1 };
  
  return {
    price: calculatedPrice * currencyInfo.priceMultiplier,
    currency: currencyInfo.currency,
    currencySymbol: currencyInfo.symbol,
  };
};
