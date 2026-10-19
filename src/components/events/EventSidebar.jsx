import { EventCard } from './EventCard';

export function EventSidebar({
  events,
  totalLoaded = 0,
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
  hasMore = false,
  loadingMore = false,
  loadMoreError = null,
  onLoadMore,
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
        <span>
          {events.length === 0
            ? 'No events match'
            : `${events.length} event${events.length !== 1 ? 's' : ''} shown`}
        </span>
        {totalLoaded > 0 && (
          <span className="event-count-total">
            {events.length !== totalLoaded ? `(${totalLoaded} loaded)` : `(${totalLoaded} total)`}
          </span>
        )}
      </div>

      <div id="event-list" className="event-list">
        {events.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <p>
              No events match your current filters.
              <br />
              {hasMore
                ? 'Try loading more events below or adjusting your filters.'
                : 'Try a broader search or longer timeframe.'}
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

        {hasMore && (
          <div className="load-more-section">
            <button
              type="button"
              className="load-more-btn"
              onClick={onLoadMore}
              disabled={loadingMore}
              aria-label="Load more events from AWS Lambda"
            >
              {loadingMore ? (
                <>
                  <span className="btn-spinner" aria-hidden="true"></span>
                  <span>Loading more events...</span>
                </>
              ) : (
                <>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                  <span>Load More Events</span>
                </>
              )}
            </button>
            {loadMoreError && (
              <div className="load-more-error" role="alert">
                <span>{loadMoreError}</span>
                <button type="button" onClick={onLoadMore} className="retry-btn">
                  Retry
                </button>
              </div>
            )}
          </div>
        )}

        {!hasMore && totalLoaded > 0 && (
          <div className="all-loaded-notice">
            <span>All {totalLoaded} events loaded</span>
          </div>
        )}
      </div>
    </aside>
  );
}
