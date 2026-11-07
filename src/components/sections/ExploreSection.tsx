import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { ChevronIcon } from '../ui/Icons';
import { PLACES } from '../../data/wedding';
import type { Place } from '../../types/wedding';

const ART: Record<Place['tone'], string> = {
  sunset: 'linear-gradient(180deg,#F2B56B 0%,#C86A3A 55%,#6A2F2A 100%)',
  sea: 'linear-gradient(180deg,#BFE0EA 0%,#7FB6C9 50%,#E8D6B0 50%,#D9C193 100%)',
  spice: 'radial-gradient(circle at 50% 60%,#F3D9A4 0 30%,#C9893F 31% 34%,#8B4B24 35% 100%)'
};

/** SECTION 10 · Places to explore (content kept from the original site), as a sliding postcard deck. */
export function ExploreSection() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const go = (d: number) => {
    setDir(d);
    setIndex((i) => (i + d + PLACES.length) % PLACES.length);
  };
  useEffect(() => {
    const id = window.setInterval(() => go(1), 7000);
    return () => window.clearInterval(id);
  }, []);
  const place = PLACES[index];

  return (
    <Section id="explore" tone="paper">
      <SectionHeading eyebrow="While you are here" title="Places to Explore" intro="Discover handpicked places that capture the timeless charm of Kochi and the backwaters." />
      <div className="relative w-full max-w-3xl" style={{ perspective: 1400 }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.article
            key={place.title}
            custom={dir}
            className="grid overflow-hidden rounded-3xl bg-wine shadow-card md:grid-cols-[1fr_1.1fr]"
            initial={{ opacity: 0, rotateY: dir * 35, x: dir * 80 }}
            animate={{ opacity: 1, rotateY: 0, x: 0 }}
            exit={{ opacity: 0, rotateY: dir * -35, x: dir * -80 }}
            transition={{ duration: 0.6, ease: [0.3, 0.75, 0.25, 1] }}
          >
            <div className="relative min-h-[220px] overflow-hidden bg-wine md:min-h-[320px]">
              {place.image ? (
                <>
                  <img
                    src={place.image}
                    alt={place.imageAlt ?? place.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/30" />
                </>
              ) : (
                <div className="h-full w-full" style={{ background: ART[place.tone] }} />
              )}
            </div>
            <div className="paper-grain flex flex-col gap-3 rounded-tl-[90px] bg-ivory p-7 text-left max-md:rounded-t-[40px]">
              <span className="eyebrow">{place.eyebrow}</span>
              <h3 className="text-3xl font-medium text-sage-deep">{place.title}</h3>
              <p className="text-charcoal/75">{place.text}</p>
              <ul className="list-disc pl-5 marker:text-gold">
                {place.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          </motion.article>
        </AnimatePresence>
        <div className="mt-5 flex items-center gap-3">
          <div className="flex flex-1 gap-2">
            {PLACES.map((p, i) => (
              <span key={p.title} className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-sage-deep' : 'w-1.5 bg-linen'}`} />
            ))}
          </div>
          {(['left', 'right'] as const).map((d) => (
            <button
              key={d}
              type="button"
              aria-label={d === 'left' ? 'Previous place' : 'Next place'}
              onClick={() => go(d === 'left' ? -1 : 1)}
              className="grid h-10 w-10 place-items-center rounded-full border border-gold/50 text-gold hover:bg-gold hover:text-ivory"
            >
              <ChevronIcon dir={d} className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>
    </Section>
  );
}
