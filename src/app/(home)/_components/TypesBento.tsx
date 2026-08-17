import Link from 'next/link';
import { QR_TYPES } from '@/constants/qrTypes';
import { ROUTES } from '@/constants/routes';
import { QrTypeCard } from './QrTypeCard';

export function TypesBento() {
  return (
    <section
      id="types"
      className="scroll-mt-24 border-b border-soot/10 bg-soot text-bone"
    >
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
          {QR_TYPES.map((type, index) => (
            <li
              key={type.id}
              className={index === 0 ? 'sm:col-span-2 lg:row-span-2' : ''}
            >
              <QrTypeCard type={type} featured={index === 0} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
