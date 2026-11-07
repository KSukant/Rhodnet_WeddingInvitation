import { useId } from 'react';

/** White roses with sage leaves, drawn in SVG (decorates the envelope scene and section corners). */
function Rose({ cx, cy, r, rot, gid }: { cx: number; cy: number; r: number; rot: number; gid: string }) {
  const rings: [number, number][] = [[7, 1], [6, 0.82], [5, 0.62], [4, 0.44], [3, 0.28]];
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rot})`}>
      {rings.map(([n, k], ri) =>
        Array.from({ length: n }, (_, i) => {
          const rr = r * k;
          return (
            <ellipse
              key={`${ri}-${i}`}
              cx={0}
              cy={-rr * 0.42}
              rx={rr * 0.62}
              ry={rr * 0.55}
              transform={`rotate(${(i / n) * 360 + ri * 23})`}
              fill={`url(#${gid}-${ri % 2})`}
              stroke="rgba(170,150,115,.28)"
              strokeWidth={0.6}
            />
          );
        })
      )}
      <circle r={r * 0.13} fill="#EDE3CF" />
    </g>
  );
}

const Leaf = ({ x, y, l, rot, c }: { x: number; y: number; l: number; rot: number; c: string }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <path d={`M0 0 C ${l * 0.3} ${-l * 0.28}, ${l * 0.75} ${-l * 0.22}, ${l} 0 C ${l * 0.75} ${l * 0.22}, ${l * 0.3} ${l * 0.28}, 0 0Z`} fill={c} />
    <path d={`M0 0 L${l * 0.92} 0`} stroke="rgba(255,255,255,.35)" strokeWidth={1} />
  </g>
);

export function Bouquet({ size = 'large', className = '' }: { size?: 'large' | 'small'; className?: string }) {
  const gid = useId().replace(/:/g, '');
  const big = size === 'large';
  const leaves: [number, number, number, number, string][] = big
    ? [[40, 250, 150, -30, '#8E9E83'], [90, 300, 130, -60, '#A8B5A0'], [150, 240, 140, -10, '#7F9174'], [30, 180, 120, -75, '#A8B5A0'], [200, 300, 110, -35, '#93A487'], [120, 150, 120, -50, '#B7C2AF'], [230, 250, 90, 10, '#A8B5A0']]
    : [[30, 150, 100, -30, '#93A487'], [80, 170, 90, -5, '#A8B5A0'], [20, 110, 80, -65, '#B7C2AF'], [110, 130, 70, -40, '#8E9E83']];
  const roses: [number, number, number, number][] = big
    ? [[110, 250, 62, 10], [200, 200, 46, 40], [60, 170, 40, -20], [175, 290, 38, 70]]
    : [[70, 120, 40, 20], [130, 90, 28, 60]];
  return (
    <svg viewBox={big ? '0 0 330 340' : '0 0 200 200'} className={className} aria-hidden="true" style={{ overflow: 'visible', filter: 'drop-shadow(0 8px 12px rgba(81,70,63,.14))' }}>
      <defs>
        <radialGradient id={`${gid}-0`} cx=".4" cy=".35" r=".8">
          <stop offset="0" stopColor="#FFFFFF" /><stop offset=".7" stopColor="#F7F1E6" /><stop offset="1" stopColor="#E4D9C4" />
        </radialGradient>
        <radialGradient id={`${gid}-1`} cx=".45" cy=".3" r=".8">
          <stop offset="0" stopColor="#FFFEFB" /><stop offset=".75" stopColor="#F2EADB" /><stop offset="1" stopColor="#DCCFB6" />
        </radialGradient>
      </defs>
      {leaves.map(([x, y, l, rot, c], i) => <Leaf key={i} x={x} y={y} l={l} rot={rot} c={c} />)}
      {roses.map(([cx, cy, r, rot], i) => <Rose key={i} cx={cx} cy={cy} r={r} rot={rot} gid={gid} />)}
    </svg>
  );
}
