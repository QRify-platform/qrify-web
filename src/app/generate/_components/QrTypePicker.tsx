import { TYPE_ICONS } from '@/components/icons/TypeIcons';
import { QR_TYPES } from '@/constants/qrTypes';
import { cn } from '@/lib/utils/cn';
import type { QrTypeId } from '@/types';

type QrTypePickerProps = {
  selected: QrTypeId;
  onSelect: (type: QrTypeId) => void;
};

export function QrTypePicker({ selected, onSelect }: QrTypePickerProps) {
  return (
    <div
      role="tablist"
      aria-label="QR code type"
      className="mt-10 grid grid-cols-4 gap-2"
    >
      {QR_TYPES.map((type) => {
        const active = type.id === selected;
        const Icon = TYPE_ICONS[type.id];

        return (
          <button
            key={type.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(type.id)}
            className={cn(
              'flex flex-col items-center gap-2 border px-2 py-3 transition-colors',
              active
                ? 'border-acid bg-soot text-acid'
                : 'border-soot/15 bg-bone text-steel hover:border-soot/35 hover:text-soot'
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] sm:text-[10px]">
              {type.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
