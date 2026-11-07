# Joseph & Mary · The Eternal Promise 💍✨

A luxury, cinematic, interactive digital wedding invitation website crafted for **Joseph Manual & Mary Ancy**.

Built with **React 18 + TypeScript + Vite + Tailwind CSS**, featuring fluid physics-based animations powered by **Framer Motion**.

---

## 💒 Wedding Details

- **Couple:** Joseph Manual & Mary Ancy
- **Date:** 17 November 2026
- **Time:** 8:45 AM
- **Ceremony Venue:** St. Sebastian Latin Catholic Church, Thoppumpady, Kochi, Kerala
- **Reception Venue:** Beeyems Annexe Centre, Thoppumpady, Kochi, Kerala

---

## ✨ Features

- 💌 **Interactive Wax Seal & Envelope:** Custom opening sequence where the envelope unseals with warm light burst and unfolds into the cinematic hero view.
- 🎵 **Background Music Player:** Automatically prompts and plays the couple's celebration song upon opening the envelope, complete with animated visualizer bars.
- ⏱️ **Split-Flap Live Countdown:** Real-time synchronized countdown down to days, hours, minutes, and seconds until the holy matrimony.
- 🌸 **Ambient Floating Petals & Gold Dust:** GPU-accelerated canvas/SVG particles dynamically tuned across light and dark sections.
- 📜 **Parchment Scroll Letter:** Interactive scroll opening to reveal the heartfelt welcome message.
- 📖 **Story Chapters:** Sequential chapters tracing the journey of the couple with smooth parallax imagery.
- 🖼️ **Photo Gallery & Lightbox:** Interactive gallery with full-screen zoom and inspection.
- 📍 **Interactive Location & Map Links:** Direct one-click Google Maps links for the church ceremony and reception venue.
- 🚆 **Localized Travel & Sightseeing Guide:** Complete transit options for Kochi/Ernakulam (Cochin International Airport `COK`, Ernakulam Junction `ERS` / Town `ERN`) along with a guide to explore Historic Fort Kochi, Mattancherry Jew Town, and Kerala Backwaters.
- ✉️ **RSVP & Guest Notes:** Responsive RSVP form and event schedule for family and friends.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `pnpm` / `yarn`

### Installation

```bash
# Clone the repository
git clone https://github.com/KSukant/Rhodnet_WeddingInvitation.git
cd Rhodnet_WeddingInvitation

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit **http://localhost:5185** in your browser.

### Production Build

```bash
npm run build
```

The production-ready assets will be compiled into the `dist/` directory. You can preview it with:

```bash
npm run preview
```

---

## 📁 Project Structure

```
├── public/
│   ├── images/              # High-resolution wedding photography & Kochi attraction images
│   │   └── places/          # Local sight photos (Fort Kochi, Jew Town, Backwaters)
│   └── music/               # Wedding background audio track (wedding.mp3)
├── src/
│   ├── components/
│   │   ├── layout/          # Topbar (monogram, music visualizer toggle)
│   │   ├── sections/        # Section components:
│   │   │   ├── invite/      # 01 Envelope opening + wax seal + light burst
│   │   │   ├── hero/        # 02 Cinematic couple hero + split-flap countdown
│   │   │   ├── letter/      # 03 Parchment scroll letter
│   │   │   ├── story/       # 04 Pinned story chapters
│   │   │   ├── families/    # 05 Family cards + interlocking rings animation
│   │   │   ├── gallery/     # 06 Photo gallery + modal lightbox
│   │   │   ├── EventsSection.tsx     # 08 Schedule & map navigation
│   │   │   ├── TravelSection.tsx     # 09 Localized travel & airport/railway guide
│   │   │   ├── ExploreSection.tsx    # 10 Kochi sights & cultural attractions
│   │   │   ├── DetailsSection.tsx    # 11 Guest palette & FAQ
│   │   │   ├── RsvpSection.tsx       # 12 RSVP submission form
│   │   │   └── ThankYouSection.tsx   # 13 Closing blessing & replay
│   │   └── ui/              # Reusable design elements (Buttons, Icons, Petals, GoldDust)
│   ├── data/
│   │   └── wedding.ts       # Central data configuration (names, dates, venues, text, images)
│   ├── hooks/               # Custom React hooks (music, countdown, scroll lock, active section)
│   ├── lib/                 # Motion variants, formatters, and animation helpers
│   ├── types/               # TypeScript interfaces & types
│   ├── App.tsx              # Main application entry
│   └── index.css            # Tailwind & typography styling
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 📄 License

Private personal project for Joseph & Mary's wedding celebration.
