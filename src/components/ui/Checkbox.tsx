import type { InputHTMLAttributes } from 'react';

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string;
};

export function Checkbox({ label, ...props }: CheckboxProps) {
  return (
    <label className="flex items-center gap-3 text-sm text-steel">
      <input type="checkbox" className="h-4 w-4 accent-acid" {...props} />
      {label}
    </label>
  );
}
