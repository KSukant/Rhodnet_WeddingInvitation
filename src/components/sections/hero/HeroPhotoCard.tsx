import { motion, useTransform, type MotionValue } from 'framer-motion';
import type { Photo } from '../../../types/wedding';
import { EASE } from '../../../lib/motion';

interface HeroPhotoCardProps {
  photo: Photo;
  play: boolean;
  px: MotionValue<number>;
  py: MotionValue<number>;
}

/**
 * The ivory invitation card from the envelope grows and reshapes into an arched window,
 * and the couple's photo "develops" inside it. Afterwards it tilts gently with the mouse.
 */
export function HeroPhotoCard({ photo, play, px, py }: HeroPhotoCardProps) {
  const rotateY = useTransform(px, [-1, 1], [-5, 5]);
  const rotateX = useTransform(py, [-1, 1], [4, -4]);
  const imgX = useTransform(px, [-1, 1], [-14, 14]);
  const imgY = useTransform(py, [-1, 1], [-10, 10]);

  return (
    <motion.div style={{ rotateX, rotateY, transformPerspective: 1200 }} className="relative">
      <motion.div
        className="relative aspect-[3/4] h-[min(64svh,570px)] max-h-[570px] max-w-[86vw] overflow-hidden bg-[#FFFEFA] max-lg:h-[26svh] max-lg:max-h-[220px]"
        initial={{ scale: 0.55, y: 40, rotate: -4, opacity: 0, borderRadius: '6px 6px 6px 6px' }}
        animate={
          play
            ? { scale: 1, y: 0, rotate: 0, opacity: 1, borderRadius: '320px 320px 18px 18px' }
            : undefined
        }
        transition={{
          opacity: { duration: 0.3 },
          scale: { duration: 1.4, ease: EASE.inOut },
          y: { duration: 1.4, ease: EASE.inOut },
          rotate: { duration: 1.4, ease: EASE.inOut },
          borderRadius: { duration: 1.2, delay: 0.3, ease: EASE.inOut }
        }}
      >
        {/* the photo develops: from bright, blurred and sepia to clear */}
        <motion.img
          src={photo.src}
          alt={photo.alt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: photo.position, x: imgX, y: imgY, scale: 1.12 }}
          initial={{ filter: 'blur(14px) brightness(1.6) sepia(0.5)' }}
          animate={play ? { filter: 'blur(0px) brightness(1) sepia(0)' } : undefined}
          transition={{ duration: 1.6, delay: 0.5, ease: 'easeOut' }}
        />
        {/* ivory card surface fading away */}
        <motion.div
          className="paper-grain absolute inset-0 bg-[#FFFEFA]"
          initial={{ opacity: 1 }}
          animate={play ? { opacity: 0 } : undefined}
          transition={{ duration: 1, delay: 0.45 }}
        />
        {/* recurring gold light sweep across the glass */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-[rgba(255,240,200,.45)] to-transparent"
          initial={{ x: '-150%' }}
          animate={play ? { x: ['-150%', '280%'] } : undefined}
          transition={{ duration: 1.8, delay: 2.2, repeat: Infinity, repeatDelay: 6, ease: 'easeInOut' }}
        />
      </motion.div>
      {/* double gold frame drawn after the card has become an arch */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-3 rounded-[330px_330px_24px_24px] border border-gold-soft/60"
        initial={{ opacity: 0, scale: 1.06 }}
        animate={play ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 1, delay: 1.5, ease: EASE.out }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 rounded-[340px_340px_30px_30px] border border-gold-soft/25"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={play ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 1.2, delay: 1.7, ease: EASE.out }}
      />
    </motion.div>
  );
}
