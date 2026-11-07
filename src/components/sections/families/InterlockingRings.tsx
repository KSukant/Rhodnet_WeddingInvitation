import { motion } from 'framer-motion';
import { useMemo } from 'react';

/** Two gold rings that draw themselves, slide together and lock, with a small burst of light. */
export function InterlockingRings({ play, delay }: { play: boolean; delay: number }) {
  const sparks = useMemo(() => Array.from({ length: 12 }, (_, i) => (i / 12) * Math.PI * 2), []);
  return (
    <svg viewBox="0 0 120 70" className="h-16 w-28 overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="ring-gold" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#F4E3B5" />
          <stop offset=".5" stopColor="#B39A68" />
          <stop offset="1" stopColor="#E6D3A3" />
        </linearGradient>
      </defs>
      {[{ cx: 47, from: -26 }, { cx: 73, from: 26 }].map((r, i) => (
        <motion.circle
          key={r.cx}
          cx={r.cx}
          cy={36}
          r={22}
          fill="none"
          stroke="url(#ring-gold)"
          strokeWidth={3}
          initial={{ pathLength: 0, x: r.from, opacity: 0 }}
          animate={play ? { pathLength: 1, x: 0, opacity: 1 } : undefined}
          transition={{ pathLength: { duration: 1, delay: delay + i * 0.15 }, x: { type: 'spring', stiffness: 90, damping: 12, delay: delay + 0.9 }, opacity: { duration: 0.2, delay } }}
        />
      ))}
      {sparks.map((a) => (
        <motion.circle
          key={a}
          cx={60}
          cy={36}
          r={1.6}
          fill="#F4E3B5"
          initial={{ opacity: 0, cx: 60, cy: 36 }}
          animate={play ? { opacity: [0, 1, 0], cx: [60, 60 + Math.cos(a) * 46], cy: [36, 36 + Math.sin(a) * 34] } : undefined}
          transition={{ duration: 0.9, delay: delay + 1.5, ease: 'easeOut' }}
        />
      ))}
    </svg>
  );
}
