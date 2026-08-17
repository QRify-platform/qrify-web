import type { ReactNode } from 'react';
import { LABEL_CLASS, type FieldTone } from './styles';

type FieldProps = {
  id: string;
  label: string;
  children: ReactNode;
  tone?: FieldTone;
};

/** Pairs a label with any control, wiring `htmlFor` to the control's id. */
export function Field({ id, label, children, tone = 'light' }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className={LABEL_CLASS[tone]}>
        {label}
      </label>
      {children}
    </div>
  );
}
