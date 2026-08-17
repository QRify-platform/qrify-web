import type { CognitoUserSession } from 'amazon-cognito-identity-js';
import type { AuthProfile, OauthTokens } from '@/types';
import { decodeJwtPayload } from './pkce';

export const AUTH_STORAGE_KEYS = {
  verifier: 'qrify_pkce_verifier',
  state: 'qrify_oauth_state',
  access: 'qrify_access_token',
  id: 'qrify_id_token',
  refresh: 'qrify_refresh_token',
  profile: 'qrify_profile',
} as const;

function storeProfile(claims: Record<string, unknown>): void {
  const email = typeof claims.email === 'string' ? claims.email : undefined;
  const profile: AuthProfile = {
    sub: typeof claims.sub === 'string' ? claims.sub : undefined,
    email,
    name: typeof claims.name === 'string' ? claims.name : email,
  };
  sessionStorage.setItem(AUTH_STORAGE_KEYS.profile, JSON.stringify(profile));
}

export function storeCognitoSession(session: CognitoUserSession): void {
  sessionStorage.setItem(
    AUTH_STORAGE_KEYS.access,
    session.getAccessToken().getJwtToken()
  );
  sessionStorage.setItem(
    AUTH_STORAGE_KEYS.id,
    session.getIdToken().getJwtToken()
  );

  const refresh = session.getRefreshToken().getToken();
  if (refresh) sessionStorage.setItem(AUTH_STORAGE_KEYS.refresh, refresh);

  try {
    storeProfile(session.getIdToken().decodePayload());
  } catch {
    // A missing profile only costs us the email in the navbar.
  }
}

export function storeOauthTokens(tokens: OauthTokens): void {
  sessionStorage.setItem(AUTH_STORAGE_KEYS.access, tokens.access_token);
  sessionStorage.setItem(AUTH_STORAGE_KEYS.id, tokens.id_token);
  if (tokens.refresh_token) {
    sessionStorage.setItem(AUTH_STORAGE_KEYS.refresh, tokens.refresh_token);
  }

  const claims = decodeJwtPayload(tokens.id_token);
  if (claims) storeProfile(claims);
}

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(AUTH_STORAGE_KEYS.access);
}

export function getIdToken(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(AUTH_STORAGE_KEYS.id);
}

export function getProfile(): AuthProfile | null {
  if (typeof window === 'undefined') return null;
  const raw = sessionStorage.getItem(AUTH_STORAGE_KEYS.profile);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthProfile;
  } catch {
    return null;
  }
}

export function isLoggedIn(): boolean {
  return Boolean(getAccessToken() || getIdToken());
}

/** The API accepts either token; prefer the access token. */
export function getApiToken(): string | null {
  return getAccessToken() || getIdToken();
}

export function clearSession(): void {
  Object.values(AUTH_STORAGE_KEYS).forEach((key) =>
    sessionStorage.removeItem(key)
  );
}
