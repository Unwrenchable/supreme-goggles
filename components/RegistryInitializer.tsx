'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { 
  checkRegistryInitialized, 
  initializeSolanaRegistry,
  getSolanaExplorerUrl 
} from '@/lib/solana';

interface RegistryInitializerProps {
  onInitialized?: () => void;
  onError?: (error: string) => void;
}

export default function RegistryInitializer({ onInitialized, onError }: RegistryInitializerProps) {
  const wallet = useWallet();
  const [status, setStatus] = useState<'checking' | 'ready' | 'needs-init' | 'initializing' | 'error'>('checking');
  const [errorMessage, setErrorMessage] = useState('');
  const [txSignature, setTxSignature] = useState('');

  useEffect(() => {
    checkRegistry();
  }, []);

  const checkRegistry = async () => {
    setStatus('checking');
    const result = await checkRegistryInitialized();
    
    if (result.initialized) {
      setStatus('ready');
      onInitialized?.();
    } else if (result.error) {
      setStatus('needs-init');
    }
  };

  const handleInitialize = async () => {
    if (!wallet.connected || !wallet.publicKey) {
      setErrorMessage('Please connect your wallet first');
      setStatus('error');
      onError?.('Wallet not connected');
      return;
    }

    setStatus('initializing');
    setErrorMessage('');

    try {
      const treasuryAddress = process.env.NEXT_PUBLIC_SOLANA_PAYMENT_ADDRESS;
      const result = await initializeSolanaRegistry(wallet, treasuryAddress, 0);

      if (result.success && result.signature) {
        setTxSignature(result.signature);
        setStatus('ready');
        onInitialized?.();
      } else {
        setErrorMessage(result.error || 'Failed to initialize registry');
        setStatus('error');
        onError?.(result.error || 'Failed to initialize');
      }
    } catch (error: any) {
      setErrorMessage(error?.message || 'Unknown error occurred');
      setStatus('error');
      onError?.(error?.message);
    }
  };

  if (status === 'checking') {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
          <p className="text-blue-800">Checking registry status...</p>
        </div>
      </div>
    );
  }

  if (status === 'ready') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-3">
          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-green-800 font-medium">Registry is ready! ✓</p>
            {txSignature && (
              <a 
                href={getSolanaExplorerUrl(txSignature)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-green-600 hover:underline"
              >
                View initialization transaction →
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (status === 'needs-init') {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
        <div className="flex items-start space-x-3">
          <svg className="w-6 h-6 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div className="flex-1">
            <h3 className="text-yellow-900 font-semibold mb-2">Registry Initialization Required</h3>
            <p className="text-yellow-800 text-sm mb-4">
              The Solana domain registry needs to be initialized before domains can be registered. 
              This is a one-time setup that configures the treasury address and registration fees.
            </p>
            <button
              onClick={handleInitialize}
              disabled={!wallet.connected}
              className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              {wallet.connected ? 'Initialize Registry Now' : 'Connect Wallet to Initialize'}
            </button>
            {!wallet.connected && (
              <p className="text-sm text-yellow-700 mt-2">
                Please connect your Phantom wallet to initialize the registry.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (status === 'initializing') {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <div>
            <p className="text-blue-900 font-medium">Initializing registry...</p>
            <p className="text-blue-700 text-sm">Please confirm the transaction in your wallet</p>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
        <div className="flex items-start space-x-3">
          <svg className="w-6 h-6 text-red-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div className="flex-1">
            <h3 className="text-red-900 font-semibold mb-2">Initialization Failed</h3>
            <p className="text-red-800 text-sm mb-4">{errorMessage}</p>
            <button
              onClick={handleInitialize}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
