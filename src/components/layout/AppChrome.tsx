'use client';

import { useEffect, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { isAuthChromePath } from '@/lib/routes';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

type AppChromeProps = {
  children: ReactNode;
};

export function AppChrome({ children }: AppChromeProps) {
  const pathname = usePathname();
  const authChrome = isAuthChromePath(pathname);

  useEffect(() => {
    void fetch('/api/increment-page-load', { method: 'POST' });
  }, [pathname]);

  return (
    <>
      {authChrome ? null : <Navbar />}
      {children}
      {authChrome ? null : <Footer />}
    </>
  );
}
