'use client';

import { ROUTES } from '@/constants/routes';
import { useOauthCallback } from '@/hooks/useOauthCallback';

export function OauthCallback() {
  const { error } = useOauthCallback();

  return (
    <main className="flex min-h-[calc(100svh-4.25rem)] items-center justify-center bg-bone px-5">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl font-bold text-soot">
          {error ? 'Sign-in failed' : 'Signing you in…'}
        </h1>
        <p className="mt-3 font-mono text-sm text-steel">
          {error || 'Finishing Cognito login'}
        </p>
        {error && (
          <a
            href={ROUTES.home}
            className="mt-8 inline-flex border border-soot bg-soot px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-bone"
          >
            Back home
          </a>
        )}
      </div>
    </main>
  );
}
