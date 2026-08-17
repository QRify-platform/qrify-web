import { ROUTES } from '@/lib/routes';

export const NAV_LINKS = [
  { href: '/#how', label: 'How it works' },
  { href: '/#uses', label: 'Use cases' },
  { href: ROUTES.generate, label: 'Generate' },
  { href: ROUTES.myCodes, label: 'My codes' },
] as const;

export function isNavLinkActive(href: string, pathname: string | null): boolean {
  return (
    (href === ROUTES.generate && pathname === ROUTES.generate) ||
    (href === ROUTES.myCodes && pathname === ROUTES.myCodes)
  );
}
