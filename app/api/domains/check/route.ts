import { NextRequest, NextResponse } from 'next/server';
import { checkDomainAvailability } from '@/lib/mockData';
import { DOMAIN_EXTENSIONS } from '@/lib/contract';

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
 * Validate domain extension
 * - Must be one of the supported extensions or a custom extension starting with '.'
 */
function validateExtension(extension: string): { valid: boolean; error?: string; isKnown?: boolean } {
  if (!extension) {
    return { valid: false, error: 'Extension is required' };
  }

  if (!extension.startsWith('.')) {
    return { valid: false, error: 'Extension must start with a dot (e.g., .fizz)' };
  }

  // Check if it's a known extension or a custom one
  const isKnownExtension = (DOMAIN_EXTENSIONS as readonly string[]).includes(extension);

  // For custom extensions, validate format
  if (!isKnownExtension) {
    // Custom extensions must be alphanumeric and between 2-63 characters (excluding the dot)
    const extWithoutDot = extension.slice(1);
    if (extWithoutDot.length < 2 || extWithoutDot.length > 63) {
      return { valid: false, error: 'Custom extension must be between 2 and 63 characters' };
    }

    const extRegex = /^[a-z0-9]+$/i;
    if (!extRegex.test(extWithoutDot)) {
      return { valid: false, error: 'Extension can only contain letters and numbers' };
    }
  }

  return { valid: true, isKnown: isKnownExtension };
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
    const domainValidation = validateDomainName(domain);
    if (!domainValidation.valid) {
      return NextResponse.json(
        { error: domainValidation.error },
        { status: 400 }
      );
    }

    // Validate extension format
    const extensionValidation = validateExtension(extension);
    if (!extensionValidation.valid) {
      return NextResponse.json(
        { error: extensionValidation.error },
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
      is_known_extension: extensionValidation.isKnown,
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
    const domainValidation = validateDomainName(domain);
    if (!domainValidation.valid) {
      return NextResponse.json(
        { error: domainValidation.error },
        { status: 400 }
      );
    }

    // Validate extension format
    const extensionValidation = validateExtension(extension);
    if (!extensionValidation.valid) {
      return NextResponse.json(
        { error: extensionValidation.error },
        { status: 400 }
      );
    }

    const available = checkDomainAvailability(domain, extension);
    const fullDomain = `${domain}${extension}`;

    return NextResponse.json({
      available,
      domain: fullDomain,
      checked_at: new Date().toISOString(),
      is_known_extension: extensionValidation.isKnown,
    });

  } catch (error) {
    console.error('Domain check error:', error);
    return NextResponse.json(
      { error: 'Failed to check domain availability' },
      { status: 500 }
    );
  }
}
