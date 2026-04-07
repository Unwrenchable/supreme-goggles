import { NextRequest, NextResponse } from 'next/server';
import { getChainForExtension } from '@/lib/contract';

/**
 * POST /api/domains/transfer
 *
 * Validates a domain transfer request server-side.  Actual transaction
 * signing happens client-side (wallet).
 *
 * Body:
 * {
 *   "domain": "myname.fizz",   // full domain including extension
 *   "fromOwner": "0x... | <solana pubkey>",
 *   "toOwner":   "0x... | <solana pubkey>"
 * }
 *
 * Response (200):
 * {
 *   "domain": "myname.fizz",
 *   "chain": "solana",
 *   "fromOwner": "...",
 *   "toOwner": "...",
 *   "status": "pending_transaction"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { domain, fromOwner, toOwner } = body;

    if (!domain || !fromOwner || !toOwner) {
      return NextResponse.json(
        { error: 'domain, fromOwner, and toOwner are required' },
        { status: 400 }
      );
    }

    // Parse extension from full domain
    const dotIndex = domain.indexOf('.');
    if (dotIndex === -1) {
      return NextResponse.json(
        { error: 'domain must include an extension (e.g., myname.fizz)' },
        { status: 400 }
      );
    }
    const extension = domain.slice(dotIndex);

    const isEvmAddress = (addr: string) => /^0x[0-9a-fA-F]{40}$/.test(addr);
    const isSolanaAddress = (addr: string) => /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(addr);

    if (!isEvmAddress(fromOwner) && !isSolanaAddress(fromOwner)) {
      return NextResponse.json(
        { error: 'fromOwner must be a valid EVM address (0x...) or Solana public key' },
        { status: 400 }
      );
    }
    if (!isEvmAddress(toOwner) && !isSolanaAddress(toOwner)) {
      return NextResponse.json(
        { error: 'toOwner must be a valid EVM address (0x...) or Solana public key' },
        { status: 400 }
      );
    }

    // Solana addresses are case-sensitive base58 strings — compare directly
    if (fromOwner === toOwner || fromOwner.toLowerCase() === toOwner.toLowerCase()) {
      return NextResponse.json(
        { error: 'fromOwner and toOwner must be different addresses' },
        { status: 400 }
      );
    }

    const chain = getChainForExtension(extension);

    // Ensure address types match the target chain
    if (chain === 'solana') {
      if (isEvmAddress(toOwner)) {
        return NextResponse.json(
          { error: `Extension ${extension} is on Solana — toOwner must be a Solana public key` },
          { status: 400 }
        );
      }
    } else {
      if (!isEvmAddress(toOwner)) {
        return NextResponse.json(
          { error: `Extension ${extension} is on ${chain} — toOwner must be an EVM address (0x...)` },
          { status: 400 }
        );
      }
    }

    return NextResponse.json({
      domain,
      chain,
      fromOwner,
      toOwner,
      transferred_at: new Date().toISOString(),
      status: 'pending_transaction',
      message:
        'Transfer validated. Complete the transfer by submitting the transaction from your wallet.',
    });
  } catch (error) {
    console.error('Domain transfer validation error:', error);
    return NextResponse.json({ error: 'Failed to process transfer request' }, { status: 500 });
  }
}
