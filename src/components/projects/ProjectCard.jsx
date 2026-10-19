import './ProjectCard.css';

export function ProjectCard({ project, onSelect }) {
  return (
    <button
      type="button"
      className="project-card"
      onClick={() => onSelect(project)}
      aria-label={`View details for ${project.title}`}
    >
      <h2 className="project-title">{project.title}</h2>
      <p className="project-tagline">{project.tagline}</p>
      {Array.isArray(project.stack) && project.stack.length > 0 && (
        <div className="project-stack">
          {project.stack.map((tech) => (
            <span key={tech} className="mono tag">
              {tech}
            </span>
          ))}
        </div>
      )}
    </button>
  );
}
