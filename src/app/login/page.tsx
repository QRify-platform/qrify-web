import { Suspense } from 'react';
import type { Metadata } from 'next';
import { AuthShell } from '@/components/auth/AuthShell';
import { LoginForm } from './_components/LoginForm';

export const metadata: Metadata = {
  title: 'Sign in',
};

export default function LoginPage() {
  return (
    <AuthShell>
      <Suspense fallback={<p className="text-bone/50">Loading…</p>}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
