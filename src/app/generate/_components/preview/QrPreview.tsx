import { qrTypeLabel } from '@/lib/qr';
import type { QrTypeId } from '@/types';
import { PreviewBackdrop } from './PreviewBackdrop';
import { PreviewEmpty } from './PreviewEmpty';
import { PreviewLoading } from './PreviewLoading';
import { PreviewResult } from './PreviewResult';

type QrPreviewProps = {
  type: QrTypeId;
  qrCodeUrl: string;
  generating: boolean;
  saved: boolean;
  saving: boolean;
  authed: boolean;
  onSave: () => void;
};

/** Right half of the generate page: empty, loading, or the rendered code. */
export function QrPreview({
  type,
  qrCodeUrl,
  generating,
  saved,
  saving,
  authed,
  onSave,
}: QrPreviewProps) {
  const typeLabel = qrTypeLabel(type);

  return (
    <section className="relative flex min-h-[28rem] items-center justify-center overflow-hidden bg-soot px-5 py-16 text-bone sm:px-8 lg:min-h-0 lg:px-12">
      <PreviewBackdrop />

      {generating ? (
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
