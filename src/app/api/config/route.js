import { NextResponse } from 'next/server';

// Must not be statically prerendered — API_BASE_URL is set at runtime per env.
export const dynamic = 'force-dynamic';

/**
 * Public runtime config for the browser.
 * API_BASE_URL comes from cluster-state (not baked into the image).
 */
export async function GET() {
  const apiBaseUrl =
    process.env.API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    'http://localhost:8000';

  return NextResponse.json({ apiBaseUrl });
}
