import { motion } from 'framer-motion';
import { useState, type ReactNode } from 'react';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { PinIcon, PlaneIcon, TrainIcon } from '../ui/Icons';
import { TRAVEL, WEDDING } from '../../data/wedding';

const card = 'paper-grain rounded-2xl border border-linen bg-ivory p-5 shadow-card';

function CardHead({ icon, eyebrow, title, light = false }: { icon: ReactNode; eyebrow: string; title: string; light?: boolean }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${light ? 'bg-ivory text-wine' : 'bg-sage-deep text-ivory'}`}>{icon}</span>
      <div>
        <span className={`block font-sans text-[9px] tracking-[0.3em] ${light ? 'text-gold-soft' : 'text-gold'}`}>{eyebrow}</span>
        <h3 className="text-[1.4rem] font-medium leading-tight">{title}</h3>
      </div>
    </div>
  );
}

/** SECTION 09 · Travel guide (content kept from the original site). */
export function TravelSection() {
  const cities = Object.keys(TRAVEL.trains);
  const [city, setCity] = useState(cities[0]);
  return (
    <Section id="travel" tone="ivory">
      <SectionHeading eyebrow="Plan your journey" title="Travel Guide" intro="Your convenience is our priority. Kindly choose the option that suits you best." />
      <div className="grid w-full items-start gap-6 text-left md:grid-cols-[200px_1fr] lg:grid-cols-[220px_1fr]">
        <Reveal variant="zoom" className="mx-auto">
          <div className="grid aspect-square w-[140px] sm:w-[170px] md:w-[200px] place-items-center rounded-full bg-[radial-gradient(circle_at_40%_30%,#6E8566,#3F5240)] text-center text-ivory shadow-[0_0_0_5px_#FFFDF7,0_0_0_6px_#D8C6A0]">
            <div>
              <span className="block font-sans text-[8px] sm:text-[9px] tracking-[0.3em] text-gold-soft">FINAL DESTINATION</span>
              <span className="block text-[1.8rem] sm:text-[2.2rem]">{WEDDING.city}</span>
              <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.2em] opacity-80">{WEDDING.state?.toUpperCase() ?? 'KERALA'}</span>
            </div>
          </div>
        </Reveal>
        <div className="flex min-w-0 flex-col gap-4">
          <Reveal className={card}>
            <CardHead icon={<PlaneIcon className="h-5 w-5 rotate-45" />} eyebrow="ARRIVING BY FLIGHT" title="Nearest Airports" />
            <div className="relative flex justify-between pt-2">
              <span className="absolute left-[8%] right-[8%] top-[13px] border-t border-dashed border-champagne" />
              <motion.span
                className="absolute top-[3px] text-wine"
                animate={{ left: ['8%', '86%'], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <PlaneIcon className="h-4 w-4 rotate-90" />
              </motion.span>
              {TRAVEL.airports.map((a) => (
                <span key={a} className="relative flex flex-col items-center gap-1.5 sm:gap-2 font-sans text-[9px] sm:text-[11px] tracking-[0.1em] sm:tracking-[0.14em] text-center">
                  <span className="h-3 w-3 rounded-full bg-gold shadow-[0_0_0_3px_#FFFDF7]" />
                  {a}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal className={card} delay={0.1}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <CardHead icon={<TrainIcon className="h-5 w-5" />} eyebrow={`BY TRAIN · ${TRAVEL.station ?? 'ERNAKULAM (ERS / ERN)'}`} title="Recommended Trains" />
              <div className="mb-3 sm:mb-4 inline-flex w-full sm:w-auto justify-center rounded-full bg-linen p-1" role="tablist">
                {cities.map((c) => (
                  <button
                    key={c}
                    role="tab"
                    aria-selected={city === c}
                    onClick={() => setCity(c)}
                    className={`relative flex-1 sm:flex-initial text-center rounded-full px-3 sm:px-4 py-2 font-sans text-[10px] tracking-[0.16em] min-h-[38px] flex items-center justify-center ${city === c ? 'text-ivory' : 'text-charcoal'}`}
                  >
                    {city === c && <motion.span layoutId="train-tab" className="absolute inset-0 rounded-full bg-sage-deep" />}
                    <span className="relative">{c}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {TRAVEL.trains[city].map((t, i) => (
                <motion.div
                  key={city + t}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-lg border border-linen bg-paper px-3 py-2.5"
                >
                  {t}
                </motion.div>
              ))}
            </div>
          </Reveal>
          <Reveal className="rounded-2xl bg-wine p-5 text-[#F6E7E1] shadow-card" delay={0.2}>
            <CardHead icon={<PinIcon className="h-5 w-5" />} eyebrow="ARRIVAL & LOCAL COMMUTE" title={TRAVEL.alternateTitle ?? 'Ernakulam South (ERS) / North (ERN)'} light />
            <p className="italic text-[#ECD6CF]">{TRAVEL.alternate}</p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
