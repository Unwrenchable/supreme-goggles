import { NextResponse } from 'next/server';
import { DOMAIN_EXTENSIONS, USE_PRODUCTION_MODE } from '@/lib/contract';

/**
 * API Route: Health Check
 * 
 * Returns the current status and configuration of the naming service.
 * Useful for monitoring, load balancers, and deployment verification.
 * 
 * GET /api/health
 * 
 * Response: {
 *   "status": "ok",
 *   "timestamp": "2024-...",
 *   "version": "1.0.0",
 *   "service": "...",
 *   "mode": "demo" | "production",
 *   "supported_extensions": [...],
 *   "endpoints": [...]
 * }
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    service: 'AtomicFizzCaps Universal Naming Service',
    mode: USE_PRODUCTION_MODE ? 'production' : 'demo',
    supported_extensions: DOMAIN_EXTENSIONS,
    endpoints: [
      'GET  /api/health',
      'GET  /api/domains/check?domain=<name>&extension=<ext>',
      'POST /api/domains/check',
      'POST /api/domains/register',
      'POST /api/domains/transfer',
      'GET  /api/domains/resolve?domain=<name>.<ext>',
    ],
  });
}
