import type { TextareaHTMLAttributes } from 'react';
import { Field } from './Field';
import { Textarea } from './Textarea';
import type { FieldTone } from './styles';

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
  label: string;
  tone?: FieldTone;
};

export function TextAreaField({
  id,
  label,
  tone,
  ...props
}: TextAreaFieldProps) {
  return (
    <Field id={id} label={label} tone={tone}>
      <Textarea id={id} tone={tone} {...props} />
    </Field>
  );
}
