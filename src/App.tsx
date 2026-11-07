import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { Topbar } from './components/layout/Topbar';
import { Petals } from './components/ui/Petals';
import { InviteSection } from './components/sections/invite/InviteSection';
import { HeroSection } from './components/sections/hero/HeroSection';
import { LetterSection } from './components/sections/letter/LetterSection';
import { StorySection } from './components/sections/story/StorySection';
import { FamiliesSection } from './components/sections/families/FamiliesSection';
import { GallerySection } from './components/sections/gallery/GallerySection';
import { ServiceSection } from './components/sections/ServiceSection';
import { EventsSection } from './components/sections/EventsSection';
import { TravelSection } from './components/sections/TravelSection';
import { ExploreSection } from './components/sections/ExploreSection';
import { DetailsSection } from './components/sections/DetailsSection';
import { RsvpSection } from './components/sections/RsvpSection';
import { ThankYouSection } from './components/sections/ThankYouSection';
import { useMusic } from './hooks/useMusic';
import { useScrollLock } from './hooks/useScrollLock';
import { useActiveSection } from './hooks/useActiveSection';
import { SECTIONS, WEDDING } from './data/wedding';

// petals on screen per section (none over the hero or the pinned story so the photos stay clear)
const PETAL_DENSITY: Record<string, number> = { hero: 0, story: 0, gallery: 8, thanks: 30 };

export default function App() {
  const [opened, setOpened] = useState(false);
  const [heroPlay, setHeroPlay] = useState(false);
  const [inviteKey, setInviteKey] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const music = useMusic(WEDDING.music);
  const ids = useMemo(() => SECTIONS.map((s) => s.id), []);
  const active = useActiveSection(ids, opened);

  useScrollLock(!opened);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // after opening, the envelope unmounts and the hero becomes the top of the page: keep it in place (before paint)
  useLayoutEffect(() => {
    if (opened) window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [opened]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const handleReveal = () => {
    const hero = document.getElementById('hero');
    if (hero) window.scrollTo({ top: hero.offsetTop, behavior: 'instant' as ScrollBehavior });
    setHeroPlay(true);
  };

  const replay = () => {
    setOpened(false);
    setHeroPlay(false);
    setInviteKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const tone = SECTIONS.find((s) => s.id === active)?.tone ?? 'light';
  const density = !opened ? 7 : PETAL_DENSITY[active] ?? 16;

  return (
    <MotionConfig reducedMotion="user">
      <Petals density={density} />
      <Topbar
        visible={opened}
        dark={tone === 'dark'}
        solid={scrolled}
        music={music}
        onMonogram={() => scrollTo('hero')}
      />
      <main>
        {!opened && (
          <InviteSection
            key={inviteKey}
            onOpen={music.play}
            onReveal={handleReveal}
            onComplete={() => setOpened(true)}
          />
        )}
        <HeroSection play={heroPlay} onExplore={() => scrollTo('letter')} />
        <LetterSection />
        <StorySection />
        <FamiliesSection />
        <GallerySection />
        <ServiceSection />
        <EventsSection />
        <TravelSection />
        <ExploreSection />
        <DetailsSection />
        <RsvpSection />
        <ThankYouSection onReplay={replay} />
      </main>
    </MotionConfig>
  );
}
