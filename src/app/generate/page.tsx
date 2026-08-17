import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Generator } from './_components/Generator';
import { PageLoader } from '@/components/ui/PageLoader';

export const metadata: Metadata = {
  title: 'Generate',
};

export default function GeneratePage() {
  return (
    <Suspense fallback={<PageLoader label="Loading generator…" />}>
      <Generator />
    </Suspense>
  );
}
