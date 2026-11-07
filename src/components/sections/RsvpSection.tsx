import { AnimatePresence, motion } from 'framer-motion';
import { useState, type FormEvent } from 'react';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { GoldButton } from '../ui/GoldButton';
import { WaxSeal } from '../ui/WaxSeal';
import { Reveal } from '../ui/Reveal';

const field = 'w-full rounded-xl border border-linen bg-ivory px-4 py-3 text-base text-ink outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/15';
const label = 'font-sans text-[10px] tracking-[0.22em] text-sage-deep';

/**
 * SECTION 12 · RSVP. On send, the reply card folds up and is sealed like a letter.
 * Note: answers are not stored anywhere yet; connect a Google Form / Sheet or Formspree to collect them.
 */
export function RsvpSection() {
  const [name, setName] = useState('');
  const [guests, setGuests] = useState('1 Guest');
  const [attending, setAttending] = useState(true);
  const [wish, setWish] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name so we know who is coming.');
      return;
    }
    setError('');
    setSent(true);
  };

  return (
    <Section id="rsvp" tone="paper" frame>
      <SectionHeading
        eyebrow="R · S · V · P"
        title={<>Join us in <span className="font-script text-[1.2em] text-gold">Celebration</span></>}
        intro="We would be honoured to celebrate this blessed union with you. Kindly confirm your attendance and keep us in your prayers."
      />
      <div className="relative w-[min(520px,100%)]" style={{ perspective: 1400 }}>
        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.form
              key="form"
              onSubmit={submit}
              noValidate
              className="paper-grain flex flex-col gap-4 rounded-2xl border border-champagne/60 bg-ivory p-6 text-left shadow-card"
              style={{ transformOrigin: '50% 0%' }}
              exit={{ rotateX: 80, scaleY: 0.3, y: 40, opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.55, 0.05, 0.3, 1] }}
            >
              <Reveal variant="rise">
                <label htmlFor="rsvp-name" className={label}>GUEST FULL NAME *</label>
                <input id="rsvp-name" className={`${field} mt-1.5`} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="e.g. John & Grace" />
              </Reveal>
              <Reveal variant="rise" delay={0.05}>
                <label htmlFor="rsvp-guests" className={label}>NUMBER OF GUESTS *</label>
                <select id="rsvp-guests" className={`${field} mt-1.5`} value={guests} onChange={(e) => setGuests(e.target.value)}>
                  {['1 Guest', '2 Guests', '3 Guests', '4 Guests', '5+ Guests'].map((g) => <option key={g}>{g}</option>)}
                </select>
              </Reveal>
              <Reveal variant="rise" delay={0.1}>
                <span className={label}>WILL YOU ATTEND? *</span>
                <div className="mt-1.5 grid grid-cols-2 gap-2">
                  {[{ v: true, t: 'Joyfully accept' }, { v: false, t: 'Regretfully decline' }].map((o) => (
                    <button
                      key={o.t}
                      type="button"
                      aria-pressed={attending === o.v}
                      onClick={() => setAttending(o.v)}
                      className={`rounded-xl border px-3 py-2.5 transition ${attending === o.v ? 'border-sage-deep bg-sage-deep text-ivory' : 'border-linen bg-ivory'}`}
                    >
                      {o.t}
                    </button>
                  ))}
                </div>
              </Reveal>
              <Reveal variant="rise" delay={0.15}>
                <label htmlFor="rsvp-wish" className={label}>BLESSINGS FOR THE COUPLE</label>
                <textarea id="rsvp-wish" rows={3} className={`${field} mt-1.5`} value={wish} onChange={(e) => setWish(e.target.value)} placeholder="Write a prayer or a wish…" />
              </Reveal>
              <p className="min-h-[1.2em] text-wine" role="alert">{error}</p>
              <GoldButton type="submit" variant="solid">Send RSVP</GoldButton>
            </motion.form>
          ) : (
            <motion.div
              key="sent"
              className="flex flex-col items-center gap-4 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <motion.div initial={{ scale: 2.4, rotate: -30, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.3 }}>
                <WaxSeal size={84} monogram="J&M" />
              </motion.div>
              <span className="eyebrow">RSVP sealed &amp; received</span>
              <h3 className="text-[clamp(2rem,6vw,3rem)] font-medium text-ink">
                {attending ? `See you there, ${name.trim()}` : `We will miss you, ${name.trim()}`}
              </h3>
              <p className="max-w-[38ch] text-charcoal/70">Thank you for letting us know. Your prayers and wishes mean the world to us.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}
