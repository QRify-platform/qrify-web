type AuthHeadingProps = {
  title: string;
  subtitle: string;
  kicker?: string;
};

export function AuthHeading({
  title,
  subtitle,
  kicker = 'QRify',
}: AuthHeadingProps) {
  return (
    <>
      <p className="font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-[0.22em] text-acid">
        {kicker}
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-bone sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-bone/55">{subtitle}</p>
    </>
  );
}
