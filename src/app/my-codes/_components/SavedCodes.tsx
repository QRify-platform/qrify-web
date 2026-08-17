'use client';

import { PageLoader } from '@/components/ui/PageLoader';
import { useSavedCodes } from '@/hooks/useSavedCodes';
import { SavedCodeCard } from './SavedCodeCard';
import { SavedCodesHeader } from './SavedCodesHeader';
import { SignedOutNotice } from './SignedOutNotice';

export function SavedCodes() {
  const { ready, authed, codes, loading, error, deletingId, remove } =
    useSavedCodes();

  if (!ready) return <PageLoader />;
  if (!authed) return <SignedOutNotice />;

  const empty = !loading && !error && codes.length === 0;

  return (
    <main className="min-h-[calc(100svh-4.25rem)] bg-bone px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[900px]">
        <SavedCodesHeader />

        {loading && (
          <p className="mt-10 font-mono text-sm text-steel">Loading…</p>
        )}
        {error && (
          <p className="mt-10 border border-soot/20 bg-bone px-4 py-3 font-mono text-sm text-soot">
            {error}
          </p>
        )}
        {empty && (
          <p className="mt-10 font-mono text-sm text-steel">
            No saved codes yet. Generate one, then tap Save to My codes.
          </p>
        )}

        <ul className="mt-10 space-y-4">
          {codes.map((code) => (
            <SavedCodeCard
              key={code.id}
              code={code}
              deleting={deletingId === code.id}
              onDelete={() => void remove(code.id)}
            />
          ))}
        </ul>
      </div>
    </main>
  );
}
