import { useJsonData } from '../../hooks/useJsonData';
import { Highlights } from './Highlights';
import './SkillsSection.css';

export function SkillsSection() {
  const { data: skills, loading, error } = useJsonData('core-skills.json');

  return (
    <section className="skills" aria-labelledby="skills-title">
      <h2 id="skills-title">Core Skills</h2>

      {loading && (
        <div className="skills-loading">
          <i className="fa-solid fa-circle-notch fa-spin"></i>
          <span>Loading skills...</span>
        </div>
      )}

      {error && (
        <div className="skills-error">
          <p>Unable to load skills at this time.</p>
        </div>
      )}

      {Array.isArray(skills) && (
        <div className="skills-list" id="skills-list">
          {skills.map((skill, index) => (
            <article key={skill.title || index} className="skill-card">
              <h3>{skill.title}</h3>
              <p>{skill.summary}</p>
              <Highlights items={skill.capabilities} label="Key Capabilities" details />
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
