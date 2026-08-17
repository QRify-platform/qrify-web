'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  NAV_PROGRESS_EVENT,
  type NavProgressPhase,
} from '@/lib/nav-progress';

function isInternalNavLink(anchor: HTMLAnchorElement | null): boolean {
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

/**
 * Thin acid bar flush under the sticky navbar (YouTube / NProgress style).
 */
export function NavigationProgress() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(0);
  const [finishing, setFinishing] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const active = useRef(false);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const finish = () => {
    if (!active.current && width === 0) return;
    clearTimers();
    active.current = false;
    setWidth(100);
    setFinishing(true);
    timers.current.push(
      setTimeout(() => {
        setVisible(false);
        setFinishing(false);
        setWidth(0);
      }, 280)
    );
  };

  const begin = () => {
    clearTimers();
    active.current = true;
    setFinishing(false);
    setVisible(true);
    setWidth(0);
    requestAnimationFrame(() => {
      setWidth(18);
      timers.current.push(setTimeout(() => setWidth(42), 120));
      timers.current.push(setTimeout(() => setWidth(68), 320));
      timers.current.push(setTimeout(() => setWidth(82), 700));
    });
  };

  useEffect(() => {
    if (active.current) finish();
    // Route change is the signal to complete; finish closes over latest width.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.('a') ?? null;
      if (isInternalNavLink(anchor)) begin();
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onProgress = (e: Event) => {
      const phase = (e as CustomEvent<{ phase?: NavProgressPhase }>).detail
        ?.phase;
      if (phase === 'start') begin();
      if (phase === 'done') finish();
    };
    window.addEventListener(NAV_PROGRESS_EVENT, onProgress);
    return () => window.removeEventListener(NAV_PROGRESS_EVENT, onProgress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => clearTimers, []);

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[60] h-[2px] overflow-hidden"
      aria-hidden
    >
      <div
        className={`h-full origin-left bg-acid shadow-[0_0_12px_rgba(0,240,200,0.9)] transition-[width,opacity] ease-out ${
          finishing ? 'duration-200' : 'duration-500'
        } ${visible ? 'opacity-100' : 'opacity-0'}`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
