import { TextField } from '@/components/ui/TextField';
import type { QrFieldGroupProps } from './types';

export function CallFields({ fields, updateField }: QrFieldGroupProps) {
  return (
    <TextField
      id="phone"
      label="Phone number"
      type="tel"
      placeholder="+1 555 0100"
      value={fields.phone || ''}
      onChange={(e) => updateField('phone', e.target.value)}
      required
    />
  );
}
