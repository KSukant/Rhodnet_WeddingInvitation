/**
 * One clock for a multi-step animation: every step is scheduled from the same start time
 * (driven by requestAnimationFrame) and the whole sequence can be cancelled at once.
 */
export interface Timeline {
  at: (ms: number, fn: () => void) => Timeline;
  cancel: () => void;
}

export function createTimeline(): Timeline {
  const start = performance.now();
  const steps: { ms: number; fn: () => void; done: boolean }[] = [];
  let raf = 0;
  let cancelled = false;

  const tick = (now: number) => {
    if (cancelled) return;
    const t = now - start;
    let pending = false;
    for (const s of steps) {
      if (s.done) continue;
      if (t >= s.ms) {
        s.done = true;
        s.fn();
      } else pending = true;
    }
    if (pending) raf = requestAnimationFrame(tick);
  };

  const api: Timeline = {
    at(ms, fn) {
      steps.push({ ms, fn, done: false });
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
      return api;
    },
    cancel() {
      cancelled = true;
      cancelAnimationFrame(raf);
    }
  };
  return api;
}
