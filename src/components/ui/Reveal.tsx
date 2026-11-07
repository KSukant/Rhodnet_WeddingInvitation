import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { EASE } from '../../lib/motion';

/**
 * Scroll reveal shared by every section. The default 'paper' variant unfolds the element
 * from its top edge like a card coming out of an envelope, so the mail theme continues everywhere.
 */
export type RevealVariant = 'paper' | 'rise' | 'left' | 'right' | 'zoom';

const VARIANTS: Record<RevealVariant, Variants> = {
  paper: {
    hidden: { opacity: 0, rotateX: -72, y: 30, transformPerspective: 1100 },
    show: { opacity: 1, rotateX: 0, y: 0, transformPerspective: 1100 }
  },
  rise: { hidden: { opacity: 0, y: 28, filter: 'blur(6px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)' } },
  left: { hidden: { opacity: 0, x: -60, rotate: -2 }, show: { opacity: 1, x: 0, rotate: 0 } },
  right: { hidden: { opacity: 0, x: 60, rotate: 2 }, show: { opacity: 1, x: 0, rotate: 0 } },
  zoom: { hidden: { opacity: 0, scale: 0.86 }, show: { opacity: 1, scale: 1 } }
};

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'article';
}

export function Reveal({ children, variant = 'paper', delay = 0, className = '', as = 'div' }: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      style={variant === 'paper' ? { transformOrigin: '50% 0%' } : undefined}
      variants={VARIANTS[variant]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: EASE.paper, delay }}
    >
      {children}
    </Tag>
  );
}
