import { ethers } from 'ethers';
import { 
  getDomainRegistryContract, 
  isProductionConfigured,
  getChainForExtension,
  USE_PRODUCTION_MODE,
  CONTRACT_ADDRESSES
} from './contract';
import { 
  checkDomainAvailability as checkMockAvailability, 
  getDomainsByOwner as getMockDomains,
  Domain 
} from './mockData';

/**
 * ===================================================================
 * BLOCKCHAIN TRANSACTION FUNCTIONS
 * ===================================================================
 * These functions interact with real smart contracts on the blockchain.
 * They will automatically fall back to mock data when:
 * - USE_PRODUCTION_MODE is false
 * - Contract addresses are not configured
 * 
 * This allows the app to work in demo mode while supporting production.
 */

export interface TransactionResult {
  success: boolean;
  transactionHash?: string;
  error?: string;
  blockExplorerUrl?: string;
}

/**
 * Get block explorer URL for a transaction
 */
const getBlockExplorerUrl = (txHash: string, chain: string): string => {
  const explorers: Record<string, string> = {
    ethereum: `https://etherscan.io/tx/${txHash}`,
    arbitrum: `https://arbiscan.io/tx/${txHash}`,
    optimism: `https://optimistic.etherscan.io/tx/${txHash}`,
    base: `https://basescan.org/tx/${txHash}`,
    polygon: `https://polygonscan.com/tx/${txHash}`,
    bsc: `https://bscscan.com/tx/${txHash}`,
    avalanche: `https://snowtrace.io/tx/${txHash}`,
    fantom: `https://ftmscan.com/tx/${txHash}`,
    sepolia: `https://sepolia.etherscan.io/tx/${txHash}`,
    solana: `https://explorer.solana.com/tx/${txHash}`,
  };
  
  return explorers[chain] || `https://etherscan.io/tx/${txHash}`;
};

/**
 * Register a domain on the blockchain
 * 
 * @param domainName - Full domain name (e.g., "myname.fizz")
 * @param extension - Domain extension (e.g., ".fizz")
 * @param paymentAmount - Amount to pay in native currency (as ethers BigNumber)
 * @param signer - Ethers signer from connected wallet
 * @returns Transaction result with hash and status
 */
export const registerDomainOnChain = async (
  domainName: string,
  extension: string,
  paymentAmount: bigint,
  signer: ethers.Signer
): Promise<TransactionResult> => {
  try {
    // Check if production mode is configured
    if (!isProductionConfigured(extension)) {
      return {
        success: false,
        error: 'Production mode is not configured. Please set up contract addresses and payment recipients in .env.local',
      };
    }

    const chain = getChainForExtension(extension);
    
    // For Solana-based extensions, return error (requires different implementation)
    if (chain === 'solana') {
      return {
        success: false,
        error: 'Solana integration requires @solana/web3.js. This is currently in demo mode.',
      };
    }

    // Get the contract instance
    const contract = getDomainRegistryContract(signer, extension);
    
    // Send the registration transaction
    const tx = await contract.registerDomain(domainName, extension, {
      value: paymentAmount,
    });
    
    // Wait for transaction confirmation
    const receipt = await tx.wait();
    
    // receipt can be null if the transaction was not confirmed (e.g., replaced or dropped)
    if (!receipt) {
      return {
        success: false,
        error: 'Transaction was not confirmed. It may have been dropped or replaced.',
      };
    }
    
    return {
      success: true,
      transactionHash: receipt.hash,
      blockExplorerUrl: getBlockExplorerUrl(receipt.hash, chain),
    };
  } catch (error: any) {
    console.error('Registration failed:', error);
    return {
      success: false,
      error: error.message || 'Transaction failed',
    };
  }
};

/**
 * Check if a domain is available on the blockchain
 * Falls back to mock data in demo mode
 */
export const checkDomainAvailabilityOnChain = async (
  domainName: string,
  extension: string,
  provider?: ethers.Provider
): Promise<boolean> => {
  try {
    // Use mock data if production not configured
    if (!isProductionConfigured(extension) || !provider) {
      return checkMockAvailability(domainName, extension);
    }

    const chain = getChainForExtension(extension);
    
    // For Solana, derive the domain PDA and check if the account exists on-chain.
    // If the account info is null the domain has never been registered (available).
    if (chain === 'solana') {
      try {
        const { Connection, PublicKey } = await import('@solana/web3.js');
        const { getSolanaEndpoint } = await import('./solana');
        const programAddress = CONTRACT_ADDRESSES.solana;
        if (!programAddress) {
          console.warn(
            'checkDomainAvailabilityOnChain: NEXT_PUBLIC_SOLANA_CONTRACT_ADDRESS is not configured. Falling back to mock data.'
          );
          return checkMockAvailability(domainName, extension);
        }
        const connection = new Connection(getSolanaEndpoint(), 'confirmed');
        const programId = new PublicKey(programAddress);
        // Domain PDA uses only the base domain name (without extension) as seed
        const [domainPda] = PublicKey.findProgramAddressSync(
          [Buffer.from('domain'), Buffer.from(domainName)],
          programId
        );
        const accountInfo = await connection.getAccountInfo(domainPda);
        return accountInfo === null; // null → not registered → available
      } catch {
        return checkMockAvailability(domainName, extension);
      }
    }

    const contract = getDomainRegistryContract(provider, extension);
    const fullDomain = `${domainName}${extension}`;
    
    // Call the contract's checkAvailability function
    const isAvailable = await contract.checkAvailability(fullDomain);
    return isAvailable;
  } catch (error) {
    console.error('Availability check failed, using mock data:', error);
    // Fall back to mock data on error
    return checkMockAvailability(domainName, extension);
  }
};

/**
 * Get all domains owned by a user from the blockchain
 * Falls back to mock data in demo mode
 */
export const getUserDomainsFromChain = async (
  userAddress: string,
  provider?: ethers.Provider
): Promise<Domain[]> => {
  try {
    // Use mock data if no provider or production not configured
    if (!USE_PRODUCTION_MODE || !provider) {
      return getMockDomains(userAddress);
    }

    // In production, we'd need to query across all configured chains
    // For now, query ethereum mainnet as an example
    const contract = getDomainRegistryContract(provider, '.eth');
    
    const domainNames = await contract.getUserDomains(userAddress);
    
    // Convert to Domain objects
    const domains: Domain[] = [];
    for (const domainName of domainNames) {
      const domainInfo = await contract.getDomainInfo(domainName);
      
      domains.push({
        name: domainName.split('.')[0],
        extension: '.' + domainName.split('.').slice(1).join('.'),
        owner: domainInfo.owner,
        registeredAt: Number(domainInfo.registrationDate) * 1000, // Convert to milliseconds
        isActive: domainInfo.isActive,
        records: {}, // Records would need separate calls
      });
    }
    
    return domains;
  } catch (error) {
    console.error('Failed to fetch domains from chain, using mock data:', error);
    // Fall back to mock data on error
    return getMockDomains(userAddress);
  }
};

/**
 * Update domain records on the blockchain.
 * Accepts all records at once and groups them into the correct contract calls:
 *   - 'wallet'           → setWalletAddress(domain, wallet)
 *   - 'ipfs'             → setIPFSHash(domain, ipfsHash)
 *   - 'twitter'/'discord'→ setSocialRecords(domain, twitter, discord)
 *   - 'email'/'website'  → setContactInfo(domain, email, website)
 *   - 'avatar'           → setAvatar(domain, avatar)
 *
 * @param domainName - Domain name without extension (e.g., "myname")
 * @param extension - Domain extension (e.g., ".fizz")
 * @param records - Key/value map of record types to values
 * @param signer - Ethers signer from connected wallet
 * @returns Transaction result (hash from last transaction sent)
 */
export const updateDomainRecordsOnChain = async (
  domainName: string,
  extension: string,
  records: Record<string, string>,
  signer: ethers.Signer
): Promise<TransactionResult> => {
  try {
    if (!isProductionConfigured(extension)) {
      return {
        success: false,
        error: 'Production mode is not configured',
      };
    }

    const chain = getChainForExtension(extension);
    
    if (chain === 'solana') {
      return {
        success: false,
        error: 'Solana integration not yet implemented',
      };
    }

    const contract = getDomainRegistryContract(signer, extension);
    const fullDomain = `${domainName}${extension}`;
    
    let lastHash: string | undefined;

    // wallet address
    if (records.wallet !== undefined) {
      const tx = await contract.setWalletAddress(fullDomain, records.wallet);
      const receipt = await tx.wait();
      if (!receipt) {
        return { success: false, error: 'Transaction was not confirmed (wallet record).' };
      }
      lastHash = receipt.hash;
    }

    // IPFS hash
    if (records.ipfs !== undefined) {
      const tx = await contract.setIPFSHash(fullDomain, records.ipfs);
      const receipt = await tx.wait();
      if (!receipt) {
        return { success: false, error: 'Transaction was not confirmed (ipfs record).' };
      }
      lastHash = receipt.hash;
    }

    // Social records (twitter + discord grouped together to avoid overwriting)
    if (records.twitter !== undefined || records.discord !== undefined) {
      const tx = await contract.setSocialRecords(
        fullDomain,
        records.twitter ?? '',
        records.discord ?? ''
      );
      const receipt = await tx.wait();
      if (!receipt) {
        return { success: false, error: 'Transaction was not confirmed (social records).' };
      }
      lastHash = receipt.hash;
    }

    // Contact info (email + website grouped together to avoid overwriting)
    if (records.email !== undefined || records.website !== undefined) {
      const tx = await contract.setContactInfo(
        fullDomain,
        records.email ?? '',
        records.website ?? ''
      );
      const receipt = await tx.wait();
      if (!receipt) {
        return { success: false, error: 'Transaction was not confirmed (contact records).' };
      }
      lastHash = receipt.hash;
    }

    // Avatar
    if (records.avatar !== undefined) {
      const tx = await contract.setAvatar(fullDomain, records.avatar);
      const receipt = await tx.wait();
      if (!receipt) {
        return { success: false, error: 'Transaction was not confirmed (avatar record).' };
      }
      lastHash = receipt.hash;
    }

    if (!lastHash) {
      return { success: false, error: 'No records were provided to update.' };
    }

    return {
      success: true,
      transactionHash: lastHash,
      blockExplorerUrl: getBlockExplorerUrl(lastHash, chain),
    };
  } catch (error: any) {
    console.error('Record update failed:', error);
    return {
      success: false,
      error: error.message || 'Transaction failed',
    };
  }
};

/**
 * Map a generic record type string to the corresponding field in the
 * DomainRecords struct returned by getDomainRecords().
 */
const recordTypeToStructField = (recordType: string): keyof {
  walletAddress: string; ipfsHash: string; twitter: string;
  discord: string; email: string; website: string; avatar: string;
} | null => {
  const fieldMap: Record<string, 'walletAddress' | 'ipfsHash' | 'twitter' | 'discord' | 'email' | 'website' | 'avatar'> = {
    wallet: 'walletAddress',
    wallet_address: 'walletAddress',
    ipfs: 'ipfsHash',
    ipfs_hash: 'ipfsHash',
    twitter: 'twitter',
    discord: 'discord',
    email: 'email',
    website: 'website',
    avatar: 'avatar',
  };
  return fieldMap[recordType] ?? null;
};

/**
 * Get a single domain record from the blockchain by fetching the full
 * DomainRecords struct and extracting the requested field.
 */
export const getDomainRecordsFromChain = async (
  domainName: string,
  extension: string,
  recordType: string,
  provider?: ethers.Provider
): Promise<string> => {
  try {
    if (!isProductionConfigured(extension) || !provider) {
      return '';
    }

    const chain = getChainForExtension(extension);
    
    if (chain === 'solana') {
      return '';
    }

    const contract = getDomainRegistryContract(provider, extension);
    const fullDomain = `${domainName}${extension}`;
    
    const allRecords = await contract.getDomainRecords(fullDomain);
    const field = recordTypeToStructField(recordType);
    if (!field) return '';
    return (allRecords[field] as string) ?? '';
  } catch (error) {
    console.error('Failed to get record from chain:', error);
    return '';
  }
};

/**
 * Get the Wagmi chain ID for a chain name
 */
export const getChainIdForChain = (chainName: string): number => {
  const chainIds: Record<string, number> = {
    ethereum: 1,
    arbitrum: 42161,
    optimism: 10,
    base: 8453,
    polygon: 137,
    bsc: 56,
    avalanche: 43114,
    fantom: 250,
    sepolia: 11155111,
  };
  
  return chainIds[chainName] || 1;
};

/**
 * Format a transaction error message for users
 */
export const formatTransactionError = (error: unknown): string => {
  // Type guard for error with code property
  if (error && typeof error === 'object' && 'code' in error) {
    const errorWithCode = error as { code: string; message?: string };
    
    if (errorWithCode.code === 'ACTION_REJECTED') {
      return 'Transaction was rejected by user';
    }
    
    if (errorWithCode.code === 'INSUFFICIENT_FUNDS') {
      return 'Insufficient funds to complete transaction';
    }
  }
  
  // Type guard for error with message property
  if (error && typeof error === 'object' && 'message' in error) {
    const errorWithMessage = error as { message: string };
    
    if (errorWithMessage.message?.includes('user rejected')) {
      return 'Transaction was rejected by user';
    }
    
    return errorWithMessage.message || 'Transaction failed. Please try again.';
  }
  
  return 'Transaction failed. Please try again.';
};
