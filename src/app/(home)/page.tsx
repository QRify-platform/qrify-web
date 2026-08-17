import { Hero } from './_components/Hero';
import { HomeCta } from './_components/HomeCta';
import { HowItWorks } from './_components/HowItWorks';
import { TypesBento } from './_components/TypesBento';
import { UseCases } from './_components/UseCases';

export default function Page() {
  return (
    <main className="bg-bone">
      <Hero />
      <TypesBento />
      <HowItWorks />
      <UseCases />
      <HomeCta />
    </main>
  );
}
