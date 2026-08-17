'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { getProfile, isLoggedIn } from '@/lib/auth';

type Session = {
  /** False until tokens have been read on the client, which avoids a hydration flash. */
  ready: boolean;
  authed: boolean;
  email?: string;
  /** Re-reads storage, e.g. after signing in from another tab. */
  refresh: () => void;
  /** Drops local auth state when the API rejects our token. */
  markSignedOut: () => void;
};

export function useSession(): Session {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState<string>();

  const refresh = useCallback(() => {
    setAuthed(isLoggedIn());
    setEmail(getProfile()?.email);
    setReady(true);
  }, []);

  useEffect(refresh, [refresh, pathname]);

  const markSignedOut = useCallback(() => {
    setAuthed(false);
    setEmail(undefined);
  }, []);

  return { ready, authed, email, refresh, markSignedOut };
}
