import { motion, useTransform } from 'framer-motion';
import { HeroPhotoCard } from './HeroPhotoCard';
import { Countdown } from './Countdown';
import { InkText } from '../../ui/InkText';
import { GoldDust } from '../../ui/GoldDust';
import { PHOTOS, WEDDING } from '../../../data/wedding';
import { formatDateDots } from '../../../lib/format';
import { EASE } from '../../../lib/motion';
import { usePointerParallax } from '../../../hooks/usePointerParallax';

interface HeroSectionProps {
  /** true once the envelope's light has revealed the hero */
  play: boolean;
  onExplore: () => void;
}

// seconds after the reveal
const T = { label: 0.5, title: 0.7, groom: 1.0, amp: 2.1, bride: 2.2, date: 3.2, time: 3.3, church: 3.45, save: 3.6, count: 3.7, cue: 4.4 };

const fadeUp = (play: boolean, delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: play ? { opacity: 1, y: 0 } : undefined,
  transition: { duration: 0.9, delay, ease: EASE.out }
});

/** SECTION 02 · The cinematic hero: the invitation card becomes the couple's photo. */
export function HeroSection({ play, onExplore }: HeroSectionProps) {
  const { x, y } = usePointerParallax(play);
  const bgX = useTransform(x, [-1, 1], [12, -12]);
  const bgY = useTransform(y, [-1, 1], [8, -8]);
  const textX = useTransform(x, [-1, 1], [-5, 5]);

  return (
    <section id="hero" className="relative min-h-[100svh] overflow-hidden bg-night text-ivory">
      {/* church backdrop: slow zoom + opposite parallax */}
      <motion.div className="absolute -inset-6" style={{ x: bgX, y: bgY }}>
        <motion.img
          src={PHOTOS.heroBackdrop.src}
          alt=""
          className="h-full w-full object-cover"
          style={{ objectPosition: PHOTOS.heroBackdrop.position }}
          initial={{ scale: 1.15, filter: 'blur(6px) brightness(.5)' }}
          animate={play ? { scale: 1.02, filter: 'blur(3px) brightness(.55)' } : undefined}
          transition={{ duration: 16, ease: 'easeOut' }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(25,22,19,.25)] via-[rgba(25,22,19,.45)] to-[rgba(25,22,19,.85)]" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_95%_at_60%_45%,transparent_50%,rgba(18,14,10,.6)_100%)]" />
      <motion.div
        className="pointer-events-none absolute -inset-[20%] mix-blend-screen"
        style={{ background: 'radial-gradient(40% 35% at 70% 30%, rgba(255,222,160,.3), transparent 70%)' }}
        initial={{ opacity: 0 }}
        animate={play ? { opacity: 1, x: ['0%', '-4%', '0%'], y: ['0%', '3%', '0%'] } : undefined}
        transition={{ opacity: { duration: 2 }, x: { duration: 16, repeat: Infinity }, y: { duration: 16, repeat: Infinity } }}
      />
      {play && <GoldDust />}

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-6xl items-center gap-6 px-[max(16px,env(safe-area-inset-left))] pb-16 pt-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-8 lg:pb-16 lg:pt-14">
        {/* text column */}
        <motion.div style={{ x: textX }} className="flex flex-col items-center gap-2 sm:gap-2.5 text-center lg:items-start lg:text-left">
          <motion.span className="font-sans text-[10px] sm:text-[11px] font-semibold tracking-[0.32em] sm:tracking-[0.34em] text-[#E6D7B4] text-shadow-soft" {...fadeUp(play, T.label)}>
            TOGETHER WITH THEIR FAMILIES
          </motion.span>
          <motion.h2 className="flex flex-col font-normal leading-tight" {...fadeUp(play, T.title)}>
            <span className="text-[clamp(0.92rem,1.8vw,1.3rem)] tracking-[0.32em] text-ivory/90">THE BEGINNING OF</span>
            <span className="text-[clamp(2.1rem,4vw,3rem)] italic">Forever</span>
          </motion.h2>

          <div className="flex flex-col items-center lg:items-start">
            <InkText text={WEDDING.groom} play={play} delay={T.groom} className="h-[clamp(52px,7.8vw,104px)] w-auto max-w-[88vw]" />
            <motion.span
              className="-my-2 font-display text-[2.2rem] italic text-champagne lg:ml-[2.2em]"
              initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
              animate={play ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
              transition={{ type: 'spring', stiffness: 160, damping: 10, delay: T.amp }}
            >
              &amp;
            </motion.span>
            <InkText text={WEDDING.bride} play={play} delay={T.bride} className="h-[clamp(52px,7.8vw,104px)] w-auto max-w-[88vw]" />
          </div>

          {/* mobile photo arch: naturally nested in mobile flow */}
          <div className="my-1.5 flex justify-center lg:hidden">
            <HeroPhotoCard photo={PHOTOS.heroPortrait} play={play} px={x} py={y} />
          </div>

          <motion.div className="flex flex-col items-center gap-0.5 sm:gap-1 text-center lg:items-start lg:text-left" {...fadeUp(play, T.date)}>
            <span className="font-sans text-[12px] sm:text-[13px] font-medium tracking-[0.36em] sm:tracking-[0.42em] text-ivory">
              {formatDateDots(WEDDING.wedding)}
            </span>
            <span className="font-sans text-[11px] sm:text-[12px] font-medium tracking-[0.32em] sm:tracking-[0.34em] text-champagne">
              {WEDDING.weddingTime ?? '8:45 AM'}
            </span>
          </motion.div>
          <motion.span
            className="h-px w-36 sm:w-40 bg-gradient-to-r from-transparent via-champagne to-transparent lg:from-champagne lg:via-champagne/60"
            style={{ originX: 0 }}
            initial={{ scaleX: 0 }}
            animate={play ? { scaleX: 1 } : undefined}
            transition={{ duration: 1.1, delay: T.date + 0.1, ease: EASE.out }}
          />
          {WEDDING.churchMap ? (
            <motion.a
              href={WEDDING.churchMap}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.95rem] sm:text-[1.05rem] tracking-[0.24em] sm:tracking-[0.3em] text-ivory/90 transition-colors hover:text-champagne px-2"
              {...fadeUp(play, T.church)}
            >
              {WEDDING.church.toUpperCase()}
            </motion.a>
          ) : (
            <motion.span className="text-[0.95rem] sm:text-[1.05rem] tracking-[0.24em] sm:tracking-[0.3em] text-ivory/90 px-2" {...fadeUp(play, T.church)}>
              {WEDDING.church.toUpperCase()}
            </motion.span>
          )}
          <motion.span
            className="rounded-full border border-champagne/60 px-3.5 py-1 sm:px-4 sm:py-1.5 font-sans text-[9px] sm:text-[10px] tracking-[0.36em] sm:tracking-[0.4em] text-champagne"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={play ? { opacity: 1, scale: [0.7, 1.08, 1] } : undefined}
            transition={{ duration: 0.7, delay: T.save }}
          >
            SAVE THE DATE
          </motion.span>
          <div className="mt-1">
            <Countdown target={WEDDING.wedding} play={play} delay={T.count} />
          </div>
        </motion.div>

        {/* photo column on desktop */}
        <div className="hidden justify-center lg:flex lg:justify-end">
          <HeroPhotoCard photo={PHOTOS.heroPortrait} play={play} px={x} py={y} />
        </div>
      </div>

      <motion.button
        type="button"
        onClick={onExplore}
        className="absolute inset-x-0 bottom-[max(10px,env(safe-area-inset-bottom))] z-10 mx-auto flex w-max flex-col items-center gap-1.5 font-sans text-[10px] sm:text-[11px] tracking-[0.34em] text-ivory/85 text-shadow-soft"
        initial={{ opacity: 0 }}
        animate={play ? { opacity: 1 } : undefined}
        transition={{ duration: 1, delay: T.cue }}
      >
        <span className="max-sm:hidden">SCROLL TO EXPLORE OUR STORY</span>
        <span className="relative h-7 sm:h-9 w-px overflow-hidden bg-ivory/25">
          <motion.span
            className="absolute left-0 h-2/5 w-px bg-champagne"
            animate={{ top: ['-40%', '100%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.button>
    </section>
  );
}
