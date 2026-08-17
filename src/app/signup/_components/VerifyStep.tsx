import type { FormEvent } from 'react';
import { Alert } from '@/components/ui/Alert';
import { SubmitButton } from '@/components/ui/SubmitButton';
import { TextField } from '@/components/ui/TextField';

type VerifyStepProps = {
  code: string;
  busy: boolean;
  error: string;
  info: string;
  onCodeChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onResend: () => void;
};

export function VerifyStep({
  code,
  busy,
  error,
  info,
  onCodeChange,
  onSubmit,
  onResend,
}: VerifyStepProps) {
  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-4">
      <TextField
        id="code"
        label="Confirmation code"
        tone="dark"
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        placeholder="123456"
        className="tracking-[0.2em]"
        value={code}
        onChange={(e) => onCodeChange(e.target.value)}
        required
      />

      {info && <p className="text-sm text-acid/90">{info}</p>}
      {error && <Alert tone="dark">{error}</Alert>}

      <SubmitButton busy={busy} busyLabel="Confirming…">
        Confirm &amp; continue
      </SubmitButton>

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
