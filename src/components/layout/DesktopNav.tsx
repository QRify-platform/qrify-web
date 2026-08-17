import Link from 'next/link';
import { NAV_LINKS, isNavLinkActive } from './nav-config';

type DesktopNavProps = {
  pathname: string | null;
};

export function DesktopNav({ pathname }: DesktopNavProps) {
  return (
    <nav className="hidden items-center md:flex">
      <div className="flex items-center rounded-sm border border-bone/10 bg-slate/80 p-1">
        {NAV_LINKS.map((link, i) => {
          const active = isNavLinkActive(link.href, pathname);
          return (
            <div key={link.href} className="flex items-center">
              {i > 0 && <span className="h-3 w-px bg-bone/10" aria-hidden />}
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
  );
}
