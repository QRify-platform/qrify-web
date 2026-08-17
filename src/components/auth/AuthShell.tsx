import type { ReactNode } from 'react';

type AuthShellProps = {
  children: ReactNode;
};

export function AuthShell({ children }: AuthShellProps) {
  return (
    <main className="relative min-h-[calc(100vh-0px)] overflow-hidden bg-soot text-bone">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-[28rem] w-[28rem] rounded-full bg-acid/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[22rem] w-[22rem] rounded-full bg-bone/5 blur-3xl" />
        <div className="grain opacity-40" />
      </div>
      <div className="relative mx-auto flex min-h-screen max-w-[1400px] items-center px-5 py-16 sm:px-8 lg:px-12">
        {children}
      </div>
    </main>
  );
}
