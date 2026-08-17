import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import type { FieldTone } from './Input';

type FieldProps = {
  id: string;
  label: string;
  children: ReactNode;
  tone?: FieldTone;
};

const labelClass: Record<FieldTone, string> = {
  light: 'font-mono text-[10px] uppercase tracking-[0.2em] text-steel',
  dark: 'text-xs font-medium uppercase tracking-[0.14em] text-bone/45',
};

export function Field({ id, label, children, tone = 'light' }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className={labelClass[tone]}>
        {label}
      </label>
      {children}
    </div>
  );
}

type AlertProps = {
  children: ReactNode;
  tone?: 'light' | 'dark';
};

export function Alert({ children, tone = 'light' }: AlertProps) {
  return (
    <p
      role="alert"
      className={cn(
        'font-mono text-xs',
        tone === 'dark' ? 'text-red-300' : 'text-red-700'
      )}
    >
      {children}
    </p>
  );
}

export function Divider({ label = 'or' }: { label?: string }) {
  return (
    <div className="my-8 flex items-center gap-4">
      <div className="h-px flex-1 bg-bone/12" />
      <span className="text-xs uppercase tracking-[0.18em] text-bone/40">
        {label}
      </span>
      <div className="h-px flex-1 bg-bone/12" />
    </div>
  );
}
