'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, type FormEvent } from 'react';
import { ROUTES } from '@/constants/routes';
import {
  beginGoogleLogin,
  confirmSignUp,
  resendConfirmationCode,
  signInWithPassword,
  signUpWithPassword,
} from '@/lib/auth';
import { getErrorMessage } from '@/lib/utils/errors';

export type SignupStep = 'register' | 'verify';

export function useSignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState<SignupStep>('register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [busy, setBusy] = useState(false);

  /** Login sends unverified accounts straight here with ?verify=1. */
  useEffect(() => {
    const preset = searchParams.get('email');
    if (preset) setEmail(preset);
    if (searchParams.get('verify') === '1') setStep('verify');
  }, [searchParams]);

  const register = async (e: FormEvent<HTMLFormElement>) => {
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
  };

  const verify = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await confirmSignUp(email, code);
      // We only hold the password when the user just registered in this tab.
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
  };

  const resendCode = async () => {
    setError('');
    setInfo('');
    try {
      await resendConfirmationCode(email);
      setInfo('Code resent.');
    } catch (err) {
      setError(getErrorMessage(err, 'Could not resend code.'));
    }
  };

  const signUpWithGoogle = async () => {
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
    step,
    email,
    password,
    code,
    error,
    info,
    busy,
    setEmail,
    setPassword,
    setCode,
    register,
    verify,
    resendCode,
    signUpWithGoogle,
  };
}
