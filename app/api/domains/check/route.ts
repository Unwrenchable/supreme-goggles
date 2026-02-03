import { NextRequest, NextResponse } from 'next/server';
import { checkDomainAvailability } from '@/lib/mockData';

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
    const domainRegex = /^[a-z0-9-]+$/i;
    if (!domainRegex.test(domain)) {
      return NextResponse.json(
        { error: 'Invalid domain name. Only letters, numbers, and hyphens are allowed.' },
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
