import { Link } from 'react-router-dom';

const fallbackImage = `${import.meta.env.BASE_URL}orchid-placeholder.svg`;

export default function OrchidCard({ orchid }) {
  function showFallback(event) {
    event.currentTarget.onerror = null;
    event.currentTarget.src = fallbackImage;
  }

  return (
    <article className="orchid-card">
      <div className="orchid-card__image-wrap">
        <img src={orchid.image} alt={`${orchid.name} orchid`} onError={showFallback} />
        <span className="orchid-card__index">{String(orchid.id).padStart(2, '0')}</span>
        <div className="orchid-card__badges">
          {orchid.isNatural && <span className="orchid-card__badge orchid-card__badge--natural">Natural</span>}
          {orchid.isSpecial && <span className="orchid-card__badge">Special</span>}
        </div>
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

        <Link
          className="detail-button"
          to={`/detail/${orchid.id}`}
          aria-label={`Detail for ${orchid.name}`}
        >
          Detail <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
