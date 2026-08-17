'use client';

import { useNavProgress } from '@/hooks/useNavProgress';
import { cn } from '@/lib/utils/cn';

/** Thin acid bar flush under the sticky navbar. */
export function NavigationProgress() {
  const { visible, width, finishing } = useNavProgress();

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[60] h-[2px] overflow-hidden"
      aria-hidden
    >
      <div
        className={cn(
          'h-full origin-left bg-acid shadow-[0_0_12px_rgba(0,240,200,0.9)] transition-[width,opacity] ease-out',
          finishing ? 'duration-200' : 'duration-500',
          visible ? 'opacity-100' : 'opacity-0'
        )}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
