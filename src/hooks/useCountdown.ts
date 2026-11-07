import { useEffect, useState } from 'react';

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  /** 'counting' before the wedding, 'today' for 12 hours after it starts, 'married' afterwards */
  status: 'counting' | 'today' | 'married';
}

const compute = (target: number): Countdown => {
  const diff = target - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, status: -diff < 12 * 3600e3 ? 'today' : 'married' };
  }
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    status: 'counting'
  };
};

export function useCountdown(iso: string): Countdown {
  const target = new Date(iso).getTime();
  const [value, setValue] = useState(() => compute(target));
  useEffect(() => {
    const id = window.setInterval(() => {
      const next = compute(target);
      setValue(next);
      if (next.status !== 'counting') window.clearInterval(id);
    }, 1000);
    return () => window.clearInterval(id);
  }, [target]);
  return value;
}
