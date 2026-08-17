import type { SelectHTMLAttributes } from 'react';
import { Field } from './Field';
import { Select } from './Select';
import type { FieldTone } from './styles';

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  label: string;
  tone?: FieldTone;
};

export function SelectField({
  id,
  label,
  tone,
  children,
  ...props
}: SelectFieldProps) {
  return (
    <Field id={id} label={label} tone={tone}>
      <Select id={id} tone={tone} {...props}>
        {children}
      </Select>
    </Field>
  );
}
