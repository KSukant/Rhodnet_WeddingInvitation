import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { WaxSeal } from '../../ui/WaxSeal';
import { CrossIcon } from '../../ui/Icons';
import { STAGE } from './stages';
import { WEDDING } from '../../../data/wedding';
import { formatDateLong } from '../../../lib/format';
import { EASE } from '../../../lib/motion';

interface EnvelopeProps {
  stage: number;
  onSealClick: () => void;
  sealEnabled: boolean;
}

const POCKET_LINES =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'><path d='M0 100 L50 54 L100 100' fill='none' stroke='%23C9B48A' stroke-width='1' vector-effect='non-scaling-stroke' opacity='.75'/></svg>\") center / 100% 100% no-repeat";
const FLAP_EDGES =
  'linear-gradient(to bottom right, transparent 49.5%, rgba(216,198,160,.9) 50%, transparent 50.8%) left top / 50.1% 100% no-repeat, linear-gradient(to bottom left, transparent 49.5%, rgba(216,198,160,.9) 50%, transparent 50.8%) right top / 50.1% 100% no-repeat';

/** The ivory envelope: back, card, front pocket, flap and wax seal. Everything moves from the `stage` prop. */
export const Envelope = forwardRef<HTMLDivElement, EnvelopeProps>(function Envelope({ stage, onSealClick, sealEnabled }, ref) {
  const lifted = stage >= STAGE.lift;
  const bursting = stage >= STAGE.burst;
  return (
    <motion.div
      ref={ref}
      className="relative aspect-[1.48] w-[min(500px,84vw,calc((100svh-400px)*1.48))] min-w-[280px]"
      animate={
        bursting
          ? { y: -14, scale: 1.12, opacity: 0 }
          : lifted
            ? { y: -10, scale: 1.012, opacity: 1 }
            : { y: 0, scale: 1, opacity: 1 }
      }
      transition={bursting ? { duration: 0.9, ease: EASE.out, opacity: { duration: 0.6, delay: 0.25 } } : { duration: 0.7, ease: EASE.out }}
    >
      {/* soft floating shadow */}
      <motion.div
        className="absolute -bottom-[6%] left-[4%] right-[4%] h-1/4 rounded-[50%] blur-md"
        style={{ background: 'radial-gradient(closest-side, rgba(81,70,63,.32), rgba(81,70,63,0))' }}
        animate={lifted ? { scale: 1.08, y: 8, opacity: 0.75 } : { scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      />
      {/* inside back of the envelope */}
      <div className="absolute inset-0 rounded bg-gradient-to-b from-[#EFE6D2] to-[#F6EFE1] shadow-[inset_0_0_0_1px_rgba(184,159,110,.35)]" />
      {/* warm light from inside */}
      <motion.div
        className="absolute -top-[36%] left-[4%] right-[4%] z-[1] h-[72%] rounded-[50%]"
        style={{ background: 'radial-gradient(closest-side, rgba(255,238,196,.95), rgba(255,238,196,0))' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= STAGE.glow ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
      {/* the invitation card */}
      <motion.div
        className="absolute left-[5.5%] right-[5.5%] top-[7%] z-[2] flex h-[86%] flex-col items-center justify-center gap-1.5 rounded-sm bg-gradient-to-b from-[#FFFEFA] to-[#FBF7EC] p-[8%] text-center"
        animate={stage >= STAGE.glow ? { y: '-38%', boxShadow: '0 0 0 1px rgba(216,198,160,.6), 0 0 40px rgba(255,232,180,.7)' } : { y: '0%', boxShadow: '0 0 0 1px rgba(216,198,160,.6), 0 6px 18px -10px rgba(81,70,63,.35)' }}
        transition={{ duration: 1.1, ease: EASE.out }}
      >
        <span className="pointer-events-none absolute inset-1.5 rounded-sm border border-champagne/70" />
        <CrossIcon className="w-3 text-gold" />
        <span className="font-script text-[clamp(1.15rem,2.7vw,1.65rem)] leading-tight text-charcoal">
          {WEDDING.groomShort} &amp; {WEDDING.brideShort}
        </span>
        <span className="max-w-[24ch] text-[clamp(.72rem,1.6vw,.9rem)] italic leading-snug text-charcoal/75">
          An invitation to celebrate a promise blessed by God.
        </span>
        <span className="font-sans text-[8px] tracking-[0.38em] text-gold">{formatDateLong(WEDDING.wedding)}</span>
        {/* inside the envelope the card is in shadow, so it never shows through the opening */}
        <motion.span
          className="pointer-events-none absolute inset-0 rounded-sm bg-gradient-to-b from-[rgba(238,228,206,.97)] to-[rgba(244,236,220,.95)]"
          animate={{ opacity: stage >= STAGE.glow ? 0 : 1 }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>
      {/* front pocket */}
      <div
        className="paper-grain absolute inset-0 z-[3] rounded"
        style={{
          background: `${POCKET_LINES}, linear-gradient(175deg, #FFFDF6 0%, #F6EEDD 100%)`,
          clipPath: 'polygon(0 0,50% 54%,100% 0,100% 100%,0 100%)',
          boxShadow: 'inset 0 0 0 1px rgba(184,159,110,.45)'
        }}
      />
      <div className="pointer-events-none absolute inset-0 z-[3] rounded shadow-[inset_0_0_0_1px_rgba(184,159,110,.55),inset_0_0_0_6px_rgba(216,198,160,.45)]" />
      {/* flap */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[56%]"
        style={{ transformOrigin: '50% 0%', zIndex: stage >= STAGE.flapBack ? 1 : 4 }}
        initial={{ rotateX: 0, transformPerspective: 1400 }}
        animate={{ rotateX: stage >= STAGE.flap ? 180 : 0, transformPerspective: 1400 }}
        transition={{ duration: 0.8, ease: [0.55, 0.05, 0.3, 1] }}
      >
        <div
          className="absolute inset-0"
          style={{
            clipPath: 'polygon(0 0,100% 0,50% 100%)',
            background: stage >= STAGE.flapBack ? `${FLAP_EDGES}, linear-gradient(0deg, #F6EFE1, #FCF8EF)` : `${FLAP_EDGES}, linear-gradient(180deg, #FBF6EA, #F1E7D2)`
          }}
        />
      </motion.div>
      {/* wax seal */}
      <button
        type="button"
        onClick={onSealClick}
        disabled={!sealEnabled}
        aria-label="Break the seal and open the invitation"
        className="group absolute left-1/2 top-[56%] z-[6] -translate-x-1/2 -translate-y-1/2 rounded-full disabled:cursor-default"
      >
        <span className="absolute inset-0 rounded-full opacity-0 shadow-[0_0_0_6px_rgba(216,198,160,.22),0_0_24px_rgba(232,205,140,.7)] transition-opacity group-hover:opacity-100" />
        <WaxSeal size={68} broken={stage >= STAGE.seal} />
        {/* seal catches the light during the intro */}
        <motion.span
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
          initial={{ opacity: 1 }}
          animate={{ opacity: stage >= STAGE.seal ? 0 : 1 }}
        >
          <motion.span
            className="absolute -inset-y-2 w-2/5 -skew-x-12 bg-gradient-to-r from-transparent via-[rgba(255,252,236,.85)] to-transparent"
            initial={{ x: '-160%' }}
            animate={{ x: '320%' }}
            transition={{ duration: 1.3, delay: 3.9, ease: 'easeInOut' }}
          />
        </motion.span>
      </button>
    </motion.div>
  );
});
