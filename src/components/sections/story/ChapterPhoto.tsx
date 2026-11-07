import { motion, useTransform, type MotionValue } from 'framer-motion';
import type { StoryChapter } from '../../../types/wedding';
import { chapterRange } from './chapterRange';

interface ChapterPhotoProps {
  chapter: StoryChapter;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

/** One photo inside the arched window: wipes up over the previous chapter, then slowly zooms out. */
export function ChapterPhoto({ chapter, index, total, progress }: ChapterPhotoProps) {
  const { start, end, pad, first } = chapterRange(index, total);
  const clip = useTransform(progress, first ? [0, 1] : [start - pad * 1.6, start + pad * 0.4], first ? ['inset(0% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'] : ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)']);
  const scale = useTransform(progress, [start - pad, end + pad], [1.28, 1]);
  const y = useTransform(progress, [start - pad, end + pad], ['6%', '-4%']);
  return (
    <motion.div className="absolute inset-0" style={{ clipPath: clip, zIndex: index }}>
      <motion.img
        src={chapter.photo.src}
        alt={chapter.photo.alt}
        className="h-full w-full object-cover"
        style={{ objectPosition: chapter.photo.position, scale, y }}
        loading="lazy"
      />
    </motion.div>
  );
}
