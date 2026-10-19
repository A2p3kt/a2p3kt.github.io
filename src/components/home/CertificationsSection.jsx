import { useJsonData } from '../../hooks/useJsonData';
import { Highlights } from './Highlights';
import './CertificationsSection.css';

export function CertificationsSection() {
  const { data: certifications, loading } = useJsonData('certifications.json');

  return (
    <section className="certifications" aria-labelledby="certifications-title">
      <h2 id="certifications-title">Certifications</h2>

      {loading && (
        <div className="certs-loading">
          <i className="fa-solid fa-circle-notch fa-spin"></i>
          <span>Loading certifications...</span>
        </div>
      )}

      {Array.isArray(certifications) && certifications.length === 0 && (
        <div className="cert-card cert-card-empty">
          <h3>Certifications are on the way</h3>
          <p>New certifications will be published here soon.</p>
        </div>
      )}

      {Array.isArray(certifications) && certifications.length > 0 && (
        <div className="certifications-list" id="certifications-list">
          {certifications.map((cert, index) => (
            <article key={cert.credentialId || cert.title || index} className="skill-card cert-card">
              <h3>{cert.title}</h3>
              {cert.issuer && <p className="cert-issuer">{cert.issuer}</p>}
              {cert.description && <p className="cert-description">{cert.description}</p>}

              <Highlights items={cert.skillsLearned} label="Skills Learned" />

              {cert.credentialId && (
                <p className="cert-id mono">Credential ID: {cert.credentialId}</p>
              )}

              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-link"
                >
                  View Credential <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                </a>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
