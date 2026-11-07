import { Reveal } from './Reveal';

interface VerseProps {
  text: string;
  reference: string;
  tone?: 'light' | 'dark';
  className?: string;
}

export function Verse({ text, reference, tone = 'light', className = '' }: VerseProps) {
  return (
    <Reveal variant="rise" className={`mx-auto max-w-[36ch] text-center ${className}`}>
      <p className={`italic ${tone === 'dark' ? 'text-linen' : 'text-charcoal/80'}`}>&ldquo;{text}&rdquo;</p>
      <cite className={`mt-2 block font-sans text-[10px] not-italic tracking-label ${tone === 'dark' ? 'text-gold-soft' : 'text-gold'}`}>
        {reference}
      </cite>
    </Reveal>
  );
}
