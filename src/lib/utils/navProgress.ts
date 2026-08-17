export const NAV_PROGRESS_EVENT = 'qrify:nav-progress';

export type NavProgressPhase = 'start' | 'done';

function emit(phase: NavProgressPhase): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(NAV_PROGRESS_EVENT, { detail: { phase } }));
}

export function startNavProgress(): void {
  emit('start');
}

export function doneNavProgress(): void {
  emit('done');
}

/** True for same-origin links that will actually change the current page. */
export function isInternalNavLink(anchor: HTMLAnchorElement | null): boolean {
  if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) {
    return false;
  }

  const href = anchor.getAttribute('href');
  if (
    !href ||
    href.startsWith('#') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  ) {
    return false;
  }

  try {
    const url = new URL(href, window.location.origin);
    return (
      url.origin === window.location.origin &&
      url.pathname !== window.location.pathname
    );
  } catch {
    return false;
  }
}
