import { useCallback, useEffect, useRef, useState } from 'react';

/** Background song: starts on the "Open invitation" tap (browsers need a tap before audio), fades in, loops. */
export function useMusic(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number>(0);
  const [available, setAvailable] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0;
    const onReady = () => setAvailable(true);
    const onError = () => setAvailable(false);
    audio.addEventListener('canplay', onReady);
    audio.addEventListener('error', onError);
    audio.src = src;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.removeEventListener('canplay', onReady);
      audio.removeEventListener('error', onError);
      cancelAnimationFrame(fadeRef.current);
    };
  }, [src]);

  const fadeTo = (target: number, ms: number, done?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    cancelAnimationFrame(fadeRef.current);
    const from = audio.volume;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      audio.volume = Math.min(1, Math.max(0, from + (target - from) * t));
      if (t < 1) fadeRef.current = requestAnimationFrame(step);
      else done?.();
    };
    fadeRef.current = requestAnimationFrame(step);
  };

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio
      .play()
      .then(() => {
        setPlaying(true);
        fadeTo(0.6, 2200);
      })
      .catch(() => setPlaying(false));
  }, []);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setPlaying(false);
    fadeTo(0, 500, () => audio.pause());
  }, []);

  const toggle = useCallback(() => (playing ? pause() : play()), [playing, play, pause]);

  return { available, playing, play, pause, toggle };
}
