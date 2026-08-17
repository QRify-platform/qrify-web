import Link from 'next/link';
import { QRMark } from '@/components/icons/QRMark';
import { ROUTES } from '@/constants/routes';

export function Hero() {
  return (
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
                href={ROUTES.generate}
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
            <QRMark className="aspect-square w-full" fg="#00f0c8" bg="#07080b" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 h-px animate-scanline bg-bone/70"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
