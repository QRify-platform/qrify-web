import type { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';
import { CONTROL_CLASS, type FieldTone } from './styles';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  tone?: FieldTone;
};

export function Input({ tone = 'light', className, ...props }: InputProps) {
  return <input className={cn(CONTROL_CLASS[tone], className)} {...props} />;
}
