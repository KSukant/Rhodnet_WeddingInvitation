import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ParchmentScroll, SCROLL_T } from './ParchmentScroll';
import { Section } from '../../ui/Section';
import { SectionHeading } from '../../ui/SectionHeading';
import { InkText } from '../../ui/InkText';
import { WaxSeal } from '../../ui/WaxSeal';
import { Verse } from '../../ui/Verse';
import { LETTER, WEDDING } from '../../../data/wedding';

/** SECTION 03 · A letter to family and friends on a parchment scroll that unrolls. */
export function LetterSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const open = useInView(ref, { once: true, amount: 0.2 });
  const textStart = SCROLL_T.unroll + 0.4;
  const lines = [LETTER.salutation, ...LETTER.paragraphs, LETTER.signOff];
  const signAt = textStart + lines.length * 0.35 + 0.2;

  return (
    <Section id="letter" tone="paper" frame>
      <SectionHeading eyebrow={LETTER.eyebrow} title={LETTER.title} />
      <div ref={ref} className="flex w-full justify-center">
        <ParchmentScroll open={open} monogram={`${WEDDING.monogram[0]}&${WEDDING.monogram[1]}`}>
          <div className="flex flex-col gap-4 text-left text-[1.08rem] leading-relaxed text-[#4A3B2C]">
            {lines.map((line, i) => (
              <motion.p
                key={line}
                className={i === 0 ? 'italic' : i === lines.length - 1 ? 'mt-2 italic' : ''}
                initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                animate={open ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
                transition={{ duration: 0.9, delay: textStart + i * 0.35 }}
              >
                {line}
              </motion.p>
            ))}
            <div className="flex items-end justify-between gap-4">
              <InkText
                text={`${WEDDING.groomShort} & ${WEDDING.brideShort}`}
                play={open}
                delay={signAt}
                duration={1.5}
                from="#5B4630"
                to="#94773F"
                stroke="#8A6E3C"
                className="h-[clamp(52px,9vw,72px)] w-auto"
              />
              {/* gold seal stamped onto the finished letter */}
              <motion.div
                className="relative shrink-0"
                initial={{ scale: 2.4, opacity: 0, rotate: -25 }}
                animate={open ? { scale: 1, opacity: 1, rotate: 0 } : undefined}
                transition={{ type: 'spring', stiffness: 260, damping: 16, delay: signAt + 1.5 }}
              >
                <WaxSeal size={58} />
                <motion.span
                  className="absolute inset-0 rounded-full border-2 border-gold/60"
                  initial={{ scale: 1, opacity: 0 }}
                  animate={open ? { scale: [1, 2.2], opacity: [0.8, 0] } : undefined}
                  transition={{ duration: 0.9, delay: signAt + 1.6 }}
                />
              </motion.div>
            </div>
          </div>
        </ParchmentScroll>
      </div>
      <Verse text={LETTER.verse.text} reference={LETTER.verse.ref} />
    </Section>
  );
}
