import OrchidCard from './OrchidCard';

// Presentation không sở hữu state. Nó nhận callback từ container rồi chuyển
// callback đó xuống từng card để card có thể báo orchid nào được click.
export default function OrchidsPresentation({ orchids, onViewDetails }) {
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
        {/* Mỗi card nhận cùng một callback nhưng nhận một object orchid khác nhau. */}
        {orchids.map((orchid) => (
          <OrchidCard key={orchid.id} orchid={orchid} onViewDetails={onViewDetails} />
        ))}
      </div>
    </section>
  );
}
