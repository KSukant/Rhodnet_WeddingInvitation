import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../../lib/motion';

interface Petal {
  x: number; y: number; s: number; vx: number; vy: number; a: number; va: number; sw: number; c: string;
}

interface PetalsProps {
  /** how many petals may be on screen at once (0 = none) */
  density: number;
  /** increase this number to release a burst of petals */
  burst?: number;
}

/** Falling white and blush rose petals drawn on one shared canvas behind the content. */
export function Petals({ density, burst = 0 }: PetalsProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const densityRef = useRef(density);
  const petalsRef = useRef<Petal[]>([]);
  densityRef.current = density;

  const spawn = (fromTop: boolean) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const r = Math.random();
    petalsRef.current.push({
      x: Math.random() * w,
      y: fromTop ? -20 : -Math.random() * h * 0.6,
      s: 5 + Math.random() * 7,
      vx: -0.4 + Math.random() * 0.8,
      vy: 0.5 + Math.random(),
      a: Math.random() * 6.28,
      va: -0.03 + Math.random() * 0.06,
      sw: Math.random() * 6.28,
      c: r < 0.2 ? '#F2D6CF' : r < 0.6 ? '#FFFFFF' : '#F6EFE3'
    });
  };

  useEffect(() => {
    if (burst > 0 && !prefersReducedMotion()) for (let i = 0; i < 45; i++) spawn(false);
  }, [burst]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    window.addEventListener('resize', size);
    let raf = 0;
    const frame = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      if (petalsRef.current.length < densityRef.current && Math.random() < 0.06) spawn(true);
      for (const p of petalsRef.current) {
        p.sw += 0.02;
        p.x += p.vx + Math.sin(p.sw) * 0.6;
        p.y += p.vy;
        p.a += p.va;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.a);
        ctx.scale(1, 0.55 + 0.45 * Math.sin(p.sw * 2));
        ctx.beginPath();
        ctx.ellipse(0, 0, p.s, p.s * 0.62, 0, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.shadowColor = 'rgba(120,90,40,.25)';
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.restore();
      }
      petalsRef.current = petalsRef.current.filter((p) => p.y < h + 30);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', size);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-30 h-full w-full" aria-hidden="true" />;
}
