import { useEffect } from 'react';
import { EventExplorer } from '../components/events/EventExplorer';

export function EventsPage() {
  useEffect(() => {
    document.title = 'Helsinki Event Explorer | Toluwalase';
  }, []);

  return (
    <div className="events-page">
      <EventExplorer />
    </div>
  );
}
