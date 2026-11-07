import { motion } from 'framer-motion';
import type { Photo } from '../../types/wedding';

interface ArchPhotoProps {
  photo: Photo;
  className?: string;
  /** slow zoom while visible */
  kenBurns?: boolean;
  /** gold ring around the frame */
  ring?: boolean;
}

/** Arch-shaped photo frame (church window shape) used across the site. */
export function ArchPhoto({ photo, className = '', kenBurns = true, ring = true }: ArchPhotoProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-arch bg-linen ${ring ? 'shadow-[0_0_0_6px_#FFFDF7,0_0_0_7px_#D8C6A0,0_26px_50px_-24px_rgba(60,40,10,.55)]' : ''} ${className}`}
    >
      <motion.img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        className="h-full w-full object-cover"
        style={{ objectPosition: photo.position ?? '50% 50%' }}
        initial={{ scale: 1.12 }}
        whileInView={kenBurns ? { scale: 1 } : undefined}
        viewport={{ once: true }}
        transition={{ duration: 6, ease: 'easeOut' }}
      />
      {/* light sweep across the glass */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        initial={{ x: '-120%' }}
        whileInView={{ x: '260%' }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, delay: 0.6, ease: 'easeInOut' }}
      />
    </div>
  );
}
