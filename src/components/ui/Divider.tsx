type DividerProps = {
  label?: string;
};

export function Divider({ label = 'or' }: DividerProps) {
  return (
    <div className="my-8 flex items-center gap-4">
      <div className="h-px flex-1 bg-bone/12" />
      <span className="text-xs uppercase tracking-[0.18em] text-bone/40">
        {label}
      </span>
      <div className="h-px flex-1 bg-bone/12" />
    </div>
  );
}
