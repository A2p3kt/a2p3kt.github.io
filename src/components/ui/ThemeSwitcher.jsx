import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './ThemeSwitcher.css';

export function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const currentTheme = themes.find((t) => t.id === theme) || themes[0];

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(e) {
      if (e.key === 'Escape') setIsOpen(false);
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="theme-switcher" ref={containerRef}>
      <button
        type="button"
        className="theme-switcher-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Current theme: ${currentTheme.label}. Click to change theme.`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        id="theme-switcher-button"
      >
        <i className={`fa-solid ${currentTheme.icon} theme-switcher-icon`} aria-hidden="true"></i>
        <span className="theme-switcher-label">{currentTheme.label}</span>
        <i className={`fa-solid fa-chevron-down theme-switcher-chevron ${isOpen ? 'open' : ''}`} aria-hidden="true"></i>
      </button>

      {isOpen && (
        <div className="theme-dropdown" role="listbox" aria-labelledby="theme-switcher-button">
          <div className="theme-dropdown-header">
            <span>Select Experience</span>
          </div>
          <div className="theme-options-grid">
            {themes.map((t) => {
              const isActive = t.id === theme;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  className={`theme-option-btn ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                >
                  <div className={`theme-dot theme-dot-${t.id}`}></div>
                  <div className="theme-option-info">
                    <div className="theme-option-name">
                      <i className={`fa-solid ${t.icon}`} aria-hidden="true"></i>
                      <span>{t.label}</span>
                      {isActive && <i className="fa-solid fa-check check-icon" aria-hidden="true"></i>}
                    </div>
                    <span className="theme-option-desc">{t.description}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
