export const HOW_STEPS = [
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
] as const;

export type UseCaseTone = 'dark' | 'light' | 'neon';

export const USE_CASES: readonly {
  title: string;
  body: string;
  tone: UseCaseTone;
}[] = [
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
