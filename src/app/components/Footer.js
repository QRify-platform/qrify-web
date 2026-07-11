import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-soot/10 bg-chalk">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-16">
        <div className="lg:col-span-5">
          <p className="font-display text-3xl font-bold tracking-tight text-soot">
            QRify
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-steel">
            Generate downloadable QR codes for links, Wi‑Fi, contacts, and more.
          </p>
        </div>

        <div className="flex flex-col gap-3 lg:col-span-3 lg:col-start-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel">
            Navigate
          </p>
          <Link href="/" className="text-sm text-soot hover:text-cobalt">
            Home
          </Link>
          <Link href="/#how" className="text-sm text-soot hover:text-cobalt">
            How it works
          </Link>
          <Link href="/#uses" className="text-sm text-soot hover:text-cobalt">
            Use cases
          </Link>
          <Link href="/generate" className="text-sm text-soot hover:text-cobalt">
            Generator
          </Link>
        </div>

        <div className="flex flex-col justify-between gap-6 lg:col-span-3">
          <Link
            href="/generate"
            className="inline-flex w-fit items-center gap-2 bg-soot px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-bone transition-colors hover:bg-acid hover:text-soot"
          >
            Open generator
            <span className="h-1.5 w-1.5 bg-acid" aria-hidden />
          </Link>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel">
            © {new Date().getFullYear()} QRify
          </p>
        </div>
      </div>
    </footer>
  );
}
