import { motion } from 'framer-motion';

/** Wooden-and-gold roller of the parchment scroll; its grain slides while the scroll unrolls. */
export function ScrollRod({ rolling }: { rolling: boolean }) {
  return (
    <div className="relative z-10 mx-auto h-6 w-[108%] -translate-x-[3.7%]">
      <span className="absolute -left-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#F4E3B5,#B39A68_55%,#7A5E2E)] shadow-md" />
      <span className="absolute -right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#F4E3B5,#B39A68_55%,#7A5E2E)] shadow-md" />
      <motion.div
        className="absolute inset-x-4 inset-y-0 rounded-full shadow-[0_6px_12px_-6px_rgba(60,40,20,.6)]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(0,0,0,.09) 0 5px, transparent 5px 13px), linear-gradient(180deg, #5A3B20 0%, #A0743F 30%, #E9C88E 50%, #A0743F 72%, #4E321B 100%)'
        }}
        animate={rolling ? { backgroundPositionX: ['0px', '-260px'] } : undefined}
        transition={{ duration: 2, ease: [0.65, 0, 0.25, 1] }}
      />
    </div>
  );
}
