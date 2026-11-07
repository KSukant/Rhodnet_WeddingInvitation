import { motion } from 'framer-motion';
import { useState } from 'react';
import { GoldDust } from '../ui/GoldDust';
import { GoldButton } from '../ui/GoldButton';
import { Ornament } from '../ui/Ornament';
import { Verse } from '../ui/Verse';
import { PHOTOS, VERSES, WEDDING } from '../../data/wedding';

/** SECTION 13 · Thank you, over the photo of the couple walking down the aisle. */
export function ThankYouSection({ onReplay }: { onReplay: () => void }) {
  const [copied, setCopied] = useState('');
  const copy = () => {
    const url = window.location.href.split('#')[0];
    if (!navigator.clipboard) return setCopied(url);
    navigator.clipboard.writeText(url).then(
      () => setCopied('Link copied. Share it on WhatsApp!'),
      () => setCopied(url)
    );
  };
  return (
    <section id="thanks" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-night px-4 py-24 text-center text-linen">
      <motion.img
        src={PHOTOS.thanks.src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        style={{ objectPosition: PHOTOS.thanks.position }}
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 12, ease: 'easeOut' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_45%,rgba(28,24,21,.35),rgba(28,24,21,.92))]" />
      <GoldDust count={20} />
      <div className="relative z-10 flex flex-col items-center gap-5">
        <motion.span className="eyebrow text-gold-soft" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          With grateful hearts
        </motion.span>
        <motion.h2
          className="text-[clamp(3.4rem,11vw,6rem)] font-normal leading-none text-ivory"
          initial={{ opacity: 0, letterSpacing: '0.4em', filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, letterSpacing: '0.02em', filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          Thank You
        </motion.h2>
        <p className="max-w-[40ch] text-linen/85">
          Your presence and prayers will make our celebration complete. We are honoured to share this blessed beginning with you.
        </p>
        <Ornament tone="light" />
        <Verse text={VERSES.thanks.text} reference={VERSES.thanks.ref} tone="dark" />
        <span className="font-script text-[2.6rem] text-gold-soft">
          {WEDDING.groomShort} &amp; {WEDDING.brideShort}
        </span>
        <div className="flex flex-wrap justify-center gap-3">
          <GoldButton variant="ghost-light" onClick={copy}>Copy invitation link</GoldButton>
          <GoldButton variant="ghost-light" onClick={onReplay}>Open again</GoldButton>
        </div>
        <p className="min-h-[1.4em] text-sm italic text-gold-soft" aria-live="polite">{copied}</p>
      </div>
    </section>
  );
}
