// Link tạo nút bấm chuyển hướng; useParams đọc tham số động trên đường dẫn URL.
import { Link, useParams } from 'react-router-dom';
import OrchidsPresentation from '../components/OrchidsPresentation';
import { orchids } from '../data/ListOfOrchids';

export default function NaturalsPage() {
  // Nếu URL có dạng /naturals/:category, useParams() sẽ trích xuất giá trị category đó.
  const { category } = useParams();

  // Yêu cầu đề bài Lab 5: chỉ lọc các loài lan tự nhiên dựa trên thuộc tính isNatural === true.
  const naturalOrchids = orchids.filter((orchid) => {
    if (!orchid.isNatural) return false; // Loại bỏ các giống lan lai tạo (isNatural: false)
    if (!category) return true;         // Nếu không lọc thêm theo họ lan thì giữ lại
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
        {/* Nút quay về trang Index (/) */}
        <Link className="back-link" to="/">
          ← Return to all orchids
        </Link>
      </div>

      {/* Tái sử dụng OrchidsPresentation để hiển thị danh sách hoa lan tự nhiên đã lọc */}
      <OrchidsPresentation
        eyebrow="Wild Species"
        title="Botanical originals"
        subtitle={`${naturalOrchids.length} natural orchids`}
        orchids={naturalOrchids}
      />
    </div>
  );
}
