import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { ChapterPhoto } from './ChapterPhoto';
import { ChapterText } from './ChapterText';
import { STORY } from '../../../data/wedding';

/**
 * SECTION 04 · Our Story as pinned chapters. The section stays on screen while you scroll;
 * each chapter's photo wipes up into the arched window and zooms, its words rise in, and the
 * gold progress line fills.
 */
export function StorySection() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const n = STORY.length;
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const frameScale = useTransform(scrollYProgress, [0, 0.08], [0.88, 1]);
  const activeIndex = useTransform(scrollYProgress, (p) => Math.min(n - 1, Math.floor(p * n)));

  return (
    <section id="story" ref={ref} className="relative bg-night" style={{ height: `${n * 100 + 40}vh` }}>
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        {/* ambient blurred copy of the current photo */}
        <div className="absolute inset-0">
          {STORY.map((c, i) => (
            <AmbientLayer key={c.photo.src} src={c.photo.src} index={i} total={n} progress={scrollYProgress} />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-night via-night/80 to-night/60" />
        </div>

        <div className="relative z-10 mx-auto flex flex-col justify-center h-full w-full max-w-6xl items-center gap-3 sm:gap-6 px-[max(16px,env(safe-area-inset-left))] pt-12 pb-6 lg:grid lg:grid-cols-[.9fr_1.1fr] lg:gap-16 lg:py-0">
          {/* mobile chapter indicator pills */}
          <div className="flex items-center gap-2.5 lg:hidden z-20">
            {STORY.map((c, i) => (
              <MobileNumeral key={c.numeral} label={c.numeral} index={i} active={activeIndex} />
            ))}
          </div>

          {/* arched photo window */}
          <motion.div className="relative mx-auto aspect-[3/4] h-[min(65svh,580px)] max-lg:h-[28svh] max-lg:max-h-[220px]" style={{ scale: frameScale }}>
            <div className="absolute inset-0 overflow-hidden rounded-arch shadow-[0_0_0_5px_rgba(255,253,247,.9),0_0_0_6px_#D8C6A0,0_30px_60px_-25px_rgba(0,0,0,.8)]">
              {STORY.map((c, i) => (
                <ChapterPhoto key={c.title} chapter={c} index={i} total={n} progress={scrollYProgress} />
              ))}
            </div>
            <div className="pointer-events-none absolute -inset-2.5 rounded-[999px_999px_20px_20px] border border-gold-soft/40" />
          </motion.div>

          {/* words */}
          <div className="relative flex w-full justify-center gap-6 lg:gap-10">
            {/* gold progress line with chapter numerals */}
            <div className="relative hidden w-8 shrink-0 flex-col items-center justify-between py-2 sm:flex" style={{ height: 'min(52svh, 420px)' }}>
              <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-ivory/15" />
              <motion.span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-champagne" style={{ scaleY: lineScale, originY: 0 }} />
              {STORY.map((c, i) => (
                <Numeral key={c.numeral} label={c.numeral} index={i} active={activeIndex} />
              ))}
            </div>
            <div className="relative h-[min(46svh,380px)] w-full flex-1 max-lg:h-[24svh] max-lg:max-h-[170px] max-lg:text-center">
              <div className="mb-2 hidden lg:block">
                <span className="eyebrow text-gold-soft">Written by God, lived by us</span>
              </div>
              {STORY.map((c, i) => (
                <ChapterText key={c.title} chapter={c} index={i} total={n} progress={scrollYProgress} />
              ))}
            </div>
          </div>
        </div>

        <div className="absolute left-1/2 top-[max(70px,calc(env(safe-area-inset-top)+64px))] z-10 -translate-x-1/2 text-center lg:hidden">
          <span className="eyebrow text-gold-soft">Our Story</span>
        </div>
      </div>
    </section>
  );
}

function AmbientLayer({ src, index, total, progress }: { src: string; index: number; total: number; progress: MotionValue<number> }) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start - 0.08, start + 0.02, end - 0.02, end + 0.08], index === 0 ? [1, 1, 1, 0] : index === total - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0]);
  return <motion.img src={src} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-0 blur-2xl brightness-50" style={{ opacity }} />;
}

function Numeral({ label, index, active }: { label: string; index: number; active: MotionValue<number> }) {
  const color = useTransform(active, (a) => (a >= index ? '#E6D3A3' : 'rgba(255,253,247,.35)'));
  const scale = useTransform(active, (a) => (a === index ? 1.25 : 1));
  return (
    <motion.span
      className="relative grid h-8 w-8 place-items-center rounded-full border bg-night font-display text-sm"
      style={{ color, borderColor: color, scale }}
    >
      {label}
    </motion.span>
  );
}

function MobileNumeral({ label, index, active }: { label: string; index: number; active: MotionValue<number> }) {
  const color = useTransform(active, (a) => (a >= index ? '#E6D3A3' : 'rgba(255,253,247,.4)'));
  const bg = useTransform(active, (a) => (a === index ? 'rgba(230,211,163,.15)' : 'transparent'));
  const scale = useTransform(active, (a) => (a === index ? 1.1 : 1));
  return (
    <motion.span
      className="relative grid h-7 w-7 place-items-center rounded-full border font-display text-xs"
      style={{ color, borderColor: color, backgroundColor: bg, scale }}
    >
      {label}
    </motion.span>
  );
}
