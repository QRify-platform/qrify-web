import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

export type ButtonVariant =
  | 'primary'
  | 'acid'
  | 'outline'
  | 'outlineLight'
  | 'ghost'
  | 'danger';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary:
    'inline-flex items-center justify-center gap-3 bg-soot px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-bone transition-colors hover:bg-acid hover:text-soot disabled:cursor-not-allowed disabled:opacity-50',
  acid: 'inline-flex items-center justify-center gap-3 bg-acid px-4 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-soot transition-colors hover:bg-bone disabled:cursor-not-allowed disabled:opacity-60',
  outline:
    'inline-flex items-center justify-center border border-soot/20 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-soot transition-colors hover:border-acid hover:text-acid disabled:cursor-not-allowed disabled:opacity-50',
  outlineLight:
    'inline-flex items-center justify-center gap-3 border border-bone/25 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-bone transition-colors hover:border-acid hover:text-acid disabled:cursor-not-allowed disabled:opacity-50',
  ghost:
    'inline-flex items-center justify-center border border-bone/20 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/80 transition-colors hover:border-acid hover:text-acid',
  danger:
    'inline-flex items-center justify-center border border-soot/20 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-soot hover:border-red-700 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50',
};

export function Button({
  variant = 'primary',
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(VARIANT_CLASS[variant], className)}
      {...props}
    />
  );
}
