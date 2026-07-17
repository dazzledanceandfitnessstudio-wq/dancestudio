export default function PromoBanner() {
  return (
    <section className="promo-banner">
      <div className="promo-banner-inner">
        <h2 className="promo-banner-title">
          The Studio That Moves With You
        </h2>
        <p className="promo-banner-subtitle">
          From your very first class to the competition stage — Dazzle is where
          dancers of every level find their rhythm, their crew, and their confidence.
        </p>
        <div className="promo-stats">
          <div className="promo-stat">
            <span className="promo-stat-value">350+</span>
            <span className="promo-stat-label">Active Students</span>
          </div>
          <div className="promo-stat">
            <span className="promo-stat-value">8</span>
            <span className="promo-stat-label">Dance Styles</span>
          </div>
          <div className="promo-stat">
            <span className="promo-stat-value">40+</span>
            <span className="promo-stat-label">Events / Year</span>
          </div>
        </div>
      </div>
    </section>
  );
}
