// =========================================
// DATA-DRIVEN HOMEPAGE RENDERING
// =========================================

document.addEventListener('DOMContentLoaded', () => {
  loadHomepageContent();
  initPhotoInteraction();
  initHeroTyping();
});

async function loadHomepageContent() {
  try {
    const [skills, certifications, education, experience] = await Promise.all([
      fetchJSON('data/core-skills.json'),
      fetchJSON('data/certifications.json'),
      fetchJSON('data/education.json'),
      fetchJSON('data/experience.json')
    ]);

    renderSkills(skills);
    renderCertifications(certifications);
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
    .map(entry => {
      const periodText = entry.period || formatPeriod(entry.startDate, entry.endDate);
      const datetimeValue = entry.datetime || entry.startDate || '';

      return `
      <article class="timeline-card">
        <time class="mono" datetime="${datetimeValue}">${periodText}</time>
        <h3>${entry.title || ''}</h3>
        <p class="institution">${entry.institution || ''}</p>
        <p class="description">${entry.description || ''}</p>
      </article>
    `;
    })
    .join('');
}

function renderCertifications(certifications) {
  const certsList = document.getElementById('certifications-list');
  if (!certsList) return;

  if (!Array.isArray(certifications) || certifications.length === 0) {
    certsList.innerHTML = `
      <article class="skill-card cert-card cert-card-empty">
        <h3>Certifications are on the way</h3>
        <p>New certifications will be published here soon.</p>
      </article>
    `;
    return;
  }

  certsList.innerHTML = certifications
    .map(cert => {
      const skillsLearned = Array.isArray(cert.skillsLearned)
        ? cert.skillsLearned.map(skill => `<li>${skill}</li>`).join('')
        : '';
      const certSource = cert.issuer || '';
      const credentialLine = cert.credentialId
        ? `<p class="cert-id mono">Credential ID: ${cert.credentialId}</p>`
        : '';
      const credentialLink = cert.credentialUrl
        ? `<a href="${cert.credentialUrl}" target="_blank" rel="noopener" class="cert-link">View Credential</a>`
        : '';

      return `
        <article class="skill-card cert-card">
          <h3>${cert.title || ''}</h3>
          <p class="cert-issuer">${certSource}</p>
          <p class="cert-description">${cert.description || ''}</p>
          <ul class="skill-capabilities">
            ${skillsLearned}
          </ul>
          ${credentialLine}
          ${credentialLink}
        </article>
      `;
    })
    .join('');
}

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

function initHeroTyping() {
  const heading = document.querySelector('.hero-typing');
  if (!heading) return;

  const fullText = heading.getAttribute('data-text') || heading.textContent || '';
  const characters = Array.from(fullText.trim());

  if (!characters.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    heading.textContent = fullText;
    return;
  }

  heading.textContent = '';
  heading.classList.add('is-typing');

  let index = 0;

  const typeNextCharacter = () => {
    if (index >= characters.length) {
      heading.classList.remove('is-typing');
      return;
    }

    heading.textContent += characters[index];
    index += 1;

    const delay = index < 10 ? 95 : 55;
    window.setTimeout(typeNextCharacter, delay);
  };

  window.setTimeout(typeNextCharacter, 220);
}
