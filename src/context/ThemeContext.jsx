import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const THEMES = [
  { id: 'light', label: 'Light', icon: 'fa-sun', description: 'Editorial Minimalism' },
  { id: 'dark', label: 'Dark', icon: 'fa-moon', description: 'Midnight / Low-Light' },
  { id: 'retro', label: 'Retro', icon: 'fa-radio', description: 'Vintage Nostalgia' },
  { id: 'cyberpunk', label: 'Cyber', icon: 'fa-microchip', description: 'Dystopian Futurism' },
  { id: 'glass', label: 'Glass', icon: 'fa-droplet', description: 'Liquid & Translucent' },
  { id: 'brutalism', label: 'Brutal', icon: 'fa-cube', description: 'Raw & Bold' },
];

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored && THEMES.some((t) => t.id === stored)) {
      return stored;
    }
    return 'light';
  });

  const setTheme = useCallback((newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark' || theme === 'cyberpunk') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export { THEMES };
