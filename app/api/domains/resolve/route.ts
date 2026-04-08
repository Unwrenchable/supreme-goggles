import { NextRequest, NextResponse } from 'next/server';
import { mockDomains } from '@/lib/mockData';
import { getChainForExtension } from '@/lib/contract';

/**
 * API Route: Resolve a Domain
 *
 * Looks up the owner and associated records for a fully-qualified domain name.
 * In demo mode this uses the in-memory mock registry.  In production mode the
 * caller should supply the on-chain data themselves (the blockchain query runs
 * client-side due to wallet access requirements), but this endpoint still
 * validates the request and returns what information is available.
 *
 * GET /api/domains/resolve?domain=myname.fizz
 *
 * Success response (200):
 * {
 *   "domain":      "myname.fizz",
 *   "name":        "myname",
 *   "extension":   ".fizz",
 *   "chain":       "solana",
 *   "owner":       "...",
 *   "is_active":   true,
 *   "records":     { "wallet": "..." },
 *   "resolved":    true,
 *   "resolved_at": "<ISO timestamp>"
 * }
 *
 * Not-found response (404):
 * {
 *   "domain":    "myname.fizz",
 *   "resolved":  false,
 *   "message":   "Domain not registered"
 * }
 */
export async function GET(request: NextRequest) {
  try {
    const domain = request.nextUrl.searchParams.get('domain');

    if (!domain) {
      return NextResponse.json(
        { error: 'domain query parameter is required (e.g. ?domain=myname.fizz)' },
        { status: 400 }
      );
    }

    // Parse base name and extension from the full domain
    const dotIndex = domain.indexOf('.');
    if (dotIndex === -1 || dotIndex === 0 || dotIndex === domain.length - 1) {
      return NextResponse.json(
        { error: 'domain must include a valid extension (e.g. myname.fizz)' },
        { status: 400 }
      );
    }

    // Normalize extension to lowercase — all registered extensions are stored
    // as lowercase constants (e.g. ".fizz"), so an upper-case lookup like
    // "myname.FIZZ" should still resolve correctly.
    const name = domain.slice(0, dotIndex);
    const extension = domain.slice(dotIndex).toLowerCase();
    const chain = getChainForExtension(extension);

    // Look up in mock registry (demo mode).
    // Domain names are case-insensitive by convention (e.g. "MyName.fizz" → "myname.fizz").
    // The extension is already normalised to lowercase above, so the comparison is consistent.
    const match = mockDomains.find(
      (d) => d.name.toLowerCase() === name.toLowerCase() && d.extension === extension
    );

    if (!match) {
      return NextResponse.json(
        {
          domain,
          name,
          extension,
          chain,
          resolved: false,
          message: 'Domain not registered',
          resolved_at: new Date().toISOString(),
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      domain,
      name: match.name,
      extension: match.extension,
      chain,
      owner: match.owner,
      is_active: match.isActive,
      records: match.records,
      resolved: true,
      resolved_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Domain resolve error:', error);
    return NextResponse.json(
      { error: 'Failed to resolve domain' },
      { status: 500 }
    );
  }
}
