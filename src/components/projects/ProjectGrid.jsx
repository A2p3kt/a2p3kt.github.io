import { ProjectCard } from './ProjectCard';
import './ProjectGrid.css';

export function ProjectGrid({ projects, loading, error, onSelectProject }) {
  if (loading) {
    return (
      <div className="projects-status">
        <i className="fa-solid fa-circle-notch fa-spin"></i>
        <span>Loading projects...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="projects-status projects-error">
        <p>Failed to load projects: {error}</p>
      </div>
    );
  }

  if (!Array.isArray(projects) || projects.length === 0) {
    return (
      <div className="projects-status">
        <p>No projects found.</p>
      </div>
    );
  }

  return (
    <div className="project-grid" id="project-grid">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onSelect={onSelectProject}
        />
      ))}
    </div>
  );
}
