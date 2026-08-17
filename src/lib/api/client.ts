import { getApiToken } from '@/lib/auth';

let cachedApiBase: string | undefined;

/**
 * Resolved at runtime from /api/config so the same image works in every env.
 * Falls back to env vars on the server and during local development.
 */
export async function apiBase(): Promise<string> {
  if (cachedApiBase) return cachedApiBase;

  if (typeof window === 'undefined') {
    cachedApiBase =
      process.env.API_BASE_URL ||
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      'http://localhost:8000';
    return cachedApiBase;
  }

  try {
    const res = await fetch('/api/config');
    if (res.ok) {
      const data = (await res.json()) as { apiBaseUrl?: string };
      if (data.apiBaseUrl) {
        cachedApiBase = data.apiBaseUrl.replace(/\/$/, '');
        return cachedApiBase;
      }
    }
  } catch {
    // Fall through to the env default below.
  }

  cachedApiBase =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
  return cachedApiBase;
}

export function authHeaders(): Record<string, string> {
  const token = getApiToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
