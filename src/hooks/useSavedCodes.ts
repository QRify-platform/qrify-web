'use client';

import { useEffect, useState } from 'react';
import {
  deleteQrCode,
  isUnauthorized,
  listMyQrCodes,
  messageForQrError,
} from '@/lib/api';
import type { SavedQrCode } from '@/types';
import { useSession } from './useSession';

/** Loads the signed-in user's saved codes and handles deletes. */
export function useSavedCodes() {
  const { ready, authed, markSignedOut } = useSession();
  const [codes, setCodes] = useState<SavedQrCode[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState('');

  useEffect(() => {
    if (!ready || !authed) return;

    let cancelled = false;
    setLoading(true);
    setError('');

    listMyQrCodes()
      .then((data) => {
        if (!cancelled) setCodes(data);
      })
      .catch((err: unknown) => {
        console.error('Loading saved codes failed:', err);
        if (!cancelled) setError(messageForQrError(err, 'list'));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [ready, authed]);

  const remove = async (id: string) => {
    if (!window.confirm('Delete this saved code?')) return;

    setDeletingId(id);
    setError('');
    try {
      await deleteQrCode(id);
      setCodes((prev) => prev.filter((code) => code.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
      setError(messageForQrError(err, 'delete'));
      if (isUnauthorized(err)) markSignedOut();
    } finally {
      setDeletingId('');
    }
  };

  return { ready, authed, codes, loading, error, deletingId, remove };
}
