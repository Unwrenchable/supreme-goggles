import { useMemo } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import type { Adapter } from '@solana/wallet-adapter-base';

/**
 * Solana Wallet Configuration
 * 
 * This configuration sets up the Solana wallet adapters for the application.
 * It provides support for popular Solana wallets including:
 * - Phantom - Auto-detected via Wallet Standard (no explicit adapter needed)
 * - Solflare - Feature-rich Solana wallet
 * - Torus - Social login wallet
 * - Ledger - Hardware wallet support
 * 
 * Note: Phantom wallet now uses the Wallet Standard API and is automatically
 * detected. The explicit PhantomWalletAdapter has been removed to avoid warnings.
 * 
 * Mobile Support:
 * - Phantom Mobile via WalletConnect and deep links
 * - Solflare Mobile via WalletConnect
 * - Other WalletConnect-enabled Solana wallets
 */

/**
 * Get the Solana network based on environment configuration
 */
export const getSolanaNetwork = (): WalletAdapterNetwork => {
  const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet';
  
  switch (network) {
    case 'mainnet-beta':
    case 'mainnet':
      return WalletAdapterNetwork.Mainnet;
    case 'testnet':
      return WalletAdapterNetwork.Testnet;
    case 'devnet':
    default:
      return WalletAdapterNetwork.Devnet;
  }
};

/**
 * Get the Solana RPC endpoint
 * Uses custom endpoint if provided, otherwise defaults to public endpoints
 */
export const getSolanaEndpoint = (): string => {
  const customEndpoint = process.env.NEXT_PUBLIC_SOLANA_RPC_ENDPOINT;
  if (customEndpoint) {
    return customEndpoint;
  }
  
  const network = getSolanaNetwork();
  return clusterApiUrl(network);
};

/**
 * Hook to get configured Solana wallet adapters
 * This should be used within the WalletProvider context
 * 
 * Note: Phantom wallet is not explicitly included as it's now auto-detected
 * via the Wallet Standard API. This prevents duplicate registration warnings.
 * 
 * Wallet adapters are loaded dynamically to avoid SSR issues with indexedDB.
 * We import from individual packages rather than the umbrella package to
 * ensure we're only loading the wallets we explicitly need.
 */
export const useSolanaWallets = (): Adapter[] => {
  const network = getSolanaNetwork();
  
  const wallets = useMemo(
    () => {
      // Only initialize wallets on the client side to avoid SSR issues
      if (typeof window === 'undefined') {
        return [];
      }
      
      // Dynamically import wallet adapters to prevent SSR errors
      // Import from individual packages to avoid loading unused wallet code
      const adapters: Adapter[] = [];
      
      try {
        // Lazy load Solflare adapter from individual package
        const { SolflareWalletAdapter } = require('@solana/wallet-adapter-solflare');
        adapters.push(new SolflareWalletAdapter({ network }));
      } catch (e) {
        console.warn('Failed to load SolflareWalletAdapter:', e);
      }
      
      try {
        // Lazy load Torus adapter from individual package
        const { TorusWalletAdapter } = require('@solana/wallet-adapter-torus');
        adapters.push(new TorusWalletAdapter());
      } catch (e) {
        console.warn('Failed to load TorusWalletAdapter:', e);
      }
      
      try {
        // Lazy load Ledger adapter from individual package
        const { LedgerWalletAdapter } = require('@solana/wallet-adapter-ledger');
        adapters.push(new LedgerWalletAdapter());
      } catch (e) {
        console.warn('Failed to load LedgerWalletAdapter:', e);
      }
      
      return adapters;
    },
    [network]
  );
  
  return wallets;
};

/**
 * Check if Solana is configured and ready to use
 */
export const isSolanaConfigured = (): boolean => {
  // In development/demo mode, Solana is always available
  const useProduction = process.env.NEXT_PUBLIC_USE_PRODUCTION_MODE === 'true';
  if (!useProduction) {
    return true;
  }
  
  // In production, check if contract address is configured and valid
  const contractAddress = process.env.NEXT_PUBLIC_SOLANA_CONTRACT_ADDRESS;
  return !!(contractAddress && contractAddress.trim());
};

/**
 * Get Solana explorer URL for a transaction
 */
export const getSolanaExplorerUrl = (signature: string): string => {
  const network = getSolanaNetwork();
  const cluster = network === WalletAdapterNetwork.Mainnet ? '' : `?cluster=${network}`;
  return `https://explorer.solana.com/tx/${signature}${cluster}`;
};

/**
 * Get Solana explorer URL for an address
 */
export const getSolanaAddressExplorerUrl = (address: string): string => {
  const network = getSolanaNetwork();
  const cluster = network === WalletAdapterNetwork.Mainnet ? '' : `?cluster=${network}`;
  return `https://explorer.solana.com/address/${address}${cluster}`;
};

/**
 * Solana Domain Registry Functions
 * These functions only work client-side to avoid SSR issues
 */

/**
 * Get the registry PDA address
 */
export const getRegistryPDA = async (programId: any): Promise<[any, number]> => {
  // Only import on client side to avoid SSR issues
  if (typeof window === 'undefined') {
    throw new Error('This function can only be called on the client side');
  }
  
  const { PublicKey } = await import('@solana/web3.js');
  const pk = new PublicKey(programId);
  return PublicKey.findProgramAddressSync(
    [Buffer.from('registry')],
    pk
  );
};
any;
  error?: string;
}> => {
  // Only run on client side
  if (typeof window === 'undefined') {
    return { initialized: false, error: 'Must be called on client side' };
  }
  
  try {
    const { Connection, PublicKey } = await import('@solana/web3.js');
    
    const contractAddress = process.env.NEXT_PUBLIC_SOLANA_CONTRACT_ADDRESS;
    if (!contractAddress) {
      return { initialized: false, error: 'Contract address not configured' };
    }

    const programId = new PublicKey(contractAddress);
    const connection = new Connection(getSolanaEndpoint(), 'confirmed');
    
    const [registryPDA] = await getRegistryPDA(contractAddresst address not configured' };
    }

    const programId = new PublicKey(contractAddress);
    const connection = new Connection(getSolanaEndpoint(), 'confirmed');
    
    const [registryPDA] = getRegistryPDA(programId);
    
    // Check if the registry account exists
    const accountInfo = await connection.getAccountInfo(registryPDA);
    
    if (!accountInfo) {
      return { 
        initialized: false, 
        registryPDA,
        error: 'Registry not initialized'
      };
    }

    return { 
      initialized: true, 
      registryPDA 
    };
  } catch (error: any) {
    console.error('Error checking registry:', error);
    return { 
      initialized: false, 
      error: error?.message || 'Failed to check registry status'
    };
  }
};
// Only run on client side
  if (typeof window === 'undefined') {
    return { success: false, error: 'Must be called on client side' };
  }
  
  try {
    if (!wallet || !wallet.publicKey || !wallet.signTransaction) {
      return { success: false, error: 'Wallet not connected' };
    }

    const { Connection, PublicKey, SystemProgram } = await import('@solana/web3.js');
    const { Program, BN } = await import('@coral-xyz/anchor');

    const contractAddress = process.env.NEXT_PUBLIC_SOLANA_CONTRACT_ADDRESS;
    if (!contractAddress) {
      return { success: false, error: 'Contract address not configured' };
    }

    const programId = new PublicKey(contractAddress);
    const connection = new Connection(getSolanaEndpoint(), 'confirmed');
    
    // Use provided treasury or default to wallet's public key
    const treasury = treasuryAddress 
      ? new PublicKey(treasuryAddress)
      : wallet.publicKey;

    const [registryPDA] = await getRegistryPDA(contractAddressC_SOLANA_CONTRACT_ADDRESS;
    if (!contractAddress) {
      return { success: false, error: 'Contract address not configured' };
    }

    const programId = new PublicKey(contractAddress);
    const connection = new Connection(getSolanaEndpoint(), 'confirmed');
    
    // Use provided treasury or default to wallet's public key
    const treasury = treasuryAddress 
      ? new PublicKey(treasuryAddress)
      : wallet.publicKey;

    const [registryPDA] = getRegistryPDA(programId);

    // Build the initialize transaction
    const program = new Program(
      await Program.fetchIdl(programId, { connection }) as any,
      programId,
      { connection } as any
    );

    const tx = await program.methods
      .initialize(treasury, new BN(registrationFee))
      .accounts({
        registry: registryPDA,
        authority: wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .transaction();

    tx.feePayer = wallet.publicKey;
    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

    // Sign and send the transaction
    const signedTx = await wallet.signTransaction(tx);
    const signature = await connection.sendRawTransaction(signedTx.serialize());
    
    // Wait for confirmation
    await connection.confirmTransaction(signature, 'confirmed');

    console.log('Registry initialized:', signature);
    
    return { 
      success: true, 
      signature 
    };
  } catch (error: any) {
    console.error('Error initializing registry:', error);
    return { 
      success: false, 
      error: error?.message || 'Failed to initialize registry'
    };
  }
};

/**
 * Auto-initialize registry if needed (prompts user)
 */
export const autoInitializeRegistry = async (
  wallet: any,
  onStatusChange?: (status: string) => void
): Promise<boolean> => {
  // Only run on client side
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    onStatusChange?.('Checking registry status...');
    
    const status = await checkRegistryInitialized();
    
    if (status.initialized) {
      onStatusChange?.('Registry is ready!');
      return true;
    }

    // Registry needs initialization
    onStatusChange?.('Registry needs initialization. Preparing transaction...');
    
    // Get treasury address from environment or use wallet
    const treasuryAddress = process.env.NEXT_PUBLIC_SOLANA_PAYMENT_ADDRESS;
    
    const result = await initializeSolanaRegistry(wallet, treasuryAddress, 0);
    
    if (result.success) {
      onStatusChange?.(`Registry initialized! Tx: ${result.signature?.slice(0, 8)}...`);
      return true;
    } else {
      onStatusChange?.(`Initialization failed: ${result.error}`);
      return false;
    }
  } catch (error: any) {
    onStatusChange?.(`Error: ${error?.message || 'Unknown error'}`);
    return false;
  }
};
