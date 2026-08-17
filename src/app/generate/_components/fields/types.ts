import type { QrFields, UpdateQrField } from '@/types';

/** Every field group in this folder is driven by the same two props. */
export type QrFieldGroupProps = {
  fields: QrFields;
  updateField: UpdateQrField;
};
