import { TextField } from '@/components/ui/TextField';
import type { QrFieldGroupProps } from './types';

export function LinkFields({ fields, updateField }: QrFieldGroupProps) {
  return (
    <TextField
      id="url"
      label="URL"
      type="url"
      inputMode="url"
      placeholder="https://example.com"
      value={fields.url || ''}
      onChange={(e) => updateField('url', e.target.value)}
      required
    />
  );
}
