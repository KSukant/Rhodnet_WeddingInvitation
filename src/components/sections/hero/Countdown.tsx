import { motion } from 'framer-motion';
import { useCountdown } from '../../../hooks/useCountdown';
import { FlipDigit } from '../../ui/FlipDigit';

interface CountdownProps {
  target: string;
  play: boolean;
  delay: number;
}

/** Live countdown to the wedding (Asia/Kolkata) with split-flap digits. */
export function Countdown({ target, play, delay }: CountdownProps) {
  const c = useCountdown(target);
  const units = [
    { v: c.days, l: 'DAYS' },
    { v: c.hours, l: 'HOURS' },
    { v: c.minutes, l: 'MINUTES' },
    { v: c.seconds, l: 'SECONDS' }
  ];
  return (
    <div className="flex flex-col items-center gap-3 lg:items-start">
      <motion.span
        className="font-sans text-[11px] tracking-[0.32em] text-ivory/90 text-shadow-soft"
        initial={{ opacity: 0, y: 10 }}
        animate={play ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.8, delay }}
      >
        COUNTING DOWN TO OUR SPECIAL DAY
      </motion.span>
      {c.status === 'counting' ? (
        <div className="flex gap-2 sm:gap-3" style={{ perspective: 600 }}>
          {units.map((u, i) => (
            <motion.div
              key={u.l}
              initial={{ opacity: 0, rotateX: -90, y: 20 }}
              animate={play ? { opacity: 1, rotateX: 0, y: 0 } : undefined}
              transition={{ type: 'spring', stiffness: 140, damping: 14, delay: delay + 0.15 + i * 0.1 }}
            >
              <FlipDigit value={u.v} label={u.l} />
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="font-script text-4xl text-ivory">{c.status === 'today' ? 'Today we say I do' : 'Just married'}</p>
      )}
    </div>
  );
}
