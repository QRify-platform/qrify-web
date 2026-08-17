import { TYPE_ICONS } from '@/components/icons/TypeIcons';
import { QR_TYPES, type QrTypeId } from '@/lib/qr';

type TypePickerProps = {
  type: QrTypeId;
  onSelect: (next: QrTypeId) => void;
};

export function TypePicker({ type, onSelect }: TypePickerProps) {
  return (
    <div role="tablist" aria-label="QR code type" className="mt-10 grid grid-cols-4 gap-2">
      {QR_TYPES.map((item) => {
        const active = type === item.id;
        const Icon = TYPE_ICONS[item.id];
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(item.id)}
            className={`flex flex-col items-center gap-2 border px-2 py-3 transition-colors ${
              active
                ? 'border-acid bg-soot text-acid'
                : 'border-soot/15 bg-bone text-steel hover:border-soot/35 hover:text-soot'
            }`}
          >
            <Icon className="h-5 w-5" />
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] sm:text-[10px]">
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
