'use client';

import { Field } from '@/components/ui/Field';
import { Input, Select, Textarea } from '@/components/ui/Input';
import type { QrFields, QrTypeId, WifiEncryption } from '@/lib/qr';

type GenerateTypeFieldsProps = {
  type: QrTypeId;
  fields: QrFields;
  updateField: <K extends keyof QrFields>(key: K, value: QrFields[K]) => void;
};

export function GenerateTypeFields({
  type,
  fields,
  updateField,
}: GenerateTypeFieldsProps) {
  switch (type) {
    case 'link':
      return (
        <Field id="url" label="URL">
          <Input
            id="url"
            type="url"
            inputMode="url"
            placeholder="https://example.com"
            value={fields.url || ''}
            onChange={(e) => updateField('url', e.target.value)}
            required
          />
        </Field>
      );

    case 'text':
      return (
        <Field id="text" label="Message">
          <Textarea
            id="text"
            rows={4}
            placeholder="Anything you want the scan to reveal"
            value={fields.text || ''}
            onChange={(e) => updateField('text', e.target.value)}
            required
          />
        </Field>
      );

    case 'email':
      return (
        <>
          <Field id="email" label="Email">
            <Input
              id="email"
              type="email"
              placeholder="hello@example.com"
              value={fields.email || ''}
              onChange={(e) => updateField('email', e.target.value)}
              required
            />
          </Field>
          <Field id="subject" label="Subject (optional)">
            <Input
              id="subject"
              type="text"
              placeholder="What’s this about?"
              value={fields.subject || ''}
              onChange={(e) => updateField('subject', e.target.value)}
            />
          </Field>
          <Field id="body" label="Body (optional)">
            <Textarea
              id="body"
              rows={3}
              placeholder="Prefilled message"
              value={fields.body || ''}
              onChange={(e) => updateField('body', e.target.value)}
            />
          </Field>
        </>
      );

    case 'call':
      return (
        <Field id="phone" label="Phone number">
          <Input
            id="phone"
            type="tel"
            placeholder="+1 555 0100"
            value={fields.phone || ''}
            onChange={(e) => updateField('phone', e.target.value)}
            required
          />
        </Field>
      );

    case 'sms':
      return (
        <>
          <Field id="phone" label="Phone number">
            <Input
              id="phone"
              type="tel"
              placeholder="+1 555 0100"
              value={fields.phone || ''}
              onChange={(e) => updateField('phone', e.target.value)}
              required
            />
          </Field>
          <Field id="message" label="Message (optional)">
            <Textarea
              id="message"
              rows={3}
              placeholder="Prefilled SMS text"
              value={fields.message || ''}
              onChange={(e) => updateField('message', e.target.value)}
            />
          </Field>
        </>
      );

    case 'wifi':
      return (
        <>
          <Field id="ssid" label="Network name (SSID)">
            <Input
              id="ssid"
              type="text"
              placeholder="Cafe-Guest"
              value={fields.ssid || ''}
              onChange={(e) => updateField('ssid', e.target.value)}
              required
            />
          </Field>
          <Field id="password" label="Password">
            <Input
              id="password"
              type="text"
              placeholder="Leave blank for open networks"
              value={fields.password || ''}
              onChange={(e) => updateField('password', e.target.value)}
            />
          </Field>
          <Field id="encryption" label="Security">
            <Select
              id="encryption"
              value={fields.encryption || 'WPA'}
              onChange={(e) =>
                updateField('encryption', e.target.value as WifiEncryption)
              }
            >
              <option value="WPA">WPA / WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">None</option>
            </Select>
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
            <Input
              id="phone"
              type="tel"
              placeholder="15550100"
              value={fields.phone || ''}
              onChange={(e) => updateField('phone', e.target.value)}
              required
            />
          </Field>
          <Field id="message" label="Message (optional)">
            <Textarea
              id="message"
              rows={3}
              placeholder="Hey—got this from the QR"
              value={fields.message || ''}
              onChange={(e) => updateField('message', e.target.value)}
            />
          </Field>
        </>
      );

    case 'vcard':
      return (
        <>
          <Field id="name" label="Full name">
            <Input
              id="name"
              type="text"
              placeholder="Jordan Lee"
              value={fields.name || ''}
              onChange={(e) => updateField('name', e.target.value)}
              required
            />
          </Field>
          <Field id="org" label="Organization (optional)">
            <Input
              id="org"
              type="text"
              placeholder="QRify"
              value={fields.org || ''}
              onChange={(e) => updateField('org', e.target.value)}
            />
          </Field>
          <Field id="phone" label="Phone (optional)">
            <Input
              id="phone"
              type="tel"
              placeholder="+1 555 0100"
              value={fields.phone || ''}
              onChange={(e) => updateField('phone', e.target.value)}
            />
          </Field>
          <Field id="email" label="Email (optional)">
            <Input
              id="email"
              type="email"
              placeholder="jordan@example.com"
              value={fields.email || ''}
              onChange={(e) => updateField('email', e.target.value)}
            />
          </Field>
          <Field id="url" label="Website (optional)">
            <Input
              id="url"
              type="url"
              placeholder="https://example.com"
              value={fields.url || ''}
              onChange={(e) => updateField('url', e.target.value)}
            />
          </Field>
        </>
      );

    default:
      return null;
  }
}
