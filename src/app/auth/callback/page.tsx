import { Suspense } from 'react';
import type { Metadata } from 'next';
import { PageLoader } from '@/components/ui/PageLoader';
import { AuthCallback } from './AuthCallback';

export const metadata: Metadata = {
  title: 'Signing in',
};

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <AuthCallback />
    </Suspense>
  );
}
