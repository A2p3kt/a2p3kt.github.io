import { useState, useEffect } from 'react';

function formatNiceDate(d) {
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
}

function formatNiceTimeWithTimezone(startTimeISO) {
  if (!startTimeISO) return '';
  try {
    const utcDate = new Date(startTimeISO);
    if (!Number.isFinite(utcDate.getTime())) return '';

    const formatter = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Europe/Helsinki',
    });
    const formatted = formatter.format(utcDate);

    const formatter2 = new Intl.DateTimeFormat('en-GB', {
      timeZoneName: 'short',
      timeZone: 'Europe/Helsinki',
    });
    const parts = formatter2.formatToParts(utcDate);
    const tzNamePart = parts.find((p) => p.type === 'timeZoneName');
    const tzName = tzNamePart ? tzNamePart.value : 'EET';

    return `${formatted} ${tzName}`;
  } catch {
    return '';
  }
}

export function EventDetails({ event, onClose }) {
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (!event || !event.location) {
      setAddress('');
      return;
    }

    let isCurrent = true;
    setAddress('Locating address…');

    const fetchAddress = async () => {
      try {
        const proxy = 'https://corsproxy.io/?';
        const nominatim = `https://nominatim.openstreetmap.org/reverse?lat=${event.location[0]}&lon=${event.location[1]}&format=json&addressdetails=1`;
        const res = await fetch(proxy + encodeURIComponent(nominatim));
        if (!res.ok) throw new Error('Geocoding error');
        const data = await res.json();
        if (!isCurrent) return;

        const a = data.address || {};
        const road = a.road || a.pedestrian || a.path || '';
        const house = a.house_number || '';
        const area = a.suburb || a.neighbourhood || a.city_district || '';
        const combined = road ? `${road} ${house}`.trim() : '';

        setAddress(
          combined ? `${combined}, ${area}` : data.display_name?.split(',').slice(0, 2).join(', ') || 'Helsinki'
        );
      } catch {
        if (isCurrent) setAddress('Finland');
      }
    };

    fetchAddress();

    return () => {
      isCurrent = false;
    };
  }, [event]);

  if (!event) return null;

  const hasTimePiece = event.start_time && /T\d{2}:\d{2}/.test(event.start_time);
  const timeDisplay = hasTimePiece ? formatNiceTimeWithTimezone(event.start_time) : '';
  const dateLine = `${formatNiceDate(event.date)}${timeDisplay ? ` • ${timeDisplay}` : ''}`;

  return (
    <div id="details-card" style={{ display: 'block' }}>
      <div className="detail-img-wrap">
        <button className="close-btn" onClick={onClose} aria-label="Close details" type="button">
          ✕
        </button>
        <img
          src={event.img_url || 'https://via.placeholder.com/400x200?text=Helsinki+Event'}
          alt={event.title || 'Event image'}
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Helsinki+Event';
          }}
        />
      </div>

      <div className="detail-body">
        <div className="detail-date">{dateLine}</div>
        <h3>{event.title || 'Untitled event'}</h3>
        <div className="detail-venue">{event.venue || 'Helsinki Venue'}</div>
        {address && <div className="detail-address">{address}</div>}

        <div
          className="detail-desc"
          dangerouslySetInnerHTML={{
            __html: event.description || '<p>No description provided.</p>',
          }}
        />

        {event.signup_link ? (
          <a
            href={event.signup_link}
            target="_blank"
            rel="noopener noreferrer"
            className="detail-link"
          >
            View Full Event &rarr;
          </a>
        ) : (
          <span className="detail-link no-link">✨ No signup link available</span>
        )}
      </div>
    </div>
  );
}
