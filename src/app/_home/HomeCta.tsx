import Link from 'next/link';
import { ROUTES } from '@/lib/routes';

export function HomeCta() {
  return (
    <section className="relative overflow-hidden bg-soot text-bone">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(ellipse_at_right,_rgba(0,240,200,0.18),_transparent_60%)]"
      />
      <div className="relative mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-10 px-5 py-20 sm:px-8 lg:flex-row lg:items-center lg:px-12 lg:py-32">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-acid">
            Generator
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-[-0.03em] sm:text-6xl">
            Ready to make one?
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-bone/55">
            Open the generator, pick a type, download the PNG.
          </p>
        </div>
        <Link
          href={ROUTES.generate}
          className="inline-flex items-center gap-3 bg-acid px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-soot transition-colors hover:bg-bone"
        >
          Open generator
          <span className="h-2 w-2 bg-soot" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
