export interface Domain {
  name: string;
  extension: string;
  owner: string;
  expiresAt: number;
  isActive: boolean;
  records: Record<string, string>;
}

export const mockDomains: Domain[] = [
  {
    name: 'mysite',
    extension: '.web3',
    owner: '0x1234567890123456789012345678901234567890',
    expiresAt: Date.now() + 365 * 24 * 60 * 60 * 1000,
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
    expiresAt: Date.now() + 180 * 24 * 60 * 60 * 1000,
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

export const getDomainPrice = (domainName: string, years: number): number => {
  const basePrice = 0.01; // ETH per year
  const length = domainName.length;
  
  let multiplier = 1;
  if (length <= 3) multiplier = 10;
  else if (length <= 4) multiplier = 5;
  else if (length <= 5) multiplier = 2;
  
  return basePrice * multiplier * years;
};
