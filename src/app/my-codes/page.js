'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { beginLogin, getApiToken, isLoggedIn } from '../lib/cognito';

export default function MyCodesPage() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
        const baseUrl =
          process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
        const res = await axios.get(`${baseUrl}/qr-codes`, {
          headers: { Authorization: `Bearer ${getApiToken()}` },
        });
        if (!cancelled) setItems(res.data);
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
            Sign in to see QR codes saved to your account.
          </p>
          <button
            type="button"
            onClick={() => beginLogin()}
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
            <p className="mt-2 text-steel">Saved to your Cognito account.</p>
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
            No codes yet. Generate one to see it here.
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
              <a
                href={item.download_url || item.qr_code_url}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 border border-soot/20 px-3 py-2 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-soot hover:border-acid hover:text-acid"
              >
                Download
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
