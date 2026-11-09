import { forwardRef, type ReactNode } from 'react';

interface SectionProps {
  id: string;
  children: ReactNode;
  tone?: 'paper' | 'ivory' | 'linen' | 'dark';
  /** thin gold arch frame around the section, like the edge of an invitation card */
  frame?: boolean;
  className?: string;
  innerClassName?: string;
}

const TONES = {
  paper: 'bg-paper text-charcoal',
  ivory: 'bg-ivory text-charcoal',
  linen: 'bg-linen/60 text-charcoal',
  dark: 'bg-night text-linen'
};

/** Every page section uses this wrapper: consistent spacing, safe-area padding, background and frame. */
export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { id, children, tone = 'paper', frame = false, className = '', innerClassName = '' },
  ref
) {
  return (
    <section
      id={id}
      ref={ref}
      className={`relative overflow-hidden px-[max(14px,env(safe-area-inset-left))] py-14 sm:py-20 md:py-24 lg:py-28 ${TONES[tone]} ${className}`}
    >
      {tone !== 'dark' && <div className="paper-grain pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />}
      {frame && (
        <div
          className="pointer-events-none absolute inset-2 rounded-[999px_999px_16px_16px/220px_220px_16px_16px] border border-gold/30 sm:inset-5"
          aria-hidden="true"
        >
          <div className="absolute inset-1.5 sm:inset-2 rounded-[inherit] border border-gold/15" />
        </div>
      )}
      <div className={`relative mx-auto flex max-w-5xl flex-col items-center gap-7 sm:gap-9 md:gap-10 ${innerClassName}`}>{children}</div>
    </section>
  );
});
