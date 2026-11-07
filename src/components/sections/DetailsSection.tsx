import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { DRESS_PALETTE, FAQS, GUEST_NOTES } from '../../data/wedding';

/** SECTION 11 · Guest details: dress palette, notes and questions. */
export function DetailsSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <Section id="details" tone="ivory">
      <SectionHeading eyebrow="Good to know" title="Guest Details" />
      <div className="flex flex-col items-center gap-3">
        <span className="eyebrow text-sage-deep">Dress palette</span>
        <div className="flex flex-wrap justify-center gap-4">
          {DRESS_PALETTE.map((c, i) => (
            <motion.span
              key={c.name}
              className="flex flex-col items-center gap-1.5 font-sans text-[10px] tracking-[0.16em] text-charcoal/70"
              initial={{ opacity: 0, y: 30, rotate: -8 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 120, damping: 12, delay: i * 0.08 }}
            >
              <i className="block h-20 w-14 rounded-[30px_30px_8px_8px] shadow-[0_0_0_1px_#EFE6D2,0_10px_18px_-12px_rgba(81,70,63,.5)]" style={{ background: c.color }} />
              {c.name.toUpperCase()}
            </motion.span>
          ))}
        </div>
      </div>
      <div className="grid w-full gap-4 text-left md:grid-cols-3">
        {GUEST_NOTES.map((n, i) => (
          <Reveal key={n.title} delay={i * 0.12} className="paper-grain flex flex-col gap-1.5 rounded-2xl border border-linen bg-paper p-5 shadow-card">
            <span className="eyebrow">{n.eyebrow}</span>
            <h3 className="text-[1.35rem] font-medium text-ink">{n.title}</h3>
            <p className="text-charcoal/70">{n.text}</p>
          </Reveal>
        ))}
      </div>
      <div className="flex w-full max-w-2xl flex-col gap-2 text-left">
        {FAQS.map((f, i) => {
          const open = openFaq === i;
          return (
            <Reveal key={f.q} variant="rise" delay={i * 0.08} className="rounded-xl border border-linen bg-paper">
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpenFaq(open ? null : i)}
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-[1.1rem]"
              >
                {f.q}
                <motion.span animate={{ rotate: open ? 45 : 0 }} className="text-2xl leading-none text-gold">
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden px-5 text-charcoal/70"
                  >
                    <span className="block pb-4">{f.a}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
