import OrchidCard from './OrchidCard';

export default function OrchidsPresentation({ eyebrow, title, subtitle, orchids }) {
  return (
    <section className="collection" aria-labelledby="collection-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="collection-title">{title}</h2>
        </div>
        <p>{subtitle}</p>
      </div>

      <div className="orchid-grid">
        {orchids.map((orchid) => (
          <OrchidCard key={orchid.id} orchid={orchid} />
        ))}
      </div>
    </section>
  );
}
