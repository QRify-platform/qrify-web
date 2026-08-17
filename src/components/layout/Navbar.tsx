'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { beginLogin, beginLogout } from '@/lib/auth';
import { useAuthStatus } from '@/hooks/useAuthStatus';
import { useLockedBody } from '@/hooks/useLockedBody';
import { ROUTES } from '@/lib/routes';
import { BrandMark } from './BrandMark';
import { DesktopNav } from './DesktopNav';
import { HamburgerButton, MobileNav } from './MobileNav';
import { NavigationProgress } from './NavigationProgress';

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { authed, profile } = useAuthStatus(pathname);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useLockedBody(open);

  return (
    <header className="relative sticky top-0 z-50 border-b border-bone/10 bg-soot/95 text-bone backdrop-blur-md">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-acid/80 to-transparent" />

      <div className="relative">
        <div className="mx-auto flex h-[4.5rem] max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
          <BrandMark onClick={() => setOpen(false)} />
          <DesktopNav pathname={pathname} />

          <div className="flex items-center gap-3">
            {authed ? (
              <>
                <span className="hidden max-w-[10rem] truncate font-mono text-[10px] uppercase tracking-[0.12em] text-bone/50 sm:inline">
                  {profile?.email || 'Signed in'}
                </span>
                <button
                  type="button"
                  onClick={() => void beginLogout()}
                  className="hidden border border-bone/20 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/80 transition-colors hover:border-bone/40 hover:text-bone sm:inline-flex"
                >
                  Sign out
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => beginLogin(pathname || ROUTES.home)}
                className="hidden border border-bone/20 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/80 transition-colors hover:border-acid hover:text-acid sm:inline-flex"
              >
                Sign in
              </button>
            )}

            <Link
              href={ROUTES.generate}
              className="hidden items-center gap-2 border border-acid bg-acid px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-soot transition-colors hover:bg-transparent hover:text-acid sm:inline-flex"
            >
              Start
              <span className="h-1.5 w-1.5 bg-soot" aria-hidden />
            </Link>

            <HamburgerButton open={open} onToggle={() => setOpen((v) => !v)} />
          </div>
        </div>
        <NavigationProgress />
      </div>

      <MobileNav
        open={open}
        pathname={pathname}
        authed={authed}
        onClose={() => setOpen(false)}
      />
    </header>
  );
}
