export const ROUTES = {
  home: '/',
  generate: '/generate',
  myCodes: '/my-codes',
  login: '/login',
  signup: '/signup',
  authCallback: '/auth/callback',
} as const;

export function isAuthChromePath(pathname: string | null): boolean {
  if (!pathname) return false;
  return (
    pathname === ROUTES.login ||
    pathname === ROUTES.signup ||
    pathname.startsWith('/auth/')
  );
}

export function generatePath(type?: string): string {
  return type ? `${ROUTES.generate}?type=${type}` : ROUTES.generate;
}
