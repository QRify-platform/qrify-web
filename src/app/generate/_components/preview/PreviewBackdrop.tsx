const GLOW =
  'radial-gradient(ellipse 70% 55% at 50% 40%, rgba(0,240,200,0.14), transparent 60%), radial-gradient(ellipse 45% 40% at 85% 85%, rgba(0,240,200,0.08), transparent 55%), radial-gradient(ellipse 40% 35% at 10% 20%, rgba(0,240,200,0.06), transparent 50%)';

const GRID =
  'linear-gradient(rgba(0,240,200,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,200,0.07) 1px, transparent 1px)';

/** Decorative glow and grid behind the preview panel. */
export function PreviewBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <div className="absolute inset-0" style={{ background: GLOW }} />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{ backgroundImage: GRID, backgroundSize: '40px 40px' }}
      />
      <div className="absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-acid/20 blur-3xl" />
      <div className="absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-acid/12 blur-3xl" />
    </div>
  );
}
