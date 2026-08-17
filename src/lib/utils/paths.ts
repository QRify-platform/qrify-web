import { ROUTES } from '@/constants/routes';

/** Login, signup, and callback render without the navbar and footer. */
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

/** Same-origin relative paths only — blocks open redirects. */
export function safeNextPath(
  raw: string | null,
  fallback: string = ROUTES.generate
): string {
  if (!raw || !raw.startsWith('/') || raw.startsWith('//')) return fallback;
  return raw;
}

/** Hash links stay inactive; the home link only matches home exactly. */
export function isNavLinkActive(href: string, pathname: string | null): boolean {
  if (!pathname || href.includes('#')) return false;
  if (href === ROUTES.home) return pathname === ROUTES.home;
  return pathname.startsWith(href);
}
