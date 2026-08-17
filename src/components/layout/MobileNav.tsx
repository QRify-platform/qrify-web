'use client';

import Link from 'next/link';
import { NAV_LINKS } from '@/constants/navigation';
import { ROUTES } from '@/constants/routes';
import { beginLogin, beginLogout } from '@/lib/auth';
import { cn } from '@/lib/utils/cn';
import { isNavLinkActive } from '@/lib/utils/paths';

type MobileNavProps = {
  id: string;
  open: boolean;
  authed: boolean;
  pathname: string | null;
  onClose: () => void;
};

export function MobileNav({
  id,
  open,
  authed,
  pathname,
  onClose,
}: MobileNavProps) {
  return (
    <div
      id={id}
      className={cn(
        'border-t border-bone/10 bg-soot md:hidden',
        open ? 'block' : 'hidden'
      )}
    >
      <nav className="mx-auto flex max-w-[1400px] flex-col gap-1 px-5 py-5 sm:px-8">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={cn(
              'px-4 py-3.5 font-mono text-xs uppercase tracking-[0.16em] transition-colors',
              isNavLinkActive(link.href, pathname)
                ? 'border border-acid/40 bg-acid/10 text-acid'
                : 'border border-transparent text-bone/70 hover:border-bone/10 hover:bg-slate hover:text-bone'
            )}
          >
            {link.label}
          </Link>
        ))}

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
