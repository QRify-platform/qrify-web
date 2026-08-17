import type { SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';
import { CONTROL_CLASS, type FieldTone } from './styles';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  tone?: FieldTone;
};

export function Select({ tone = 'light', className, ...props }: SelectProps) {
  return <select className={cn(CONTROL_CLASS[tone], className)} {...props} />;
}
