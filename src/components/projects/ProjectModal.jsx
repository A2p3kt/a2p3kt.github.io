import { useEffect, useRef } from 'react';
import './ProjectModal.css';

export function ProjectModal({ project, onClose }) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!project) return;

    // Focus close button on open
    closeBtnRef.current?.focus();

    // Prevent background scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Handle Escape key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="modal-overlay open"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-panel">
        <button
          ref={closeBtnRef}
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
          type="button"
        >
          ✕
        </button>

        <div className="modal-body">
          {Array.isArray(project.stack) && project.stack.length > 0 && (
            <div className="modal-stack">
              {project.stack.map((tech) => (
                <span key={tech} className="mono tag">
                  {tech}
                </span>
              ))}
            </div>
          )}

          <h2 className="modal-title" id="modal-title">
            {project.title}
          </h2>
          <p className="modal-tagline">{project.tagline}</p>

          <div className="modal-sections">
            {project.problem && (
              <div className="modal-section">
                <h3>Problem</h3>
                <p>{project.problem}</p>
              </div>
            )}

            {project.solution && (
              <div className="modal-section">
                <h3>Solution</h3>
                <p>{project.solution}</p>
              </div>
            )}

            {project.architecture && (
              <div className="modal-section">
                <h3>Architecture</h3>
                <p>{project.architecture}</p>
              </div>
            )}
          </div>

          <div className="modal-footer">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-github-link"
              >
                <i className="fa-brands fa-github" aria-hidden="true"></i>
                <span>View source on GitHub ↗</span>
              </a>
            )}

            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-live-link"
              >
                <i className="fa-solid fa-rocket" aria-hidden="true"></i>
                <span>Live demo</span>
                <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
