export const QR_TYPE_IDS = [
  'link',
  'text',
  'email',
  'call',
  'sms',
  'wifi',
  'whatsapp',
  'vcard',
] as const;

export type QrTypeId = (typeof QR_TYPE_IDS)[number];

export type WifiEncryption = 'WPA' | 'WEP' | 'nopass';

export type QrFields = {
  url?: string;
  text?: string;
  email?: string;
  subject?: string;
  body?: string;
  phone?: string;
  message?: string;
  ssid?: string;
  password?: string;
  encryption?: WifiEncryption;
  hidden?: boolean;
  name?: string;
  org?: string;
};

export type QrTypeMeta = {
  id: QrTypeId;
  label: string;
  blurb: string;
};

export function isQrTypeId(value: string | null | undefined): value is QrTypeId {
  return QR_TYPE_IDS.includes(value as QrTypeId);
}

export function initialFields(type: QrTypeId): QrFields {
  return type === 'wifi' ? { encryption: 'WPA' } : {};
}
