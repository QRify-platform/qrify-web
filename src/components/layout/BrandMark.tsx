import Link from 'next/link';
import { ROUTES } from '@/lib/routes';

export function BrandMark({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href={ROUTES.home}
      className="group flex items-center gap-3"
      onClick={onClick}
    >
      <span className="relative flex h-8 w-8 items-center justify-center border border-acid/40 bg-slate">
        <span className="h-2.5 w-2.5 bg-acid transition-transform duration-200 group-hover:scale-125" />
      </span>
      <span className="font-display text-lg font-bold tracking-tight">
        QRify
      </span>
    </Link>
  );
}
