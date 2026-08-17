import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

export function SavedCodesHeader() {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-4xl font-bold tracking-[-0.03em] text-soot">
          Your codes
        </h1>
        <p className="mt-2 text-steel">
          Only codes you chose to save show up here.
        </p>
      </div>
      <Link
        href={ROUTES.generate}
        className="border border-acid bg-acid px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-soot"
      >
        Generate new
      </Link>
    </div>
  );
}
