'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { completeLogin } from '@/lib/auth';
import { getErrorMessage } from '@/lib/errors';
import { ROUTES } from '@/lib/routes';

export function AuthCallback() {
  const params = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState('');

  useEffect(() => {
    const code = params.get('code');
    const state = params.get('state');
    const oauthError = params.get('error');

    if (oauthError) {
      setError(params.get('error_description') || oauthError);
      return;
    }
    if (!code || !state) {
      setError('Missing authorization code');
      return;
    }

    completeLogin(code, state)
      .then(() => router.replace(ROUTES.generate))
      .catch((err: unknown) => {
        console.error(err);
        setError(getErrorMessage(err, 'Login failed'));
      });
  }, [params, router]);

  return (
    <main className="flex min-h-[calc(100svh-4.25rem)] items-center justify-center bg-bone px-5">
      <div className="max-w-md text-center">
        {error ? (
          <>
            <h1 className="font-display text-2xl font-bold text-soot">
              Sign-in failed
            </h1>
            <p className="mt-3 font-mono text-sm text-steel">{error}</p>
            <a
              href={ROUTES.home}
              className="mt-8 inline-flex border border-soot bg-soot px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-bone"
            >
              Back home
            </a>
          </>
        ) : (
          <>
            <h1 className="font-display text-2xl font-bold text-soot">
              Signing you in…
            </h1>
            <p className="mt-3 font-mono text-sm text-steel">
              Finishing Cognito login
            </p>
          </>
        )}
      </div>
    </main>
  );
}
