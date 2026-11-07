import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { runSparkBurst } from '../../../lib/sparks';
import { STAGE } from './stages';

interface LightBurstProps {
  stage: number;
  origin: { x: number; y: number };
}

/**
 * The bright golden light that carries the guest from the envelope into the hero:
 * glow, rotating rays, a light streak, sparkles and a bloom that fills the screen, then fades.
 */
export function LightBurst({ stage, origin }: LightBurstProps) {
  const sparksRef = useRef<HTMLCanvasElement | null>(null);
  const bursting = stage >= STAGE.burst;
  const fading = stage >= STAGE.fade;

  useEffect(() => {
    if (!bursting || !sparksRef.current) return;
    return runSparkBurst(sparksRef.current, origin.x, origin.y);
  }, [bursting, origin.x, origin.y]);

  if (stage < STAGE.glow || stage >= STAGE.done) return null;
  const at = `${origin.x}px ${origin.y}px`;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute inset-0"
        style={{ background: `radial-gradient(circle at ${at}, rgba(255,236,190,.85) 0, rgba(255,236,190,0) 32%)` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: fading ? 0 : 0.6 }}
        transition={{ duration: 0.5 }}
      />
      {bursting && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: `repeating-conic-gradient(from 0deg at ${at}, rgba(232,200,130,0) 0deg 4deg, rgba(232,200,130,.5) 5deg 6deg, rgba(232,200,130,0) 7deg 12deg)`,
            WebkitMaskImage: `radial-gradient(circle at ${at}, #000 0, #000 12%, transparent 58%)`,
            maskImage: `radial-gradient(circle at ${at}, #000 0, #000 12%, transparent 58%)`,
            transformOrigin: at
          }}
          initial={{ opacity: 0, rotate: 0, scale: 0.6 }}
          animate={{ opacity: [0, 0.7, 0], rotate: 12, scale: 1.35 }}
          transition={{ duration: 1, ease: 'easeOut', times: [0, 0.35, 1] }}
        />
      )}
      {bursting && (
        <motion.div
          className="absolute rounded-full"
          style={{
            left: origin.x,
            top: origin.y,
            width: '300vmax',
            height: '300vmax',
            marginLeft: '-150vmax',
            marginTop: '-150vmax',
            background: 'radial-gradient(circle, #FFFDF6 0%, #FFF9EC 46%, rgba(248,235,203,.85) 54%, rgba(248,235,203,0) 64%)'
          }}
          initial={{ scale: 0.02, opacity: 0 }}
          animate={fading ? { scale: 1.12, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={fading ? { duration: 1.7, ease: [0.45, 0, 0.25, 1] } : { duration: 0.85, ease: [0.7, 0, 0.25, 1], opacity: { duration: 0.17 } }}
        />
      )}
      {bursting && (
        <motion.div
          className="absolute inset-x-0 h-[3px] -translate-y-1/2 bg-gradient-to-r from-transparent via-[rgba(255,240,205,.95)] to-transparent blur-[1px]"
          style={{ top: origin.y }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1.2, opacity: [0, 0.55, 0] }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        />
      )}
      <canvas ref={sparksRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
