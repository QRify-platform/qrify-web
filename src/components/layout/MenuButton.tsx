import { cn } from '@/lib/utils/cn';

type MenuButtonProps = {
  open: boolean;
  controls: string;
  onToggle: () => void;
};

/** Hamburger that morphs into a close icon. */
export function MenuButton({ open, controls, onToggle }: MenuButtonProps) {
  const bar = 'absolute left-0 block h-px w-full bg-current duration-200';

  return (
    <button
      type="button"
      className="flex h-10 w-10 items-center justify-center border border-bone/15 text-bone md:hidden"
      aria-expanded={open}
      aria-controls={controls}
      aria-label={open ? 'Close menu' : 'Open menu'}
      onClick={onToggle}
    >
      <span className="relative block h-3.5 w-4">
        <span
          className={cn(bar, 'transition-all', open ? 'top-1.5 rotate-45' : 'top-0')}
        />
        <span
          className={cn(
            bar,
            'top-1.5 transition-opacity',
            open ? 'opacity-0' : 'opacity-100'
          )}
        />
        <span
          className={cn(
            bar,
            'transition-all',
            open ? 'top-1.5 -rotate-45' : 'top-3'
          )}
        />
      </span>
    </button>
  );
}
