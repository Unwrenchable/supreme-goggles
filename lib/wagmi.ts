import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { 
  mainnet, 
  polygon, 
  optimism, 
  arbitrum, 
  sepolia,
  base,
  bsc,
  avalanche,
  fantom
} from 'wagmi/chains';

/**
 * Wagmi configuration with RainbowKit
 * 
 * IMPORTANT: This configuration supports EVM (Ethereum Virtual Machine) wallets ONLY
 * 
 * Supported Mobile Wallets (via WalletConnect QR Code):
 * - MetaMask Mobile - Most popular Ethereum wallet
 * - Trust Wallet - Multi-chain mobile wallet
 * - Rainbow Wallet - User-friendly Ethereum wallet
 * - Coinbase Wallet - Coinbase's self-custody wallet
 * - Phantom (EVM chains only) - Note: Phantom on mobile can connect to EVM chains via WalletConnect
 * - 300+ other WalletConnect-enabled mobile wallets
 * 
 * Desktop Browser Extensions:
 * - MetaMask
 * - Coinbase Wallet
 * - WalletConnect
 * - Injected wallets
 * 
 * Note: Solana is fully supported via @solana/wallet-adapter-react.
 * For Solana domains, use the Phantom wallet to connect and register domains on-chain.
 * 
 * Mobile Connection Process:
 * 1. Click "Connect Wallet" button
 * 2. Select "WalletConnect" or specific wallet from the modal
 * 3. QR code appears automatically
 * 4. Scan with your mobile wallet app
 * 5. Approve the connection on your phone
 * 
 * Note on SSR: WalletConnect internally accesses `indexedDB` for connection caching.
 * This logs a benign warning during Next.js static generation but does NOT affect
 * runtime functionality — `indexedDB` is available in all browser environments where
 * the wallet UI runs. The `ssr: true` flag tells wagmi to also use cookie storage for
 * server-side hydration of the initial chain/account state.
 */

// Guard against WalletConnect's `@walletconnect/keyvaluestorage` trying to access
// `indexedDB` during Next.js static generation / SSR. The stub provides a minimal
// implementation so the library can initialize without throwing, while actual
// browser indexedDB is used at runtime on the client.
if (typeof globalThis.indexedDB === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).indexedDB = {
    open: (_name: string, _version?: number) => {
      // Mimic the IDBOpenDBRequest shape that WalletConnect reads from
      const db = {
        transaction: () => ({
          objectStore: () => ({
            get: () => ({ onsuccess: null, onerror: null, result: undefined }),
            put: () => ({ onsuccess: null, onerror: null }),
            delete: () => ({ onsuccess: null, onerror: null }),
          }),
          oncomplete: null,
          onerror: null,
          onclose: null,
        }),
        createObjectStore: () => ({}),
        objectStoreNames: { contains: () => false },
        close: () => {},
      };
      const request: Record<string, unknown> = {
        result: db,
        onupgradeneeded: null,
        onsuccess: null,
        onerror: null,
        onclose: null,
      };
      // Invoke onsuccess asynchronously to complete the open lifecycle
      setTimeout(() => {
        if (typeof request.onsuccess === 'function') {
          try { (request.onsuccess as (e: unknown) => void)({ target: request }); } catch (error) { console.debug('indexedDB stub onsuccess error:', error); }
        }
      }, 0);
      return request;
    },
    deleteDatabase: () => ({ onsuccess: null, onerror: null }),
    cmp: () => 0,
  };
}

export const config = getDefaultConfig({
  appName: 'AtomicFizzCaps Domain Registry',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    bsc,
    avalanche,
    fantom,
    sepolia, // testnet
  ],
  ssr: true,
});
