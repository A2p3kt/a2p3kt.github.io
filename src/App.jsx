import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { EventsPage } from './pages/EventsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <Routes>
      {/* Events is a standalone app — no shared navbar/footer */}
      <Route path="events" element={<EventsPage />} />
      <Route path="events.html" element={<Navigate to="/events" replace />} />

      {/* Main portfolio layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="projects" element={<ProjectsPage />} />

        {/* Legacy .html path fallbacks */}
        <Route path="index.html" element={<Navigate to="/" replace />} />
        <Route path="projects.html" element={<Navigate to="/projects" replace />} />

        {/* Catch-all */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
export default App;
