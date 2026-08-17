'use client';

import { useEffect } from 'react';

/** Stops the page behind an open overlay from scrolling. */
export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    document.body.style.overflow = locked ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [locked]);
}
