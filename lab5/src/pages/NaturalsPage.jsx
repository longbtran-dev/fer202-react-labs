import { Link, useParams } from 'react-router-dom';
import OrchidsPresentation from '../components/OrchidsPresentation';
import { orchids } from '../data/ListOfOrchids';

export default function NaturalsPage() {
  const { category } = useParams();

  // Chỉ lọc các loài lan tự nhiên có isNatural === true (và lọc thêm theo
  // tham số URL nếu người dùng truyền /naturals/:category).
  const naturalOrchids = orchids.filter((orchid) => {
    if (!orchid.isNatural) return false;
    if (!category) return true;
    return orchid.category.toLowerCase() === category.toLowerCase();
  });

  return (
    <div className="page-section">
      <div className="route-banner">
        <div>
          <p className="eyebrow">Route: /naturals · Filtered by isNatural = true</p>
          <h1>Natural Orchids Collection</h1>
          <p className="route-banner__desc">
            Showing {naturalOrchids.length} wild botanical species preserved in their natural form without artificial hybridization.
          </p>
        </div>
        <Link className="back-link" to="/">
          ← Return to all orchids
        </Link>
      </div>

      <OrchidsPresentation
        eyebrow="Wild Species"
        title="Botanical originals"
        subtitle={`${naturalOrchids.length} natural orchids`}
        orchids={naturalOrchids}
      />
    </div>
  );
}
