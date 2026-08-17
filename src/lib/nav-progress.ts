const EVENT = 'qrify:nav-progress';

export type NavProgressPhase = 'start' | 'done';

export function startNavProgress(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent(EVENT, { detail: { phase: 'start' satisfies NavProgressPhase } })
  );
}

export function doneNavProgress(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent(EVENT, { detail: { phase: 'done' satisfies NavProgressPhase } })
  );
}

export const NAV_PROGRESS_EVENT = EVENT;
