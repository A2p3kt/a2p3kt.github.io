// =========================================
// PROJECT DATA
// =========================================

const projects = [
  {
    id: "helsinki-event-aggregator",
    title: "Helsinki Event Aggregator",
    tagline: "Serverless API aggregating city event data across Helsinki.",
    stack: ["Python", "AsyncIO", "AWS Lambda", "API Gateway", "GitHub Actions"],
    problem: "Helsinki's event data lives across multiple fragmented city APIs. Fetching them serially caused load times exceeding 60 seconds.",
    solution: "Built a hybrid multi-threaded and asynchronous engine using Python asyncio and aiohttp. Concurrent fetching reduced total processing time to under 5 seconds.",
    architecture: "An AWS Lambda function is triggered via API Gateway. Async aiohttp sessions fan out to all upstream sources simultaneously. Results are normalized into a unified schema and returned. CI/CD via GitHub Actions.",
    github: "https://github.com/A2p3kt/helsinki-event-aggregator",
    live: null
  },
  {
    id: "secure-file-api",
    title: "Secure File Submission API",
    tagline: "FastAPI backend with virus scanning for safe public file uploads.",
    stack: ["FastAPI", "Docker", "VirusTotal SDK", "Pydantic", "Resend"],
    problem: "Public-facing forms that accept file uploads without validation are a common attack vector for malware delivery.",
    solution: "A non-blocking FastAPI backend validates MIME types via Pydantic, submits files to VirusTotal's async API, and only triggers email delivery via Resend if the scan returns clean.",
    architecture: "FastAPI endpoint receives multipart upload → Pydantic validates MIME type → async VirusTotal scan → conditional Resend email dispatch. Fully containerized with Docker.",
    github: "https://github.com/A2p3kt/fastapi-vt-mail",
    live: null
  }
];

// =========================================
// INITIALIZE & RENDER
// =========================================

document.addEventListener('DOMContentLoaded', () => {
  renderProjectCards();
  initModal();
});

function renderProjectCards() {
  const grid = document.getElementById('project-grid');
  if (!grid) return;

  grid.innerHTML = '';

  projects.forEach(project => {
    const card = document.createElement('button');
    card.className = 'project-card';
    card.setAttribute('data-project-id', project.id);
    card.setAttribute('type', 'button');

    const stackHTML = project.stack
      .map(tech => `<span class="mono tag">${tech}</span>`)
      .join('');

    card.innerHTML = `
      <h2 class="project-title">${project.title}</h2>
      <p class="project-tagline">${project.tagline}</p>
      <div class="project-stack">
        ${stackHTML}
      </div>
    `;

    card.addEventListener('click', () => {
      openModal(project.id);
    });

    grid.appendChild(card);
  });
}

// =========================================
// MODAL FUNCTIONS
// =========================================

function initModal() {
  // Import inline modal template
  const modalPanel = document.getElementById('modal-panel');
  if (!modalPanel) return;

  // Fetch project-detail.html template
  fetch('project-detail.html')
    .then(response => response.text())
    .then(html => {
      modalPanel.innerHTML = html;
      attachModalListeners();
    })
    .catch(err => console.error('Failed to load modal template:', err));
}

function attachModalListeners() {
  const overlay = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('modal-close');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      // Close only if clicking on overlay itself, not the panel
      if (e.target === overlay) {
        closeModal();
      }
    });
  }

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

function openModal(projectId) {
  const project = projects.find(p => p.id === projectId);
  if (!project) return;

  // Populate modal fields
  const modalTitle = document.getElementById('modal-title');
  const modalTagline = document.getElementById('modal-tagline');
  const modalProblem = document.getElementById('modal-problem');
  const modalSolution = document.getElementById('modal-solution');
  const modalArchitecture = document.getElementById('modal-architecture');
  const modalGithub = document.getElementById('modal-github');
  const modalLive = document.getElementById('modal-live');
  const modalStack = document.getElementById('modal-stack');

  if (modalTitle) modalTitle.textContent = project.title;
  if (modalTagline) modalTagline.textContent = project.tagline;
  if (modalProblem) modalProblem.textContent = project.problem;
  if (modalSolution) modalSolution.textContent = project.solution;
  if (modalArchitecture) modalArchitecture.textContent = project.architecture;

  if (modalGithub) {
    modalGithub.href = project.github;
  }

  // Show/hide live link
  if (modalLive) {
    if (project.live) {
      modalLive.href = project.live;
      modalLive.classList.remove('hidden');
    } else {
      modalLive.classList.add('hidden');
    }
  }

  // Render stack tags
  if (modalStack) {
    modalStack.innerHTML = project.stack
      .map(tech => `<span class="mono tag">${tech}</span>`)
      .join('');
  }

  // Open modal
  const overlay = document.getElementById('modal-overlay');
  if (overlay) {
    overlay.setAttribute('aria-hidden', 'false');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Focus close button
    const closeBtn = document.getElementById('modal-close');
    if (closeBtn) {
      closeBtn.focus();
    }
  }
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;

  overlay.classList.remove('open');

  // Set aria-hidden after transition
  overlay.addEventListener('transitionend', () => {
    overlay.setAttribute('aria-hidden', 'true');
  }, { once: true });

  document.body.style.overflow = '';
}
