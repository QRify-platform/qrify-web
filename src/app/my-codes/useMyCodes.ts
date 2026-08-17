'use client';

import { useEffect, useState } from 'react';
import { deleteQrCode, listMyQrCodes, type SavedQrCode } from '@/lib/api';
import { getHttpStatus, messageForQrError } from '@/lib/api/errors';
import { isLoggedIn } from '@/lib/auth';

export function useMyCodes() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [items, setItems] = useState<SavedQrCode[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState('');

  useEffect(() => {
    setAuthed(isLoggedIn());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || !authed) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const data = await listMyQrCodes();
        if (!cancelled) setItems(data);
      } catch (err) {
        console.error(err);
        if (!cancelled) setError(messageForQrError(err, 'list'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [ready, authed]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this saved code?')) return;

    setDeletingId(id);
    setError('');
    try {
      await deleteQrCode(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
      setError(messageForQrError(err, 'delete'));
      if (getHttpStatus(err) === 401) setAuthed(false);
    } finally {
      setDeletingId('');
    }
  };

  return {
    ready,
    authed,
    items,
    error,
    loading,
    deletingId,
    handleDelete,
  };
}
