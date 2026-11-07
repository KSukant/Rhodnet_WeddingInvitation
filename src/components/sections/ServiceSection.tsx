import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { SERVICE } from '../../data/wedding';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

/** SECTION 07 · Order of Service: a gold thread draws down the programme as you scroll. */
export function ServiceSection() {
  const listRef = useRef<HTMLOListElement | null>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] });
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <Section id="service" tone="ivory" frame>
      <SectionHeading eyebrow="The holy matrimony" title="Order of Service" />
      <ol ref={listRef} className="relative flex w-full max-w-xl flex-col gap-2 text-left">
        <span className="absolute bottom-6 left-[22px] top-6 w-px bg-gold/20" aria-hidden="true" />
        <motion.span className="absolute bottom-6 left-[22px] top-6 w-px bg-gold" style={{ scaleY: line, originY: 0 }} aria-hidden="true" />
        {SERVICE.map((step, i) => (
          <Reveal key={step.title} as="li" variant="left" delay={0.05} className="relative grid grid-cols-[44px_1fr] gap-4 py-3">
            <span className="relative z-10 grid h-11 w-11 place-items-center rounded-full border border-gold-soft bg-ivory font-display text-sm text-gold">
              {ROMAN[i]}
            </span>
            <div>
              <h3 className="text-[1.35rem] font-medium text-ink">{step.title}</h3>
              <p className="text-charcoal/70">{step.text}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
