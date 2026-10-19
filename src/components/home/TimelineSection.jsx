import { useEffect, useRef } from 'react';
import { useJsonData } from '../../hooks/useJsonData';
import { Highlights } from './Highlights';
import './TimelineSection.css';

function formatPeriod(startDate, endDate) {
  const start = formatMonthYear(startDate);
  const end = endDate ? formatMonthYear(endDate) : '';

  if (start && end) return `${start} - ${end}`;
  if (start && !endDate) return `${start} - Present`;
  return start;
}

function formatMonthYear(dateInput) {
  if (!dateInput) return '';
  if (typeof dateInput === 'string' && dateInput.toLowerCase() === 'present') {
    return 'Present';
  }

  const [year, month] = String(dateInput).split('-');
  if (!year) return '';
  if (!month) return year;

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const monthIndex = Number(month) - 1;
  const monthName = monthNames[monthIndex];
  if (!monthName) return year;

  return `${monthName} ${year}`;
}

export function TimelineSection() {
  const { data: education } = useJsonData('education.json');
  const { data: experience } = useJsonData('experience.json');
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll('.timeline-card');
    if (!cards.length) return;

    cards.forEach((card, index) => {
      card.style.setProperty('--delay', `${index * 80}ms`);
    });

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      cards.forEach((card) => card.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px 50px 0px',
      }
    );

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        card.classList.add('visible');
      } else {
        observer.observe(card);
      }
    });

    return () => observer.disconnect();
  }, [education, experience]);

  const renderGroup = (entries) => {
    if (!Array.isArray(entries)) return null;

    return entries.map((entry, idx) => {
      const periodText = entry.period || formatPeriod(entry.startDate, entry.endDate);
      const datetimeValue = entry.datetime || entry.startDate || '';

      return (
        <article key={entry.title || idx} className="timeline-card">
          <time className="mono" dateTime={datetimeValue}>
            {periodText}
          </time>
          <h3>{entry.title || ''}</h3>
          {entry.institution && <p className="institution">{entry.institution}</p>}
          {(entry.summary || entry.description) && <p className="description">{entry.summary || entry.description}</p>}
          <Highlights items={entry.coursework} label="Key Coursework:" />
          <Highlights items={entry.highlights} label="Key Contributions" details />
          <Highlights items={entry.skills} label="Skills & Tools" />
        </article>
      );
    });
  };

  return (
    <section id="timeline" ref={sectionRef} aria-label="Education and Experience timeline">
      <div className="timeline-group">
        <h2 className="timeline-group-label">Education</h2>
        <div className="timeline-container" id="education-list">
          {renderGroup(education)}
        </div>
      </div>

      <div className="timeline-group">
        <h2 className="timeline-group-label">Experience</h2>
        <div className="timeline-container" id="experience-list">
          {renderGroup(experience)}
        </div>
      </div>
    </section>
  );
}
