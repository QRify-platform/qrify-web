'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { Alert, Divider, Field } from '@/components/ui/Field';
import { Input } from '@/components/ui/Input';
import { beginGoogleLogin, signInWithPassword } from '@/lib/auth';
import { getErrorCode, getErrorMessage } from '@/lib/errors';
import { ROUTES } from '@/lib/routes';
import { safeNextPath } from '@/lib/safe-next';
import { AuthHeading, GoogleButton } from '@/components/auth/AuthHeading';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = safeNextPath(searchParams.get('next'));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await signInWithPassword(email, password);
      router.replace(next);
    } catch (err) {
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
  }

  async function onGoogle() {
    setError('');
    setBusy(true);
    try {
      await beginGoogleLogin();
    } catch (err) {
      setError(getErrorMessage(err, 'Google sign-in failed.'));
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <AuthHeading
        title="Sign in"
        subtitle="Pick up where you left off — generate and manage your codes."
      />

      <GoogleButton busy={busy} onClick={() => void onGoogle()} />
      <Divider />

      <form onSubmit={onSubmit} className="space-y-4">
        <Field id="email" label="Email" tone="dark">
          <Input
            id="email"
            tone="dark"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
          />
        </Field>
        <Field id="password" label="Password" tone="dark">
          <Input
            id="password"
            tone="dark"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </Field>

        {error ? <Alert tone="dark">{error}</Alert> : null}

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-sm bg-acid px-4 py-3 text-sm font-semibold text-soot transition hover:brightness-110 disabled:opacity-60"
        >
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-bone/50">
        Need an account?{' '}
        <Link href={ROUTES.signup} className="font-medium text-acid hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
