import { NextResponse } from 'next/server';

/**
 * API Route: Health Check
 * 
 * This is a simple BACKEND endpoint to check if the API is running.
 * Useful for monitoring, load balancers, and deployment verification.
 * 
 * GET /api/health
 * 
 * Response: { "status": "ok", "timestamp": "2024-..." }
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    service: 'AtomicFizzCaps Universal Naming Service',
  });
}
