'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { ROUTES } from '@/constants/routes';
import { beginGoogleLogin, signInWithPassword } from '@/lib/auth';
import { getErrorCode, getErrorMessage } from '@/lib/utils/errors';
import { safeNextPath } from '@/lib/utils/paths';

export function useLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = safeNextPath(searchParams.get('next'));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await signInWithPassword(email, password);
      router.replace(next);
    } catch (err) {
      // An unverified account needs the code screen, not an error.
      if (getErrorCode(err) === 'UserNotConfirmedException') {
        router.push(
          `${ROUTES.signup}?email=${encodeURIComponent(email)}&verify=1`
        );
        return;
      }
      setError(getErrorMessage(err, 'Could not sign in.'));
    } finally {
      setBusy(false);
    }
  };

  const signInWithGoogle = async () => {
    setError('');
    setBusy(true);
    try {
      await beginGoogleLogin();
    } catch (err) {
      setError(getErrorMessage(err, 'Google sign-in failed.'));
      setBusy(false);
    }
  };

  return {
    email,
    password,
    error,
    busy,
    setEmail,
    setPassword,
    submit,
    signInWithGoogle,
  };
}
