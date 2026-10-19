import { useEffect } from 'react';
import { Hero } from '../components/home/Hero';
import { SkillsSection } from '../components/home/SkillsSection';
import { CertificationsSection } from '../components/home/CertificationsSection';
import { TimelineSection } from '../components/home/TimelineSection';
import { QuoteBox } from '../components/home/QuoteBox';

export function HomePage() {
  useEffect(() => {
    document.title = 'Toluwalase | Homepage';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="home-page">
      <Hero />
      <SkillsSection />
      <CertificationsSection />
      <TimelineSection />
      <QuoteBox />
    </main>
  );
}
