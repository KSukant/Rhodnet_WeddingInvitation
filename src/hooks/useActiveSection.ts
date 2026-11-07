import { useEffect, useState } from 'react';

/** Returns the id of the section that currently fills the middle of the screen. */
export function useActiveSection(ids: string[], enabled: boolean) {
  const [active, setActive] = useState<string>(ids[0] ?? '');
  useEffect(() => {
    if (!enabled) return;
    const update = () => {
      const mid = window.innerHeight * 0.45;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) {
          setActive(id);
          return;
        }
      }
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [ids, enabled]);
  return active;
}
