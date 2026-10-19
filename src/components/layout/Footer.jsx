import './Footer.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <p>© {currentYear} Toluwalase Ayoola. All rights reserved.</p>
      <div className="footer-socials" aria-label="Social links">
        <a
          href="https://github.com/A2p3kt"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
          title="GitHub"
        >
          <i className="fa-brands fa-github" aria-hidden="true"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/toluwalase-ayoola"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
          title="LinkedIn"
        >
          <i className="fa-brands fa-linkedin" aria-hidden="true"></i>
        </a>
        <a
          href="mailto:hello@toluwalase.dev"
          aria-label="Email Toluwalase"
          title="Email"
        >
          <i className="fa-solid fa-envelope" aria-hidden="true"></i>
        </a>
      </div>
    </footer>
  );
}
