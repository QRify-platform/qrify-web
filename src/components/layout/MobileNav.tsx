import Link from 'next/link';
import { beginLogin, beginLogout } from '@/lib/auth';
import { ROUTES } from '@/lib/routes';
import { NAV_LINKS, isNavLinkActive } from './nav-config';

type MobileNavProps = {
  open: boolean;
  pathname: string | null;
  authed: boolean;
  onClose: () => void;
};

export function MobileNav({ open, pathname, authed, onClose }: MobileNavProps) {
  return (
    <div
      id="mobile-nav"
      className={`border-t border-bone/10 bg-soot md:hidden ${
        open ? 'block' : 'hidden'
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] flex-col gap-1 px-5 py-5 sm:px-8">
        {NAV_LINKS.map((link) => {
          const active = isNavLinkActive(link.href, pathname);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`px-4 py-3.5 font-mono text-xs uppercase tracking-[0.16em] transition-colors ${
                active
                  ? 'border border-acid/40 bg-acid/10 text-acid'
                  : 'border border-transparent text-bone/70 hover:border-bone/10 hover:bg-slate hover:text-bone'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
        {authed ? (
          <button
            type="button"
            onClick={() => {
              onClose();
              void beginLogout();
            }}
            className="mt-2 px-4 py-3.5 text-left font-mono text-xs uppercase tracking-[0.16em] text-bone/70"
          >
            Sign out
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              onClose();
              beginLogin(pathname || ROUTES.home);
            }}
            className="mt-2 px-4 py-3.5 text-left font-mono text-xs uppercase tracking-[0.16em] text-acid"
          >
            Sign in
          </button>
        )}
        <Link
          href={ROUTES.generate}
          onClick={onClose}
          className="mt-2 inline-flex items-center justify-center gap-2 bg-acid px-4 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-soot"
        >
          Start generating
          <span className="h-1.5 w-1.5 bg-soot" aria-hidden />
        </Link>
      </nav>
    </div>
  );
}

type HamburgerButtonProps = {
  open: boolean;
  onToggle: () => void;
};

export function HamburgerButton({ open, onToggle }: HamburgerButtonProps) {
  return (
    <button
      type="button"
      className="flex h-10 w-10 items-center justify-center border border-bone/15 text-bone md:hidden"
      aria-expanded={open}
      aria-controls="mobile-nav"
      aria-label={open ? 'Close menu' : 'Open menu'}
      onClick={onToggle}
    >
      <span className="relative block h-3.5 w-4">
        <span
          className={`absolute left-0 block h-px w-full bg-current transition-all duration-200 ${
            open ? 'top-1.5 rotate-45' : 'top-0'
          }`}
        />
        <span
          className={`absolute left-0 top-1.5 block h-px w-full bg-current transition-opacity duration-200 ${
            open ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <span
          className={`absolute left-0 block h-px w-full bg-current transition-all duration-200 ${
            open ? 'top-1.5 -rotate-45' : 'top-3'
          }`}
        />
      </span>
    </button>
  );
}
