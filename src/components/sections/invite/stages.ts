/**
 * The opening is one continuous sequence. Each stage starts at the given time (ms after the click).
 */
export const STAGE = {
  idle: 0,
  lift: 1, // envelope lifts
  seal: 2, // wax seal cracks
  flap: 3, // flap swings open
  clear: 4, // headline and flowers clear away
  flapBack: 5, // flap goes behind the card
  glow: 6, // warm light inside; card rises a little
  burst: 7, // bright golden burst fills the screen
  fade: 8, // light recedes, revealing the hero
  done: 9
} as const;

export const STAGE_TIMES: [number, number][] = [
  [STAGE.lift, 0],
  [STAGE.seal, 120],
  [STAGE.flap, 450],
  [STAGE.clear, 500],
  [STAGE.flapBack, 760],
  [STAGE.glow, 950],
  [STAGE.burst, 1400],
  [STAGE.fade, 2250],
  [STAGE.done, 3900]
];

/** brightest moment: the hero is placed underneath here */
export const REVEAL_AT = 2200;
