import { Button } from '@/components/ui/Button';
import type { SavedQrCode } from '@/lib/api';

type CodeCardProps = {
  item: SavedQrCode;
  deleting: boolean;
  onDelete: (id: string) => void;
};

export function CodeCard({ item, deleting, onDelete }: CodeCardProps) {
  return (
    <li className="flex flex-col gap-3 border border-soot/15 bg-bone p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="truncate font-mono text-xs text-steel">{item.created_at}</p>
        <p className="mt-1 truncate text-sm text-soot">{item.source_url}</p>
      </div>
      <div className="flex shrink-0 gap-2">
        <a
          href={item.download_url || item.qr_code_url}
          target="_blank"
          rel="noreferrer"
          className="border border-soot/20 px-3 py-2 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-soot hover:border-acid hover:text-acid"
        >
          Download
        </a>
        <Button
          variant="danger"
          onClick={() => onDelete(item.id)}
          disabled={deleting}
        >
          {deleting ? 'Deleting…' : 'Delete'}
        </Button>
      </div>
    </li>
  );
}
