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

export const DOMAIN_EXTENSIONS = ['.web3', '.atom'] as const;
export type DomainExtension = typeof DOMAIN_EXTENSIONS[number];

export const REGISTRATION_PRICE_PER_YEAR = ethers.parseEther('0.01'); // 0.01 ETH per year
