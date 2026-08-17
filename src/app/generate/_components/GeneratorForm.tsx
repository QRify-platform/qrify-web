import type { FormEvent } from 'react';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import type { QrFields, QrTypeId, UpdateQrField } from '@/types';
import { QrTypeFields } from './fields/QrTypeFields';
import { QrTypePicker } from './QrTypePicker';
import { SignInNotice } from './SignInNotice';

type GeneratorFormProps = {
  type: QrTypeId;
  fields: QrFields;
  generating: boolean;
  error: string;
  authed: boolean;
  updateField: UpdateQrField;
  onSelectType: (type: QrTypeId) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

/** Left half of the generate page: type picker plus the fields for that type. */
export function GeneratorForm({
  type,
  fields,
  generating,
  error,
  authed,
  updateField,
  onSelectType,
  onSubmit,
}: GeneratorFormProps) {
  return (
    <section className="flex flex-col justify-center border-b border-soot/10 px-5 py-12 sm:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-16 xl:pl-[max(3rem,calc((100vw-1400px)/2+3rem))]">
      <h1 className="font-display text-4xl font-bold tracking-[-0.03em] text-soot sm:text-5xl">
        What should this
        <br />
        code do?
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-steel">
        Choose a type, generate a PNG, save only if you want.
      </p>

      {!authed && <SignInNotice />}

      <QrTypePicker selected={type} onSelect={onSelectType} />

      <form onSubmit={onSubmit} className="mt-8 max-w-lg space-y-5">
        <QrTypeFields type={type} fields={fields} updateField={updateField} />
        <Button type="submit" variant="primary" disabled={generating}>
          {generating ? 'Rendering…' : 'Generate QR code'}
          {!generating && <span className="h-2 w-2 bg-acid" aria-hidden />}
        </Button>
        {error && <Alert>{error}</Alert>}
      </form>
    </section>
  );
}
