import { TextAreaField } from '@/components/ui/TextAreaField';
import { TextField } from '@/components/ui/TextField';
import type { QrFieldGroupProps } from './types';

export function WhatsAppFields({ fields, updateField }: QrFieldGroupProps) {
  return (
    <>
      <TextField
        id="phone"
        label="Phone (with country code)"
        type="tel"
        placeholder="15550100"
        value={fields.phone || ''}
        onChange={(e) => updateField('phone', e.target.value)}
        required
      />
      <TextAreaField
        id="message"
        label="Message (optional)"
        rows={3}
        placeholder="Hey—got this from the QR"
        value={fields.message || ''}
        onChange={(e) => updateField('message', e.target.value)}
      />
    </>
  );
}
