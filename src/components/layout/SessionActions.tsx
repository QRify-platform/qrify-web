'use client';

import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { beginLogin, beginLogout } from '@/lib/auth';

type SessionActionsProps = {
  authed: boolean;
  email?: string;
  pathname: string | null;
};

const BUTTON_CLASS =
  'hidden border border-bone/20 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/80 transition-colors sm:inline-flex';

export function SessionActions({
  authed,
  email,
  pathname,
}: SessionActionsProps) {
  return (
    <div className="flex items-center gap-3">
      {authed ? (
        <>
          <span className="hidden max-w-[10rem] truncate font-mono text-[10px] uppercase tracking-[0.12em] text-bone/50 sm:inline">
            {email || 'Signed in'}
          </span>
          <button
            type="button"
            onClick={() => void beginLogout()}
            className={`${BUTTON_CLASS} hover:border-bone/40 hover:text-bone`}
          >
            Sign out
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => beginLogin(pathname || ROUTES.home)}
          className={`${BUTTON_CLASS} hover:border-acid hover:text-acid`}
        >
          Sign in
        </button>
      )}

      <Link
        href={ROUTES.generate}
        className="hidden items-center gap-2 border border-acid bg-acid px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-soot transition-colors hover:bg-transparent hover:text-acid sm:inline-flex"
      >
        Start
        <span className="h-1.5 w-1.5 bg-soot" aria-hidden />
      </Link>
    </div>
  );
}
