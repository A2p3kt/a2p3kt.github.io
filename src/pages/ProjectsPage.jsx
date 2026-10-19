import { useState, useEffect } from 'react';
import { useJsonData } from '../hooks/useJsonData';
import { ProjectGrid } from '../components/projects/ProjectGrid';
import { ProjectModal } from '../components/projects/ProjectModal';
import './ProjectsPage.css';

export function ProjectsPage() {
  const { data: projects, loading, error } = useJsonData('projects.json');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    document.title = 'Projects | Toluwalase';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="projects-page">
      <h1>Projects</h1>
      <p className="subtitle">
        A record of things I've built, why I built them, and how they work.
      </p>

      <ProjectGrid
        projects={projects}
        loading={loading}
        error={error}
        onSelectProject={(project) => setSelectedProject(project)}
      />

      <section className="projects-cta" aria-label="Collaboration call to action">
        <h2>What will I build next?</h2>
        <p>
          Want to collaborate? Shoot me a mail at{' '}
          <a href="mailto:hello@toluwalase.dev">hello@toluwalase.dev</a>.
        </p>
      </section>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </main>
  );
}
