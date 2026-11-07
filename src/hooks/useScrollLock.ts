import { useEffect } from 'react';

/** Locks page scrolling while `locked` is true (used before the envelope is opened). */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('is-locked', locked);
    return () => root.classList.remove('is-locked');
  }, [locked]);
}
