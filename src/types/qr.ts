/** The kinds of payload a QR code can encode. */
export type QrTypeId =
  | 'link'
  | 'text'
  | 'email'
  | 'call'
  | 'sms'
  | 'wifi'
  | 'whatsapp'
  | 'vcard';

export type WifiEncryption = 'WPA' | 'WEP' | 'nopass';

/** Every input the generator form can collect, across all QR types. */
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

/** Display metadata for a QR type, used by the picker and marketing pages. */
export type QrTypeMeta = {
  id: QrTypeId;
  label: string;
  blurb: string;
};

export type UpdateQrField = <K extends keyof QrFields>(
  key: K,
  value: QrFields[K]
) => void;
