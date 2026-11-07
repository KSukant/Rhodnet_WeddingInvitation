import { motion } from 'framer-motion';
import { CrossIcon } from './Icons';

interface WaxSealProps {
  size?: number;
  /** text monogram instead of the cross, e.g. "J&M" */
  monogram?: string;
  tone?: 'gold' | 'wine';
  /** when true the seal cracks into two halves that fall away */
  broken?: boolean;
  className?: string;
}

const WAX = {
  gold: 'radial-gradient(circle at 34% 28%, #F4E6BF 0%, #DCC48C 26%, #C3A564 55%, #9E8048 85%, #8A6E3C 100%)',
  wine: 'radial-gradient(circle at 34% 28%, #B4566A 0%, #8E3445 45%, #6B2232 80%, #561C27 100%)'
};
const INNER = {
  gold: 'radial-gradient(circle at 40% 35%, #E6D3A3, #C7AA6C 70%)',
  wine: 'radial-gradient(circle at 40% 35%, #9C4256, #6E2534 75%)'
};

const Face = ({ tone, monogram, size }: { tone: 'gold' | 'wine'; monogram?: string; size: number }) => (
  <span
    className="absolute inset-0 grid place-items-center rounded-[47%_53%_50%_50%/52%_46%_54%_48%]"
    style={{ background: WAX[tone], boxShadow: '0 3px 8px rgba(81,60,30,.35), inset 0 1px 0 rgba(255,255,255,.4), inset 0 -3px 6px rgba(60,40,20,.35)' }}
  >
    <span
      className="absolute inset-[16%] rounded-full"
      style={{ background: INNER[tone], boxShadow: 'inset 0 2px 3px rgba(60,40,20,.5), inset 0 -1px 2px rgba(255,245,215,.5)' }}
    />
    {monogram ? (
      <span className="relative font-script leading-none" style={{ fontSize: size * 0.32, color: tone === 'gold' ? '#7E6332' : '#F2D9C4' }}>
        {monogram}
      </span>
    ) : (
      <CrossIcon className="relative" style={{ width: size * 0.2, color: '#8C7040', filter: 'drop-shadow(0 1px 0 rgba(255,246,220,.7))' }} />
    )}
  </span>
);

const HALF_A = 'polygon(0 0,54% 0,46% 38%,56% 62%,48% 100%,0 100%)';
const HALF_B = 'polygon(54% 0,100% 0,100% 100%,48% 100%,56% 62%,46% 38%)';

/** Reusable wax seal: the envelope, the letter scroll and the family cards all use it. */
export function WaxSeal({ size = 72, monogram, tone = 'gold', broken = false, className = '' }: WaxSealProps) {
  return (
    <span className={`relative block ${className}`} style={{ width: size, height: size }} aria-hidden="true">
      {[HALF_A, HALF_B].map((clip, i) => (
        <motion.span
          key={clip}
          className="absolute inset-0"
          style={{ clipPath: clip }}
          initial={false}
          animate={broken ? { x: i ? 18 : -18, y: i ? 20 : 16, rotate: i ? 22 : -24, opacity: 0 } : { x: 0, y: 0, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.3, 0.7, 0.2, 1] }}
        >
          <Face tone={tone} monogram={monogram} size={size} />
        </motion.span>
      ))}
    </span>
  );
}
