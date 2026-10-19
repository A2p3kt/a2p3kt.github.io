import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

export function Hero() {
  const fullText = "Hey 👋🏾, I'm Toluwalase Ayoola";
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isPhotoActive, setIsPhotoActive] = useState(false);
  const photoTimerRef = useRef(null);

  // Typing animation
  useEffect(() => {
    // If user prefers reduced motion, show full text immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTypedText(fullText);
      setIsTyping(false);
      return;
    }

    const characters = Array.from(fullText);
    let currentIndex = 0;
    let timerId;

    const startTyping = () => {
      const typeNext = () => {
        if (currentIndex < characters.length) {
          currentIndex += 1;
          setTypedText(characters.slice(0, currentIndex).join(''));
          const delay = currentIndex < 10 ? 95 : 55;
          timerId = setTimeout(typeNext, delay);
        } else {
          setIsTyping(false);
        }
      };

      timerId = setTimeout(typeNext, 220);
    };

    startTyping();

    return () => clearTimeout(timerId);
  }, []);

  const handlePhotoTap = () => {
    if (photoTimerRef.current) clearTimeout(photoTimerRef.current);
    setIsPhotoActive(true);
    photoTimerRef.current = setTimeout(() => {
      setIsPhotoActive(false);
    }, 1400);
  };

  return (
    <section className="hero">
      <div className="hero-copy">
        <h1>
          <span className={`block hero-typing ${isTyping ? 'is-typing' : ''}`}>
            {typedText}
          </span>
        </h1>
        <p className="hero-sub">Curious about technology and how it all connects.</p>
        <p className="hero-sub">
          From securing systems and managing infrastructure to automating workflows and building software — I enjoy the challenge of making technology work reliably for the people who depend on it.
        </p>

        <div className="hero-links">
          <p className="hero-connect-label">Connect with me</p>
          <div className="hero-social-row" aria-label="Social links">
            <a
              href="https://github.com/A2p3kt"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              aria-label="GitHub profile"
            >
              <i className="fa-brands fa-github" aria-hidden="true"></i>
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/toluwalase-ayoola"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              aria-label="LinkedIn profile"
            >
              <i className="fa-brands fa-linkedin" aria-hidden="true"></i>
              <span>LinkedIn</span>
            </a>
          </div>

          <Link to="/projects" className="hero-projects-link">
            Check out what I've been building →
          </Link>
        </div>
      </div>

      <figure
        className={`hero-photo-wrap ${isPhotoActive ? 'is-active' : ''}`}
        onClick={handlePhotoTap}
        onTouchStart={handlePhotoTap}
      >
        <img
          src="/media/cv.jpg"
          alt="Portrait of Toluwalase"
          className="hero-photo"
          loading="eager"
        />
        <figcaption className="hero-photo-caption">yeah, that is what I look like</figcaption>
      </figure>
    </section>
  );
}
