import { TextAreaField } from '@/components/ui/TextAreaField';
import type { QrFieldGroupProps } from './types';

export function TextFields({ fields, updateField }: QrFieldGroupProps) {
  return (
    <TextAreaField
      id="text"
      label="Message"
      rows={4}
      placeholder="Anything you want the scan to reveal"
      value={fields.text || ''}
      onChange={(e) => updateField('text', e.target.value)}
      required
    />
  );
}
