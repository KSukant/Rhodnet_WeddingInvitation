import { motion } from 'framer-motion';
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { ScrollRod } from './ScrollRod';
import { WaxSeal } from '../../ui/WaxSeal';
import { EASE } from '../../../lib/motion';

interface ParchmentScrollProps {
  /** starts the opening: seal breaks, ribbon falls, paper unrolls */
  open: boolean;
  monogram: string;
  children: ReactNode;
}

/** Timings in seconds after `open` becomes true. */
export const SCROLL_T = { seal: 0.35, ribbon: 0.7, unroll: 1.1, unrollFor: 2.1 };

/** A rolled parchment tied with a ribbon and wax seal; it unties and unrolls to reveal its content. */
export function ParchmentScroll({ open, monogram, children }: ParchmentScrollProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(600);
  const [broken, setBroken] = useState(false);

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const measure = () => setHeight(el.scrollHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => setBroken(true), SCROLL_T.seal * 1000);
    return () => window.clearTimeout(id);
  }, [open]);

  return (
    <motion.div
      className="relative w-[min(580px,92vw)]"
      initial={{ y: -50, rotate: -4, opacity: 0 }}
      animate={open ? { y: 0, rotate: 0, opacity: 1 } : undefined}
      transition={{ type: 'spring', stiffness: 90, damping: 14 }}
    >
      <ScrollRod rolling={open} />

      {/* the paper itself */}
      <motion.div
        className="relative mx-auto -mt-2 w-full overflow-hidden"
        initial={{ height: 0 }}
        animate={open ? { height } : { height: 0 }}
        transition={{ duration: SCROLL_T.unrollFor, delay: SCROLL_T.unroll, ease: [0.65, 0, 0.25, 1] }}
      >
        <div
          ref={contentRef}
          className="paper-grain relative px-[clamp(22px,6vw,56px)] pb-12 pt-10"
          style={{
            backgroundColor: '#FBF3E2',
            boxShadow: 'inset 0 0 60px rgba(150,115,60,.22), inset 0 14px 18px -12px rgba(60,40,20,.45), inset 0 -14px 18px -12px rgba(60,40,20,.45)'
          }}
        >
          {children}
        </div>
      </motion.div>

      <div className="-mt-2">
        <ScrollRod rolling={open} />
      </div>

      {/* ribbon + seal tying the closed scroll */}
      <div className="pointer-events-none absolute left-1/2 top-[-6px] z-20 flex -translate-x-1/2 flex-col items-center">
        <motion.span
          className="block h-10 w-7 bg-gradient-to-r from-[#6B2232] via-[#9C4256] to-[#6B2232] shadow"
          animate={broken ? { y: -40, opacity: 0, rotate: -12 } : { y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: SCROLL_T.ribbon - SCROLL_T.seal, ease: EASE.out }}
        />
        <div className="-my-5">
          <WaxSeal size={64} tone="wine" monogram={monogram} broken={broken} />
        </div>
        <motion.span
          className="block h-10 w-7 bg-gradient-to-r from-[#6B2232] via-[#9C4256] to-[#6B2232] shadow [clip-path:polygon(0_0,100%_0,100%_100%,50%_82%,0_100%)]"
          animate={broken ? { y: 60, opacity: 0, rotate: 10 } : { y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: SCROLL_T.ribbon - SCROLL_T.seal, ease: EASE.out }}
        />
      </div>
    </motion.div>
  );
}
