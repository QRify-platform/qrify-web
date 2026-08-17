import Link from 'next/link';
import { TYPE_ICONS } from '@/components/icons/TypeIcons';
import { QR_TYPES } from '@/lib/qr';
import { ROUTES, generatePath } from '@/lib/routes';

export function TypesBento() {
  return (
    <section id="types" className="scroll-mt-24 border-b border-soot/10 bg-soot text-bone">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-acid">
              Types
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] sm:text-5xl">
              What you can make
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-bone/55">
              Each type formats the payload so phones know what to open.
            </p>
          </div>
          <Link
            href={ROUTES.generate}
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-acid transition-opacity hover:opacity-70"
          >
            Open generator
            <span aria-hidden>→</span>
          </Link>
        </div>

        <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {QR_TYPES.map((item, i) => {
            const Icon = TYPE_ICONS[item.id];
            const featured = i === 0;
            return (
              <li
                key={item.id}
                className={featured ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''}
              >
                <Link
                  href={generatePath(item.id)}
                  className={`group flex h-full flex-col border border-bone/10 transition-colors hover:border-acid/60 hover:bg-slate ${
                    featured
                      ? 'bg-slate p-8 sm:min-h-[22rem] sm:p-10'
                      : 'bg-soot p-6 sm:p-7'
                  }`}
                >
                  <span
                    className={`flex items-center justify-center border border-acid/30 text-acid transition-colors group-hover:bg-acid group-hover:text-soot ${
                      featured ? 'h-14 w-14' : 'h-10 w-10'
                    }`}
                  >
                    <Icon className={featured ? 'h-6 w-6' : 'h-5 w-5'} />
                  </span>
                  <h3
                    className={`mt-6 font-display font-semibold ${
                      featured ? 'text-3xl sm:text-4xl' : 'text-lg'
                    }`}
                  >
                    {item.label}
                  </h3>
                  <p
                    className={`mt-3 leading-relaxed text-bone/50 ${
                      featured ? 'max-w-sm text-base' : 'text-sm'
                    }`}
                  >
                    {item.blurb}
                  </p>
                  {featured && (
                    <span className="mt-auto pt-10 font-mono text-[10px] uppercase tracking-[0.2em] text-acid">
                      Most common →
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
