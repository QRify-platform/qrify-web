import { TextField } from '@/components/ui/TextField';
import type { QrFieldGroupProps } from './types';

export function VCardFields({ fields, updateField }: QrFieldGroupProps) {
  return (
    <>
      <TextField
        id="name"
        label="Full name"
        type="text"
        placeholder="Jordan Lee"
        value={fields.name || ''}
        onChange={(e) => updateField('name', e.target.value)}
        required
      />
      <TextField
        id="org"
        label="Organization (optional)"
        type="text"
        placeholder="QRify"
        value={fields.org || ''}
        onChange={(e) => updateField('org', e.target.value)}
      />
      <TextField
        id="phone"
        label="Phone (optional)"
        type="tel"
        placeholder="+1 555 0100"
        value={fields.phone || ''}
        onChange={(e) => updateField('phone', e.target.value)}
      />
      <TextField
        id="email"
        label="Email (optional)"
        type="email"
        placeholder="jordan@example.com"
        value={fields.email || ''}
        onChange={(e) => updateField('email', e.target.value)}
      />
      <TextField
        id="url"
        label="Website (optional)"
        type="url"
        placeholder="https://example.com"
        value={fields.url || ''}
        onChange={(e) => updateField('url', e.target.value)}
      />
    </>
  );
}
