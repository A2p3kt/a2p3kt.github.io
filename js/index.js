// =========================================
// DATA-DRIVEN HOMEPAGE RENDERING
// =========================================

document.addEventListener('DOMContentLoaded', () => {
  loadHomepageContent();
  initPhotoInteraction();
});

async function loadHomepageContent() {
  try {
    const [skills, education, experience] = await Promise.all([
      fetchJSON('data/core-skills.json'),
      fetchJSON('data/education.json'),
      fetchJSON('data/experience.json')
    ]);

    renderSkills(skills);
    renderTimeline('education-list', education);
    renderTimeline('experience-list', experience);
  } catch (error) {
    console.error('Failed to load homepage content:', error);
  } finally {
    initTimelineAnimation();
  }
}

async function fetchJSON(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.status}`);
  }
  return response.json();
}

function renderSkills(skills) {
  const skillsList = document.getElementById('skills-list');
  if (!skillsList || !Array.isArray(skills)) return;

  skillsList.innerHTML = skills
    .map(skill => {
      const capabilities = Array.isArray(skill.capabilities)
        ? skill.capabilities.map(item => `<li>${item}</li>`).join('')
        : '';

      return `
        <article class="skill-card">
          <h3>${skill.title}</h3>
          <p>${skill.summary}</p>
          <ul class="skill-capabilities">
            ${capabilities}
          </ul>
        </article>
      `;
    })
    .join('');
}

function renderTimeline(containerId, entries) {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(entries)) return;

  container.innerHTML = entries
    .map(entry => `
      <article class="timeline-card">
        <time class="mono" datetime="${entry.datetime || ''}">${entry.period || ''}</time>
        <h3>${entry.title || ''}</h3>
        <p class="institution">${entry.institution || ''}</p>
        <p class="description">${entry.description || ''}</p>
      </article>
    `)
    .join('');
}

// =========================================
// TIMELINE SCROLL ANIMATION
// =========================================

function initTimelineAnimation() {
  const cards = document.querySelectorAll('.timeline-card');
  
  if (!cards.length) return;

  // Add staggered delay to each card
  cards.forEach((card, index) => {
    card.style.setProperty('--delay', `${index * 80}ms`);
  });

  // Create intersection observer
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all cards
  cards.forEach(card => {
    observer.observe(card);
  });
}

function initPhotoInteraction() {
  const photoWrap = document.querySelector('.hero-photo-wrap');
  if (!photoWrap) return;

  const isTouchLike = window.matchMedia('(hover: none)').matches;
  if (!isTouchLike) return;

  let hideTimer;

  const showEffect = () => {
    window.clearTimeout(hideTimer);
    photoWrap.classList.add('is-active');

    hideTimer = window.setTimeout(() => {
      photoWrap.classList.remove('is-active');
    }, 1400);
  };

  photoWrap.addEventListener('click', showEffect);
  photoWrap.addEventListener('touchstart', showEffect, { passive: true });
}
