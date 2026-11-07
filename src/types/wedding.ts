export interface Photo {
  src: string;
  alt: string;
  /** CSS object-position, to keep faces in frame when the photo is cropped */
  position?: string;
}

export interface WeddingConfig {
  groom: string;
  bride: string;
  groomShort: string;
  brideShort: string;
  monogram: [string, string];
  /** ISO dates with the India offset; the countdown uses these */
  engagement: string;
  wedding: string;
  weddingTime?: string;
  church: string;
  churchMap?: string;
  city: string;
  state?: string;
  music: string;
}

export interface StoryChapter {
  numeral: string;
  eyebrow: string;
  title: string;
  text: string;
  photo: Photo;
}

export interface Family {
  role: string;
  name: string;
  relation: string;
  parents: string;
  familyName: string;
  photo: Photo;
}

export interface GalleryPhoto extends Photo {
  caption: string;
}

export interface ServiceStep {
  title: string;
  text: string;
}

export type EventIcon = 'rings' | 'church' | 'toast';

export interface WeddingEvent {
  id: string;
  date: string;
  title: string;
  time: string;
  venue: string;
  mapQuery: string;
  icon: EventIcon;
  main?: boolean;
}

export interface Place {
  eyebrow: string;
  title: string;
  text: string;
  highlights: string[];
  tone: 'sunset' | 'sea' | 'spice';
  image?: string;
  imageAlt?: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface NavSection {
  id: string;
  label: string;
  /** dark sections get the ivory top bar */
  tone: 'light' | 'dark';
}
