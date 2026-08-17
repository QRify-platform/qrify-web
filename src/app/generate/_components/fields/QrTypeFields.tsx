import type { ComponentType } from 'react';
import type { QrTypeId } from '@/types';
import { CallFields } from './CallFields';
import { EmailFields } from './EmailFields';
import { LinkFields } from './LinkFields';
import { SmsFields } from './SmsFields';
import { TextFields } from './TextFields';
import { VCardFields } from './VCardFields';
import { WhatsAppFields } from './WhatsAppFields';
import { WifiFields } from './WifiFields';
import type { QrFieldGroupProps } from './types';

const FIELD_GROUPS: Record<QrTypeId, ComponentType<QrFieldGroupProps>> = {
  link: LinkFields,
  text: TextFields,
  email: EmailFields,
  call: CallFields,
  sms: SmsFields,
  wifi: WifiFields,
  whatsapp: WhatsAppFields,
  vcard: VCardFields,
};

type QrTypeFieldsProps = QrFieldGroupProps & {
  type: QrTypeId;
};

/** Renders the inputs that belong to the selected QR type. */
export function QrTypeFields({ type, ...props }: QrTypeFieldsProps) {
  const Fields = FIELD_GROUPS[type];
  return <Fields {...props} />;
}
