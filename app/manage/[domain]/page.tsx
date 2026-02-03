'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAccount } from 'wagmi';

interface DomainRecord {
  type: string;
  value: string;
}

export default function ManageDomainPage() {
  const params = useParams();
  const router = useRouter();
  const { address, isConnected } = useAccount();
  
  const domain = params.domain as string;
  
  const [records, setRecords] = useState<DomainRecord[]>([
    { type: 'wallet', value: '0x1234567890123456789012345678901234567890' },
    { type: 'ipfs', value: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG' },
    { type: 'website', value: 'https://example.com' },
  ]);
  
  const [newRecordType, setNewRecordType] = useState('');
  const [newRecordValue, setNewRecordValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);

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
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Records updated successfully!');
    }, 1500);
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

        {/* Domain Info */}
        <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-8 mb-8">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-3xl font-bold text-white">{domain}</h2>
            <div className="px-4 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-bold rounded-full">
              ✨ Lifetime
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Owner</p>
              <p className="text-white font-mono text-sm">{address?.slice(0, 10)}...</p>
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
        </div>

        {/* Domain Records */}
        <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">Domain Records</h3>
          
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
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex-1 px-8 py-4 font-bold text-lg rounded-lg transition ${
              isSaving
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg shadow-purple-500/50'
            }`}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
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