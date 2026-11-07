const TZ = 'Asia/Kolkata';

const part = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  new Date(iso).toLocaleDateString('en-IN', { timeZone: TZ, ...opts });

/** 17 NOVEMBER 2026 */
export const formatDateLong = (iso: string) =>
  `${part(iso, { day: 'numeric' })} ${part(iso, { month: 'long' })} ${part(iso, { year: 'numeric' })}`.toUpperCase();

/** 17 · NOVEMBER · 2026 */
export const formatDateDots = (iso: string) =>
  `${part(iso, { day: 'numeric' })} · ${part(iso, { month: 'long' })} · ${part(iso, { year: 'numeric' })}`.toUpperCase();

/** Tue · 17 Nov */
export const formatDateShort = (iso: string) =>
  `${part(iso, { weekday: 'short' })} · ${part(iso, { day: 'numeric', month: 'short' })}`;

export const mapsLink = (query: string) =>
  query.startsWith('http://') || query.startsWith('https://')
    ? query
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
