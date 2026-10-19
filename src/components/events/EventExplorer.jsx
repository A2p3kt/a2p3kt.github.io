import { useState, useEffect, useMemo, useCallback } from 'react';
import { EventSidebar } from './EventSidebar';
import { EventMap } from './EventMap';
import { EventDetails } from './EventDetails';
import './EventExplorer.css';

const API_URL =
  'https://kokz1rtalh.execute-api.eu-north-1.amazonaws.com/default/HelsinkiEventsConsumer';

function startOfDay(d) {
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  return date;
}

function endOfDay(d) {
  const date = new Date(d);
  date.setHours(23, 59, 59, 999);
  return date;
}

function addDays(d, days) {
  const date = new Date(d);
  date.setDate(date.getDate() + days);
  return date;
}

function toDateInputValue(d) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseEventDateTime(event) {
  if (!event?.date) return null;
  const iso = event.time ? `${event.date}T${event.time}` : `${event.date}T00:00:00`;
  const dt = new Date(iso);
  return Number.isNaN(dt.getTime()) ? null : dt;
}

function normalizeEvent(raw) {
  const img = raw?.img_url;
  return {
    ...raw,
    title: raw?.title || 'Untitled event',
    date: raw?.date || '',
    time: raw?.time || null,
    start_time: raw?.start_time || null,
    description: raw?.description || 'No description provided.',
    tags: Array.isArray(raw?.tags) ? raw.tags : [],
    location:
      Array.isArray(raw?.location) && raw.location.length === 2
        ? [Number(raw.location[0]), Number(raw.location[1])]
        : null,
    img_url: Array.isArray(img) ? img[0] : img,
    venue: raw?.venue || 'TBA',
  };
}

export function EventExplorer() {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters state
  const [search, setSearch] = useState('');
  const [tagFilter, setTagFilter] = useState('all');
  const [datePreset, setDatePreset] = useState('next_7_days');
  const [customStart, setCustomStart] = useState(() => toDateInputValue(new Date()));
  const [customEnd, setCustomEnd] = useState(() =>
    toDateInputValue(addDays(new Date(), 7))
  );

  // UI state
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch API events
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('API Offline');
        return res.json();
      })
      .then((payload) => {
        if (!isMounted) return;
        const events = Array.isArray(payload) ? payload : payload?.events || [];
        setAllEvents(events.map(normalizeEvent));
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error('Failed to load events:', err);
        setError('Connection Error: Unable to fetch live events from AWS Lambda.');
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Compute all available tags
  const allTags = useMemo(() => {
    const tagSet = new Set();
    allEvents.forEach((e) => (e.tags || []).forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [allEvents]);

  // Compute date window
  const dateWindow = useMemo(() => {
    const now = new Date();
    const todayStart = startOfDay(now);

    if (datePreset === 'today') {
      return { start: todayStart, end: endOfDay(todayStart) };
    }
    if (datePreset === 'tomorrow') {
      const tomorrow = addDays(todayStart, 1);
      return { start: tomorrow, end: endOfDay(tomorrow) };
    }
    if (datePreset === 'this_week') {
      const day = todayStart.getDay();
      const mondayOffset = day === 0 ? -6 : 1 - day;
      const monday = addDays(todayStart, mondayOffset);
      const sunday = addDays(monday, 6);
      return {
        start: todayStart > monday ? todayStart : monday,
        end: endOfDay(sunday),
      };
    }
    if (datePreset === 'next_7_days') {
      return { start: todayStart, end: endOfDay(addDays(todayStart, 6)) };
    }
    if (datePreset === 'this_weekend') {
      const day = todayStart.getDay();
      const saturdayOffset = day <= 6 ? 6 - day : 0;
      const saturday = addDays(todayStart, saturdayOffset);
      const sunday = addDays(saturday, 1);
      return { start: saturday, end: endOfDay(sunday) };
    }
    if (datePreset === 'this_month') {
      const monthStart = new Date(todayStart.getFullYear(), todayStart.getMonth(), 1);
      const monthEnd = new Date(todayStart.getFullYear(), todayStart.getMonth() + 1, 0);
      return {
        start: todayStart > monthStart ? todayStart : monthStart,
        end: endOfDay(monthEnd),
      };
    }
    if (datePreset === 'next_30_days') {
      return { start: todayStart, end: endOfDay(addDays(todayStart, 29)) };
    }
    if (datePreset === 'custom') {
      if (!customStart || !customEnd) return null;
      const start = startOfDay(new Date(customStart));
      const end = endOfDay(new Date(customEnd));
      if (start > end) return null;
      return { start, end };
    }
    // all_upcoming
    return { start: todayStart, end: null };
  }, [datePreset, customStart, customEnd]);

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    if (!dateWindow) return [];

    const searchLower = search.toLowerCase().trim();

    const filtered = allEvents.filter((e) => {
      const eventDateTime = parseEventDateTime(e);
      const matchesSearch =
        !searchLower || (e.title || '').toLowerCase().includes(searchLower);
      const matchesTag = tagFilter === 'all' || (e.tags && e.tags.includes(tagFilter));
      const matchesDate =
        !!eventDateTime &&
        eventDateTime >= dateWindow.start &&
        (!dateWindow.end || eventDateTime <= dateWindow.end);

      return matchesSearch && matchesTag && matchesDate;
    });

    filtered.sort((a, b) => {
      const aDt = parseEventDateTime(a);
      const bDt = parseEventDateTime(b);
      if (!aDt && !bDt) return 0;
      if (!aDt) return 1;
      if (!bDt) return -1;
      return aDt - bDt;
    });

    return filtered;
  }, [allEvents, search, tagFilter, dateWindow]);

  const handleSelectEvent = useCallback((event, index) => {
    setSelectedEvent(event);
    setSelectedIndex(index);
    if (window.innerWidth <= 680) {
      setIsSidebarOpen(false);
    }
  }, []);

  const handleCloseDetails = useCallback(() => {
    setSelectedEvent(null);
    setSelectedIndex(null);
  }, []);

  return (
    <div className="event-explorer-container">
      {loading && (
        <div className="events-loader-overlay">
          <div className="spinner"></div>
          <div className="loader-text">Loading Helsinki Events...</div>
        </div>
      )}

      {error && !loading && (
        <div className="events-loader-overlay">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚠️</div>
            <div
              style={{
                fontWeight: 800,
                color: '#dc2626',
                marginBottom: '0.5rem',
                fontSize: '1.1rem',
              }}
            >
              Connection Error
            </div>
            <div style={{ color: '#6b6580', fontSize: '0.85rem' }}>
              Ensure AWS Lambda is online and CORS is active.
            </div>
          </div>
        </div>
      )}

      {/* Mobile top bar */}
      <div className="mobile-topbar">
        <button
          className={`mobile-toggle ${isSidebarOpen ? 'active' : ''}`}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle event list"
          type="button"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="mobile-search-shell">
          <input
            type="text"
            placeholder="Search events, music, food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search events"
          />
        </div>
      </div>

      <div
        className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      <EventSidebar
        events={filteredEvents}
        allTags={allTags}
        search={search}
        onSearchChange={setSearch}
        tagFilter={tagFilter}
        onTagChange={setTagFilter}
        datePreset={datePreset}
        onDatePresetChange={setDatePreset}
        customStart={customStart}
        onCustomStartChange={setCustomStart}
        customEnd={customEnd}
        onCustomEndChange={setCustomEnd}
        selectedIndex={selectedIndex}
        onSelectEvent={handleSelectEvent}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <EventMap
        events={filteredEvents}
        selectedIndex={selectedIndex}
        onSelectEvent={handleSelectEvent}
      />

      {selectedEvent && (
        <EventDetails event={selectedEvent} onClose={handleCloseDetails} />
      )}
    </div>
  );
}
