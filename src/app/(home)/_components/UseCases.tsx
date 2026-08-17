import Link from 'next/link';
import { USE_CASES } from '@/constants/home';
import { ROUTES } from '@/constants/routes';
import { UseCaseCard } from './UseCaseCard';

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
          {USE_CASES.map((useCase) => (
            <UseCaseCard key={useCase.title} {...useCase} />
          ))}
        </div>
      </div>
    </section>
  );
}
