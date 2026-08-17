import type { Metadata } from 'next';
import { Suspense } from 'react';
import { OauthCallback } from './_components/OauthCallback';
import { PageLoader } from '@/components/ui/PageLoader';

export const metadata: Metadata = {
  title: 'Signing in',
};

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <OauthCallback />
    </Suspense>
  );
}
