'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  isInternalNavLink,
  NAV_PROGRESS_EVENT,
  type NavProgressPhase,
} from '@/lib/utils/navProgress';

/** Percentages the bar creeps to while we wait, so it never looks stalled. */
const CREEP_STEPS = [
  { at: 0, width: 18 },
  { at: 120, width: 42 },
  { at: 320, width: 68 },
  { at: 700, width: 82 },
] as const;

const EXIT_MS = 280;

type NavProgressState = {
  visible: boolean;
  width: number;
  finishing: boolean;
};

/**
 * Drives the loading bar: starts on internal link clicks or an explicit
 * `startNavProgress()`, and completes on route change or `doneNavProgress()`.
 */
export function useNavProgress(): NavProgressState {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(0);
  const [finishing, setFinishing] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const running = useRef(false);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const begin = useCallback(() => {
    clearTimers();
    running.current = true;
    setFinishing(false);
    setVisible(true);
    setWidth(0);

    requestAnimationFrame(() => {
      CREEP_STEPS.forEach(({ at, width: next }) => {
        if (at === 0) {
          setWidth(next);
          return;
        }
        timers.current.push(setTimeout(() => setWidth(next), at));
      });
    });
  }, [clearTimers]);

  const finish = useCallback(() => {
    if (!running.current) return;
    clearTimers();
    running.current = false;
    setWidth(100);
    setFinishing(true);
    timers.current.push(
      setTimeout(() => {
        setVisible(false);
        setFinishing(false);
        setWidth(0);
      }, EXIT_MS)
    );
  }, [clearTimers]);

  useEffect(() => {
    finish();
  }, [pathname, finish]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const anchor = (e.target as HTMLElement | null)?.closest?.('a') ?? null;
      if (isInternalNavLink(anchor)) begin();
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [begin]);

  useEffect(() => {
    const onPhase = (e: Event) => {
      const phase = (e as CustomEvent<{ phase?: NavProgressPhase }>).detail
        ?.phase;
      if (phase === 'start') begin();
      if (phase === 'done') finish();
    };

    window.addEventListener(NAV_PROGRESS_EVENT, onPhase);
    return () => window.removeEventListener(NAV_PROGRESS_EVENT, onPhase);
  }, [begin, finish]);

  useEffect(() => clearTimers, [clearTimers]);

  return { visible, width, finishing };
}
