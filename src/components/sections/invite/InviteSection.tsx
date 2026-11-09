import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Envelope } from './Envelope';
import { LightBurst } from './LightBurst';
import { STAGE, STAGE_TIMES, REVEAL_AT } from './stages';
import { Bouquet } from '../../ui/Bouquet';
import { GoldButton } from '../../ui/GoldButton';
import { WEDDING } from '../../../data/wedding';
import { formatDateLong } from '../../../lib/format';
import { createTimeline, type Timeline } from '../../../lib/timeline';
import { EASE, prefersReducedMotion } from '../../../lib/motion';

interface InviteSectionProps {
  /** the click itself (a user gesture): start the music here */
  onOpen: () => void;
  /** brightest moment of the light: put the hero in place underneath and start its animation */
  onReveal: () => void;
  /** the light has faded and the invitation is fully revealed */
  onComplete: () => void;
}

// intro storyboard before the click (seconds after the page loads)
const INTRO = { envelope: 1.2, eyebrow: 2.3, title: 2.5, sub: 2.75, names: 3.0, date: 3.4, cta: 3.6, petals: 3.9 };

const up = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: EASE.out }
});

/** SECTION 01 · The opening experience: a sealed invitation envelope on ivory paper. */
export function InviteSection({ onOpen, onReveal, onComplete }: InviteSectionProps) {
  const [stage, setStage] = useState<number>(STAGE.idle);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const envelopeRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<Timeline | null>(null);
  const openingRef = useRef(false);

  useEffect(() => () => timelineRef.current?.cancel(), []);

  const open = () => {
    if (openingRef.current) return; // ignore double clicks / taps
    openingRef.current = true;
    onOpen();
    if (prefersReducedMotion()) {
      onReveal();
      onComplete();
      return;
    }
    const r = envelopeRef.current?.getBoundingClientRect();
    setOrigin(r ? { x: r.left + r.width / 2, y: r.top + r.height * 0.12 } : { x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const tl = createTimeline();
    timelineRef.current = tl;
    STAGE_TIMES.forEach(([s, ms]) => tl.at(ms, () => setStage(s)));
    tl.at(REVEAL_AT, onReveal);
    tl.at(STAGE_TIMES[STAGE_TIMES.length - 1][1], onComplete);
  };

  const cleared = stage >= STAGE.clear;
  const started = stage > STAGE.idle;

  return (
    <section id="invite" className="relative min-h-[100svh] overflow-hidden bg-paper text-charcoal" aria-label="Wedding invitation">
      {/* paper, ambient light and vignette */}
      <motion.div className="paper-grain absolute inset-0" initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[52%] h-[120vmax] w-[120vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,247,226,.95) 0%, rgba(236,220,180,.35) 28%, rgba(248,245,237,0) 60%)' }}
        initial={{ opacity: 0, scale: 0.35 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_50%,transparent_55%,rgba(120,96,60,.12)_100%)]" />

      {/* white roses: lower-left and upper-right */}
      <motion.div
        className="pointer-events-none absolute -bottom-[5vmin] -left-[4vmin] w-[clamp(190px,34vmin,380px)]"
        initial={{ opacity: 0, y: 14 }}
        animate={cleared ? { opacity: 0, x: -30, y: 30 } : { opacity: 1, y: 0 }}
        transition={cleared ? { duration: 0.5 } : { duration: 1.8, delay: 0.6 }}
      >
        <Bouquet size="large" className="w-full" />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute -right-[3vmin] -top-[4vmin] w-[clamp(110px,22vmin,250px)] rotate-180"
        initial={{ opacity: 0 }}
        animate={cleared ? { opacity: 0 } : { opacity: 1 }}
        transition={cleared ? { duration: 0.5 } : { duration: 1.8, delay: 0.8 }}
      >
        <Bouquet size="small" className="w-full" />
      </motion.div>

      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center gap-[clamp(10px,2vh,24px)] px-4 py-4 sm:py-6 text-center">
        <motion.header
          className="flex flex-col items-center gap-1 sm:gap-1.5"
          animate={cleared ? { opacity: 0, y: -16 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span className="font-sans text-[10px] font-medium uppercase tracking-[0.24em] text-gold sm:text-[11px] sm:tracking-[0.34em]" {...up(INTRO.eyebrow)}>
            With joyful hearts and God&rsquo;s blessings
          </motion.span>
          <motion.h1 className="text-[clamp(1.6rem,4.4vw,2.7rem)] font-normal text-charcoal leading-tight" {...up(INTRO.title)}>
            You Are Cordially Invited
          </motion.h1>
          <motion.span className="font-sans text-[9px] sm:text-[10px] tracking-[0.28em] sm:tracking-[0.32em] text-charcoal/70" {...up(INTRO.sub)}>
            TO CELEBRATE A BEAUTIFUL BEGINNING
          </motion.span>
          <motion.p className="mt-1 sm:mt-2 font-script text-[clamp(2.1rem,5.4vw,3.5rem)] leading-[1.1] text-charcoal" {...up(INTRO.names)}>
            {WEDDING.groom}
            <i className="mx-[.25em] font-display text-[.62em] text-gold">&amp;</i>
            {WEDDING.bride}
          </motion.p>
          <motion.span className="font-sans text-[11px] sm:text-xs tracking-[0.36em] sm:tracking-[0.42em] text-gold" {...up(INTRO.date)}>
            {formatDateLong(WEDDING.wedding)}
          </motion.span>
        </motion.header>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.3, delay: INTRO.envelope, ease: EASE.out }}>
          <Envelope ref={envelopeRef} stage={stage} onSealClick={open} sealEnabled={!started} />
        </motion.div>

        <motion.div
          className="flex min-h-[76px] flex-col items-center gap-2.5"
          initial={{ opacity: 0, y: 14 }}
          animate={started ? { opacity: 0, y: 8 } : { opacity: 1, y: 0 }}
          transition={started ? { duration: 0.3 } : { duration: 1, delay: INTRO.cta, ease: EASE.out }}
        >
          <GoldButton onClick={open} disabled={started}>
            Open Invitation
          </GoldButton>
          <span className="italic text-charcoal/70">A beautiful story awaits.</span>
        </motion.div>
      </div>

      <LightBurst stage={stage} origin={origin} />
    </section>
  );
}
