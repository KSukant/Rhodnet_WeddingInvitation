import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FamilyCard } from './FamilyCard';
import { InterlockingRings } from './InterlockingRings';
import { Section } from '../../ui/Section';
import { SectionHeading } from '../../ui/SectionHeading';
import { Verse } from '../../ui/Verse';
import { FAMILIES, PHOTOS, VERSES, WEDDING } from '../../../data/wedding';
import { EASE } from '../../../lib/motion';

/** SECTION 05 · Our Families: two sealed cards fly in, turn over and meet; the couple appears between them. */
export function FamiliesSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const play = useInView(ref, { once: true, amount: 0.3 });
  const centreAt = 1.4;

  return (
    <Section id="families" tone="ivory" frame>
      <SectionHeading eyebrow="With the blessings of our families" title="Our Families" />
      <div ref={ref} className="grid w-full items-center justify-items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
        <FamilyCard family={FAMILIES.groom} side="left" play={play} monogram={WEDDING.monogram[0]} />

        <div className="flex flex-col items-center gap-4">
          <motion.div
            className="relative aspect-[3/4] w-[min(250px,62vw)] overflow-hidden rounded-arch shadow-[0_0_0_6px_#FFFDF7,0_0_0_7px_#D8C6A0,0_30px_60px_-28px_rgba(60,40,10,.6)]"
            initial={{ clipPath: 'inset(100% 0% 0% 0%)', scale: 0.9 }}
            animate={play ? { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 } : undefined}
            transition={{ duration: 1.2, delay: centreAt, ease: EASE.inOut }}
          >
            <motion.img
              src={PHOTOS.familiesCentre.src}
              alt={PHOTOS.familiesCentre.alt}
              loading="lazy"
              className="h-full w-full object-cover"
              style={{ objectPosition: PHOTOS.familiesCentre.position }}
              initial={{ scale: 1.3 }}
              animate={play ? { scale: 1 } : undefined}
              transition={{ duration: 3.5, delay: centreAt, ease: 'easeOut' }}
            />
          </motion.div>
          <InterlockingRings play={play} delay={centreAt + 0.8} />
        </div>

        <FamilyCard family={FAMILIES.bride} side="right" play={play} monogram={WEDDING.monogram[1]} />
      </div>
      <Verse text={VERSES.families.text} reference={VERSES.families.ref} />
    </Section>
  );
}
