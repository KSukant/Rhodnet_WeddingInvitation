import { motion, useTransform, type MotionValue } from 'framer-motion';
import type { StoryChapter } from '../../../types/wedding';
import { chapterRange } from './chapterRange';

interface ChapterTextProps {
  chapter: StoryChapter;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

/** Chapter words: rise in from below, hold while the chapter is pinned, lift away as the next arrives. */
export function ChapterText({ chapter, index, total, progress }: ChapterTextProps) {
  const { start, end, pad, first, last } = chapterRange(index, total);
  const input = [first ? -1 : start - pad, first ? 0 : start + pad, last ? 2 : end - pad, last ? 3 : end + pad];
  const opacity = useTransform(progress, input, [0, 1, 1, 0]);
  const y = useTransform(progress, input, [90, 0, 0, -90]);
  const blur = useTransform(progress, input, ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(8px)']);
  const numeralY = useTransform(progress, [start - pad, end + pad], [120, -120]);

  return (
    <motion.div className="absolute inset-0 flex flex-col justify-center gap-2 sm:gap-3.5 max-lg:items-center" style={{ opacity, y, filter: blur }}>
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 right-0 font-display text-[clamp(8rem,18vw,14rem)] leading-none text-gold/10 max-lg:hidden"
        style={{ y: numeralY }}
      >
        {chapter.numeral}
      </motion.span>
      <span className="eyebrow text-gold-soft text-[10px] sm:text-[11px]">
        Chapter {chapter.numeral} · {chapter.eyebrow}
      </span>
      <h3 className="text-[clamp(1.5rem,4.2vw,3.6rem)] font-medium leading-[1.1] text-ivory">{chapter.title}</h3>
      <span className="h-px w-20 sm:w-24 bg-gradient-to-r from-transparent via-champagne to-transparent lg:from-champagne lg:via-champagne/60" />
      <p className="max-w-[34ch] text-[0.92rem] sm:text-[1.12rem] italic leading-relaxed text-linen/85">{chapter.text}</p>
    </motion.div>
  );
}
