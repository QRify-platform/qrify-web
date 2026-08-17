type PageLoaderProps = {
  label?: string;
};

export function PageLoader({ label = 'Loading…' }: PageLoaderProps) {
  return (
    <main className="flex min-h-[calc(100svh-4.25rem)] items-center justify-center bg-bone">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel">
        {label}
      </p>
    </main>
  );
}
