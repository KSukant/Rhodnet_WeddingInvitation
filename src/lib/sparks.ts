/** Burst of gold sparkles from a point; used by the envelope's light burst. Returns a cancel function. */
export function runSparkBurst(canvas: HTMLCanvasElement, originX: number, originY: number): () => void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => undefined;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = window.innerWidth;
  const h = window.innerHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const count = w < 760 ? 30 : 60;
  const sparks = Array.from({ length: count }, () => {
    const ang = Math.random() * Math.PI * 2;
    const speed = 2.2 + Math.random() * 6.5;
    return {
      x: originX,
      y: originY,
      vx: Math.cos(ang) * speed,
      vy: Math.sin(ang) * speed - 1.6,
      r: 1.2 + Math.random() * 2.6,
      life: 900 + Math.random() * 600,
      age: 0,
      tw: Math.random() * Math.PI * 2
    };
  });

  let raf = 0;
  let last = performance.now();
  const frame = (now: number) => {
    const dt = Math.min(40, now - last);
    last = now;
    ctx.clearRect(0, 0, w, h);
    let alive = 0;
    for (const s of sparks) {
      s.age += dt;
      if (s.age >= s.life) continue;
      alive++;
      const k = dt / 16.7;
      s.x += s.vx * k;
      s.y += s.vy * k;
      s.vx *= 0.985;
      s.vy = s.vy * 0.985 + 0.05 * k;
      s.tw += 0.25 * k;
      const a = Math.max(0, (1 - s.age / s.life) * (0.65 + 0.35 * Math.sin(s.tw)));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 231, 168, ${a.toFixed(3)})`;
      ctx.shadowColor = 'rgba(255, 210, 130, .9)';
      ctx.shadowBlur = 10;
      ctx.fill();
    }
    if (alive > 0) raf = requestAnimationFrame(frame);
    else ctx.clearRect(0, 0, w, h);
  };
  raf = requestAnimationFrame(frame);
  return () => {
    cancelAnimationFrame(raf);
    ctx.clearRect(0, 0, w, h);
  };
}
