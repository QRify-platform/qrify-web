import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import type { FieldTone } from './styles';

type AlertProps = {
  children: ReactNode;
  tone?: FieldTone;
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
