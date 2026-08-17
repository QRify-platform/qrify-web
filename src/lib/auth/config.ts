import { CognitoUserPool } from 'amazon-cognito-identity-js';
import type { AuthConfig } from '@/types';

/** Cognito settings come from the cluster secret at runtime, not the build. */
export async function fetchAuthConfig(): Promise<AuthConfig> {
  const res = await fetch('/api/auth/config');
  if (!res.ok) throw new Error('Auth config unavailable');
  return res.json() as Promise<AuthConfig>;
}

export function userPoolFrom(config: AuthConfig): CognitoUserPool {
  if (!config.userPoolId || !config.clientId) {
    throw new Error('Cognito user pool is not configured');
  }
  return new CognitoUserPool({
    UserPoolId: config.userPoolId,
    ClientId: config.clientId,
  });
}

export function redirectUri(): string {
  return `${window.location.origin}/auth/callback`;
}
