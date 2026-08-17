import type { OauthTokens } from '@/types';
import { fetchAuthConfig, redirectUri } from './config';
import { randomString, sha256Base64Url } from './pkce';
import { AUTH_STORAGE_KEYS, storeOauthTokens } from './session';

/**
 * Sends the user straight to Google by naming the identity provider, so
 * Cognito skips its own hosted login form.
 */
export async function beginGoogleLogin(): Promise<void> {
  const config = await fetchAuthConfig();
  const verifier = randomString(32);
  const state = randomString(16);
  const challenge = await sha256Base64Url(verifier);

  sessionStorage.setItem(AUTH_STORAGE_KEYS.verifier, verifier);
  sessionStorage.setItem(AUTH_STORAGE_KEYS.state, state);

  const params = new URLSearchParams({
    client_id: config.clientId,
    response_type: 'code',
    scope: 'openid email profile',
    redirect_uri: redirectUri(),
    state,
    code_challenge: challenge,
    code_challenge_method: 'S256',
    identity_provider: 'Google',
  });

  window.location.href = `https://${config.domain}/oauth2/authorize?${params}`;
}

/** Exchanges the callback code for tokens, verifying the PKCE state first. */
export async function completeLogin(
  code: string,
  state: string
): Promise<void> {
  const expectedState = sessionStorage.getItem(AUTH_STORAGE_KEYS.state);
  const verifier = sessionStorage.getItem(AUTH_STORAGE_KEYS.verifier);

  if (!expectedState || state !== expectedState) {
    throw new Error('Invalid OAuth state');
  }
  if (!verifier) throw new Error('Missing PKCE verifier');

  const config = await fetchAuthConfig();
  const res = await fetch(`https://${config.domain}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: config.clientId,
      code,
      redirect_uri: redirectUri(),
      code_verifier: verifier,
    }),
  });

  if (!res.ok) {
    throw new Error(`Token exchange failed: ${await res.text()}`);
  }

  const tokens = (await res.json()) as OauthTokens;
  if (!tokens.access_token || !tokens.id_token) {
    throw new Error('Token exchange returned an incomplete response');
  }

  storeOauthTokens(tokens);
  sessionStorage.removeItem(AUTH_STORAGE_KEYS.verifier);
  sessionStorage.removeItem(AUTH_STORAGE_KEYS.state);
}
