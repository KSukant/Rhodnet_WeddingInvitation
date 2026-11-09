import { motion } from 'framer-motion';
import type { Family } from '../../../types/wedding';
import { WaxSeal } from '../../ui/WaxSeal';

interface FamilyCardProps {
  family: Family;
  side: 'left' | 'right';
  play: boolean;
  monogram: string;
}

/**
 * A sealed invitation card that flies in from its side face-down (wax seal showing),
 * flips over in 3D to show the family, then nudges toward the centre to "meet" the other card.
 */
export function FamilyCard({ family, side, play, monogram }: FamilyCardProps) {
  const dir = side === 'left' ? -1 : 1;
  return (
    <motion.div
      className="relative w-full max-w-[310px] sm:max-w-[330px]"
      style={{ transformStyle: 'preserve-3d', transformPerspective: 1400 }}
      initial={{ x: dir * 80, rotateY: dir * -180, rotateZ: dir * 4, opacity: 0 }}
      animate={
        play
          ? { x: [dir * 80, 0, dir * -10, 0], rotateY: [dir * -180, 0, 0, 0], rotateZ: [dir * 4, 0, 0, 0], opacity: [0, 1, 1, 1] }
          : undefined
      }
      transition={{ duration: 1.8, times: [0, 0.6, 0.78, 1], ease: [0.3, 0.75, 0.25, 1] }}
    >
      {/* front face */}
      <div
        className="paper-grain relative flex flex-col items-center gap-1.5 sm:gap-2 rounded-[130px_130px_14px_14px] sm:rounded-[160px_160px_14px_14px] border border-champagne/70 bg-ivory px-4 pb-6 pt-5 sm:px-6 sm:pb-8 sm:pt-6 text-center shadow-card"
        style={{ backfaceVisibility: 'hidden' }}
      >
        <div className="relative mb-2 aspect-[4/5] w-[75%] sm:w-[78%] overflow-hidden rounded-arch shadow-[0_0_0_4px_#FFFDF7,0_0_0_5px_#D8C6A0]">
          <motion.img
            src={family.photo.src}
            alt={family.photo.alt}
            loading="lazy"
            className="h-full w-full object-cover"
            style={{ objectPosition: family.photo.position }}
            initial={{ scale: 1.25 }}
            animate={play ? { scale: 1 } : undefined}
            transition={{ duration: 3, delay: 0.8, ease: 'easeOut' }}
          />
        </div>
        <span className="eyebrow">{family.role}</span>
        <h3 className="font-script text-[1.95rem] sm:text-[2.3rem] leading-tight text-ink">{family.name}</h3>
        <span className="italic text-charcoal/70">{family.relation}</span>
        <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-charcoal">{family.parents}</span>
        <span className="italic text-gold">{family.familyName}</span>
      </div>
      {/* back face: sealed */}
      <div
        className="paper-grain absolute inset-0 grid place-items-center rounded-[130px_130px_14px_14px] sm:rounded-[160px_160px_14px_14px] border border-champagne bg-linen shadow-card"
        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        aria-hidden="true"
      >
        <div className="absolute inset-3 rounded-[120px_120px_10px_10px] sm:rounded-[150px_150px_10px_10px] border border-gold/40" />
        <WaxSeal size={80} monogram={monogram} />
      </div>
    </motion.div>
  );
}
