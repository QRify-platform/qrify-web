import type { ReactNode } from 'react';

type SubmitButtonProps = {
  busy: boolean;
  busyLabel: string;
  children: ReactNode;
};

/** Full-width submit used by the auth forms. */
export function SubmitButton({
  busy,
  busyLabel,
  children,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={busy}
      className="w-full rounded-sm bg-acid px-4 py-3 text-sm font-semibold text-soot transition hover:brightness-110 disabled:opacity-60"
    >
      {busy ? busyLabel : children}
    </button>
  );
}
