import { useState, useEffect } from 'react';

/**
 * Hook to monitor window scroll position for sticky/elevated navbars
 * @param {number} threshold - Scroll threshold in px
 */
export function useScrollSpy(threshold = 50) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > threshold;
      setIsScrolled(scrolled);
    };

    // Check initial position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
}
