import type { AuthConfig } from './types';

export async function fetchAuthConfig(): Promise<AuthConfig> {
  const res = await fetch('/api/auth/config');
  if (!res.ok) {
    throw new Error('Auth config unavailable');
  }
  return res.json() as Promise<AuthConfig>;
}

export function redirectUri(): string {
  return `${window.location.origin}/auth/callback`;
}
