import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import type { GalleryPhoto } from '../../../types/wedding';
import { ChevronIcon, CloseIcon } from '../../ui/Icons';

interface LightboxProps {
  photos: GalleryPhoto[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}

const navBtn = 'grid h-11 w-11 place-items-center rounded-full border border-gold-soft/60 bg-ivory/10 text-gold-soft hover:bg-ivory/20';

/** Full-screen photo viewer; the photo grows out of its gallery card (shared layout animation). */
export function Lightbox({ photos, index, onClose, onIndex }: LightboxProps) {
  useEffect(() => {
    if (index === null) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onIndex((index + 1) % photos.length);
      if (e.key === 'ArrowLeft') onIndex((index - 1 + photos.length) % photos.length);
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [index, photos.length, onClose, onIndex]);

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-night/90 p-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <motion.img
            key={photos[index].src}
            layoutId={`photo-${photos[index].src}`}
            src={photos[index].src}
            alt={photos[index].alt}
            className="max-h-[82vh] max-w-[min(92vw,760px)] border-8 border-ivory object-contain shadow-float"
            onClick={(e) => e.stopPropagation()}
          />
          <button type="button" aria-label="Close photo" className={`${navBtn} absolute right-4 top-[max(16px,env(safe-area-inset-top))]`} onClick={onClose}>
            <CloseIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Previous photo"
            className={`${navBtn} absolute left-3 top-1/2 -translate-y-1/2`}
            onClick={(e) => {
              e.stopPropagation();
              onIndex((index - 1 + photos.length) % photos.length);
            }}
          >
            <ChevronIcon dir="left" className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            className={`${navBtn} absolute right-3 top-1/2 -translate-y-1/2`}
            onClick={(e) => {
              e.stopPropagation();
              onIndex((index + 1) % photos.length);
            }}
          >
            <ChevronIcon className="h-5 w-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
