import { QR_TYPES } from '@/constants/qrTypes';
import type { QrFields, QrTypeId } from '@/types';

export function isQrTypeId(value: string | null | undefined): value is QrTypeId {
  return QR_TYPES.some((type) => type.id === value);
}

export function qrTypeLabel(id: QrTypeId): string {
  return QR_TYPES.find((type) => type.id === id)?.label ?? id;
}

/** Wi-Fi starts on WPA because that is what almost every network uses. */
export function initialFields(type: QrTypeId): QrFields {
  return type === 'wifi' ? { encryption: 'WPA' } : {};
}
