'use client';

const fieldClass =
  'mt-2 w-full border border-soot/15 bg-bone px-4 py-3 font-mono text-sm text-soot outline-none transition-colors placeholder:text-steel/40 focus:border-acid';

const labelClass =
  'font-mono text-[10px] uppercase tracking-[0.2em] text-steel';

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

/**
 * Type-specific inputs for the generator form.
 * Keeps page.js focused on orchestration (state + API).
 */
export default function GenerateTypeFields({ type, fields, updateField }) {
  switch (type) {
    case 'link':
      return (
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
      );

    case 'text':
      return (
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
      );

    case 'email':
      return (
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
      );

    case 'call':
      return (
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
      );

    case 'sms':
      return (
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
      );

    case 'wifi':
      return (
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
              className="h-4 w-4 accent-acid"
            />
            Hidden network
          </label>
        </>
      );

    case 'whatsapp':
      return (
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
      );

    case 'vcard':
      return (
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
      );

    default:
      return null;
  }
}
