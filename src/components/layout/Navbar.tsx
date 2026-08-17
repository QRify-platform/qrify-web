'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useSession } from '@/hooks/useSession';
import { BrandMark } from './BrandMark';
import { DesktopNav } from './DesktopNav';
import { MenuButton } from './MenuButton';
import { MobileNav } from './MobileNav';
import { NavigationProgress } from './NavigationProgress';
import { SessionActions } from './SessionActions';

const MOBILE_NAV_ID = 'mobile-nav';

export function Navbar() {
  const pathname = usePathname();
  const { authed, email } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  useLockBodyScroll(menuOpen);
  useEffect(() => setMenuOpen(false), [pathname]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-bone/10 bg-soot/95 text-bone backdrop-blur-md">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-acid/80 to-transparent" />

      <div className="relative">
        <div className="mx-auto flex h-[4.5rem] max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
          <BrandMark onNavigate={closeMenu} />
          <DesktopNav pathname={pathname} />

          <div className="flex items-center gap-3">
            <SessionActions
              authed={authed}
              email={email}
              pathname={pathname}
            />
            <MenuButton
              open={menuOpen}
              controls={MOBILE_NAV_ID}
              onToggle={() => setMenuOpen((prev) => !prev)}
            />
          </div>
        </div>
        <NavigationProgress />
      </div>

      <MobileNav
        id={MOBILE_NAV_ID}
        open={menuOpen}
        authed={authed}
        pathname={pathname}
        onClose={closeMenu}
      />
    </header>
  );
}
