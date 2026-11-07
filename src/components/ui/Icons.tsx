import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;
const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

export const CrossIcon = (p: IconProps) => (
  <svg viewBox="0 0 14 20" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M6.2 0h1.6v5.6H13v1.6H7.8V20H6.2V7.2H1V5.6h5.2z" />
  </svg>
);
export const RingsIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}>
    <circle cx="9" cy="14" r="5" /><circle cx="15" cy="14" r="5" /><path d="M10 5l2-2 2 2" />
  </svg>
);
export const ChurchIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}>
    <path d="M12 2v5M10 4h4M5 21V11l7-4 7 4v10M3 21h18M10 21v-5a2 2 0 014 0v5" />
  </svg>
);
export const ToastIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}>
    <path d="M7 3h4l-.5 6a2.5 2.5 0 01-3 0L7 3zM9 9.5V20M6.5 20h5M13 3h4l-.5 6a2.5 2.5 0 01-3 0L13 3zM15 9.5V20M12.5 20h5" />
  </svg>
);
export const PinIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}>
    <path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" />
  </svg>
);
export const PlaneIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
  </svg>
);
export const TrainIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}>
    <rect x="5" y="3" width="14" height="14" rx="3" /><path d="M5 11h14M8 17l-2 4M16 17l2 4" />
  </svg>
);
export const MenuIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const CloseIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const ChevronIcon = ({ dir = 'right', ...p }: IconProps & { dir?: 'left' | 'right' }) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}>
    <path d={dir === 'right' ? 'M9 5l7 7-7 7' : 'M15 5l-7 7 7 7'} />
  </svg>
);
