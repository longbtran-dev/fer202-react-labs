// BASE_URL giúp đường dẫn fallback đúng cả khi chạy local và trên GitHub Pages.
const fallbackImage = `${import.meta.env.BASE_URL}orchid-placeholder.svg`;

// Card nhận đúng một object orchid qua props và chỉ đọc dữ liệu đó để tạo UI.
export default function OrchidCard({ orchid }) {
  function showFallback(event) {
    // currentTarget là thẻ img phát sinh lỗi; đổi src sang ảnh cục bộ dự phòng.
    event.currentTarget.onerror = null;
    event.currentTarget.src = fallbackImage;
  }

  return (
    <article className="orchid-card">
      <div className="orchid-card__image-wrap">
        <img src={orchid.image} alt={`${orchid.name} orchid`} onError={showFallback} />
        <span className="orchid-card__index">{String(orchid.id).padStart(2, '0')}</span>
        {/* Toán tử && chỉ render badge khi isSpecial là true. */}
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

        {/* dl/dt/dd mô tả đúng ngữ nghĩa một danh sách thuật ngữ và giá trị. */}
        <dl className="orchid-card__facts">
          <div><dt>Origin</dt><dd>{orchid.origin}</dd></div>
          <div><dt>Color</dt><dd>{orchid.color}</dd></div>
        </dl>
      </div>
    </article>
  );
}
