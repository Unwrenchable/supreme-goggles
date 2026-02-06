'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAccount, useWalletClient, usePublicClient } from 'wagmi';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, Transaction, TransactionInstruction, clusterApiUrl } from '@solana/web3.js';
import { BrowserProvider } from 'ethers';
import { updateDomainRecordsOnChain, getDomainRecordsFromChain, formatTransactionError } from '@/lib/blockchain';
import { USE_PRODUCTION_MODE, getChainForExtension } from '@/lib/contract';

interface DomainRecord {
  type: string;
  value: string;
}

export default function ManageDomainPage() {
  const params = useParams();
  const router = useRouter();
  
  // EVM wallet
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  
  // Solana wallet
  const solanaWallet = useWallet();
  
  const domain = params.domain as string;
  const domainName = domain?.split('.')[0] || '';
  const extension = domain ? '.' + domain.split('.').slice(1).join('.') : '';
  
  // Determine chain type
  const chainType = getChainForExtension(extension);
  const isSolana = chainType === 'solana';
  const walletConnected = isSolana ? solanaWallet.connected : isConnected;
  const walletAddress = isSolana 
    ? solanaWallet.publicKey?.toBase58() 
    : address;
  
  const [records, setRecords] = useState<DomainRecord[]>([]);
  const [isLoadingRecords, setIsLoadingRecords] = useState(true);
  
  const [newRecordType, setNewRecordType] = useState('');
  const [newRecordValue, setNewRecordValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [saveMessage, setSaveMessage] = useState('');
  const [txHash, setTxHash] = useState('');

  // Load domain records on mount
  useEffect(() => {
    const loadRecords = async () => {
      if (!domain || !extension) return;
      
      setIsLoadingRecords(true);
      
      try {
        // Try to load records from blockchain if in production mode
        if (USE_PRODUCTION_MODE) {
          if (isSolana && solanaWallet.publicKey) {
            // Load Solana domain records
            const connection = new Connection(clusterApiUrl('devnet'));
            const programId = new PublicKey(process.env.NEXT_PUBLIC_SOLANA_PROGRAM_ID!);
            
            const [domainPda] = PublicKey.findProgramAddressSync(
              [Buffer.from('domain'), Buffer.from(domainName)],
              programId
            );
            
            const accountInfo = await connection.getAccountInfo(domainPda);
            if (accountInfo) {
              const data = accountInfo.data;
              let offset = 8 + 32; // Skip discriminator + owner pubkey
              
              // Skip domain_name and extension (4-byte length + string)
              const nameLen = data.readUInt32LE(offset);
              offset += 4 + nameLen;
              const extLen = data.readUInt32LE(offset);
              offset += 4 + extLen;
              
              const loadedRecords: DomainRecord[] = [];
              
              // Parse optional string fields (wallet_address, ipfs_hash, twitter, discord, email, website, avatar)
              const fieldTypes = ['wallet', 'ipfs', 'twitter', 'discord', 'email', 'website', 'avatar'];
              
              for (const fieldType of fieldTypes) {
                if (offset + 1 <= data.length) {
                  const hasValue = data[offset] === 1;
                  offset += 1;
                  
                  if (hasValue && offset + 4 <= data.length) {
                    const valueLen = data.readUInt32LE(offset);
                    offset += 4;
                    
                    if (offset + valueLen <= data.length) {
                      const value = data.subarray(offset, offset + valueLen).toString('utf8');
                      offset += valueLen;
                      
                      if (value) {
                        loadedRecords.push({ type: fieldType, value });
                      }
                    }
                  }
                }
              }
              
              setRecords(loadedRecords);
            }
          } else if (!isSolana && publicClient) {
            // Load EVM domain records
            const recordTypes = ['wallet', 'ipfs', 'website', 'email', 'twitter', 'github'];
            const loadedRecords: DomainRecord[] = [];
            
            for (const type of recordTypes) {
              const value = await getDomainRecordsFromChain(
                domainName,
                extension,
                type,
                publicClient as any
              );
              
              if (value) {
                loadedRecords.push({ type, value });
              }
            }
            
            setRecords(loadedRecords);
          }
        } else {
          // Use mock data in demo mode
          setRecords([
            { type: 'wallet', value: walletAddress || '0x1234567890123456789012345678901234567890' },
            { type: 'ipfs', value: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG' },
            { type: 'website', value: 'https://example.com' },
          ]);
        }
      } catch (error) {
        console.error('Failed to load records:', error);
        // Fallback to mock data
        setRecords([
          { type: 'wallet', value: walletAddress || '0x1234567890123456789012345678901234567890' },
          { type: 'ipfs', value: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG' },
          { type: 'website', value: 'https://example.com' },
        ]);
      } finally {
        setIsLoadingRecords(false);
      }
    };
    
    loadRecords();
  }, [domain, extension, domainName, publicClient, walletAddress, isSolana, solanaWallet.publicKey]);


  const handleAddRecord = () => {
    if (newRecordType && newRecordValue) {
      setRecords([...records, { type: newRecordType, value: newRecordValue }]);
      setNewRecordType('');
      setNewRecordValue('');
    }
  };

  const handleDeleteRecord = (index: number) => {
    setRecords(records.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!walletConnected) {
      setSaveStatus('error');
      setSaveMessage('Please connect your wallet');
      return;
    }

    setIsSaving(true);
    setSaveStatus('idle');
    setSaveMessage('');
    setTxHash('');
    
    try {
      // Production mode: Save records to blockchain
      if (USE_PRODUCTION_MODE) {
        if (isSolana && solanaWallet.publicKey && solanaWallet.signTransaction) {
          // Save Solana domain records
          const connection = new Connection(clusterApiUrl('devnet'));
          const programId = new PublicKey(process.env.NEXT_PUBLIC_SOLANA_PROGRAM_ID!);
          
          const [domainPda] = PublicKey.findProgramAddressSync(
            [Buffer.from('domain'), Buffer.from(domainName)],
            programId
          );
          
          // Calculate update_records discriminator: sha256("global:update_records")[0..8]
          const crypto = await import('crypto');
          const hash = crypto.createHash('sha256').update('global:update_records').digest();
          const discriminator = Array.from(hash.subarray(0, 8));
          
          // Build instruction data: discriminator + domain_name + optional fields
          const domainNameBytes = Buffer.from(domainName);
          const domainNameLen = Buffer.alloc(4);
          domainNameLen.writeUInt32LE(domainNameBytes.length);
          
          // Helper to encode optional string
          const encodeOptionalString = (value: string | undefined): Buffer => {
            if (value) {
              const valueBytes = Buffer.from(value);
              const valueLen = Buffer.alloc(4);
              valueLen.writeUInt32LE(valueBytes.length);
              return Buffer.concat([Buffer.from([1]), valueLen, valueBytes]);
            }
            return Buffer.from([0]);
          };
          
          // Map record types to Solana field names
          const getRecordValue = (fieldName: string): string | undefined => {
            const record = records.find(r => r.type === fieldName || 
              (fieldName === 'wallet' && r.type === 'wallet_address') ||
              (fieldName === 'ipfs' && r.type === 'ipfs_hash'));
            return record?.value;
          };
          
          const instructionData = Buffer.concat([
            Buffer.from(discriminator),
            domainNameLen,
            domainNameBytes,
            encodeOptionalString(getRecordValue('wallet')),
            encodeOptionalString(getRecordValue('ipfs')),
            encodeOptionalString(getRecordValue('twitter')),
            encodeOptionalString(getRecordValue('discord')),
            encodeOptionalString(getRecordValue('email')),
            encodeOptionalString(getRecordValue('website')),
            encodeOptionalString(getRecordValue('avatar')),
          ]);
          
          const instruction = new TransactionInstruction({
            keys: [
              { pubkey: domainPda, isSigner: false, isWritable: true },
              { pubkey: solanaWallet.publicKey, isSigner: true, isWritable: false },
            ],
            programId,
            data: instructionData,
          });
          
          const transaction = new Transaction().add(instruction);
          transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
          transaction.feePayer = solanaWallet.publicKey;
          
          const signed = await solanaWallet.signTransaction(transaction);
          const signature = await connection.sendRawTransaction(signed.serialize());
          await connection.confirmTransaction(signature, 'confirmed');
          
          setTxHash(signature);
          setSaveStatus('success');
          setSaveMessage('Records updated successfully on Solana!');
        } else if (!isSolana && walletClient) {
          // Save EVM domain records
          const provider = new BrowserProvider(walletClient as any);
          const signer = await provider.getSigner();
          
          for (const record of records) {
            const result = await updateDomainRecordsOnChain(
              domainName,
              extension,
              record.type,
              record.value,
              signer
            );
            
            if (!result.success) {
              throw new Error(result.error || 'Failed to update record');
            }
            
            if (result.transactionHash) {
              setTxHash(result.transactionHash);
            }
          }
          
          setSaveStatus('success');
          setSaveMessage('Records updated successfully on blockchain!');
        }
      } 
      // Demo mode: Simulate save
      else {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSaveStatus('success');
        setSaveMessage('Records updated successfully! (Demo mode)');
      }
    } catch (error: any) {
      console.error('Save failed:', error);
      setSaveStatus('error');
      setSaveMessage(formatTransactionError(error));
    } finally {
      setIsSaving(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-12">
            <h1 className="text-3xl font-bold text-white mb-4">Connect Your Wallet</h1>
            <p className="text-gray-400">
              Please connect your wallet to manage this domain
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center text-purple-400 hover:text-purple-300 mb-6 transition"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>

        <h1 className="text-4xl font-bold text-white mb-8">Manage Domain</h1>
        
        {!USE_PRODUCTION_MODE && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-amber-400 text-xl">ℹ️</span>
              <div>
                <p className="text-amber-400 font-semibold mb-1">Demo Mode</p>
                <p className="text-amber-300 text-sm">
                  Record updates are simulated. Enable production mode to save records on-chain.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Domain Info */}
        <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-8 mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-white">{domain}</h2>
              {isSolana && (
                <p className="text-sm text-purple-400 mt-1">🟣 Solana Domain</p>
              )}
            </div>
            <div className="px-4 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-bold rounded-full">
              ✨ Lifetime
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Owner</p>
              <p className="text-white font-mono text-sm">{walletAddress?.slice(0, 10)}...</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Status</p>
              <p className="text-green-400 font-semibold">Permanent Ownership</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Expiration</p>
              <p className="text-purple-300 font-semibold">Never</p>
            </div>
          </div>
          
          {/* DNS-like Setup Instructions */}
          <div className="mt-6 pt-6 border-t border-purple-500/20">
            <h3 className="text-lg font-semibold text-white mb-3">🌐 Connect Your Website</h3>
            <p className="text-gray-400 text-sm mb-4">
              To point <span className="text-purple-400 font-semibold">{domain}</span> to <span className="text-blue-400">atomicfizzcaps.xyz</span>, add the website URL in records below:
            </p>
            <div className="bg-black/30 rounded-lg p-4 mb-3">
              <p className="text-xs text-gray-500 mb-2">Quick Setup Example:</p>
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="text-purple-400 font-mono">Type:</span>
                  <span className="text-white">website</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-purple-400 font-mono">Value:</span>
                  <span className="text-blue-400">https://atomicfizzcaps.xyz</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              💡 You can also add: IPFS hashes, wallet addresses, social media, email, and more!
            </p>
          </div>
        </div>

        {/* Save Status Messages */}
        {saveStatus === 'success' && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-emerald-400 text-xl">✓</span>
              <div className="flex-1">
                <p className="text-emerald-400 font-semibold mb-1">{saveMessage}</p>
                {txHash && (
                  <a 
                    href={isSolana 
                      ? `https://explorer.solana.com/tx/${txHash}?cluster=devnet`
                      : `https://etherscan.io/tx/${txHash}`
                    } 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-emerald-400 text-xs underline hover:text-emerald-300"
                  >
                    View transaction ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
        
        {saveStatus === 'error' && saveMessage && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-red-400 text-xl">✕</span>
              <div>
                <p className="text-red-400 font-semibold mb-1">Save Failed</p>
                <p className="text-red-300 text-sm">{saveMessage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Domain Records */}
        <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">Domain Records</h3>
          
          {isLoadingRecords ? (
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center gap-3">
                <svg className="animate-spin h-6 w-6 text-purple-400" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-purple-300">Loading records...</span>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {records.map((record, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 bg-black/30 border border-purple-500/20 rounded-lg p-4"
                  >
                    <div className="flex-1">
                      <p className="text-purple-400 text-sm font-semibold mb-1">{record.type}</p>
                      <p className="text-white font-mono text-sm break-all">{record.value}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteRecord(idx)}
                      className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t border-purple-500/30 pt-6">
                <h4 className="text-lg font-semibold text-white mb-4">Add New Record</h4>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Record Type</label>
                    <select
                      value={newRecordType}
                      onChange={(e) => setNewRecordType(e.target.value)}
                      className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-lg text-white outline-none focus:border-purple-500"
                    >
                      <option value="">Select type...</option>
                      <option value="wallet">Wallet Address</option>
                      <option value="ipfs">IPFS Hash</option>
                      <option value="website">Website URL</option>
                      <option value="email">Email</option>
                      <option value="twitter">Twitter</option>
                      <option value="discord">Discord</option>
                      <option value="avatar">Avatar URL</option>
                      <option value="github">GitHub</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Value</label>
                    <input
                      type="text"
                      value={newRecordValue}
                      onChange={(e) => setNewRecordValue(e.target.value)}
                      placeholder="Enter value..."
                      className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
                <button
                  onClick={handleAddRecord}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition"
                >
                  Add Record
                </button>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            disabled={isSaving || isLoadingRecords}
            className={`flex-1 px-8 py-4 font-bold text-lg rounded-lg transition ${
              isSaving || isLoadingRecords
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg shadow-purple-500/50'
            }`}
          >
            {isSaving ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : (
              'Save Changes'
            )}
          </button>
          <button
            className="px-8 py-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-semibold rounded-lg transition border border-red-500/50"
          >
            Transfer Domain
          </button>
        </div>

        {/* Additional Options */}
        <div className="mt-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Additional Options</h4>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 bg-black/30 hover:bg-black/50 text-purple-300 rounded-lg transition">
              Set Primary Domain
            </button>
            <button className="w-full text-left px-4 py-3 bg-black/30 hover:bg-black/50 text-purple-300 rounded-lg transition">
              View Transaction History
            </button>
            <button className="w-full text-left px-4 py-3 bg-black/30 hover:bg-black/50 text-purple-300 rounded-lg transition">
              Export Domain Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}