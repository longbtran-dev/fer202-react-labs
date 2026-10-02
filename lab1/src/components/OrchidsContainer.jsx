import { orchids } from '../data/ListOfOrchids';
import OrchidsPresentation from './OrchidsPresentation';

// Container biết dữ liệu đến từ đâu, còn Presentation chỉ lo hiển thị.
// Prop orchids ở bên trái là tên dữ liệu component con sẽ nhận;
// biến orchids trong {} là mảng được import từ data module.
export default function OrchidsContainer() {
  return <OrchidsPresentation orchids={orchids} />;
}
