import OrchidCard from './OrchidCard';

// Component trình bày nhận cả dữ liệu và callback qua props, không tự đọc
// Context vì auth/theme không liên quan đến trách nhiệm render danh sách.
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
        {/* key dùng cho React; orchid và onViewDetails là props thật của card. */}
        {orchids.map((orchid) => (
          <OrchidCard key={orchid.id} orchid={orchid} onViewDetails={onViewDetails} />
        ))}
      </div>
    </section>
  );
}
