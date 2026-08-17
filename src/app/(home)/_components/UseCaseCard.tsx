import type { UseCaseTone } from '@/constants/home';
import { cn } from '@/lib/utils/cn';

type UseCaseCardProps = {
  title: string;
  body: string;
  tone: UseCaseTone;
};

const PANEL_CLASS: Record<UseCaseTone, string> = {
  dark: 'bg-soot text-bone border-soot',
  neon: 'bg-acid text-soot border-acid',
  light: 'bg-chalk text-soot border-transparent',
};

const BODY_CLASS: Record<UseCaseTone, string> = {
  dark: 'text-bone/55',
  neon: 'text-soot/75',
  light: 'text-steel',
};

export function UseCaseCard({ title, body, tone }: UseCaseCardProps) {
  return (
    <article
      className={cn(
        'min-h-[14rem] border p-8 sm:min-h-[16rem] sm:p-10',
        PANEL_CLASS[tone]
      )}
    >
      <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h3>
      <p className={cn('mt-4 max-w-sm text-base leading-relaxed', BODY_CLASS[tone])}>
        {body}
      </p>
    </article>
  );
}
