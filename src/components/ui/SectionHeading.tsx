import type { ReactNode } from 'react';
import { Reveal } from './Reveal';
import { Ornament } from './Ornament';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  tone?: 'light' | 'dark';
  ornament?: boolean;
  align?: 'center' | 'left';
}

export function SectionHeading({ eyebrow, title, intro, tone = 'light', ornament = true, align = 'center' }: SectionHeadingProps) {
  const center = align === 'center';
  return (
    <header className={`flex flex-col gap-3 ${center ? 'items-center text-center' : 'items-start text-left'}`}>
      <Reveal variant="rise">
        <span className={`eyebrow ${tone === 'dark' ? 'text-gold-soft' : ''}`}>{eyebrow}</span>
      </Reveal>
      <Reveal variant="paper" delay={0.1}>
        <h2 className={`text-[clamp(1.9rem,5.5vw,3.6rem)] font-medium leading-[1.08] ${tone === 'dark' ? 'text-ivory' : 'text-ink'}`}>{title}</h2>
      </Reveal>
      {ornament && <Ornament tone={tone === 'dark' ? 'light' : 'gold'} />}
      {intro && (
        <Reveal variant="rise" delay={0.2}>
          <p className={`max-w-[46ch] italic ${tone === 'dark' ? 'text-linen/80' : 'text-charcoal/75'}`}>{intro}</p>
        </Reveal>
      )}
    </header>
  );
}
