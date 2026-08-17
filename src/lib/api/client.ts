import type { RuntimeConfig } from './types';

let cachedApiBase: string | undefined;

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
      const data = (await res.json()) as RuntimeConfig;
      if (data.apiBaseUrl) {
        cachedApiBase = data.apiBaseUrl.replace(/\/$/, '');
        return cachedApiBase;
      }
    }
  } catch {
    // fall through to env / default
  }

  cachedApiBase =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
  return cachedApiBase;
}
