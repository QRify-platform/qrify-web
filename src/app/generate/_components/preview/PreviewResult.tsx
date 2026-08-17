import { Button } from '@/components/ui/Button';

type PreviewResultProps = {
  typeLabel: string;
  qrCodeUrl: string;
  saved: boolean;
  saving: boolean;
  authed: boolean;
  onSave: () => void;
};

export function PreviewResult({
  typeLabel,
  qrCodeUrl,
  saved,
  saving,
  authed,
  onSave,
}: PreviewResultProps) {
  return (
    <div className="relative z-10 flex w-full max-w-md flex-col items-center animate-rise">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/45">
        {typeLabel}
      </p>

      <div className="mt-6 border border-bone/10 bg-slate p-3 sm:p-4">
        {/* The API returns a data URL, which next/image cannot optimize. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={qrCodeUrl}
          alt="Generated QR code"
          width={512}
          height={512}
          className="aspect-square h-auto w-[min(100%,17rem)] sm:w-72"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a
          href={qrCodeUrl}
          download="qrify-code.png"
          className="inline-flex items-center gap-3 border border-acid bg-acid px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-soot transition-colors hover:bg-transparent hover:text-acid"
        >
          Download PNG
        </a>
        {saved ? (
          <span className="inline-flex items-center border border-bone/15 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/50">
            Saved
          </span>
        ) : (
          <Button variant="outlineLight" onClick={onSave} disabled={saving}>
            {saving ? 'Saving…' : authed ? 'Save to My codes' : 'Sign in to save'}
          </Button>
        )}
      </div>
    </div>
  );
}
