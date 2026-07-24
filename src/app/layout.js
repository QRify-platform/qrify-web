'use client';

import './globals.css';
import { Unbounded, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const display = Unbounded({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
});

const body = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const authChrome =
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname?.startsWith('/auth/');

  useEffect(() => {
    fetch('/api/increment-page-load', { method: 'POST' });
  }, [pathname]);

  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="font-sans antialiased">
        {authChrome ? null : <Navbar />}
        {children}
        {authChrome ? null : <Footer />}
      </body>
    </html>
  );
}
