// =========================================
// TIMELINE SCROLL ANIMATION
// =========================================

document.addEventListener('DOMContentLoaded', () => {
  initTimelineAnimation();
  initPhotoInteraction();
});

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
