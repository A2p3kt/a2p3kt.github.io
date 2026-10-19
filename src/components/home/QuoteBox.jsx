import './QuoteBox.css';

export function QuoteBox() {
  return (
    <section className="quote-box" aria-label="Personal quote">
      <div className="quote-mark" aria-hidden="true">
        <i className="fa-solid fa-quote-left"></i>
      </div>
      <p className="quote-text">
        "The problem with experts is that they know what can't be done."
      </p>
      <p className="quote-author">— Henry Ford</p>
      <p className="quote-note mono">Luckily, I don't have that problem yet.</p>
    </section>
  );
}
