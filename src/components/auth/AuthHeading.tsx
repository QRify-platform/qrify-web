'use client';

import { GoogleMark } from '@/components/icons/GoogleMark';

type GoogleButtonProps = {
  busy: boolean;
  onClick: () => void;
};

export function GoogleButton({ busy, onClick }: GoogleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className="mt-8 flex w-full items-center justify-center gap-3 rounded-sm border border-bone/15 bg-bone px-4 py-3 text-sm font-semibold text-soot transition hover:bg-chalk disabled:opacity-60"
    >
      <GoogleMark />
      Continue with Google
    </button>
  );
}

export function AuthHeading({
  kicker = 'QRify',
  title,
  subtitle,
}: {
  kicker?: string;
  title: string;
  subtitle: string;
}) {
  return (
    <>
      <p className="font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-[0.22em] text-acid">
        {kicker}
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-bone sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-bone/55">{subtitle}</p>
    </>
  );
}
