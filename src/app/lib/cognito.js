/**
 * Cognito Hosted UI helpers (authorization code + PKCE).
 * Config comes from GET /api/auth/config (runtime env from Secrets Manager).
 */

const STORAGE = {
  verifier: 'qrify_pkce_verifier',
  state: 'qrify_oauth_state',
  access: 'qrify_access_token',
  id: 'qrify_id_token',
  refresh: 'qrify_refresh_token',
  profile: 'qrify_profile',
};

function base64UrlEncode(buffer) {
  const bytes = buffer instanceof ArrayBuffer ? new Uint8Array(buffer) : buffer;
  let str = '';
  bytes.forEach((b) => {
    str += String.fromCharCode(b);
  });
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function randomString(byteLength = 32) {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  return base64UrlEncode(bytes);
}

async function sha256Base64Url(plain) {
  const data = new TextEncoder().encode(plain);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return base64UrlEncode(digest);
}

export async function fetchAuthConfig() {
  const res = await fetch('/api/auth/config');
  if (!res.ok) {
    throw new Error('Auth config unavailable');
  }
  return res.json();
}

export function getAccessToken() {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(STORAGE.access);
}

export function getIdToken() {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(STORAGE.id);
}

export function getProfile() {
  if (typeof window === 'undefined') return null;
  const raw = sessionStorage.getItem(STORAGE.profile);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function isLoggedIn() {
  return Boolean(getAccessToken() || getIdToken());
}

/** Prefer access token for API; fall back to id token (API accepts both). */
export function getApiToken() {
  return getAccessToken() || getIdToken();
}

export function clearSession() {
  Object.values(STORAGE).forEach((key) => sessionStorage.removeItem(key));
}

function redirectUri() {
  return `${window.location.origin}/auth/callback`;
}

export async function beginLogin() {
  const config = await fetchAuthConfig();
  const verifier = randomString(32);
  const state = randomString(16);
  const challenge = await sha256Base64Url(verifier);

  sessionStorage.setItem(STORAGE.verifier, verifier);
  sessionStorage.setItem(STORAGE.state, state);

  const params = new URLSearchParams({
    client_id: config.clientId,
    response_type: 'code',
    scope: 'openid email profile',
    redirect_uri: redirectUri(),
    state,
    code_challenge: challenge,
    code_challenge_method: 'S256',
  });

  window.location.href = `https://${config.domain}/oauth2/authorize?${params}`;
}

export async function beginLogout() {
  const config = await fetchAuthConfig();
  clearSession();
  const params = new URLSearchParams({
    client_id: config.clientId,
    logout_uri: `${window.location.origin}/`,
  });
  window.location.href = `https://${config.domain}/logout?${params}`;
}

export async function completeLogin(code, state) {
  const expectedState = sessionStorage.getItem(STORAGE.state);
  const verifier = sessionStorage.getItem(STORAGE.verifier);
  if (!expectedState || state !== expectedState) {
    throw new Error('Invalid OAuth state');
  }
  if (!verifier) {
    throw new Error('Missing PKCE verifier');
  }

  const config = await fetchAuthConfig();
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: config.clientId,
    code,
    redirect_uri: redirectUri(),
    code_verifier: verifier,
  });

  const res = await fetch(`https://${config.domain}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token exchange failed: ${text}`);
  }

  const tokens = await res.json();
  sessionStorage.setItem(STORAGE.access, tokens.access_token);
  sessionStorage.setItem(STORAGE.id, tokens.id_token);
  if (tokens.refresh_token) {
    sessionStorage.setItem(STORAGE.refresh, tokens.refresh_token);
  }

  sessionStorage.removeItem(STORAGE.verifier);
  sessionStorage.removeItem(STORAGE.state);

  // Lightweight profile from id token payload (no verify in browser — API verifies).
  try {
    const part = tokens.id_token.split('.')[1];
    const padded =
      part.replace(/-/g, '+').replace(/_/g, '/') +
      '=='.slice((part.length % 4) || 4);
    const payload = JSON.parse(atob(padded));
    sessionStorage.setItem(
      STORAGE.profile,
      JSON.stringify({
        sub: payload.sub,
        email: payload.email,
        name: payload.name || payload.email,
      })
    );
  } catch {
    /* ignore */
  }

  return tokens;
}
