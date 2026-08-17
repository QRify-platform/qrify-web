import { Button } from '@/components/ui/Button';
import type { SavedQrCode } from '@/types';

type SavedCodeCardProps = {
  code: SavedQrCode;
  deleting: boolean;
  onDelete: () => void;
};

export function SavedCodeCard({ code, deleting, onDelete }: SavedCodeCardProps) {
  return (
    <li className="flex flex-col gap-3 border border-soot/15 bg-bone p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="truncate font-mono text-xs text-steel">
          {code.created_at}
        </p>
        <p className="mt-1 truncate text-sm text-soot">{code.source_url}</p>
      </div>

      <div className="flex shrink-0 gap-2">
        <a
          href={code.download_url || code.qr_code_url}
          target="_blank"
          rel="noreferrer"
          className="border border-soot/20 px-3 py-2 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-soot hover:border-acid hover:text-acid"
        >
          Download
        </a>
        <Button variant="danger" onClick={onDelete} disabled={deleting}>
          {deleting ? 'Deleting…' : 'Delete'}
        </Button>
      </div>
    </li>
  );
}
