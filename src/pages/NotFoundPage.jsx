import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <main
      style={{
        maxWidth: '700px',
        margin: '0 auto',
        padding: '80px 24px',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧭</div>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Page Not Found</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        The page you are looking for doesn't exist or has moved.
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 20px',
          background: 'var(--accent)',
          color: '#fff',
          borderRadius: '999px',
          fontWeight: 600,
        }}
      >
        <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
        <span>Return Home</span>
      </Link>
    </main>
  );
}
