import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { EventsPage } from './pages/EventsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="events" element={<EventsPage />} />

        {/* Legacy .html path fallbacks */}
        <Route path="index.html" element={<Navigate to="/" replace />} />
        <Route path="projects.html" element={<Navigate to="/projects" replace />} />
        <Route path="events.html" element={<Navigate to="/events" replace />} />

        {/* Catch-all */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
export default App;
