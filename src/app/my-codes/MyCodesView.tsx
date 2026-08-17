'use client';

import Link from 'next/link';
import { PageLoader } from '@/components/ui/PageLoader';
import { ROUTES } from '@/lib/routes';
import { CodeCard } from './CodeCard';
import { SignedOutState } from './SignedOutState';
import { useMyCodes } from './useMyCodes';

export function MyCodesView() {
  const { ready, authed, items, error, loading, deletingId, handleDelete } =
    useMyCodes();

  if (!ready) {
    return <PageLoader />;
  }

  if (!authed) {
    return <SignedOutState />;
  }

  return (
    <main className="min-h-[calc(100svh-4.25rem)] bg-bone px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[900px]">
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

        {loading && (
          <p className="mt-10 font-mono text-sm text-steel">Loading…</p>
        )}
        {error && (
          <p className="mt-10 border border-soot/20 bg-bone px-4 py-3 font-mono text-sm text-soot">
            {error}
          </p>
        )}
        {!loading && !error && items.length === 0 && (
          <p className="mt-10 font-mono text-sm text-steel">
            No saved codes yet. Generate one, then tap Save to My codes.
          </p>
        )}

        <ul className="mt-10 space-y-4">
          {items.map((item) => (
            <CodeCard
              key={item.id}
              item={item}
              deleting={deletingId === item.id}
              onDelete={(id) => void handleDelete(id)}
            />
          ))}
        </ul>
      </div>
    </main>
  );
}
