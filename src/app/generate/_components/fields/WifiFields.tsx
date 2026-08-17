import { Checkbox } from '@/components/ui/Checkbox';
import { SelectField } from '@/components/ui/SelectField';
import { TextField } from '@/components/ui/TextField';
import type { WifiEncryption } from '@/types';
import type { QrFieldGroupProps } from './types';

const ENCRYPTION_OPTIONS: { value: WifiEncryption; label: string }[] = [
  { value: 'WPA', label: 'WPA / WPA2' },
  { value: 'WEP', label: 'WEP' },
  { value: 'nopass', label: 'None' },
];

export function WifiFields({ fields, updateField }: QrFieldGroupProps) {
  return (
    <>
      <TextField
        id="ssid"
        label="Network name (SSID)"
        type="text"
        placeholder="Cafe-Guest"
        value={fields.ssid || ''}
        onChange={(e) => updateField('ssid', e.target.value)}
        required
      />
      <TextField
        id="password"
        label="Password"
        type="text"
        placeholder="Leave blank for open networks"
        value={fields.password || ''}
        onChange={(e) => updateField('password', e.target.value)}
      />
      <SelectField
        id="encryption"
        label="Security"
        value={fields.encryption || 'WPA'}
        onChange={(e) =>
          updateField('encryption', e.target.value as WifiEncryption)
        }
      >
        {ENCRYPTION_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectField>
      <Checkbox
        label="Hidden network"
        checked={Boolean(fields.hidden)}
        onChange={(e) => updateField('hidden', e.target.checked)}
      />
    </>
  );
}
