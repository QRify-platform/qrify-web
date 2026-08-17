import type { CognitoUserSession } from 'amazon-cognito-identity-js';
import { decodeJwtPayload } from './pkce';
import type { AuthProfile, OauthTokens } from './types';

export const AUTH_STORAGE = {
  verifier: 'qrify_pkce_verifier',
  state: 'qrify_oauth_state',
  access: 'qrify_access_token',
  id: 'qrify_id_token',
  refresh: 'qrify_refresh_token',
  profile: 'qrify_profile',
} as const;

function storeProfileFromClaims(claims: Record<string, unknown>): void {
  const profile: AuthProfile = {
    sub: typeof claims.sub === 'string' ? claims.sub : undefined,
    email: typeof claims.email === 'string' ? claims.email : undefined,
    name:
      typeof claims.name === 'string'
        ? claims.name
        : typeof claims.email === 'string'
          ? claims.email
          : undefined,
  };
  sessionStorage.setItem(AUTH_STORAGE.profile, JSON.stringify(profile));
}

export function storeSessionFromCognito(session: CognitoUserSession): void {
  const access = session.getAccessToken().getJwtToken();
  const id = session.getIdToken().getJwtToken();
  const refresh = session.getRefreshToken().getToken();
  sessionStorage.setItem(AUTH_STORAGE.access, access);
  sessionStorage.setItem(AUTH_STORAGE.id, id);
  if (refresh) sessionStorage.setItem(AUTH_STORAGE.refresh, refresh);

  try {
    storeProfileFromClaims(session.getIdToken().decodePayload());
  } catch {
    /* ignore */
  }
}

export function storeSessionFromOauthTokens(tokens: OauthTokens): void {
  sessionStorage.setItem(AUTH_STORAGE.access, tokens.access_token);
  sessionStorage.setItem(AUTH_STORAGE.id, tokens.id_token);
  if (tokens.refresh_token) {
    sessionStorage.setItem(AUTH_STORAGE.refresh, tokens.refresh_token);
  }

  const claims = decodeJwtPayload(tokens.id_token);
  if (claims) storeProfileFromClaims(claims);
}

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(AUTH_STORAGE.access);
}

export function getIdToken(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(AUTH_STORAGE.id);
}

export function getProfile(): AuthProfile | null {
  if (typeof window === 'undefined') return null;
  const raw = sessionStorage.getItem(AUTH_STORAGE.profile);
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

/** Prefer access token for API; fall back to id token (API accepts both). */
export function getApiToken(): string | null {
  return getAccessToken() || getIdToken();
}

export function clearSession(): void {
  Object.values(AUTH_STORAGE).forEach((key) => sessionStorage.removeItem(key));
}
