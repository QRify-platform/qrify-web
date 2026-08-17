import type { QrFields, QrTypeId } from '@/types';

/** Wi-Fi payloads treat \ ; , : and " as delimiters, so they must be escaped. */
function escapeWifi(value: unknown): string {
  return String(value ?? '').replace(/([\\;,:"])/g, '\\$1');
}

function digitsOnly(value: unknown): string {
  return String(value ?? '').replace(/\D/g, '');
}

/** Formats the form values into the string a phone knows how to open. */
export function buildQrPayload(type: QrTypeId, fields: QrFields): string {
  switch (type) {
    case 'link':
      return (fields.url || '').trim();

    case 'text':
      return (fields.text || '').trim();

    case 'email': {
      const email = (fields.email || '').trim();
      const params = new URLSearchParams();
      if (fields.subject?.trim()) params.set('subject', fields.subject.trim());
      if (fields.body?.trim()) params.set('body', fields.body.trim());
      const query = params.toString();
      return `mailto:${email}${query ? `?${query}` : ''}`;
    }

    case 'call':
      return `tel:${digitsOnly(fields.phone)}`;

    case 'sms': {
      const phone = digitsOnly(fields.phone);
      const message = (fields.message || '').trim();
      return message
        ? `sms:${phone}?body=${encodeURIComponent(message)}`
        : `sms:${phone}`;
    }

    case 'wifi': {
      const ssid = escapeWifi(fields.ssid?.trim());
      const password = escapeWifi(fields.password ?? '');
      const encryption = fields.encryption || 'WPA';
      const hidden = fields.hidden ? 'H:true;' : '';
      return `WIFI:T:${encryption};S:${ssid};P:${password};${hidden};`;
    }

    case 'whatsapp': {
      const phone = digitsOnly(fields.phone);
      const message = (fields.message || '').trim();
      return message
        ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
        : `https://wa.me/${phone}`;
    }

    case 'vcard': {
      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${(fields.name || '').trim()}`,
      ];
      if (fields.org?.trim()) lines.push(`ORG:${fields.org.trim()}`);
      if (fields.phone?.trim()) lines.push(`TEL:${fields.phone.trim()}`);
      if (fields.email?.trim()) lines.push(`EMAIL:${fields.email.trim()}`);
      if (fields.url?.trim()) lines.push(`URL:${fields.url.trim()}`);
      lines.push('END:VCARD');
      return lines.join('\n');
    }

    default:
      return '';
  }
}

/** True when the required fields for this type are filled in. */
export function isPayloadReady(type: QrTypeId, fields: QrFields): boolean {
  switch (type) {
    case 'link':
      return Boolean(fields.url?.trim());
    case 'text':
      return Boolean(fields.text?.trim());
    case 'email':
      return Boolean(fields.email?.trim());
    case 'call':
    case 'sms':
    case 'whatsapp':
      return digitsOnly(fields.phone).length >= 7;
    case 'wifi':
      return Boolean(fields.ssid?.trim());
    case 'vcard':
      return Boolean(fields.name?.trim());
    default:
      return false;
  }
}
