import OrchidCard from './OrchidCard';

export default function OrchidsPresentation({ orchids }) {
  return (
    <section className="collection" aria-labelledby="collection-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Living collection</p>
          <h2 id="collection-title">Sixteen remarkable orchids</h2>
        </div>
        <p>{orchids.length} specimens · 12 genera</p>
      </div>

      <div className="orchid-grid">
        {orchids.map((orchid) => <OrchidCard key={orchid.id} orchid={orchid} />)}
      </div>
    </section>
  );
}
