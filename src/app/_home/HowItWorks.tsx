import { HOW_STEPS } from './content';

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-24 border-b border-soot/10 bg-bone">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-steel">
              How it works
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] text-soot sm:text-5xl">
              Three steps
            </h2>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-steel">
              No dashboard. No account wall. Just the code you need.
            </p>
          </div>

          <ol className="space-y-0">
            {HOW_STEPS.map((step, i) => (
              <li
                key={step.n}
                className={`grid gap-4 border-t border-soot/10 py-8 sm:grid-cols-[7rem_1fr] sm:gap-8 sm:py-10 ${
                  i === HOW_STEPS.length - 1 ? 'border-b' : ''
                }`}
              >
                <span className="font-display text-5xl font-bold leading-none text-acid sm:text-6xl">
                  {step.n}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-soot">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-md text-base leading-relaxed text-steel">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
