import type { Metadata } from 'next';
import { IBM_Plex_Mono, IBM_Plex_Sans, Unbounded } from 'next/font/google';
import type { ReactNode } from 'react';
import { AppChrome } from '@/components/layout/AppChrome';
import './globals.css';

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

export const metadata: Metadata = {
  title: {
    default: 'QRify',
    template: '%s · QRify',
  },
  description:
    'Generate downloadable QR codes for links, Wi‑Fi, contacts, calls, and messages.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="font-sans antialiased">
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
