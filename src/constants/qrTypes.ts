import type { QrTypeMeta } from '@/types';

export const QR_TYPES: readonly QrTypeMeta[] = [
  { id: 'link', label: 'Link', blurb: 'Opens a webpage when scanned.' },
  { id: 'text', label: 'Text', blurb: 'Shows a short note or message.' },
  {
    id: 'email',
    label: 'Email',
    blurb: 'Starts a draft to an address you set.',
  },
  { id: 'call', label: 'Call', blurb: 'Dials a phone number.' },
  { id: 'sms', label: 'SMS', blurb: 'Opens a text, with optional prefills.' },
  { id: 'wifi', label: 'Wi‑Fi', blurb: 'Shares network name and password.' },
  { id: 'whatsapp', label: 'WhatsApp', blurb: 'Opens a chat to your number.' },
  { id: 'vcard', label: 'vCard', blurb: 'Saves a contact to their phone.' },
];
