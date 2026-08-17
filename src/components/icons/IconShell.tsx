import type { ReactNode } from 'react';

export type IconProps = {
  className?: string;
};

/** Shared stroke attributes so every icon has a matching weight. */
export const STROKE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

type IconShellProps = IconProps & {
  children: ReactNode;
};

export function IconShell({ children, className = '' }: IconShellProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}
