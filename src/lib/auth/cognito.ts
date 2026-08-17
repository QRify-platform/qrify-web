import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  type CognitoUserSession,
  type ISignUpResult,
} from 'amazon-cognito-identity-js';
import { fetchAuthConfig, redirectUri } from './config';
import { randomString, sha256Base64Url } from './pkce';
import { ROUTES } from '@/lib/routes';
import {
  AUTH_STORAGE,
  clearSession,
  storeSessionFromCognito,
  storeSessionFromOauthTokens,
} from './session';
import type { AuthConfig, OauthTokens } from './types';

function userPoolFromConfig(config: AuthConfig): CognitoUserPool {
  if (!config.userPoolId || !config.clientId) {
    throw new Error('Cognito user pool is not configured');
  }
  return new CognitoUserPool({
    UserPoolId: config.userPoolId,
    ClientId: config.clientId,
  });
}

/** Open in-app login (not Cognito Hosted UI). */
export function beginLogin(returnTo?: string): void {
  const q =
    returnTo && returnTo !== ROUTES.login
      ? `?next=${encodeURIComponent(returnTo)}`
      : '';
  window.location.href = `${ROUTES.login}${q}`;
}

export async function signInWithPassword(
  email: string,
  password: string
): Promise<CognitoUserSession> {
  const config = await fetchAuthConfig();
  const pool = userPoolFromConfig(config);
  const user = new CognitoUser({ Username: email.trim(), Pool: pool });
  const details = new AuthenticationDetails({
    Username: email.trim(),
    Password: password,
  });

  return new Promise((resolve, reject) => {
    user.authenticateUser(details, {
      onSuccess: (session) => {
        storeSessionFromCognito(session);
        resolve(session);
      },
      onFailure: (err) => reject(err),
      newPasswordRequired: () => {
        reject(
          new Error(
            'Password reset required. Check your email or contact support.'
          )
        );
      },
    });
  });
}

export async function signUpWithPassword(
  email: string,
  password: string
): Promise<ISignUpResult | undefined> {
  const config = await fetchAuthConfig();
  const pool = userPoolFromConfig(config);
  const attrs = [
    new CognitoUserAttribute({ Name: 'email', Value: email.trim() }),
  ];

  return new Promise((resolve, reject) => {
    pool.signUp(email.trim(), password, attrs, [], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

export async function confirmSignUp(
  email: string,
  code: string
): Promise<string> {
  const config = await fetchAuthConfig();
  const pool = userPoolFromConfig(config);
  const user = new CognitoUser({ Username: email.trim(), Pool: pool });

  return new Promise((resolve, reject) => {
    user.confirmRegistration(code.trim(), true, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result as string);
    });
  });
}

export async function resendConfirmationCode(email: string): Promise<string> {
  const config = await fetchAuthConfig();
  const pool = userPoolFromConfig(config);
  const user = new CognitoUser({ Username: email.trim(), Pool: pool });

  return new Promise((resolve, reject) => {
    user.resendConfirmationCode((err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result as string);
    });
  });
}

/** Google: authorize with identity_provider so Cognito skips its own login form. */
export async function beginGoogleLogin(): Promise<void> {
  const config = await fetchAuthConfig();
  const verifier = randomString(32);
  const state = randomString(16);
  const challenge = await sha256Base64Url(verifier);

  sessionStorage.setItem(AUTH_STORAGE.verifier, verifier);
  sessionStorage.setItem(AUTH_STORAGE.state, state);

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

export async function beginLogout(): Promise<void> {
  const config = await fetchAuthConfig().catch(() => null);
  clearSession();
  if (!config?.domain || !config?.clientId) {
    window.location.href = ROUTES.home;
    return;
  }
  const params = new URLSearchParams({
    client_id: config.clientId,
    logout_uri: `${window.location.origin}/`,
  });
  window.location.href = `https://${config.domain}/logout?${params}`;
}

export async function completeLogin(
  code: string,
  state: string
): Promise<OauthTokens> {
  const expectedState = sessionStorage.getItem(AUTH_STORAGE.state);
  const verifier = sessionStorage.getItem(AUTH_STORAGE.verifier);
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

  const tokens = (await res.json()) as OauthTokens;
  if (!tokens.access_token || !tokens.id_token) {
    throw new Error('Token exchange returned an incomplete response');
  }

  storeSessionFromOauthTokens(tokens);
  sessionStorage.removeItem(AUTH_STORAGE.verifier);
  sessionStorage.removeItem(AUTH_STORAGE.state);
  return tokens;
}
