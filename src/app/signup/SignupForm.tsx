'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, type FormEvent } from 'react';
import { Alert, Divider, Field } from '@/components/ui/Field';
import { Input } from '@/components/ui/Input';
import {
  beginGoogleLogin,
  confirmSignUp,
  resendConfirmationCode,
  signInWithPassword,
  signUpWithPassword,
} from '@/lib/auth';
import { getErrorMessage } from '@/lib/errors';
import { ROUTES } from '@/lib/routes';
import { AuthHeading, GoogleButton } from '@/components/auth/AuthHeading';

type SignupStep = 'register' | 'verify';

export function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<SignupStep>('register');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [info, setInfo] = useState('');

  useEffect(() => {
    const preset = searchParams.get('email');
    if (preset) setEmail(preset);
    if (searchParams.get('verify') === '1') setStep('verify');
  }, [searchParams]);

  async function onRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await signUpWithPassword(email, password);
      setStep('verify');
      setInfo('Check your email for a confirmation code.');
    } catch (err) {
      setError(getErrorMessage(err, 'Could not create account.'));
    } finally {
      setBusy(false);
    }
  }

  async function onVerify(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await confirmSignUp(email, code);
      if (password) {
        await signInWithPassword(email, password);
        router.replace(ROUTES.generate);
        return;
      }
      router.replace(ROUTES.login);
    } catch (err) {
      setError(getErrorMessage(err, 'Invalid confirmation code.'));
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
      setError(getErrorMessage(err, 'Could not resend code.'));
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
        title={step === 'verify' ? 'Confirm email' : 'Create account'}
        subtitle={
          step === 'verify'
            ? `Enter the code we sent to ${email || 'your inbox'}.`
            : 'Save codes to your account and sync across devices.'
        }
      />

      {step === 'register' ? (
        <RegisterStep
          email={email}
          password={password}
          busy={busy}
          error={error}
          onEmail={setEmail}
          onPassword={setPassword}
          onGoogle={() => void onGoogle()}
          onSubmit={onRegister}
        />
      ) : (
        <VerifyStep
          code={code}
          busy={busy}
          error={error}
          info={info}
          onCode={setCode}
          onSubmit={onVerify}
          onResend={() => void onResend()}
        />
      )}

      <p className="mt-8 text-center text-sm text-bone/50">
        Already have an account?{' '}
        <Link href={ROUTES.login} className="font-medium text-acid hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}

type RegisterStepProps = {
  email: string;
  password: string;
  busy: boolean;
  error: string;
  onEmail: (value: string) => void;
  onPassword: (value: string) => void;
  onGoogle: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

function RegisterStep({
  email,
  password,
  busy,
  error,
  onEmail,
  onPassword,
  onGoogle,
  onSubmit,
}: RegisterStepProps) {
  return (
    <>
      <GoogleButton busy={busy} onClick={onGoogle} />
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
            onChange={(e) => onEmail(e.target.value)}
            placeholder="you@company.com"
          />
        </Field>
        <Field id="password" label="Password" tone="dark">
          <Input
            id="password"
            tone="dark"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(e) => onPassword(e.target.value)}
            placeholder="At least 8 characters"
          />
        </Field>
        {error ? <Alert tone="dark">{error}</Alert> : null}
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-sm bg-acid px-4 py-3 text-sm font-semibold text-soot transition hover:brightness-110 disabled:opacity-60"
        >
          {busy ? 'Creating…' : 'Create account'}
        </button>
      </form>
    </>
  );
}

type VerifyStepProps = {
  code: string;
  busy: boolean;
  error: string;
  info: string;
  onCode: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onResend: () => void;
};

function VerifyStep({
  code,
  busy,
  error,
  info,
  onCode,
  onSubmit,
  onResend,
}: VerifyStepProps) {
  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-4">
      <Field id="code" label="Confirmation code" tone="dark">
        <Input
          id="code"
          tone="dark"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          required
          value={code}
          onChange={(e) => onCode(e.target.value)}
          placeholder="123456"
          className="tracking-[0.2em]"
        />
      </Field>
      {info ? <p className="text-sm text-acid/90">{info}</p> : null}
      {error ? <Alert tone="dark">{error}</Alert> : null}
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
  );
}
