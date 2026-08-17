import { beginLogin } from '@/lib/auth';
import { ROUTES } from '@/lib/routes';

export function SignedOutState() {
  return (
    <main className="flex min-h-[calc(100svh-4.25rem)] items-center justify-center bg-bone px-5">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl font-bold text-soot">Your codes</h1>
        <p className="mt-4 text-steel">
          Sign in to see QR codes you saved to your account.
        </p>
        <button
          type="button"
          onClick={() => beginLogin(ROUTES.myCodes)}
          className="mt-8 inline-flex border border-acid bg-acid px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-soot"
        >
          Sign in
        </button>
      </div>
    </main>
  );
}
