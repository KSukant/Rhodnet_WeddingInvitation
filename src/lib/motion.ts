import type { Transition } from 'framer-motion';

/** shared easings so every section moves with the same feel */
export const EASE = {
  out: [0.2, 0.7, 0.2, 1] as const,
  inOut: [0.65, 0, 0.25, 1] as const,
  paper: [0.3, 0.75, 0.25, 1] as const
};

export const spring: Transition = { type: 'spring', stiffness: 120, damping: 18, mass: 0.9 };

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
