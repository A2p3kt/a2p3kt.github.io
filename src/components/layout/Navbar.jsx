import { NavLink, Link } from 'react-router-dom';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { ThemeSwitcher } from '../ui/ThemeSwitcher';
import './Navbar.css';

export function Navbar() {
  const isScrolled = useScrollSpy(40);

  return (
    <nav id="site-nav" className={isScrolled ? 'scrolled' : ''} role="navigation" aria-label="Main navigation">
      <Link to="/" className="nav-brand">
        toluwalase.dev
      </Link>

      <div className="nav-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? 'active-link' : '')}
        >
          Home
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) => (isActive ? 'active-link' : '')}
        >
          Projects
        </NavLink>

        <ThemeSwitcher />
      </div>
    </nav>
  );
}
