import { AnimatePresence, motion } from 'framer-motion';
import { CloseIcon } from '../ui/Icons';
import { SECTIONS } from '../../data/wedding';

interface MenuOverlayProps {
  open: boolean;
  active: string;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

/** Full-screen list of pages; it unfolds like a letter. */
export function MenuOverlay({ open, active, onClose, onNavigate }: MenuOverlayProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          className="paper-grain fixed inset-0 z-[55] flex flex-col items-center justify-center gap-1 overflow-y-auto bg-ivory/95 px-4 py-16 backdrop-blur"
          style={{ transformOrigin: '50% 0%' }}
          initial={{ opacity: 0, rotateX: -60, transformPerspective: 1200 }}
          animate={{ opacity: 1, rotateX: 0 }}
          exit={{ opacity: 0, rotateX: -40 }}
          transition={{ duration: 0.5, ease: [0.3, 0.75, 0.25, 1] }}
          aria-label="Invitation pages"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close page list"
            className="absolute right-4 top-[max(12px,env(safe-area-inset-top))] grid h-11 w-11 place-items-center rounded-full border border-gold/50 text-gold"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
          <span className="eyebrow mb-3">Contents</span>
          {SECTIONS.map((s, i) => (
            <motion.button
              key={s.id}
              type="button"
              onClick={() => onNavigate(s.id)}
              className={`text-2xl transition-colors hover:text-gold ${active === s.id ? 'text-gold' : 'text-ink'}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
            >
              <small className="mr-3 align-middle font-sans text-[10px] tracking-[0.2em] text-gold-soft">{String(i + 1).padStart(2, '0')}</small>
              {s.label}
            </motion.button>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
