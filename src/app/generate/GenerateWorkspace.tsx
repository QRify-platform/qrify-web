'use client';

import { Alert } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';
import { GeneratePreview } from './GeneratePreview';
import { GenerateTypeFields } from './GenerateTypeFields';
import { SignInBanner } from './SignInBanner';
import { TypePicker } from './TypePicker';
import { useGenerateQr } from './useGenerateQr';

export function GenerateWorkspace() {
  const {
    type,
    fields,
    qrCodeUrl,
    loading,
    saving,
    saved,
    error,
    authed,
    updateField,
    selectType,
    handleSubmit,
    handleSave,
  } = useGenerateQr();

  return (
    <main className="min-h-[calc(100svh-4.25rem)] bg-bone lg:grid lg:min-h-[calc(100svh-4.25rem)] lg:grid-cols-2">
      <section className="flex flex-col justify-center border-b border-soot/10 px-5 py-12 sm:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-16 xl:pl-[max(3rem,calc((100vw-1400px)/2+3rem))]">
        <h1 className="font-display text-4xl font-bold tracking-[-0.03em] text-soot sm:text-5xl">
          What should this
          <br />
          code do?
        </h1>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-steel">
          Choose a type, generate a PNG, save only if you want.
        </p>

        {!authed && <SignInBanner />}

        <TypePicker type={type} onSelect={selectType} />

        <form onSubmit={handleSubmit} className="mt-8 max-w-lg space-y-5">
          <GenerateTypeFields
            type={type}
            fields={fields}
            updateField={updateField}
          />

          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Rendering…' : 'Generate QR code'}
            {!loading && <span className="h-2 w-2 bg-acid" aria-hidden />}
          </Button>

          {error && <Alert>{error}</Alert>}
        </form>
      </section>

      <GeneratePreview
        type={type}
        qrCodeUrl={qrCodeUrl}
        loading={loading}
        saved={saved}
        saving={saving}
        onSave={() => void handleSave()}
        authed={authed}
      />
    </main>
  );
}
