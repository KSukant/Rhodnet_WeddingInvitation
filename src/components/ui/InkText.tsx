import { motion } from 'framer-motion';
import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';

interface InkTextProps {
  text: string;
  /** start writing (e.g. when the hero is revealed) */
  play: boolean;
  delay?: number;
  duration?: number;
  className?: string;
  /** colours of the ink fill gradient */
  from?: string;
  to?: string;
  align?: 'start' | 'middle';
  /** colour of the outline being written */
  stroke?: string;
}

/**
 * Script text that is written in gold ink: the letter outlines are drawn stroke by stroke from left
 * to right, then the ink fills in and a gold shimmer runs across it.
 */
export function InkText({ text, play, delay = 0, duration = 1.6, className = '', from = '#FFFBF0', to = '#E6D3A3', align = 'start', stroke = '#E6D3A3' }: InkTextProps) {
  const id = useId().replace(/:/g, '');
  const textRef = useRef<SVGTextElement | null>(null);
  const [box, setBox] = useState({ x: 0, y: -80, w: 600, h: 110 });

  // size the SVG to the real text once the script font has loaded
  const measure = () => {
    const el = textRef.current;
    if (!el) return;
    const b = el.getBBox();
    if (b.width > 0) setBox({ x: b.x - 14, y: b.y - 10, w: b.width + 28, h: b.height + 20 });
  };
  useLayoutEffect(measure, [text]);
  useEffect(() => {
    let alive = true;
    document.fonts?.ready.then(() => alive && measure());
    return () => {
      alive = false;
    };
  }, [text]);

  const anchorX = align === 'middle' ? box.x + box.w / 2 : 0;

  return (
    <svg
      className={className}
      viewBox={`${box.x} ${box.y} ${box.w} ${box.h}`}
      style={{ aspectRatio: `${box.w} / ${box.h}`, overflow: 'visible' }}
      role="img"
      aria-label={text}
    >
      <defs>
        <linearGradient id={`ink-${id}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={from} />
          <stop offset="0.5" stopColor={to} />
          <stop offset="1" stopColor={from} />
        </linearGradient>
        <linearGradient id={`sheen-${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#FFF4D0" stopOpacity="0.95" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={`sweep-${id}`}>
          <motion.rect
            x={box.x}
            y={box.y - 20}
            height={box.h + 40}
            fill="#fff"
            initial={{ width: 0 }}
            animate={play ? { width: box.w } : { width: 0 }}
            transition={{ duration, delay, ease: [0.45, 0.05, 0.25, 1] }}
          />
        </mask>
        <clipPath id={`clip-${id}`}>
          <text x={anchorX} y={0} textAnchor={align} className="font-script" style={{ fontSize: 100 }}>
            {text}
          </text>
        </clipPath>
      </defs>
      <g mask={`url(#sweep-${id})`}>
        {/* the ink outline being written */}
        <motion.text
          ref={textRef}
          x={anchorX}
          y={0}
          textAnchor={align}
          className="font-script"
          style={{ fontSize: 100 }}
          fill="transparent"
          stroke={stroke}
          strokeWidth={1.3}
          strokeDasharray="420"
          initial={{ strokeDashoffset: 420 }}
          animate={play ? { strokeDashoffset: 0 } : { strokeDashoffset: 420 }}
          transition={{ duration: duration * 1.1, delay, ease: 'easeInOut' }}
        >
          {text}
        </motion.text>
        {/* the ink filling in */}
        <motion.text
          x={anchorX}
          y={0}
          textAnchor={align}
          className="font-script"
          style={{ fontSize: 100 }}
          fill={`url(#ink-${id})`}
          initial={{ opacity: 0 }}
          animate={play ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.9, delay: delay + duration * 0.55 }}
        >
          {text}
        </motion.text>
      </g>
      {/* gold shimmer passing over the finished name */}
      <g clipPath={`url(#clip-${id})`}>
        <motion.rect
          y={box.y}
          height={box.h}
          width={box.w * 0.35}
          fill={`url(#sheen-${id})`}
          initial={{ x: box.x - box.w * 0.4 }}
          animate={play ? { x: [box.x - box.w * 0.4, box.x + box.w * 1.1] } : undefined}
          transition={{ duration: 1.6, delay: delay + duration + 0.4, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
        />
      </g>
    </svg>
  );
}
