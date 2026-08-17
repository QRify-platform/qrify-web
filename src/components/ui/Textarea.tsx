import type { TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';
import { CONTROL_CLASS, type FieldTone } from './styles';

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
      className={cn(CONTROL_CLASS[tone], 'resize-y', className)}
      {...props}
    />
  );
}
