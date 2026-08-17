import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Runtime Cognito settings for the browser (custom UI SRP + Google PKCE).
 * Values come from the qrify-cognito K8s secret (ESO), not build-time NEXT_PUBLIC_*.
 */
export async function GET() {
  const region = process.env.COGNITO_REGION || 'us-east-2';
  const userPoolId = process.env.COGNITO_USER_POOL_ID || '';
  const clientId = process.env.COGNITO_CLIENT_ID || '';
  const domain = process.env.COGNITO_DOMAIN || '';
  const issuer =
    process.env.COGNITO_ISSUER ||
    (userPoolId
      ? `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`
      : '');

  if (!clientId || !domain) {
    return NextResponse.json(
      { error: 'Cognito is not configured on this deployment' },
      { status: 503 }
    );
  }

  return NextResponse.json({
    region,
    userPoolId,
    clientId,
    domain,
    issuer,
  });
}
