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

        <section className="relative flex items-center justify-center bg-chalk px-5 py-16 sm:px-8 lg:px-12">
          {qrCodeUrl ? (
            <div className="relative z-10 w-full max-w-sm animate-rise text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-steel">
                Your code · {QR_TYPES.find((t) => t.id === type)?.label}
              </p>
              <div className="mt-6 border border-soot/10 bg-bone p-6 sm:p-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrCodeUrl}
                  alt="Generated QR code"
                  className="mx-auto h-56 w-56 object-contain sm:h-64 sm:w-64"
                />
              </div>
              <a
                href={qrCodeUrl}
                download="qrify-code.png"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex font-mono text-[11px] uppercase tracking-[0.2em] text-cobalt transition-opacity hover:opacity-70"
              >
                Download PNG →
              </a>
            </div>
          ) : (
            <div className="relative z-10 w-full max-w-xs text-center opacity-40">
              <QRMark className="mx-auto aspect-square w-40" bg="#e6e8ec" />
              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-steel">
                Waiting for input
              </p>
            </div>
          )}
        </section>
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
