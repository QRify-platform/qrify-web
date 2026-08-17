'use client';

import { useQrGenerator } from '@/hooks/useQrGenerator';
import { GeneratorForm } from './GeneratorForm';
import { QrPreview } from './preview/QrPreview';

export function Generator() {
  const generator = useQrGenerator();

  return (
    <main className="min-h-[calc(100svh-4.25rem)] bg-bone lg:grid lg:grid-cols-2">
      <GeneratorForm
        type={generator.type}
        fields={generator.fields}
        generating={generator.generating}
        error={generator.error}
        authed={generator.authed}
        updateField={generator.updateField}
        onSelectType={generator.selectType}
        onSubmit={generator.generate}
      />
      <QrPreview
        type={generator.type}
        qrCodeUrl={generator.qrCodeUrl}
        generating={generator.generating}
        saved={generator.saved}
        saving={generator.saving}
        authed={generator.authed}
        onSave={() => void generator.save()}
      />
    </main>
  );
}
