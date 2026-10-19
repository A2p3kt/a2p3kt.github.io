export function EventCard({ event, index, isSelected, onSelect }) {
  const formatNiceDate = (d) => {
    if (!d) return '';
    try {
      return new Date(d).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return d;
    }
  };

  return (
    <div
      id={`item-${index}`}
      className={`event-item ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(event, index)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(event, index);
        }
      }}
    >
      <div className="ev-date">{formatNiceDate(event.date)}</div>
      <div className="ev-title">{event.title || 'Untitled event'}</div>
      <div className="ev-venue">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
        </svg>
        <span>{event.venue || 'TBA'}</span>
      </div>
    </div>
  );
}
