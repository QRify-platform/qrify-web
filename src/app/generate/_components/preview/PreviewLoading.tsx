type PreviewLoadingProps = {
  typeLabel: string;
};

export function PreviewLoading({ typeLabel }: PreviewLoadingProps) {
  return (
    <div className="relative z-10 flex w-full max-w-sm flex-col items-center text-center animate-rise">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/45">
        Rendering · {typeLabel}
      </p>
      <div className="mt-8 aspect-square w-[min(100%,17rem)] border border-bone/10 bg-slate sm:w-72">
        <div className="flex h-full items-center justify-center">
          <div className="h-10 w-10 animate-pulse bg-bone/10" />
        </div>
      </div>
    </div>
  );
}
