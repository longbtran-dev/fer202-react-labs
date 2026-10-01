const fallbackImage = `${import.meta.env.BASE_URL}orchid-placeholder.svg`;

export default function OrchidCard({ orchid, onViewDetails }) {
  function showFallback(event) {
    event.currentTarget.onerror = null;
    event.currentTarget.src = fallbackImage;
  }

  return (
    <article className="orchid-card">
      <div className="orchid-card__image-wrap">
        <img src={orchid.image} alt={`${orchid.name} orchid`} onError={showFallback} />
        <span className="orchid-card__index">{String(orchid.id).padStart(2, '0')}</span>
        {orchid.isSpecial && <span className="orchid-card__badge">Special collection</span>}
      </div>

      <div className="orchid-card__body">
        <div className="orchid-card__title-row">
          <div>
            <p>{orchid.category}</p>
            <h3>{orchid.name}</h3>
          </div>
          <span className="rating" aria-label={`Rating: ${orchid.rating} out of 5`}>
            {orchid.rating}.0
          </span>
        </div>

        <dl className="orchid-card__facts">
          <div><dt>Origin</dt><dd>{orchid.origin}</dd></div>
          <div><dt>Color</dt><dd>{orchid.color}</dd></div>
        </dl>

        <button
          className="detail-button"
          type="button"
          aria-label={`View details for ${orchid.name}`}
          onClick={() => onViewDetails(orchid)}
        >
          View details <span aria-hidden="true">↗</span>
        </button>
      </div>
    </article>
  );
}
