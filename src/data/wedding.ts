/**
 * ALL WEDDING CONTENT LIVES HERE.
 * Edit names, dates, venues and text in this one file; every section reads from it.
 */
import type {
  WeddingConfig,
  StoryChapter,
  Family,
  GalleryPhoto,
  ServiceStep,
  WeddingEvent,
  Place,
  Faq,
  NavSection,
  Photo
} from '../types/wedding';

const img = (name: string) => `images/${name}`;

export const WEDDING: WeddingConfig = {
  groom: 'Joseph Manual',
  bride: 'Mary Ancy',
  groomShort: 'Joseph',
  brideShort: 'Mary',
  monogram: ['J', 'M'],
  engagement: '2026-11-16T19:00:00+05:30', // placeholder: confirm
  wedding: '2026-11-17T08:45:00+05:30', // the countdown counts down to this (Asia/Kolkata)
  weddingTime: '8:45 AM',
  church: 'St. Sebastian Latin Catholic Church',
  churchMap: "https://www.google.com/maps/place/St.+Sebastian's+Latin+Catholic+Church,+Thoppumpady/@9.9339487,76.1885594,13z/data=!4m10!1m2!2m1!1sst+sebastian+church!3m6!1s0x3b086d7950cf82c9:0xbb0fdd727c66745b!8m2!3d9.9339487!4d76.2647771!15sChNzdCBzZWJhc3RpYW4gY2h1cmNoWhUiE3N0IHNlYmFzdGlhbiBjaHVyY2iSAQ9jYXRob2xpY19jaHVyY2iaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVUlVPWFI2ZVZKQkVBReABAPoBBAgAEEM!16s%2Fg%2F1q5bm6kp6?entry=ttu&g_ep=EgoyMDI2MTEwNC4wIKXMDSoASAFQAw%3D%3D",
  city: 'Thoppumpady',
  state: 'Kerala',
  music: 'music/wedding.mp3'
};

export const PHOTOS = {
  heroBackdrop: { src: img('church-couple.jpg'), alt: 'Joseph and Mary in front of the church', position: '50% 55%' },
  heroPortrait: { src: img('couple-light.jpg'), alt: 'Joseph and Mary in soft beams of light', position: '50% 30%' },
  thanks: { src: img('aisle-walk.jpg'), alt: 'Joseph and Mary walking down the aisle under falling petals', position: '50% 30%' },
  familiesCentre: { src: img('floral-arch.jpg'), alt: 'Joseph and Mary under the floral arch', position: '50% 35%' }
} satisfies Record<string, Photo>;

export const LETTER = {
  eyebrow: 'A letter to our dearest',
  title: 'With Grateful Hearts',
  salutation: 'To our beloved family & friends,',
  paragraphs: [
    'Some moments become memories because of the people who share them.',
    'As we begin this new chapter, blessed by God, it would mean the world to have you beside us, praying with us, rejoicing with us, and making our celebration complete.'
  ],
  signOff: 'With love,',
  verse: { text: 'This is the day the Lord has made; let us rejoice and be glad in it.', ref: 'Psalm 118 : 24' }
};

/** Story text is a starting point: replace it with your own words. */
export const STORY: StoryChapter[] = [
  {
    numeral: 'I',
    eyebrow: 'The beginning',
    title: 'Two paths meet',
    text: 'What started as a friendship slowly became the answer to our prayers.',
    photo: { src: img('couple-trees.jpg'), alt: 'Joseph and Mary under the trees', position: '50% 70%' }
  },
  {
    numeral: 'II',
    eyebrow: 'Before God',
    title: 'Better together',
    text: 'We learned that love is patient and kind, and that every step is stronger with Him at the centre.',
    photo: { src: img('altar-together.jpg'), alt: 'Joseph and Mary seated before the altar', position: '50% 60%' }
  },
  {
    numeral: 'III',
    eyebrow: 'The promise',
    title: 'A vow, a blessing',
    text: 'With our families beside us and the church praying over us, we made our promise for a lifetime.',
    photo: { src: img('ring-ceremony.jpg'), alt: 'Joseph placing the wedding ornament on Mary', position: '62% 40%' }
  },
  {
    numeral: 'IV',
    eyebrow: 'Forever',
    title: 'Walking as one',
    text: 'Now we begin our journey as husband and wife, and we would love for you to witness it.',
    photo: { src: img('aisle-walk.jpg'), alt: 'Joseph and Mary walking down the aisle', position: '50% 30%' }
  }
];

export const FAMILIES: { groom: Family; bride: Family } = {
  groom: {
    role: 'The Groom',
    name: 'Joseph Manual',
    relation: 'Beloved son of',
    parents: "Mr. [Father's name] & Mrs. [Mother's name]",
    familyName: "[Groom's family name]",
    photo: { src: img('groom.jpg'), alt: 'Joseph, the groom', position: '50% 25%' }
  },
  bride: {
    role: 'The Bride',
    name: 'Mary Ancy',
    relation: 'Beloved daughter of',
    parents: "Mr. [Father's name] & Mrs. [Mother's name]",
    familyName: "[Bride's family name]",
    photo: { src: img('bride.jpg'), alt: 'Mary, the bride', position: '50% 25%' }
  }
};

export const GALLERY: GalleryPhoto[] = [
  { src: img('couple-light.jpg'), alt: 'Joseph and Mary in beams of light', caption: 'In His light', position: '50% 30%' },
  { src: img('church-couple.jpg'), alt: 'Joseph and Mary at the church', caption: 'Our church', position: '50% 60%' },
  { src: img('couple-cars-wide.jpg'), alt: 'Joseph and Mary between the wedding cars', caption: 'The arrival', position: '50% 60%' },
  { src: img('floral-arch.jpg'), alt: 'Joseph and Mary under the floral arch', caption: 'Blessed', position: '50% 35%' },
  { src: img('bride.jpg'), alt: 'Mary in her wedding gown', caption: 'The bride', position: '50% 25%' },
  { src: img('ring-ceremony.jpg'), alt: 'The ring ceremony', caption: 'The promise', position: '60% 40%' },
  { src: img('aisle-walk.jpg'), alt: 'Walking down the aisle', caption: 'Just married', position: '50% 30%' },
  { src: img('groom.jpg'), alt: 'Joseph in his suit', caption: 'The groom', position: '50% 25%' },
  { src: img('altar-together.jpg'), alt: 'Better together before the altar', caption: 'Better together', position: '50% 60%' },
  { src: img('couple-hands-cars.jpg'), alt: 'Joseph and Mary holding hands', caption: 'Hand in hand', position: '50% 50%' },
  { src: img('couple-trees.jpg'), alt: 'Joseph and Mary under the trees', caption: 'Together', position: '50% 70%' }
];

export const SERVICE: ServiceStep[] = [
  { title: 'Processional', text: 'The bride enters with her father.' },
  { title: 'Opening Prayer & Hymn', text: 'The congregation joins in worship.' },
  { title: 'Scripture Reading', text: '1 Corinthians 13 : 4–8' },
  { title: 'Wedding Sermon', text: 'A message on marriage and faith.' },
  { title: 'Exchange of Vows & Rings', text: 'Joseph and Mary make their promises before God.' },
  { title: 'Prayer of Blessing', text: 'The families and church pray over the couple.' },
  { title: 'Signing of the Register', text: 'Witnessed by both families.' },
  { title: 'Recessional', text: 'The newlyweds walk out together as husband and wife.' }
];

export const EVENTS: WeddingEvent[] = [
  {
    id: 'engagement',
    date: WEDDING.engagement,
    title: 'Engagement & Ring Ceremony',
    time: '7:00 PM – 11:00 PM',
    venue: 'Beeyems Annexe Centre, Thoppumpady',
    mapQuery: "https://www.google.com/maps/place/Beeyems+Annexe+Centre/@9.9350993,76.2637372,19.99z/data=!4m6!3m5!1s0x3b086d7be8c65945:0xe1a59d410343b8a3!8m2!3d9.9351449!4d76.2641494!16s%2Fg%2F1q5bpnf7k?entry=ttu&g_ep=EgoyMDI2MTEwNC4wIKXMDSoASAFQAw%3D%3D",
    icon: 'rings'
  },
  {
    id: 'matrimony',
    date: WEDDING.wedding,
    title: 'Holy Matrimony',
    time: '8:45 AM – 10:55 AM',
    venue: 'St. Sebastian Latin Catholic Church, Thoppumpady',
    mapQuery: "https://www.google.com/maps/place/St.+Sebastian's+Latin+Catholic+Church,+Thoppumpady/@9.9339487,76.1885594,13z/data=!4m10!1m2!2m1!1sst+sebastian+church!3m6!1s0x3b086d7950cf82c9:0xbb0fdd727c66745b!8m2!3d9.9339487!4d76.2647771!15sChNzdCBzZWJhc3RpYW4gY2h1cmNoWhUiE3N0IHNlYmFzdGlhbiBjaHVyY2iSAQ9jYXRob2xpY19jaHVyY2iaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVUlVPWFI2ZVZKQkVBReABAPoBBAgAEEM!16s%2Fg%2F1q5bm6kp6?entry=ttu&g_ep=EgoyMDI2MTEwNC4wIKXMDSoASAFQAw%3D%3D",
    icon: 'church',
    main: true
  },
  {
    id: 'reception',
    date: WEDDING.wedding,
    title: 'Wedding Reception',
    time: '12:00 PM onwards', // placeholder: confirm
    venue: 'Beeyems Annexe Centre, Thoppumpady',
    mapQuery: "https://www.google.com/maps/place/Beeyems+Annexe+Centre/@9.9350993,76.2637372,19.99z/data=!4m6!3m5!1s0x3b086d7be8c65945:0xe1a59d410343b8a3!8m2!3d9.9351449!4d76.2641494!16s%2Fg%2F1q5bpnf7k?entry=ttu&g_ep=EgoyMDI2MTEwNC4wIKXMDSoASAFQAw%3D%3D",
    icon: 'toast'
  }
];

export const TRAVEL = {
  station: 'ERNAKULAM (ERS / ERN)',
  airports: ['Cochin (COK)', 'Calicut (CCJ)', 'Trivandrum (TRV)'],
  trains: {
    Bangalore: [
      'KSR Bengaluru – Ernakulam InterCity SF Express (12677)',
      'Kanyakumari Express (16526 / via ERS)',
      'SMVT Bengaluru – Kochuveli Humsafar Express (16320)'
    ],
    Hyderabad: [
      'Sabari Express (17230 / Secunderabad – Ernakulam Junction)',
      'Hyderabad – Kochuveli Special Express (07115)',
      'Direct trains connect Secunderabad & Hyderabad to Ernakulam Junction (ERS).'
    ],
    Chennai: [
      'Chennai Central – Alappuzha SF Express (22639 / via ERS)',
      'Chennai Central – Thiruvananthapuram Superfast (12695 / via ERN)',
      'Vande Bharat Express (Chennai – Ernakulam)'
    ]
  } as Record<string, string[]>,
  alternateTitle: 'Ernakulam South (ERS) / North (ERN)',
  alternate: 'Ernakulam Junction (ERS) and Ernakulam Town (ERN) are the primary railway stations, just 8–10 km from Thoppumpady. Taxis, autos, and buses are readily available across the BOT Bridge.'
};

export const PLACES: Place[] = [
  {
    eyebrow: 'Colonial heritage & ocean breeze',
    title: 'Historic Fort Kochi',
    text: 'Just 10 minutes from Thoppumpady. Stroll past historic European churches, colonial streets, and the iconic Chinese Fishing Nets.',
    highlights: ['Iconic Chinese Fishing Nets & Fort Kochi Beach', 'St. Francis Church & Santa Cruz Cathedral Basilica', 'Princess Street cafes and art galleries'],
    tone: 'sunset',
    image: 'images/places/fort-kochi.jpg',
    imageAlt: 'Chinese fishing nets along Fort Kochi coast'
  },
  {
    eyebrow: 'Antiques, spice & royal culture',
    title: 'Mattancherry & Jew Town',
    text: 'Right next to Thoppumpady, immerse yourself in centuries of trading history, spice aromas, and heritage architecture.',
    highlights: ['Paradesi Synagogue & Jew Town antique shops', 'Mattancherry Dutch Palace with royal murals', 'Spice markets and fragrance of fresh cardamom'],
    tone: 'spice',
    image: 'images/places/jew-town.jpg',
    imageAlt: 'Vibrant spices and heritage of Mattancherry Jew Town'
  },
  {
    eyebrow: 'Serene backwaters & authentic taste',
    title: 'Kochi Backwaters & Flavours',
    text: 'Experience the tranquil beauty of Kerala backwaters and savour legendary coastal delicacies.',
    highlights: ['Backwater cruises & Marine Drive boating', 'Kerala Sadya & Karimeen Pollichathu (pearl spot fish)', 'Fresh seafood along the coastal harbor'],
    tone: 'sea',
    image: 'images/places/backwaters.jpg',
    imageAlt: 'Traditional boat cruising the tranquil Kerala backwaters'
  }
];

export const DRESS_PALETTE = [
  { name: 'Ivory', color: '#FFFDF8' },
  { name: 'Champagne', color: '#E9DDC6' },
  { name: 'Sage', color: '#A3B59C' },
  { name: 'Blush', color: '#E8C9C1' },
  { name: 'Dusty blue', color: '#9FB3C8' }
];

export const GUEST_NOTES = [
  { eyebrow: 'At the church', title: 'Arrive by 8:30 AM', text: 'Please be seated before the bride enters. Kindly keep phones on silent during the service.' },
  { eyebrow: 'Gifts', title: 'Your presence is our gift', text: 'Your prayers and blessings mean more to us than anything else.' },
  { eyebrow: 'Photos', title: 'Share your moments', text: 'Send us the photos you take so we can keep every memory from the day.' }
];

export const FAQS: Faq[] = [
  { q: 'Can I bring my children?', a: 'Of course. Families with children are warmly welcome.' },
  { q: 'Is there parking at the venues?', a: 'Yes, parking is available at the reception hall. Please ask the family about parking near the church.' },
  { q: 'Who can I contact on the day?', a: 'Reach out to either family directly. Their contact numbers are shared on WhatsApp with this invitation.' }
];

export const VERSES = {
  hero: { text: 'Love is patient, love is kind. It always protects, always trusts, always hopes, always perseveres.', ref: '1 Corinthians 13 : 4–7' },
  families: { text: 'Therefore a man shall leave his father and mother and hold fast to his wife, and they shall become one flesh.', ref: 'Genesis 2 : 24' },
  events: { text: 'A cord of three strands is not quickly broken.', ref: 'Ecclesiastes 4 : 12' },
  thanks: { text: 'What God has joined together, let no one separate.', ref: 'Mark 10 : 9' }
};

export const SECTIONS: NavSection[] = [
  { id: 'hero', label: 'The Beginning', tone: 'dark' },
  { id: 'letter', label: 'A Letter', tone: 'light' },
  { id: 'story', label: 'Our Story', tone: 'dark' },
  { id: 'families', label: 'Our Families', tone: 'light' },
  { id: 'gallery', label: 'Gallery', tone: 'light' },
  { id: 'service', label: 'Order of Service', tone: 'light' },
  { id: 'events', label: 'The Celebration', tone: 'light' },
  { id: 'travel', label: 'Travel Guide', tone: 'light' },
  { id: 'explore', label: 'Places to Explore', tone: 'light' },
  { id: 'details', label: 'Guest Details', tone: 'light' },
  { id: 'rsvp', label: 'RSVP', tone: 'light' },
  { id: 'thanks', label: 'Thank You', tone: 'dark' }
];
