/** Scroll range of chapter i out of n (0..1 of the pinned section), with a small overlap for cross-fades. */
export function chapterRange(i: number, n: number) {
  const start = i / n;
  const end = (i + 1) / n;
  const pad = 0.06;
  return { start, end, pad, first: i === 0, last: i === n - 1 };
}
