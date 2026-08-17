import type { InputHTMLAttributes } from 'react';
import { Field } from './Field';
import { Input } from './Input';
import type { FieldTone } from './styles';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  tone?: FieldTone;
};

/** A labelled text input — the shape almost every form field takes. */
export function TextField({ id, label, tone, ...props }: TextFieldProps) {
  return (
    <Field id={id} label={label} tone={tone}>
      <Input id={id} tone={tone} {...props} />
    </Field>
  );
}
