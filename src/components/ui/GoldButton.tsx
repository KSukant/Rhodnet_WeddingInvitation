import type { ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface GoldButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'solid' | 'outline' | 'ghost-light';
}

const STYLES = {
  solid: 'bg-gradient-to-b from-[#C6A463] to-[#A5803D] text-ivory shadow-[0_10px_24px_-12px_rgba(120,80,20,.7)]',
  outline: 'border border-champagne bg-ivory/70 text-charcoal hover:bg-ivory',
  'ghost-light': 'border border-gold-soft/70 bg-transparent text-linen hover:bg-gold-soft/20'
};

/** The one button style used across the invitation. */
export function GoldButton({ variant = 'outline', className = '', children, ...rest }: GoldButtonProps) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`group relative overflow-hidden rounded-full px-7 py-3.5 font-sans text-[11px] font-medium uppercase tracking-[0.32em] transition-colors ${STYLES[variant]} ${className}`}
      {...rest}
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative">{children as ReactNode}</span>
    </motion.button>
  );
}
