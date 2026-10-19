import { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { EventExplorer } from '../components/events/EventExplorer';

export function EventsPage() {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = 'Helsinki Event Explorer | Toluwalase';

    // Event explorer is a standalone app that should always remain in light mode
    const prevTheme = document.documentElement.getAttribute('data-theme') || theme;
    const wasDark = document.documentElement.classList.contains('dark');

    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.classList.remove('dark');

    return () => {
      // Restore user's portfolio theme when navigating away
      document.documentElement.setAttribute('data-theme', prevTheme);
      if (wasDark) {
        document.documentElement.classList.add('dark');
      }
    };
  }, [theme]);

  return (
    <div className="events-page">
      <EventExplorer />
    </div>
  );
}
