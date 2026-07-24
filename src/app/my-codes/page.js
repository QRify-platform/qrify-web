'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { beginLogin, isLoggedIn } from '../lib/cognito';
import { deleteQrCode, listMyQrCodes } from '../lib/api';

export default function MyCodesPage() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [items, setItems] = useState([]);
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
        if (!cancelled) {
          setError('Could not load your codes. Try signing in again.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [ready, authed]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this saved code?')) return;

    setDeletingId(id);
    setError('');
    try {
      await deleteQrCode(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        setError('Session expired. Sign in again.');
        setAuthed(false);
      } else if (err.response?.status === 403) {
        setError('You can only delete your own codes.');
      } else if (err.response?.status === 429) {
        setError('Too many requests — wait a moment and try again.');
      } else {
        setError('Could not delete that code. Try again.');
      }
    } finally {
      setDeletingId('');
    }
  };

  if (!ready) {
    return (
      <main className="flex min-h-[calc(100svh-4.25rem)] items-center justify-center bg-bone">
        <p className="font-mono text-sm text-steel">Loading…</p>
      </main>
    );
  }

  if (!authed) {
    return (
      <main className="flex min-h-[calc(100svh-4.25rem)] items-center justify-center bg-bone px-5">
        <div className="max-w-md text-center">
          <h1 className="font-display text-3xl font-bold text-soot">
            Your codes
          </h1>
          <p className="mt-4 text-steel">
            Sign in to see QR codes you saved to your account.
          </p>
          <button
            type="button"
            onClick={() => beginLogin('/my-codes')}
            className="mt-8 inline-flex border border-acid bg-acid px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-soot"
          >
            Sign in
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100svh-4.25rem)] bg-bone px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[900px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl font-bold tracking-[-0.03em] text-soot">
              Your codes
            </h1>
            <p className="mt-2 text-steel">
              Only codes you chose to save show up here.
            </p>
          </div>
          <Link
            href="/generate"
            className="border border-acid bg-acid px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-soot"
          >
            Generate new
          </Link>
        </div>

        {loading && (
          <p className="mt-10 font-mono text-sm text-steel">Loading…</p>
        )}
        {error && (
          <p className="mt-10 border border-soot/20 bg-bone px-4 py-3 font-mono text-sm text-soot">
            {error}
          </p>
        )}
        {!loading && !error && items.length === 0 && (
          <p className="mt-10 font-mono text-sm text-steel">
            No saved codes yet. Generate one, then tap Save to My codes.
          </p>
        )}

        <ul className="mt-10 space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-col gap-3 border border-soot/15 bg-bone p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="truncate font-mono text-xs text-steel">
                  {item.created_at}
                </p>
                <p className="mt-1 truncate text-sm text-soot">
                  {item.source_url}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <a
                  href={item.download_url || item.qr_code_url}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-soot/20 px-3 py-2 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-soot hover:border-acid hover:text-acid"
                >
                  Download
                </a>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  disabled={deletingId === item.id}
                  className="border border-soot/20 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-soot hover:border-red-700 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {deletingId === item.id ? 'Deleting…' : 'Delete'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
