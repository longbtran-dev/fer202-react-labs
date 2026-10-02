import { useState } from 'react';
import { orchids } from '../data/ListOfOrchids';
import OrchidModal from './OrchidModal';
import OrchidsPresentation from './OrchidsPresentation';

export default function OrchidsContainer() {
  // selectedOrchid chỉ phục vụ gallery/modal nên vẫn là state cục bộ.
  // Không đưa mọi state vào Context nếu chỉ một khu vực nhỏ cần sử dụng.
  const [selectedOrchid, setSelectedOrchid] = useState(null);

  return (
    <>
      {/* Card gọi callback để đưa orchid được chọn lên container. */}
      <OrchidsPresentation orchids={orchids} onViewDetails={setSelectedOrchid} />
      {/* Modal đọc cùng state; đặt null sẽ đóng modal. */}
      <OrchidModal orchid={selectedOrchid} onClose={() => setSelectedOrchid(null)} />
    </>
  );
}
