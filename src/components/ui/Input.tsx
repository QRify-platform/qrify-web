import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export type FieldTone = 'light' | 'dark';

const inputClass: Record<FieldTone, string> = {
  light:
    'mt-2 w-full border border-soot/15 bg-bone px-4 py-3 font-mono text-sm text-soot outline-none transition-colors placeholder:text-steel/40 focus:border-acid',
  dark:
    'mt-2 w-full rounded-sm border border-bone/15 bg-soot/60 px-3 py-3 text-sm text-bone outline-none transition placeholder:text-bone/30 focus:border-acid/50 focus:ring-2 focus:ring-acid/25',
};

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  tone?: FieldTone;
};

export function Input({ tone = 'light', className, ...props }: InputProps) {
  return <input className={cn(inputClass[tone], className)} {...props} />;
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  tone?: FieldTone;
};

export function Textarea({
  tone = 'light',
  className,
  ...props
}: TextareaProps) {
  return (
    <textarea
      className={cn(inputClass[tone], 'resize-y', className)}
      {...props}
    />
  );
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  tone?: FieldTone;
};

export function Select({ tone = 'light', className, ...props }: SelectProps) {
  return <select className={cn(inputClass[tone], className)} {...props} />;
}
