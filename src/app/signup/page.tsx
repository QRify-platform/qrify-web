import { Suspense } from 'react';
import type { Metadata } from 'next';
import { AuthShell } from '@/components/auth/AuthShell';
import { SignupForm } from './SignupForm';

export const metadata: Metadata = {
  title: 'Create account',
};

export default function SignupPage() {
  return (
    <AuthShell>
      <Suspense fallback={<p className="text-bone/50">Loading…</p>}>
        <SignupForm />
      </Suspense>
    </AuthShell>
  );
}
