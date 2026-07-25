import { NextResponse } from 'next/server';

/**
 * Public runtime config for the browser.
 * API_BASE_URL is set per env in cluster-state (not baked into the image).
 * Bracket access so Next does not inline the value at build time.
 */
export async function GET() {
  const apiBaseUrl =
    process.env['API_BASE_URL'] ||
    process.env['NEXT_PUBLIC_API_BASE_URL'] ||
    'http://localhost:8000';

  return NextResponse.json({ apiBaseUrl });
}
