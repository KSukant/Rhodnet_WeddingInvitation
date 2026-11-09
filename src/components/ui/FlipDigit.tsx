import { AnimatePresence, motion } from 'framer-motion';

interface FlipDigitProps {
  value: number;
  label: string;
}

/** Two-digit split-flap card (like an airport board); the top half flips down whenever the value changes. */
export function FlipDigit({ value, label }: FlipDigitProps) {
  const text = String(value).padStart(2, '0');
  return (
    <div className="flex flex-col items-center gap-1 sm:gap-1.5">
      <div
        className="relative h-[3.1rem] w-[3.5rem] overflow-hidden rounded-md border border-champagne/40 bg-night/50 backdrop-blur-sm sm:h-[4rem] sm:w-[4.5rem]"
        style={{ perspective: 400 }}
      >
        <span className="absolute inset-x-0 top-1/2 z-10 h-px bg-black/40" aria-hidden="true" />
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={text}
            className="absolute inset-0 grid place-items-center font-display text-[1.8rem] font-medium tabular-nums text-ivory sm:text-[2.4rem]"
            style={{ transformOrigin: '50% 50%', backfaceVisibility: 'hidden' }}
            initial={{ rotateX: -90, opacity: 0.2 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.24em] sm:tracking-[0.28em] text-gold-soft">{label}</span>
    </div>
  );
}
