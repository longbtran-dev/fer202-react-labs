import { useState } from 'react';
import { orchids } from '../data/ListOfOrchids';
import OrchidModal from './OrchidModal';
import OrchidsPresentation from './OrchidsPresentation';

export default function OrchidsContainer() {
  // null nghĩa là chưa chọn orchid nên modal đóng; một object nghĩa là modal
  // mở và hiển thị object đó. Setter cập nhật state rồi yêu cầu React render lại.
  const [selectedOrchid, setSelectedOrchid] = useState(null);

  return (
    <>
      {/* State được "lift" lên cha chung: card gửi object lên qua callback,
          còn modal nhận lại object hiện đang được chọn. */}
      <OrchidsPresentation orchids={orchids} onViewDetails={setSelectedOrchid} />
      {/* Đóng modal bằng cách xóa lựa chọn, không cần thêm state show riêng. */}
      <OrchidModal orchid={selectedOrchid} onClose={() => setSelectedOrchid(null)} />
    </>
  );
}
