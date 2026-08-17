'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ROUTES } from '@/constants/routes';
import { completeLogin } from '@/lib/auth';
import { getErrorMessage } from '@/lib/utils/errors';

/** Exchanges the Cognito redirect for tokens, then continues to the app. */
export function useOauthCallback(): { error: string } {
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
        console.error('OAuth callback failed:', err);
        setError(getErrorMessage(err, 'Login failed'));
      });
  }, [params, router]);

  return { error };
}
