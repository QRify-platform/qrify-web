'use client';

import { ROUTES } from '@/constants/routes';
import { useSignupForm } from '@/hooks/useSignupForm';
import { AuthHeading } from '@/components/auth/AuthHeading';
import { AuthSwitchLink } from '@/components/auth/AuthSwitchLink';
import { RegisterStep } from './RegisterStep';
import { VerifyStep } from './VerifyStep';

export function SignupForm() {
  const form = useSignupForm();
  const verifying = form.step === 'verify';

  return (
    <div className="mx-auto w-full max-w-md">
      <AuthHeading
        title={verifying ? 'Confirm email' : 'Create account'}
        subtitle={
          verifying
            ? `Enter the code we sent to ${form.email || 'your inbox'}.`
            : 'Save codes to your account and sync across devices.'
        }
      />

      {verifying ? (
        <VerifyStep
          code={form.code}
          busy={form.busy}
          error={form.error}
          info={form.info}
          onCodeChange={form.setCode}
          onSubmit={form.verify}
          onResend={() => void form.resendCode()}
        />
      ) : (
        <RegisterStep
          email={form.email}
          password={form.password}
          busy={form.busy}
          error={form.error}
          onEmailChange={form.setEmail}
          onPasswordChange={form.setPassword}
          onGoogle={() => void form.signUpWithGoogle()}
          onSubmit={form.register}
        />
      )}

      <AuthSwitchLink
        prompt="Already have an account?"
        href={ROUTES.login}
        label="Sign in"
      />
    </div>
  );
}
