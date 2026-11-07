import { motion } from 'framer-motion';
import { WEDDING } from '../../data/wedding';

interface TopbarProps {
  visible: boolean;
  /** over a dark section (hero, story, thank you): transparent with ivory icons */
  dark: boolean;
  /** scrolled past the top: ivory glass bar on light sections */
  solid: boolean;
  music: { available: boolean; playing: boolean; toggle: () => void };
  onMonogram: () => void;
}

const btn = 'grid h-11 w-11 place-items-center rounded-full border transition-colors';

/** Discreet top bar: J & M monogram and music toggle. */
export function Topbar({ visible, dark, solid, music, onMonogram }: TopbarProps) {
  const tone = dark
    ? 'bg-transparent text-ivory'
    : solid
      ? 'bg-ivory/80 text-charcoal shadow-[0_1px_0_rgba(179,154,104,.25)] backdrop-blur-md'
      : 'bg-transparent text-charcoal';
  const btnTone = dark ? 'border-champagne/70 bg-ivory/5 hover:bg-champagne/25' : 'border-gold/50 hover:bg-gold/10';
  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-[max(16px,env(safe-area-inset-left))] pb-3 pt-[max(12px,env(safe-area-inset-top))] transition-colors duration-500 ${tone}`}
      initial={false}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
      transition={{ duration: 0.6 }}
    >
      <button type="button" onClick={onMonogram} aria-label="Back to the beginning" className="flex items-baseline gap-1.5 font-script text-[1.8rem] leading-none">
        {WEDDING.monogram[0]} <i className="font-display text-base text-champagne">&amp;</i> {WEDDING.monogram[1]}
      </button>
      <div className="flex gap-2.5">
        {music.available && (
          <button type="button" onClick={music.toggle} aria-label={music.playing ? 'Pause music' : 'Play music'} aria-pressed={music.playing} className={`${btn} ${btnTone}`}>
            <span className="flex h-3.5 items-end gap-[2px]">
              {[0, 1, 2, 3].map((i) => (
                <motion.span
                  key={i}
                  className="w-[2px] rounded-sm bg-current"
                  animate={music.playing ? { height: ['4px', '14px', '4px'] } : { height: '4px' }}
                  transition={music.playing ? { duration: 1, repeat: Infinity, delay: i * 0.15 } : { duration: 0.3 }}
                />
              ))}
            </span>
          </button>
        )}
      </div>
    </motion.header>
  );
}
