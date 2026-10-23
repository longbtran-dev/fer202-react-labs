// useParams đọc tham số dạng /detail/:id; useSearchParams đọc query string dạng /detail?id=...
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { orchids } from '../data/ListOfOrchids';

const fallbackImage = `${import.meta.env.BASE_URL}orchid-placeholder.svg`;

export default function DetailPage() {
  // 1. Lấy tham số :id từ đường dẫn động /detail/:id (ví dụ /detail/3 -> paramId = '3')
  const { id: paramId } = useParams();
  // 2. Lấy đối tượng URLSearchParams để hỗ trợ cả trường hợp truy cập /detail?id=3
  const [searchParams] = useSearchParams();

  // Ưu tiên lấy paramId từ path, nếu không có thì lấy từ query ?id=, mặc định là '1'.
  const rawId = paramId ?? searchParams.get('id') ?? '1';
  // Tìm đúng object hoa lan trong mảng dữ liệu khớp với id trên URL.
  const orchid = orchids.find((item) => String(item.id) === String(rawId)) ?? orchids[0];

  function showFallback(event) {
    event.currentTarget.onerror = null;
    event.currentTarget.src = fallbackImage;
  }

  return (
    <section className="detail-page" aria-label="Orchid detail">
      {/* Thanh điều hướng phụ giúp quay về trang chủ (/) hoặc sang trang lan tự nhiên (/naturals) */}
      <div className="detail-page__top">
        <Link className="back-link" to="/">
          ← Back to Index
        </Link>
        <Link className="back-link" to="/naturals">
          View Natural Orchids →
        </Link>
      </div>

      {/* Khung hiển thị đầy đủ thông tin chi tiết của loài lan được chọn */}
      <div className="detail-card">
        <div className="detail-card__media">
          <img src={orchid.image} alt={`${orchid.name} orchid detail`} onError={showFallback} />
          <div className="orchid-card__badges">
            {orchid.isNatural && <span className="orchid-card__badge orchid-card__badge--natural">Natural species</span>}
            {orchid.isSpecial && <span className="orchid-card__badge">Special collection</span>}
          </div>
        </div>

        <div className="detail-card__content">
          <p className="eyebrow">Specimen #{String(orchid.id).padStart(2, '0')} · {orchid.category}</p>
          <h1>{orchid.name}</h1>
          <p className="detail-card__description">{orchid.description}</p>

          <dl className="detail-facts">
            <div><dt>Origin</dt><dd>{orchid.origin}</dd></div>
            <div><dt>Color</dt><dd>{orchid.color}</dd></div>
            <div><dt>Category</dt><dd>{orchid.category}</dd></div>
            <div><dt>Rating</dt><dd>{orchid.rating}.0 / 5.0</dd></div>
            <div><dt>Natural Status</dt><dd>{orchid.isNatural ? 'Natural Species' : 'Cultivated Hybrid'}</dd></div>
            <div><dt>Collection Tier</dt><dd>{orchid.isSpecial ? 'Special Archive' : 'Core Collection'}</dd></div>
          </dl>

          {/* Bộ nút chuyển nhanh giữa các URL /detail/1, /detail/2... để dễ quan sát URL param thay đổi */}
          <div className="detail-switcher" aria-label="Switch orchid via URL parameter">
            <p>Browse another specimen via URL parameter:</p>
            <div className="detail-switcher__pills">
              {orchids.slice(0, 8).map((item) => (
                <Link
                  key={item.id}
                  to={`/detail/${item.id}`}
                  className={`switcher-pill ${item.id === orchid.id ? 'switcher-pill--active' : ''}`}
                >
                  #{item.id} {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
