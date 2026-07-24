'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { beginGoogleLogin, signInWithPassword } from '../lib/cognito';

function safeNext(raw) {
  if (!raw || !raw.startsWith('/') || raw.startsWith('//')) return '/generate';
  return raw;
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = safeNext(searchParams.get('next'));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await signInWithPassword(email, password);
      router.replace(next);
    } catch (err) {
      const code = err?.code || '';
      if (code === 'UserNotConfirmedException') {
        router.push(`/signup?email=${encodeURIComponent(email)}&verify=1`);
        return;
      }
      setError(err?.message || 'Could not sign in.');
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
      setError(err?.message || 'Google sign-in failed.');
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <p className="font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-[0.22em] text-acid">
        QRify
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-bone sm:text-4xl">
        Sign in
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-bone/55">
        Pick up where you left off — generate and manage your codes.
      </p>

      <button
        type="button"
        onClick={onGoogle}
        disabled={busy}
        className="mt-8 flex w-full items-center justify-center gap-3 rounded-sm border border-bone/15 bg-bone px-4 py-3 text-sm font-semibold text-soot transition hover:bg-chalk disabled:opacity-60"
      >
        <GoogleMark />
        Continue with Google
      </button>

      <div className="my-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-bone/12" />
        <span className="text-xs uppercase tracking-[0.18em] text-bone/40">or</span>
        <div className="h-px flex-1 bg-bone/12" />
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-bone/45">
            Email
          </span>
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-sm border border-bone/15 bg-soot/60 px-3 py-3 text-sm text-bone outline-none ring-acid/0 transition placeholder:text-bone/30 focus:border-acid/50 focus:ring-2 focus:ring-acid/25"
            placeholder="you@company.com"
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-bone/45">
            Password
          </span>
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-sm border border-bone/15 bg-soot/60 px-3 py-3 text-sm text-bone outline-none transition placeholder:text-bone/30 focus:border-acid/50 focus:ring-2 focus:ring-acid/25"
            placeholder="••••••••"
          />
        </label>

        {error ? (
          <p className="text-sm text-red-300" role="alert">
            {error}
          </p>
        ) : null}

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
        <Link href="/signup" className="font-medium text-acid hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3.1l5.7-5.7C34.2 6.5 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.5-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3.1l5.7-5.7C34.2 6.5 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.3 35.3 26.8 36 24 36c-5.3 0-9.7-3.4-11.3-8.1l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.5l.0.0 6.3 5.3C41.3 36.4 44 30.7 44 24c0-1.3-.1-2.5-.4-3.5z"
      />
    </svg>
  );
}

export default function LoginPage() {
  return (
    <main className="relative min-h-[calc(100vh-0px)] overflow-hidden bg-soot text-bone">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-[28rem] w-[28rem] rounded-full bg-acid/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[22rem] w-[22rem] rounded-full bg-bone/5 blur-3xl" />
        <div className="grain opacity-40" />
      </div>
      <div className="relative mx-auto flex min-h-screen max-w-[1400px] items-center px-5 py-16 sm:px-8 lg:px-12">
        <Suspense fallback={<p className="text-bone/50">Loading…</p>}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
