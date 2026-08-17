import { GoogleMark } from '@/components/icons/GoogleMark';

type GoogleButtonProps = {
  busy: boolean;
  onClick: () => void;
};

export function GoogleButton({ busy, onClick }: GoogleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className="mt-8 flex w-full items-center justify-center gap-3 rounded-sm border border-bone/15 bg-bone px-4 py-3 text-sm font-semibold text-soot transition hover:bg-chalk disabled:opacity-60"
    >
      <GoogleMark />
      Continue with Google
    </button>
  );
}
