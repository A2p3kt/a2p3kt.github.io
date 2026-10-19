import { EventCard } from './EventCard';

export function EventSidebar({
  events,
  allTags,
  search,
  onSearchChange,
  tagFilter,
  onTagChange,
  datePreset,
  onDatePresetChange,
  customStart,
  onCustomStartChange,
  customEnd,
  onCustomEndChange,
  selectedIndex,
  onSelectEvent,
  isOpen,
  onClose,
}) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`} id="sidebar">
      <div className="brand">
        <h2>
          <span className="flag">🇫🇮</span> Helsinki Explorer
        </h2>
        <p>Discover events happening near you</p>
      </div>

      <div className="mobile-drawer-note">
        Adjust the timeframe and browse the matching event list here.
      </div>

      <div className="filters">
        <div className="control-group">
          <label htmlFor="search">Search Events</label>
          <input
            type="text"
            id="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Jazz, Food, Cinema..."
          />
        </div>

        <div className="control-group">
          <label htmlFor="datePreset">Date Range</label>
          <select
            id="datePreset"
            value={datePreset}
            onChange={(e) => onDatePresetChange(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="this_week">This Week</option>
            <option value="next_7_days">Next 7 Days</option>
            <option value="this_weekend">This Weekend</option>
            <option value="this_month">This Month</option>
            <option value="next_30_days">Next 30 Days</option>
            <option value="all_upcoming">All Upcoming</option>
            <option value="custom">Custom Range</option>
          </select>

          <div className={`custom-range ${datePreset === 'custom' ? 'active' : ''}`} id="customRange">
            <input
              type="date"
              id="customStart"
              value={customStart}
              onChange={(e) => onCustomStartChange(e.target.value)}
              aria-label="Custom start date"
            />
            <input
              type="date"
              id="customEnd"
              value={customEnd}
              onChange={(e) => onCustomEndChange(e.target.value)}
              aria-label="Custom end date"
            />
          </div>
        </div>

        <div className="control-group">
          <label htmlFor="tagFilter">Category</label>
          <select
            id="tagFilter"
            value={tagFilter}
            onChange={(e) => onTagChange(e.target.value)}
          >
            <option value="all">All Categories</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="event-count" id="eventCount">
        {events.length === 0
          ? 'No events found'
          : `${events.length} event${events.length !== 1 ? 's' : ''} found`}
      </div>

      <div id="event-list" className="event-list">
        {events.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <p>
              No events match your filters.
              <br />
              Try a broader search or longer timeframe.
            </p>
          </div>
        ) : (
          events.map((event, idx) => (
            <EventCard
              key={`${event.id || event.title || 'event'}-${idx}`}
              event={event}
              index={idx}
              isSelected={selectedIndex === idx}
              onSelect={onSelectEvent}
            />
          ))
        )}
      </div>
    </aside>
  );
}
