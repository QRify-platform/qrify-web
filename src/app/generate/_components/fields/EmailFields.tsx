import { TextAreaField } from '@/components/ui/TextAreaField';
import { TextField } from '@/components/ui/TextField';
import type { QrFieldGroupProps } from './types';

export function EmailFields({ fields, updateField }: QrFieldGroupProps) {
  return (
    <>
      <TextField
        id="email"
        label="Email"
        type="email"
        placeholder="hello@example.com"
        value={fields.email || ''}
        onChange={(e) => updateField('email', e.target.value)}
        required
      />
      <TextField
        id="subject"
        label="Subject (optional)"
        type="text"
        placeholder="What’s this about?"
        value={fields.subject || ''}
        onChange={(e) => updateField('subject', e.target.value)}
      />
      <TextAreaField
        id="body"
        label="Body (optional)"
        rows={3}
        placeholder="Prefilled message"
        value={fields.body || ''}
        onChange={(e) => updateField('body', e.target.value)}
      />
    </>
  );
}
