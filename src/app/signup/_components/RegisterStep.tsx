import type { FormEvent } from 'react';
import { Alert } from '@/components/ui/Alert';
import { Divider } from '@/components/ui/Divider';
import { SubmitButton } from '@/components/ui/SubmitButton';
import { TextField } from '@/components/ui/TextField';
import { GoogleButton } from '@/components/auth/GoogleButton';

type RegisterStepProps = {
  email: string;
  password: string;
  busy: boolean;
  error: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onGoogle: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export function RegisterStep({
  email,
  password,
  busy,
  error,
  onEmailChange,
  onPasswordChange,
  onGoogle,
  onSubmit,
}: RegisterStepProps) {
  return (
    <>
      <GoogleButton busy={busy} onClick={onGoogle} />
      <Divider />

      <form onSubmit={onSubmit} className="space-y-4">
        <TextField
          id="email"
          label="Email"
          tone="dark"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          required
        />
        <TextField
          id="password"
          label="Password"
          tone="dark"
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          minLength={8}
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          required
        />

        {error && <Alert tone="dark">{error}</Alert>}

        <SubmitButton busy={busy} busyLabel="Creating…">
          Create account
        </SubmitButton>
      </form>
    </>
  );
}
