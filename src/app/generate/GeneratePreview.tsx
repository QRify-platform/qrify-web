import { QRMark } from '@/components/icons/QRMark';
import { Button } from '@/components/ui/Button';
import { QR_TYPES, type QrTypeId } from '@/lib/qr';

type GeneratePreviewProps = {
  type: QrTypeId;
  qrCodeUrl: string;
  loading: boolean;
  saved: boolean;
  saving: boolean;
  authed: boolean;
  onSave: () => void;
};

export function GeneratePreview({
  type,
  qrCodeUrl,
  loading,
  saved,
  saving,
  authed,
  onSave,
}: GeneratePreviewProps) {
  const typeLabel = QR_TYPES.find((t) => t.id === type)?.label || type;

  return (
    <section className="relative flex min-h-[28rem] items-center justify-center overflow-hidden bg-soot px-5 py-16 text-bone sm:px-8 lg:min-h-0 lg:px-12">
      <PreviewBackdrop />

      {loading ? (
        <PreviewLoading typeLabel={typeLabel} />
      ) : qrCodeUrl ? (
        <PreviewResult
          typeLabel={typeLabel}
          qrCodeUrl={qrCodeUrl}
          saved={saved}
          saving={saving}
          authed={authed}
          onSave={onSave}
        />
      ) : (
        <PreviewEmpty />
      )}
    </section>
  );
}

function PreviewBackdrop() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 40%, rgba(0,240,200,0.14), transparent 60%), radial-gradient(ellipse 45% 40% at 85% 85%, rgba(0,240,200,0.08), transparent 55%), radial-gradient(ellipse 40% 35% at 10% 20%, rgba(0,240,200,0.06), transparent 50%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,240,200,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,200,0.07) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-acid/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-acid/12 blur-3xl"
        aria-hidden
      />
    </>
  );
}

function PreviewLoading({ typeLabel }: { typeLabel: string }) {
  return (
    <div className="relative z-10 flex w-full max-w-sm flex-col items-center text-center animate-rise">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/45">
        Rendering · {typeLabel}
      </p>
      <div className="mt-8 aspect-square w-[min(100%,17rem)] border border-bone/10 bg-slate sm:w-72">
        <div className="flex h-full items-center justify-center">
          <div className="h-10 w-10 animate-pulse bg-bone/10" />
        </div>
      </div>
    </div>
  );
}

type PreviewResultProps = {
  typeLabel: string;
  qrCodeUrl: string;
  saved: boolean;
  saving: boolean;
  authed: boolean;
  onSave: () => void;
};

function PreviewResult({
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

function PreviewEmpty() {
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
