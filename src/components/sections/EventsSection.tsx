import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { Verse } from '../ui/Verse';
import { ChurchIcon, RingsIcon, ToastIcon, PinIcon } from '../ui/Icons';
import { EVENTS, VERSES } from '../../data/wedding';
import { formatDateShort, mapsLink } from '../../lib/format';
import type { EventIcon } from '../../types/wedding';

const ICONS: Record<EventIcon, typeof RingsIcon> = { rings: RingsIcon, church: ChurchIcon, toast: ToastIcon };

/** SECTION 08 · The wedding days: three arched cards unfold like letters from an envelope. */
export function EventsSection() {
  return (
    <Section id="events" tone="paper" frame>
      <SectionHeading eyebrow="Save the dates" title="The Wedding Days" />
      <Verse text={VERSES.events.text} reference={VERSES.events.ref} />
      <div className="grid w-full gap-5 md:grid-cols-3">
        {EVENTS.map((ev, i) => {
          const Icon = ICONS[ev.icon];
          return (
            <Reveal key={ev.id} as="article" delay={i * 0.15}>
              <div
                className={`paper-grain flex h-full flex-col items-center gap-2 rounded-[140px_140px_14px_14px] border px-6 pb-7 pt-11 text-center shadow-card transition-transform duration-500 hover:-translate-y-1 ${
                  ev.main ? 'border-champagne bg-gradient-to-b from-[#FFFAF0] to-[#F6ECD8]' : 'border-champagne/50 bg-ivory'
                }`}
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-sage-deep text-ivory">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="font-sans text-[11px] tracking-[0.24em] text-gold">{formatDateShort(ev.date).toUpperCase()}</span>
                <h3 className="text-[1.65rem] font-medium leading-tight text-ink">{ev.title}</h3>
                <span className="tabular-nums text-charcoal/70">{ev.time}</span>
                <span className="italic">{ev.venue}</span>
                <a
                  href={mapsLink(ev.mapQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-2 rounded-full border border-sage px-4 py-2 font-sans text-[10px] tracking-[0.22em] text-sage-deep transition-colors hover:bg-sage-deep hover:text-ivory"
                >
                  <PinIcon className="h-3.5 w-3.5" /> DIRECTIONS
                </a>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
