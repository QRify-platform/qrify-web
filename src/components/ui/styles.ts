/** Form controls render on the light marketing pages and the dark auth pages. */
export type FieldTone = 'light' | 'dark';

export const CONTROL_CLASS: Record<FieldTone, string> = {
  light:
    'mt-2 w-full border border-soot/15 bg-bone px-4 py-3 font-mono text-sm text-soot outline-none transition-colors placeholder:text-steel/40 focus:border-acid',
  dark: 'mt-2 w-full rounded-sm border border-bone/15 bg-soot/60 px-3 py-3 text-sm text-bone outline-none transition placeholder:text-bone/30 focus:border-acid/50 focus:ring-2 focus:ring-acid/25',
};

export const LABEL_CLASS: Record<FieldTone, string> = {
  light: 'font-mono text-[10px] uppercase tracking-[0.2em] text-steel',
  dark: 'text-xs font-medium uppercase tracking-[0.14em] text-bone/45',
};
