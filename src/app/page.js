'use client';

import Link from 'next/link';
import QRMark from './components/QRMark';
import { TYPE_ICONS } from './components/TypeIcons';
import { QR_TYPES } from './lib/qrPayload';

const steps = [
  {
    n: '01',
    title: 'Pick a type',
    body: 'Link, text, email, call, SMS, Wi‑Fi, WhatsApp, or a contact card.',
  },
  {
    n: '02',
    title: 'Generate',
    body: 'Fill a couple of fields. Get a high-contrast PNG in seconds.',
  },
  {
    n: '03',
    title: 'Download',
    body: 'Save it and use it on print, packaging, or screen.',
  },
];

const uses = [
  {
    title: 'Menus & venues',
    body: 'Table tents that open the menu—or connect guests to Wi‑Fi.',
    tone: 'dark',
  },
  {
    title: 'Packaging',
    body: 'Point a product at care guides, warranty info, or support.',
    tone: 'light',
  },
  {
    title: 'Events',
    body: 'Flyers that share a map, schedule, or WhatsApp line.',
    tone: 'light',
  },
  {
    title: 'Networking',
    body: 'A vCard QR instead of another stack of business cards.',
    tone: 'neon',
  },
];

export default function Home() {
  return (
    <main className="bg-bone">
      <section className="relative overflow-hidden border-b border-soot/10">
        <div className="grid min-h-[calc(100svh-4.25rem)] lg:grid-cols-2">
          <div className="hero-paper relative flex flex-col justify-center px-5 py-16 sm:px-8 lg:px-12 xl:px-16">
            <div className="pointer-events-none absolute inset-0 grain opacity-50" />
            <div className="relative max-w-xl">
              <h1 className="animate-rise font-display text-[clamp(4rem,14vw,7.5rem)] font-extrabold leading-[0.85] tracking-[-0.05em] text-soot">
                QRify
              </h1>
              <p className="animate-rise-2 mt-8 max-w-[16ch] font-display text-[clamp(1.55rem,3.4vw,2.4rem)] font-medium leading-[1.12] tracking-[-0.025em] text-soot">
                Generate a QR. Download the file.
              </p>
              <p className="animate-rise-3 mt-5 max-w-[34ch] text-base leading-relaxed text-steel sm:text-lg">
                For links, Wi‑Fi, contacts, calls, and messages. No account
                required.
              </p>
              <div className="animate-rise-4 mt-10 flex flex-wrap items-center gap-5">
                <Link
                  href="/generate"
                  className="group inline-flex items-center gap-3 bg-soot px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-bone transition-colors hover:bg-acid hover:text-soot"
                >
                  Start generating
                  <span
                    className="h-2 w-2 bg-acid transition-colors group-hover:bg-soot"
                    aria-hidden
                  />
                </Link>
                <a
                  href="#types"
                  className="font-mono text-[11px] uppercase tracking-[0.18em] text-steel transition-colors hover:text-soot"
                >
                  Browse types
                </a>
              </div>
            </div>
          </div>

          <div className="relative flex min-h-[48vh] items-center justify-center overflow-hidden bg-soot lg:min-h-0">
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.1]"
              style={{
                backgroundImage:
                  'linear-gradient(#00f0c8 1px, transparent 1px), linear-gradient(90deg, #00f0c8 1px, transparent 1px)',
                backgroundSize: '52px 52px',
              }}
            />
            <div className="absolute left-0 top-0 h-full w-1.5 bg-acid" aria-hidden />

            <div className="animate-wipe relative w-[min(72%,22rem)] sm:w-[min(68%,26rem)]">
              <QRMark
                className="aspect-square w-full"
                fg="#00f0c8"
                bg="#07080b"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 h-px animate-scanline bg-bone/70"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Types — bento */}
      <section id="types" className="scroll-mt-24 border-b border-soot/10 bg-soot text-bone">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-acid">
                Types
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] sm:text-5xl">
                What you can make
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-bone/55">
                Each type formats the payload so phones know what to open.
              </p>
            </div>
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-acid transition-opacity hover:opacity-70"
            >
              Open generator
              <span aria-hidden>→</span>
            </Link>
          </div>

          <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {QR_TYPES.map((item, i) => {
              const Icon = TYPE_ICONS[item.id];
              const featured = i === 0;
              return (
                <li
                  key={item.id}
                  className={featured ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''}
                >
                  <Link
                    href={`/generate?type=${item.id}`}
                    className={`group flex h-full flex-col border border-bone/10 transition-colors hover:border-acid/60 hover:bg-slate ${
                      featured
                        ? 'bg-slate p-8 sm:min-h-[22rem] sm:p-10'
                        : 'bg-soot p-6 sm:p-7'
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center border border-acid/30 text-acid transition-colors group-hover:bg-acid group-hover:text-soot ${
                        featured ? 'h-14 w-14' : 'h-10 w-10'
                      }`}
                    >
                      {Icon && (
                        <Icon className={featured ? 'h-6 w-6' : 'h-5 w-5'} />
                      )}
                    </span>
                    <h3
                      className={`mt-6 font-display font-semibold ${
                        featured ? 'text-3xl sm:text-4xl' : 'text-lg'
                      }`}
                    >
                      {item.label}
                    </h3>
                    <p
                      className={`mt-3 leading-relaxed text-bone/50 ${
                        featured ? 'max-w-sm text-base' : 'text-sm'
                      }`}
                    >
                      {item.blurb}
                    </p>
                    {featured && (
                      <span className="mt-auto pt-10 font-mono text-[10px] uppercase tracking-[0.2em] text-acid">
                        Most common →
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* How — oversized steps */}
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
              {steps.map((step, i) => (
                <li
                  key={step.n}
                  className={`grid gap-4 border-t border-soot/10 py-8 sm:grid-cols-[7rem_1fr] sm:gap-8 sm:py-10 ${
                    i === steps.length - 1 ? 'border-b' : ''
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

      {/* Uses — contrast panels */}
      <section id="uses" className="scroll-mt-24 border-b border-soot/10">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-steel">
                Use cases
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] text-soot sm:text-5xl">
                Where these codes land
              </h2>
            </div>
            <Link
              href="/generate"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-steel transition-colors hover:text-soot"
            >
              Try it →
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {uses.map((item) => {
              const styles =
                item.tone === 'dark'
                  ? 'bg-soot text-bone border-soot'
                  : item.tone === 'neon'
                    ? 'bg-acid text-soot border-acid'
                    : 'bg-chalk text-soot border-transparent';

              return (
                <article
                  key={item.title}
                  className={`min-h-[14rem] border p-8 sm:min-h-[16rem] sm:p-10 ${styles}`}
                >
                  <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                    {item.title}
                  </h3>
                  <p
                    className={`mt-4 max-w-sm text-base leading-relaxed ${
                      item.tone === 'dark'
                        ? 'text-bone/55'
                        : item.tone === 'neon'
                          ? 'text-soot/75'
                          : 'text-steel'
                    }`}
                  >
                    {item.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-soot text-bone">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(ellipse_at_right,_rgba(0,240,200,0.18),_transparent_60%)]"
        />
        <div className="relative mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-10 px-5 py-20 sm:px-8 lg:flex-row lg:items-center lg:px-12 lg:py-32">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-acid">
              Generator
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-[-0.03em] sm:text-6xl">
              Ready to make one?
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-bone/55">
              Open the generator, pick a type, download the PNG.
            </p>
          </div>
          <Link
            href="/generate"
            className="inline-flex items-center gap-3 bg-acid px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-soot transition-colors hover:bg-bone"
          >
            Open generator
            <span className="h-2 w-2 bg-soot" aria-hidden />
          </Link>
        </div>
      </section>
    </main>
  );
}
