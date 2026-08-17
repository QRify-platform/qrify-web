import { Suspense } from 'react';
import type { Metadata } from 'next';
import { PageLoader } from '@/components/ui/PageLoader';
import { GenerateWorkspace } from './GenerateWorkspace';

export const metadata: Metadata = {
  title: 'Generate',
};

export default function GeneratePage() {
  return (
    <Suspense fallback={<PageLoader label="Loading generator…" />}>
      <GenerateWorkspace />
    </Suspense>
  );
}
