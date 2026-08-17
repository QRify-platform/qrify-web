import { Hero } from './_home/Hero';
import { HomeCta } from './_home/HomeCta';
import { HowItWorks } from './_home/HowItWorks';
import { TypesBento } from './_home/TypesBento';
import { UseCases } from './_home/UseCases';

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
