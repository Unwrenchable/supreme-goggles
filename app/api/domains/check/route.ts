import { NextRequest, NextResponse } from 'next/server';
import { checkDomainAvailability } from '@/lib/mockData';

/**
 * Validate domain name format
 * - Must start and end with alphanumeric characters
 * - Can contain hyphens in the middle
 * - Minimum 1 character, maximum 63 characters
 */
function validateDomainName(domain: string): { valid: boolean; error?: string } {
  if (!domain || domain.length === 0) {
    return { valid: false, error: 'Domain name is required' };
  }

  if (domain.length > 63) {
    return { valid: false, error: 'Domain name must be 63 characters or less' };
  }

  // Domain must start and end with alphanumeric, can have hyphens in middle
  // Supports single character domains
  const domainRegex = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/i;
  if (!domainRegex.test(domain)) {
    return {
      valid: false,
      error: 'Invalid domain name. Must start and end with a letter or number, and can contain hyphens in the middle.'
    };
  }

  return { valid: true };
}

/**
 * API Route: Check Domain Availability
 * 
 * This is an example of a BACKEND API endpoint in Next.js.
 * It runs on the server and can include business logic, database queries,
 * and other server-side operations.
 * 
 * POST /api/domains/check
 * 
 * Body: { "domain": "myname", "extension": ".fizz" }
 * 
 * Response: { "available": true, "domain": "myname.fizz" }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { domain, extension } = body;

    // Validate input
    if (!domain || !extension) {
      return NextResponse.json(
        { error: 'Domain and extension are required' },
        { status: 400 }
      );
    }

    // Validate domain name format
    const validation = validateDomainName(domain);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Check availability (using mock data for demo)
    // In production, this would query the blockchain
    const available = checkDomainAvailability(domain, extension);
    const fullDomain = `${domain}${extension}`;

    // Return the result
    return NextResponse.json({
      available,
      domain: fullDomain,
      checked_at: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Domain check error:', error);
    return NextResponse.json(
      { error: 'Failed to check domain availability' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/domains/check?domain=myname&extension=.fizz
 * 
 * Alternative endpoint using query parameters
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const domain = searchParams.get('domain');
    const extension = searchParams.get('extension');

    if (!domain || !extension) {
      return NextResponse.json(
        { error: 'Domain and extension are required' },
        { status: 400 }
      );
    }

    // Validate domain name format using shared function
    const validation = validateDomainName(domain);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const available = checkDomainAvailability(domain, extension);
    const fullDomain = `${domain}${extension}`;

    return NextResponse.json({
      available,
      domain: fullDomain,
      checked_at: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Domain check error:', error);
    return NextResponse.json(
      { error: 'Failed to check domain availability' },
      { status: 500 }
    );
  }
}
