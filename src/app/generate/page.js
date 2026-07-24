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

function PreviewPanel({ type, qrCodeUrl, loading }) {
  const typeLabel = QR_TYPES.find((t) => t.id === type)?.label || type;

  return (
    <section className="relative flex min-h-[28rem] items-center justify-center overflow-hidden bg-soot px-5 py-16 text-bone sm:px-8 lg:min-h-0 lg:px-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,240,200,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,200,0.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-acid/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-acid/10 blur-3xl"
        aria-hidden
      />

      {loading ? (
        <div className="relative z-10 flex w-full max-w-sm flex-col items-center text-center animate-rise">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-acid">
            Rendering · {typeLabel}
          </p>
          <div className="mt-8 flex h-64 w-64 items-center justify-center border border-acid/25 bg-slate/80 sm:h-72 sm:w-72">
            <div className="relative h-16 w-16">
              <span className="absolute inset-0 border border-acid/30" />
              <span className="absolute inset-2 animate-pulse bg-acid/20" />
              <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-acid" />
              <span className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-acid" />
              <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-acid" />
              <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-acid" />
            </div>
          </div>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/45">
            Building your code
          </p>
        </div>
      ) : qrCodeUrl ? (
        <div className="relative z-10 w-full max-w-md animate-rise text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-acid/50" aria-hidden />
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-acid">
              Ready · {typeLabel}
            </p>
            <span className="h-px w-8 bg-acid/50" aria-hidden />
          </div>

          <div className="relative mx-auto mt-8 w-fit">
            <span
              className="absolute -left-2 -top-2 h-5 w-5 border-l border-t border-acid"
              aria-hidden
            />
            <span
              className="absolute -right-2 -top-2 h-5 w-5 border-r border-t border-acid"
              aria-hidden
            />
            <span
              className="absolute -bottom-2 -left-2 h-5 w-5 border-b border-l border-acid"
              aria-hidden
            />
            <span
              className="absolute -bottom-2 -right-2 h-5 w-5 border-b border-r border-acid"
              aria-hidden
            />
            <div className="bg-bone p-5 shadow-[0_0_0_1px_rgba(0,240,200,0.2),0_24px_60px_rgba(0,0,0,0.45)] sm:p-7">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrCodeUrl}
                alt="Generated QR code"
                className="mx-auto h-56 w-56 object-contain sm:h-72 sm:w-72"
              />
            </div>
          </div>

          <a
            href={qrCodeUrl}
            download="qrify-code.png"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 border border-acid bg-acid px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-soot transition-colors hover:bg-transparent hover:text-acid"
          >
            Download PNG
            <span className="h-1.5 w-1.5 bg-soot" aria-hidden />
          </a>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-bone/40">
            Saved to My codes
          </p>
        </div>
      ) : (
        <div className="relative z-10 w-full max-w-xs text-center">
          <div className="mx-auto flex h-48 w-48 items-center justify-center border border-dashed border-bone/15 bg-slate/40">
            <QRMark className="aspect-square w-28 opacity-50" bg="#151820" fg="#00f0c8" />
          </div>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/40">
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    setAuthed(isLoggedIn());
  }, []);

  useEffect(() => {
    if (requestedType && isValidType(requestedType) && requestedType !== type) {
      setType(requestedType);
      setQrCodeUrl('');
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
    setError('');
    setFields(next === 'wifi' ? { encryption: 'WPA' } : {});
    router.replace(`/generate?type=${next}`, { scroll: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isLoggedIn()) {
      setError('Sign in to generate and save QR codes.');
      return;
    }

    if (!isPayloadReady(type, fields)) {
      setError('Fill in the required fields, then try again.');
      return;
    }

    const payload = buildQrPayload(type, fields);
    setLoading(true);
    startNavProgress();
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
      const res = await axios.post(
        `${baseUrl}/generate-qr/?url=${encodeURIComponent(payload)}`,
        null,
        {
          headers: { Authorization: `Bearer ${getApiToken()}` },
        }
      );
      setQrCodeUrl(res.data.qr_code_url);
      setAuthed(true);
    } catch (err) {
      console.error('QR code generation error:', err);
      if (err.response?.status === 401) {
        setError('Session expired. Sign in again.');
        setAuthed(false);
      } else {
        setError('Could not generate that code. Check your inputs and try again.');
      }
      setQrCodeUrl('');
    } finally {
      setLoading(false);
      doneNavProgress();
    }
  };

  return (
    <main className="min-h-[calc(100svh-4.25rem)] bg-bone">
      <div className="mx-auto grid min-h-[calc(100svh-4.25rem)] max-w-[1400px] lg:grid-cols-2">
        <section className="flex flex-col justify-center border-b border-soot/10 px-5 py-12 sm:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-16">
          <h1 className="font-display text-4xl font-bold tracking-[-0.03em] text-soot sm:text-5xl">
            What should this
            <br />
            code do?
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-steel">
            Choose a type, fill the fields, download the PNG.
          </p>

          {!authed && (
            <div className="mt-6 flex flex-wrap items-center gap-3 border border-soot/15 bg-bone px-4 py-3">
              <p className="text-sm text-steel">
                Sign in to generate and keep your codes.
              </p>
              <button
                type="button"
                onClick={() => beginLogin()}
                className="border border-acid bg-acid px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-soot"
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

        <PreviewPanel type={type} qrCodeUrl={qrCodeUrl} loading={loading} />
      </div>
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
