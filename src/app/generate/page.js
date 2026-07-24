'use client';

import { Suspense, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import QRMark from '../components/QRMark';
import {
  QR_TYPES,
  buildQrPayload,
  isPayloadReady,
} from '../lib/qrPayload';
import { TYPE_ICONS } from '../components/TypeIcons';
import {
  beginLogin,
  getApiToken,
  isLoggedIn,
} from '../lib/cognito';
import {
  doneNavProgress,
  startNavProgress,
} from '../components/NavigationProgress';

const fieldClass =
  'mt-2 w-full border border-soot/15 bg-bone px-4 py-3 font-mono text-sm text-soot outline-none transition-colors placeholder:text-steel/40 focus:border-acid';

const labelClass =
  'font-mono text-[10px] uppercase tracking-[0.2em] text-steel';

function isValidType(id) {
  return QR_TYPES.some((item) => item.id === id);
}

function Field({ id, label, children }) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
    </div>
  );
}

function PreviewPanel({
  type,
  qrCodeUrl,
  loading,
  saved,
  saving,
  onSave,
  authed,
}) {
  const typeLabel = QR_TYPES.find((t) => t.id === type)?.label || type;

  return (
    <section className="relative flex min-h-[28rem] items-center justify-center overflow-hidden bg-soot px-5 py-16 text-bone sm:px-8 lg:min-h-0 lg:px-12">
      {/* Atmosphere: acid wash + soft grid (same vibe as earlier preview) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 40%, rgba(0,240,200,0.14), transparent 60%), radial-gradient(ellipse 45% 40% at 85% 85%, rgba(0,240,200,0.08), transparent 55%), radial-gradient(ellipse 40% 35% at 10% 20%, rgba(0,240,200,0.06), transparent 50%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,240,200,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,200,0.07) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-acid/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-acid/12 blur-3xl"
        aria-hidden
      />

      {loading ? (
        <div className="relative z-10 flex w-full max-w-sm flex-col items-center text-center animate-rise">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/45">
            Rendering · {typeLabel}
          </p>
          <div className="mt-8 aspect-square w-[min(100%,17rem)] border border-bone/10 bg-slate sm:w-72">
            <div className="flex h-full items-center justify-center">
              <div className="h-10 w-10 animate-pulse bg-bone/10" />
            </div>
          </div>
        </div>
      ) : qrCodeUrl ? (
        <div className="relative z-10 flex w-full max-w-md flex-col items-center animate-rise">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/45">
            {typeLabel}
          </p>

          {/* Single surface: slate frame, QR quiet-zone is the only white */}
          <div className="mt-6 border border-bone/10 bg-slate p-3 sm:p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrCodeUrl}
              alt="Generated QR code"
              width={512}
              height={512}
              className="aspect-square h-auto w-[min(100%,17rem)] sm:w-72"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={qrCodeUrl}
              download="qrify-code.png"
              className="inline-flex items-center gap-3 border border-acid bg-acid px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-soot transition-colors hover:bg-transparent hover:text-acid"
            >
              Download PNG
            </a>
            {saved ? (
              <span className="inline-flex items-center border border-bone/15 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/50">
                Saved
              </span>
            ) : (
              <button
                type="button"
                onClick={onSave}
                disabled={saving}
                className="inline-flex items-center gap-3 border border-bone/25 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-bone transition-colors hover:border-acid hover:text-acid disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? 'Saving…'
                  : authed
                    ? 'Save to My codes'
                    : 'Sign in to save'}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="relative z-10 w-full max-w-xs text-center">
          <div className="mx-auto flex aspect-square w-48 items-center justify-center border border-dashed border-bone/15 bg-slate">
            <QRMark className="aspect-square w-28 opacity-40" bg="#151820" fg="#5c6370" />
          </div>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/35">
            Preview appears here
          </p>
        </div>
      )}
    </section>
  );
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

  const apiBase = () =>
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

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
      const res = await axios.post(
        `${apiBase()}/generate-qr/?url=${encodeURIComponent(nextPayload)}`
      );
      setQrCodeUrl(res.data.qr_code_url);
      setPayload(nextPayload);
      setAuthed(isLoggedIn());
    } catch (err) {
      console.error('QR code generation error:', err);
      setError('Could not generate that code. Check your inputs and try again.');
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
      beginLogin();
      return;
    }

    setSaving(true);
    setError('');
    startNavProgress();
    try {
      await axios.post(
        `${apiBase()}/qr-codes`,
        { url: payload },
        { headers: { Authorization: `Bearer ${getApiToken()}` } }
      );
      setSaved(true);
      setAuthed(true);
    } catch (err) {
      console.error('Save error:', err);
      if (err.response?.status === 401) {
        setError('Session expired. Sign in again to save.');
        setAuthed(false);
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
                onClick={() => beginLogin()}
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
            {type === 'link' && (
              <Field id="url" label="URL">
                <input
                  id="url"
                  type="url"
                  inputMode="url"
                  placeholder="https://example.com"
                  value={fields.url || ''}
                  onChange={(e) => updateField('url', e.target.value)}
                  required
                  className={fieldClass}
                />
              </Field>
            )}

            {type === 'text' && (
              <Field id="text" label="Message">
                <textarea
                  id="text"
                  rows={4}
                  placeholder="Anything you want the scan to reveal"
                  value={fields.text || ''}
                  onChange={(e) => updateField('text', e.target.value)}
                  required
                  className={`${fieldClass} resize-y`}
                />
              </Field>
            )}

            {type === 'email' && (
              <>
                <Field id="email" label="Email">
                  <input
                    id="email"
                    type="email"
                    placeholder="hello@example.com"
                    value={fields.email || ''}
                    onChange={(e) => updateField('email', e.target.value)}
                    required
                    className={fieldClass}
                  />
                </Field>
                <Field id="subject" label="Subject (optional)">
                  <input
                    id="subject"
                    type="text"
                    placeholder="What’s this about?"
                    value={fields.subject || ''}
                    onChange={(e) => updateField('subject', e.target.value)}
                    className={fieldClass}
                  />
                </Field>
                <Field id="body" label="Body (optional)">
                  <textarea
                    id="body"
                    rows={3}
                    placeholder="Prefilled message"
                    value={fields.body || ''}
                    onChange={(e) => updateField('body', e.target.value)}
                    className={`${fieldClass} resize-y`}
                  />
                </Field>
              </>
            )}

            {type === 'call' && (
              <Field id="phone" label="Phone number">
                <input
                  id="phone"
                  type="tel"
                  placeholder="+1 555 0100"
                  value={fields.phone || ''}
                  onChange={(e) => updateField('phone', e.target.value)}
                  required
                  className={fieldClass}
                />
              </Field>
            )}

            {type === 'sms' && (
              <>
                <Field id="phone" label="Phone number">
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+1 555 0100"
                    value={fields.phone || ''}
                    onChange={(e) => updateField('phone', e.target.value)}
                    required
                    className={fieldClass}
                  />
                </Field>
                <Field id="message" label="Message (optional)">
                  <textarea
                    id="message"
                    rows={3}
                    placeholder="Prefilled SMS text"
                    value={fields.message || ''}
                    onChange={(e) => updateField('message', e.target.value)}
                    className={`${fieldClass} resize-y`}
                  />
                </Field>
              </>
            )}

            {type === 'wifi' && (
              <>
                <Field id="ssid" label="Network name (SSID)">
                  <input
                    id="ssid"
                    type="text"
                    placeholder="Cafe-Guest"
                    value={fields.ssid || ''}
                    onChange={(e) => updateField('ssid', e.target.value)}
                    required
                    className={fieldClass}
                  />
                </Field>
                <Field id="password" label="Password">
                  <input
                    id="password"
                    type="text"
                    placeholder="Leave blank for open networks"
                    value={fields.password || ''}
                    onChange={(e) => updateField('password', e.target.value)}
                    className={fieldClass}
                  />
                </Field>
                <Field id="encryption" label="Security">
                  <select
                    id="encryption"
                    value={fields.encryption || 'WPA'}
                    onChange={(e) => updateField('encryption', e.target.value)}
                    className={fieldClass}
                  >
                    <option value="WPA">WPA / WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">None</option>
                  </select>
                </Field>
                <label className="flex items-center gap-3 text-sm text-steel">
                  <input
                    type="checkbox"
                    checked={Boolean(fields.hidden)}
                    onChange={(e) => updateField('hidden', e.target.checked)}
                    className="h-4 w-4 accent-cobalt"
                  />
                  Hidden network
                </label>
              </>
            )}

            {type === 'whatsapp' && (
              <>
                <Field id="phone" label="Phone (with country code)">
                  <input
                    id="phone"
                    type="tel"
                    placeholder="15550100"
                    value={fields.phone || ''}
                    onChange={(e) => updateField('phone', e.target.value)}
                    required
                    className={fieldClass}
                  />
                </Field>
                <Field id="message" label="Message (optional)">
                  <textarea
                    id="message"
                    rows={3}
                    placeholder="Hey—got this from the QR"
                    value={fields.message || ''}
                    onChange={(e) => updateField('message', e.target.value)}
                    className={`${fieldClass} resize-y`}
                  />
                </Field>
              </>
            )}

            {type === 'vcard' && (
              <>
                <Field id="name" label="Full name">
                  <input
                    id="name"
                    type="text"
                    placeholder="Jordan Lee"
                    value={fields.name || ''}
                    onChange={(e) => updateField('name', e.target.value)}
                    required
                    className={fieldClass}
                  />
                </Field>
                <Field id="org" label="Organization (optional)">
                  <input
                    id="org"
                    type="text"
                    placeholder="QRify"
                    value={fields.org || ''}
                    onChange={(e) => updateField('org', e.target.value)}
                    className={fieldClass}
                  />
                </Field>
                <Field id="phone" label="Phone (optional)">
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+1 555 0100"
                    value={fields.phone || ''}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className={fieldClass}
                  />
                </Field>
                <Field id="email" label="Email (optional)">
                  <input
                    id="email"
                    type="email"
                    placeholder="jordan@example.com"
                    value={fields.email || ''}
                    onChange={(e) => updateField('email', e.target.value)}
                    className={fieldClass}
                  />
                </Field>
                <Field id="url" label="Website (optional)">
                  <input
                    id="url"
                    type="url"
                    placeholder="https://example.com"
                    value={fields.url || ''}
                    onChange={(e) => updateField('url', e.target.value)}
                    className={fieldClass}
                  />
                </Field>
              </>
            )}

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

        <PreviewPanel
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
