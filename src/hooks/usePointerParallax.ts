import { useEffect } from 'react';
import { useMotionValue, useSpring, type MotionValue } from 'framer-motion';

/**
 * Smoothed pointer position from -1 to 1 on each axis (mouse on desktop, device tilt is not used
 * because browsers ask permission for it). Elements multiply these values for a parallax depth effect.
 */
export function usePointerParallax(enabled = true): { x: MotionValue<number>; y: MotionValue<number> } {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 60, damping: 18 });
  const y = useSpring(rawY, { stiffness: 60, damping: 18 });
  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      rawX.set((e.clientX / window.innerWidth) * 2 - 1);
      rawY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [enabled, rawX, rawY]);
  return { x, y };
}
