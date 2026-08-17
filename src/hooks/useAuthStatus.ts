'use client';

import { useEffect, useState } from 'react';
import { getProfile, isLoggedIn, type AuthProfile } from '@/lib/auth';

export function useAuthStatus(refreshKey?: string | null) {
  const [authed, setAuthed] = useState(false);
  const [profile, setProfile] = useState<AuthProfile | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setAuthed(isLoggedIn());
    setProfile(getProfile());
    setReady(true);
  }, [refreshKey]);

  return { authed, profile, ready, setAuthed };
}
