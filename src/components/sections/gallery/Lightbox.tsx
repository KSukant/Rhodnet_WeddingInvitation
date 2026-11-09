import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
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
  const [touchStart, setTouchStart] = useState<number | null>(null);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null || index === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;
    if (distance > 45) {
      onIndex((index + 1) % photos.length);
    } else if (distance < -45) {
      onIndex((index - 1 + photos.length) % photos.length);
    }
    setTouchStart(null);
  };

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-night/95 p-3 sm:p-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <button
            type="button"
            aria-label="Close photo"
            className={`${navBtn} absolute right-4 top-[max(16px,env(safe-area-inset-top))] z-20`}
            onClick={onClose}
          >
            <CloseIcon className="h-5 w-5" />
          </button>

          <div className="relative flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <motion.img
              key={photos[index].src}
              layoutId={`photo-${photos[index].src}`}
              src={photos[index].src}
              alt={photos[index].alt}
              className="max-h-[75vh] sm:max-h-[82vh] max-w-[min(94vw,760px)] border-4 sm:border-8 border-ivory object-contain shadow-float"
            />
            {photos[index].caption && (
              <span className="mt-3 block font-script text-xl sm:text-2xl text-ivory/90">
                {photos[index].caption}
              </span>
            )}
            <span className="mt-1 font-sans text-[11px] tracking-widest text-champagne/70">
              {index + 1} / {photos.length}
            </span>
          </div>

          <button
            type="button"
            aria-label="Previous photo"
            className={`${navBtn} hidden sm:grid absolute left-3 sm:left-4 top-1/2 -translate-y-1/2`}
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
            className={`${navBtn} hidden sm:grid absolute right-3 sm:right-4 top-1/2 -translate-y-1/2`}
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
