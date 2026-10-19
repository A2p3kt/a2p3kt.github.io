import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout() {
  const location = useLocation();
  const isEventsPage = location.pathname.startsWith('/events');

  return (
    <div className={`app-shell ${isEventsPage ? 'events-shell' : ''}`}>
      <Navbar />
      <Outlet />
      {!isEventsPage && <Footer />}
    </div>
  );
}
