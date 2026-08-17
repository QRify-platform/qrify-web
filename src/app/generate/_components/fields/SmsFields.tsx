import { TextAreaField } from '@/components/ui/TextAreaField';
import { TextField } from '@/components/ui/TextField';
import type { QrFieldGroupProps } from './types';

export function SmsFields({ fields, updateField }: QrFieldGroupProps) {
  return (
    <>
      <TextField
        id="phone"
        label="Phone number"
        type="tel"
        placeholder="+1 555 0100"
        value={fields.phone || ''}
        onChange={(e) => updateField('phone', e.target.value)}
        required
      />
      <TextAreaField
        id="message"
        label="Message (optional)"
        rows={3}
        placeholder="Prefilled SMS text"
        value={fields.message || ''}
        onChange={(e) => updateField('message', e.target.value)}
      />
    </>
  );
}
