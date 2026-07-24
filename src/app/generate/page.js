'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  QR_TYPES,
  buildQrPayload,
  isPayloadReady,
} from '../lib/qrPayload';
import { TYPE_ICONS } from '../components/TypeIcons';
import GeneratePreview from '../components/GeneratePreview';
import GenerateTypeFields from '../components/GenerateTypeFields';
import {
  beginLogin,
  isLoggedIn,
} from '../lib/cognito';
import { generateQrPreview, saveQrCode } from '../lib/api';
import {
  doneNavProgress,
  startNavProgress,
} from '../components/NavigationProgress';

function isValidType(id) {
  return QR_TYPES.some((item) => item.id === id);
}

function GenerateForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const requestedType = searchParams.get('type');

  const [type, setType] = useState(() =>
    requestedType && isValidType(requestedType) ? requestedType : 'link'
  );
  const [fields, setFields] = useState(() =>
    requestedType === 'wifi' ? { encryption: 'WPA' } : {}
  );
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [payload, setPayload] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    setAuthed(isLoggedIn());
  }, []);

  useEffect(() => {
    if (requestedType && isValidType(requestedType) && requestedType !== type) {
      setType(requestedType);
      setQrCodeUrl('');
      setPayload('');
      setSaved(false);
      setError('');
      setFields(requestedType === 'wifi' ? { encryption: 'WPA' } : {});
    }
  }, [requestedType, type]);

  const updateField = (key, value) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const selectType = (next) => {
    setType(next);
    setQrCodeUrl('');
    setPayload('');
    setSaved(false);
    setError('');
    setFields(next === 'wifi' ? { encryption: 'WPA' } : {});
    router.replace(`/generate?type=${next}`, { scroll: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaved(false);

    if (!isPayloadReady(type, fields)) {
      setError('Fill in the required fields, then try again.');
      return;
    }

    const nextPayload = buildQrPayload(type, fields);
    setLoading(true);
    startNavProgress();
    try {
      const data = await generateQrPreview(nextPayload);
      setQrCodeUrl(data.qr_code_url);
      setPayload(nextPayload);
      setAuthed(isLoggedIn());
    } catch (err) {
      console.error('QR code generation error:', err);
      if (err.response?.status === 429) {
        setError('Too many generates — wait a moment and try again.');
      } else {
        setError('Could not generate that code. Check your inputs and try again.');
      }
      setQrCodeUrl('');
      setPayload('');
    } finally {
      setLoading(false);
      doneNavProgress();
    }
  };

  const handleSave = async () => {
    if (!payload || !qrCodeUrl) return;

    if (!isLoggedIn()) {
      beginLogin('/generate');
      return;
    }

    setSaving(true);
    setError('');
    startNavProgress();
    try {
      await saveQrCode(payload);
      setSaved(true);
      setAuthed(true);
    } catch (err) {
      console.error('Save error:', err);
      if (err.response?.status === 401) {
        setError('Session expired. Sign in again to save.');
        setAuthed(false);
      } else if (err.response?.status === 429) {
        setError('Too many saves — wait a moment and try again.');
      } else {
        setError('Could not save that code. Try again.');
      }
    } finally {
      setSaving(false);
      doneNavProgress();
    }
  };

  return (
    <main className="min-h-[calc(100svh-4.25rem)] bg-bone lg:grid lg:min-h-[calc(100svh-4.25rem)] lg:grid-cols-2">
      <section className="flex flex-col justify-center border-b border-soot/10 px-5 py-12 sm:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-16 xl:pl-[max(3rem,calc((100vw-1400px)/2+3rem))]">
        <h1 className="font-display text-4xl font-bold tracking-[-0.03em] text-soot sm:text-5xl">
          What should this
          <br />
          code do?
        </h1>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-steel">
          Choose a type, generate a PNG, save only if you want.
        </p>

        {!authed && (
          <div className="mt-6 flex flex-wrap items-center gap-3 border border-soot/15 px-4 py-3">
            <p className="text-sm text-steel">
              Generate freely — sign in only if you want to save to My codes.
            </p>
            <button
              type="button"
              onClick={() => beginLogin('/generate')}
              className="border border-soot/20 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-soot hover:border-acid hover:text-acid"
            >
              Sign in
            </button>
          </div>
        )}

        <div
          role="tablist"
          aria-label="QR code type"
          className="mt-10 grid grid-cols-4 gap-2"
        >
          {QR_TYPES.map((item) => {
            const active = type === item.id;
            const Icon = TYPE_ICONS[item.id];
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => selectType(item.id)}
                className={`flex flex-col items-center gap-2 border px-2 py-3 transition-colors ${
                  active
                    ? 'border-acid bg-soot text-acid'
                    : 'border-soot/15 bg-bone text-steel hover:border-soot/35 hover:text-soot'
                }`}
              >
                {Icon && <Icon className="h-5 w-5" />}
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] sm:text-[10px]">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="mt-8 max-w-lg space-y-5">
          <GenerateTypeFields
            type={type}
            fields={fields}
            updateField={updateField}
          />

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-3 bg-soot px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-bone transition-colors hover:bg-acid hover:text-soot disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Rendering…' : 'Generate QR code'}
            {!loading && <span className="h-2 w-2 bg-acid" aria-hidden />}
          </button>

          {error && (
            <p className="font-mono text-xs text-red-700" role="alert">
              {error}
            </p>
          )}
        </form>
      </section>

      <GeneratePreview
        type={type}
        qrCodeUrl={qrCodeUrl}
        loading={loading}
        saved={saved}
        saving={saving}
        onSave={handleSave}
        authed={authed}
      />
    </main>
  );
}

export default function Generate() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[calc(100svh-4.25rem)] items-center justify-center bg-bone">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel">
            Loading generator…
          </p>
        </main>
      }
    >
      <GenerateForm />
    </Suspense>
  );
}
