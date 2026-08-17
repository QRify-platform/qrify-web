import { ROUTES } from './routes';

export const NAV_LINKS = [
  { href: '/#how', label: 'How it works' },
  { href: '/#uses', label: 'Use cases' },
  { href: ROUTES.generate, label: 'Generate' },
  { href: ROUTES.myCodes, label: 'My codes' },
] as const;
