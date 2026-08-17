'use client';

import { usePathname } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { isAuthChromePath } from '@/lib/utils/paths';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

type AppChromeProps = {
  children: ReactNode;
};

/** Wraps every page in the navbar and footer, except the auth screens. */
export function AppChrome({ children }: AppChromeProps) {
  const pathname = usePathname();
  const bare = isAuthChromePath(pathname);

  useEffect(() => {
    void fetch('/api/increment-page-load', { method: 'POST' });
  }, [pathname]);

  return (
    <>
      {!bare && <Navbar />}
      {children}
      {!bare && <Footer />}
    </>
  );
}
