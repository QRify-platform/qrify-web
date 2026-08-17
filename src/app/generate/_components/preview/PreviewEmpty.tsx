import { QRMark } from '@/components/icons/QRMark';

export function PreviewEmpty() {
  return (
    <div className="relative z-10 w-full max-w-xs text-center">
      <div className="mx-auto flex aspect-square w-48 items-center justify-center border border-dashed border-bone/15 bg-slate">
        <QRMark className="aspect-square w-28 opacity-40" bg="#151820" fg="#5c6370" />
      </div>
      <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/35">
        Preview appears here
      </p>
    </div>
  );
}
