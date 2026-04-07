import { NextRequest, NextResponse } from 'next/server';
import { DOMAIN_EXTENSIONS, getChainForExtension, getCurrencyForExtension } from '@/lib/contract';

/**
 * Validate domain name format
 */
function validateDomainName(domain: string): { valid: boolean; error?: string } {
  if (!domain || domain.length === 0) {
    return { valid: false, error: 'Domain name is required' };
  }
  if (domain.length > 63) {
    return { valid: false, error: 'Domain name must be 63 characters or less' };
  }
  const domainRegex = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/i;
  if (!domainRegex.test(domain)) {
    return {
      valid: false,
      error:
        'Invalid domain name. Must start and end with a letter or number, and can contain hyphens in the middle.',
    };
  }
  return { valid: true };
}

/**
 * Validate domain extension
 */
function validateExtension(extension: string): { valid: boolean; error?: string } {
  if (!extension) {
    return { valid: false, error: 'Extension is required' };
  }
  if (!extension.startsWith('.')) {
    return { valid: false, error: 'Extension must start with a dot (e.g., .fizz)' };
  }
  const extWithoutDot = extension.slice(1);
  if (extWithoutDot.length < 2 || extWithoutDot.length > 63) {
    return { valid: false, error: 'Extension must be between 2 and 63 characters' };
  }
  const extRegex = /^[a-z0-9]+$/i;
  if (!extRegex.test(extWithoutDot)) {
    return { valid: false, error: 'Extension can only contain letters and numbers' };
  }
  return { valid: true };
}

/**
 * POST /api/domains/register
 *
 * Validates a domain registration request server-side and returns the
 * chain + currency information the client needs to complete the on-chain
 * transaction.  Actual transaction signing happens client-side (wallet).
 *
 * Body: { "domain": "myname", "extension": ".fizz", "owner": "0x..." | "Solana base58" }
 *
 * Response (200):
 * {
 *   "domain": "myname.fizz",
 *   "chain": "solana",
 *   "currency": "SOL",
 *   "owner": "<address>",
 *   "registered_at": "<ISO timestamp>",
 *   "status": "pending_transaction"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { domain, extension, owner } = body;

    // Validate required fields
    if (!domain || !extension || !owner) {
      return NextResponse.json(
        { error: 'domain, extension, and owner are required' },
        { status: 400 }
      );
    }

    // Validate domain name
    const domainValidation = validateDomainName(domain);
    if (!domainValidation.valid) {
      return NextResponse.json({ error: domainValidation.error }, { status: 400 });
    }

    // Validate extension
    const extensionValidation = validateExtension(extension);
    if (!extensionValidation.valid) {
      return NextResponse.json({ error: extensionValidation.error }, { status: 400 });
    }

    // Validate owner address — accept both 0x EVM addresses and Solana base58 pubkeys
    const isEvmAddress = /^0x[0-9a-fA-F]{40}$/.test(owner);
    const isSolanaAddress = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(owner);
    if (!isEvmAddress && !isSolanaAddress) {
      return NextResponse.json(
        { error: 'owner must be a valid EVM address (0x...) or Solana public key' },
        { status: 400 }
      );
    }

    const chain = getChainForExtension(extension);
    const currencyInfo = getCurrencyForExtension(extension);
    const isKnownExtension = (DOMAIN_EXTENSIONS as readonly string[]).includes(extension);

    // Cross-validate: Solana extensions require a Solana owner address
    if (chain === 'solana' && isEvmAddress) {
      return NextResponse.json(
        { error: `Extension ${extension} is on Solana — owner must be a Solana public key` },
        { status: 400 }
      );
    }
    if (chain !== 'solana' && !isEvmAddress) {
      return NextResponse.json(
        { error: `Extension ${extension} is on ${chain} — owner must be an EVM address (0x...)` },
        { status: 400 }
      );
    }

    const fullDomain = `${domain}${extension}`;

    return NextResponse.json({
      domain: fullDomain,
      chain,
      currency: currencyInfo.symbol,
      owner,
      is_known_extension: isKnownExtension,
      registered_at: new Date().toISOString(),
      status: 'pending_transaction',
      message:
        'Domain validated. Complete registration by submitting the transaction from your wallet.',
    });
  } catch (error) {
    console.error('Domain registration validation error:', error);
    return NextResponse.json({ error: 'Failed to process registration request' }, { status: 500 });
  }
}
