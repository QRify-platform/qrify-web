import { ROUTES } from '@/constants/routes';
import { fetchAuthConfig } from './config';
import { clearSession } from './session';

/** Sends the user to our own login page, remembering where to return. */
export function beginLogin(returnTo?: string): void {
  const query =
    returnTo && returnTo !== ROUTES.login
      ? `?next=${encodeURIComponent(returnTo)}`
      : '';
  window.location.href = `${ROUTES.login}${query}`;
}

/** Clears local tokens, then ends the Cognito session. */
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
