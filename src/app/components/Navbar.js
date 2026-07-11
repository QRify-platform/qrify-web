'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const links = [
  { href: '/#how', label: 'How it works' },
  { href: '/#uses', label: 'Use cases' },
  { href: '/generate', label: 'Generate' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const onGenerate = pathname === '/generate';

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-bone/10 bg-soot/95 text-bone backdrop-blur-md">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-acid/80 to-transparent" />

      <div className="mx-auto flex h-[4.5rem] max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="group flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="relative flex h-8 w-8 items-center justify-center border border-acid/40 bg-slate">
            <span className="h-2.5 w-2.5 bg-acid transition-transform duration-200 group-hover:scale-125" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            QRify
          </span>
        </Link>

        <nav className="hidden items-center md:flex">
          <div className="flex items-center rounded-sm border border-bone/10 bg-slate/80 p-1">
            {links.map((link, i) => {
              const active = link.href === '/generate' && onGenerate;
              return (
                <div key={link.href} className="flex items-center">
                  {i > 0 && (
                    <span className="h-3 w-px bg-bone/10" aria-hidden />
                  )}
                  <Link
                    href={link.href}
                    className={`relative px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                      active
                        ? 'bg-acid/10 text-acid'
                        : 'text-bone/55 hover:bg-bone/5 hover:text-bone'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute inset-x-3 bottom-1 h-px bg-acid" />
                    )}
                  </Link>
                </div>
              );
            })}
          </div>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/generate"
            className="hidden items-center gap-2 border border-acid bg-acid px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-soot transition-colors hover:bg-transparent hover:text-acid sm:inline-flex"
          >
            Start
            <span className="h-1.5 w-1.5 bg-soot" aria-hidden />
          </Link>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center border border-bone/15 text-bone md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
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
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`border-t border-bone/10 bg-soot md:hidden ${
          open ? 'block' : 'hidden'
        }`}
      >
        <nav className="mx-auto flex max-w-[1400px] flex-col gap-1 px-5 py-5 sm:px-8">
          {links.map((link) => {
            const active = link.href === '/generate' && onGenerate;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
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
          <Link
            href="/generate"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-2 bg-acid px-4 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-soot"
          >
            Start generating
            <span className="h-1.5 w-1.5 bg-soot" aria-hidden />
          </Link>
        </nav>
      </div>
    </header>
  );
}
