import { motion } from 'framer-motion';

/** Gold line with a small cross in the middle; the lines draw themselves when it scrolls into view. */
export function Ornament({ className = '', tone = 'gold' }: { className?: string; tone?: 'gold' | 'light' }) {
  const color = tone === 'gold' ? '#B39A68' : '#E6D3A3';
  return (
    <svg viewBox="0 0 220 20" className={`h-5 w-56 ${className}`} aria-hidden="true">
      {[
        'M100 10 H8',
        'M120 10 H212'
      ].map((d) => (
        <motion.path
          key={d}
          d={d}
          stroke={color}
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      ))}
      <motion.path
        d="M109.2 2h1.6v5.6H116v1.6h-5.2V18h-1.6V9.2H104V7.6h5.2z"
        fill={color}
        initial={{ scale: 0, rotate: -90 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 180, damping: 12, delay: 0.3 }}
        style={{ originX: '110px', originY: '10px' }}
      />
    </svg>
  );
}
