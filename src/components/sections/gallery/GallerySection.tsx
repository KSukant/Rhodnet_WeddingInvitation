import { motion } from 'framer-motion';
import { useState } from 'react';
import { Lightbox } from './Lightbox';
import { Section } from '../../ui/Section';
import { SectionHeading } from '../../ui/SectionHeading';
import { GALLERY } from '../../../data/wedding';

const tilt = (i: number) => (i % 2 ? 1 : -1) * (1 + (i % 3) * 0.6);

/** SECTION 06 · Gallery: photo prints slide up out of the page like cards from an envelope. */
export function GallerySection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <Section id="gallery" tone="paper">
      <SectionHeading eyebrow="Captured with love" title="Our Memories" intro="Tap any photo to see it larger." />
      <div className="w-full columns-2 gap-4 sm:columns-3">
        {GALLERY.map((p, i) => (
          <motion.button
            key={p.src}
            type="button"
            onClick={() => setOpen(i)}
            className="mb-4 block w-full break-inside-avoid bg-ivory p-2 pb-9 text-center shadow-card"
            initial={{ opacity: 0, y: 80, rotate: tilt(i) * 4, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, rotate: tilt(i), scale: 1 }}
            whileHover={{ rotate: 0, y: -6, scale: 1.02 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: 'spring', stiffness: 90, damping: 14, delay: (i % 3) * 0.12 }}
          >
            <motion.img layoutId={`photo-${p.src}`} src={p.src} alt={p.alt} loading="lazy" className="w-full" />
            <span className="mt-2 block font-script text-xl text-charcoal/80">{p.caption}</span>
          </motion.button>
        ))}
      </div>
      <Lightbox photos={GALLERY} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </Section>
  );
}
