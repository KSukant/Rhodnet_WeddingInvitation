import { motion } from 'framer-motion';
import { useMemo } from 'react';

/** A few tiny floating specks of gold light (hero and thank-you backgrounds). */
export function GoldDust({ count = 16 }: { count?: number }) {
  const specks = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 1 + Math.random() * 2.4,
        duration: 14 + Math.random() * 16,
        delay: Math.random() * 10,
        drift: -60 + Math.random() * 120,
        opacity: 0.25 + Math.random() * 0.4
      })),
    [count]
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {specks.map((s) => (
        <motion.i
          key={s.id}
          className="absolute -bottom-3 rounded-full bg-[#FFECC4] shadow-[0_0_6px_rgba(255,220,160,.8)]"
          style={{ left: `${s.left}%`, width: s.size, height: s.size }}
          animate={{ y: ['0vh', '-110vh'], x: [0, s.drift], opacity: [0, s.opacity, s.opacity, 0] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'linear', times: [0, 0.15, 0.85, 1] }}
        />
      ))}
    </div>
  );
}
