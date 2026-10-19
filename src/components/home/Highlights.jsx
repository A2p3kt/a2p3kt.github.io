import './Highlights.css';

export function Highlights({ items, label, details = false }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <div className={`content-highlights${details ? ' content-highlights--details' : ''}`}>
      {label && <p className="highlights-label">{label}</p>}
      <ul>
        {items.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}
      </ul>
    </div>
  );
}
