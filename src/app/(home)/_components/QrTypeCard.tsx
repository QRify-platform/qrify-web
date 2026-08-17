import Link from 'next/link';
import { TYPE_ICONS } from '@/components/icons/TypeIcons';
import { cn } from '@/lib/utils/cn';
import { generatePath } from '@/lib/utils/paths';
import type { QrTypeMeta } from '@/types';

type QrTypeCardProps = {
  type: QrTypeMeta;
  /** The first card fills the large slot in the bento grid. */
  featured?: boolean;
};

export function QrTypeCard({ type, featured = false }: QrTypeCardProps) {
  const Icon = TYPE_ICONS[type.id];

  return (
    <Link
      href={generatePath(type.id)}
      className={cn(
        'group flex h-full flex-col border border-bone/10 transition-colors hover:border-acid/60 hover:bg-slate',
        featured ? 'bg-slate p-8 sm:min-h-[22rem] sm:p-10' : 'bg-soot p-6 sm:p-7'
      )}
    >
      <span
        className={cn(
          'flex items-center justify-center border border-acid/30 text-acid transition-colors group-hover:bg-acid group-hover:text-soot',
          featured ? 'h-14 w-14' : 'h-10 w-10'
        )}
      >
        <Icon className={featured ? 'h-6 w-6' : 'h-5 w-5'} />
      </span>

      <h3
        className={cn(
          'mt-6 font-display font-semibold',
          featured ? 'text-3xl sm:text-4xl' : 'text-lg'
        )}
      >
        {type.label}
      </h3>
      <p
        className={cn(
          'mt-3 leading-relaxed text-bone/50',
          featured ? 'max-w-sm text-base' : 'text-sm'
        )}
      >
        {type.blurb}
      </p>

      {featured && (
        <span className="mt-auto pt-10 font-mono text-[10px] uppercase tracking-[0.2em] text-acid">
          Most common →
        </span>
      )}
    </Link>
  );
}
