'use client';

import { Alert } from '@/components/ui/Alert';
import { Divider } from '@/components/ui/Divider';
import { SubmitButton } from '@/components/ui/SubmitButton';
import { TextField } from '@/components/ui/TextField';
import { ROUTES } from '@/constants/routes';
import { useLoginForm } from '@/hooks/useLoginForm';
import { AuthHeading } from '@/components/auth/AuthHeading';
import { AuthSwitchLink } from '@/components/auth/AuthSwitchLink';
import { GoogleButton } from '@/components/auth/GoogleButton';

export function LoginForm() {
  const form = useLoginForm();

  return (
    <div className="mx-auto w-full max-w-md">
      <AuthHeading
        title="Sign in"
        subtitle="Pick up where you left off — generate and manage your codes."
      />

      <GoogleButton
        busy={form.busy}
        onClick={() => void form.signInWithGoogle()}
      />
      <Divider />

      <form onSubmit={form.submit} className="space-y-4">
        <TextField
          id="email"
          label="Email"
          tone="dark"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={form.email}
          onChange={(e) => form.setEmail(e.target.value)}
          required
        />
        <TextField
          id="password"
          label="Password"
          tone="dark"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={form.password}
          onChange={(e) => form.setPassword(e.target.value)}
          required
        />

        {form.error && <Alert tone="dark">{form.error}</Alert>}

        <SubmitButton busy={form.busy} busyLabel="Signing in…">
          Sign in
        </SubmitButton>
      </form>

      <AuthSwitchLink
        prompt="Need an account?"
        href={ROUTES.signup}
        label="Sign up"
      />
    </div>
  );
}
