'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import {
  beginGoogleLogin,
  confirmSignUp,
  resendConfirmationCode,
  signInWithPassword,
  signUpWithPassword,
} from '../lib/cognito';

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState('register'); // register | verify
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [info, setInfo] = useState('');

  useEffect(() => {
    const preset = searchParams.get('email');
    if (preset) setEmail(preset);
    if (searchParams.get('verify') === '1') setStep('verify');
  }, [searchParams]);

  async function onRegister(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await signUpWithPassword(email, password);
      setStep('verify');
      setInfo('Check your email for a confirmation code.');
    } catch (err) {
      setError(err?.message || 'Could not create account.');
    } finally {
      setBusy(false);
    }
  }

  async function onVerify(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await confirmSignUp(email, code);
      if (password) {
        await signInWithPassword(email, password);
        router.replace('/generate');
        return;
      }
      router.replace('/login');
    } catch (err) {
      setError(err?.message || 'Invalid confirmation code.');
    } finally {
      setBusy(false);
    }
  }

  async function onResend() {
    setError('');
    setInfo('');
    try {
      await resendConfirmationCode(email);
      setInfo('Code resent.');
    } catch (err) {
      setError(err?.message || 'Could not resend code.');
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
        {step === 'verify' ? 'Confirm email' : 'Create account'}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-bone/55">
        {step === 'verify'
          ? `Enter the code we sent to ${email || 'your inbox'}.`
          : 'Save codes to your account and sync across devices.'}
      </p>

      {step === 'register' ? (
        <>
          <button
            type="button"
            onClick={onGoogle}
            disabled={busy}
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-sm border border-bone/15 bg-bone px-4 py-3 text-sm font-semibold text-soot transition hover:bg-chalk disabled:opacity-60"
          >
            Continue with Google
          </button>
          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-bone/12" />
            <span className="text-xs uppercase tracking-[0.18em] text-bone/40">or</span>
            <div className="h-px flex-1 bg-bone/12" />
          </div>
          <form onSubmit={onRegister} className="space-y-4">
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
                className="mt-2 w-full rounded-sm border border-bone/15 bg-soot/60 px-3 py-3 text-sm text-bone outline-none transition placeholder:text-bone/30 focus:border-acid/50 focus:ring-2 focus:ring-acid/25"
                placeholder="you@company.com"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-bone/45">
                Password
              </span>
              <input
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-sm border border-bone/15 bg-soot/60 px-3 py-3 text-sm text-bone outline-none transition placeholder:text-bone/30 focus:border-acid/50 focus:ring-2 focus:ring-acid/25"
                placeholder="At least 8 characters"
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
              {busy ? 'Creating…' : 'Create account'}
            </button>
          </form>
        </>
      ) : (
        <form onSubmit={onVerify} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-bone/45">
              Confirmation code
            </span>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mt-2 w-full rounded-sm border border-bone/15 bg-soot/60 px-3 py-3 text-sm tracking-[0.2em] text-bone outline-none transition focus:border-acid/50 focus:ring-2 focus:ring-acid/25"
              placeholder="123456"
            />
          </label>
          {info ? <p className="text-sm text-acid/90">{info}</p> : null}
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
            {busy ? 'Confirming…' : 'Confirm & continue'}
          </button>
          <button
            type="button"
            onClick={onResend}
            className="w-full text-sm text-bone/50 underline-offset-2 hover:text-bone hover:underline"
          >
            Resend code
          </button>
        </form>
      )}

      <p className="mt-8 text-center text-sm text-bone/50">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-acid hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default function SignupPage() {
  return (
    <main className="relative min-h-[calc(100vh-0px)] overflow-hidden bg-soot text-bone">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-[28rem] w-[28rem] rounded-full bg-acid/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[22rem] w-[22rem] rounded-full bg-bone/5 blur-3xl" />
        <div className="grain opacity-40" />
      </div>
      <div className="relative mx-auto flex min-h-screen max-w-[1400px] items-center px-5 py-16 sm:px-8 lg:px-12">
        <Suspense fallback={<p className="text-bone/50">Loading…</p>}>
          <SignupForm />
        </Suspense>
      </div>
    </main>
  );
}
