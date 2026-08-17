import Link from 'next/link';
import { ROUTES } from '@/lib/routes';
import { USE_CASES, type UseCaseTone } from './content';

const panelClass: Record<UseCaseTone, string> = {
  dark: 'bg-soot text-bone border-soot',
  neon: 'bg-acid text-soot border-acid',
  light: 'bg-chalk text-soot border-transparent',
};

const bodyClass: Record<UseCaseTone, string> = {
  dark: 'text-bone/55',
  neon: 'text-soot/75',
  light: 'text-steel',
};

export function UseCases() {
  return (
    <section id="uses" className="scroll-mt-24 border-b border-soot/10">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-steel">
              Use cases
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] text-soot sm:text-5xl">
              Where these codes land
            </h2>
          </div>
          <Link
            href={ROUTES.generate}
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-steel transition-colors hover:text-soot"
          >
            Try it →
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {USE_CASES.map((item) => (
            <article
              key={item.title}
              className={`min-h-[14rem] border p-8 sm:min-h-[16rem] sm:p-10 ${panelClass[item.tone]}`}
            >
              <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                {item.title}
              </h3>
              <p
                className={`mt-4 max-w-sm text-base leading-relaxed ${bodyClass[item.tone]}`}
              >
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
