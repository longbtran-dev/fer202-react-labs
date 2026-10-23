// Import danh sách sản phẩm mẫu để tạo giỏ hàng ban đầu.
import { products } from '../data/products';

// Khởi tạo sẵn 3 sản phẩm trong giỏ (kèm thuộc tính quantity) để khi mở trang
// người học và giáo viên thấy ngay danh sách sản phẩm trong giỏ hàng.
export const initialCartItems = [
  { ...products[0], quantity: 1 }, // Sao chép toàn bộ thuộc tính của sản phẩm 1 và gán số lượng = 1
  { ...products[1], quantity: 2 }, // Sao chép sản phẩm 2 và gán số lượng = 2
  { ...products[2], quantity: 1 }  // Sao chép sản phẩm 3 và gán số lượng = 1
];

// cartReducer là hàm thuần (pure function) dùng cho useReducer(cartReducer, initialCartItems).
// Tham số 1 (state): mảng các phần tử đang có trong giỏ hàng hiện tại.
// Tham số 2 (action): object mô tả hành động vừa xảy ra, gồm { type, payload }.
// Quy tắc bắt buộc: KHÔNG sửa trực tiếp (mutate) mảng state cũ mà luôn trả về mảng mới.
export function cartReducer(state, action) {
  // Dựa vào action.type để quyết định cách tạo ra state mới.
  switch (action.type) {
    // 1. Hành động thêm một sản phẩm từ danh mục vào giỏ hàng
    case 'ADD_ITEM': {
      const product = action.payload; // Sản phẩm cần thêm được gửi kèm trong payload
      // Kiểm tra xem sản phẩm này đã tồn tại trong giỏ hàng hay chưa
      const existing = state.find((item) => item.id === product.id);
      if (existing) {
        // Nếu đã có trong giỏ: dùng map() tạo mảng mới, chỉ tăng quantity của đúng món đó lên 1
        return state.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Nếu chưa có trong giỏ: dùng spread [...state] nối thêm sản phẩm mới với quantity = 1
      return [...state, { ...product, quantity: 1 }];
    }

    // 2. Hành động cập nhật số lượng của một món trong giỏ hàng
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload; // Lấy id sản phẩm và số lượng mới từ payload
      const parsedQuantity = Number(quantity); // Ép kiểu về số (vì value từ thẻ <input> là chuỗi)
      // Nếu người dùng nhập chữ không hợp lệ hoặc số nhỏ hơn 1 thì giữ nguyên state cũ
      if (!Number.isFinite(parsedQuantity) || parsedQuantity < 1) {
        return state;
      }
      // Dùng map() tạo mảng mới và cập nhật quantity (làm tròn xuống số nguyên) cho đúng id
      return state.map((item) =>
        item.id === id ? { ...item, quantity: Math.floor(parsedQuantity) } : item
      );
    }

    // 3. Hành động xóa một sản phẩm khỏi giỏ hàng
    case 'REMOVE_ITEM': {
      const { id } = action.payload; // Lấy id của sản phẩm cần xóa
      // filter() giữ lại các phần tử có id khác với id cần xóa, tạo ra mảng mới
      return state.filter((item) => item.id !== id);
    }

    // 4. Hành động làm trống toàn bộ giỏ hàng sau khi đặt hàng thành công
    case 'CLEAR_CART':
      return []; // Trả về mảng rỗng

    // 5. Hành động khôi phục lại giỏ hàng mẫu để tiện demo nhiều lần
    case 'RESET_DEMO_CART':
      return initialCartItems;

    // Mặc định: nếu action.type không khớp trường hợp nào thì trả về state hiện tại
    default:
      return state;
  }
}

// Hàm tính tổng số lượng (totalQuantity) và tổng tiền (totalPrice) từ mảng cartItems.
// Đây là dữ liệu dẫn xuất (derived state): tính trực tiếp mỗi lần render thay vì lưu
// thêm state riêng, giúp tổng tiền không bao giờ bị lệch so với danh sách món.
export function calculateCartSummary(cartItems) {
  // reduce() duyệt qua từng món trong giỏ và cộng dồn vào bộ tích lũy (acc)
  return cartItems.reduce(
    (acc, item) => ({
      totalQuantity: acc.totalQuantity + item.quantity,               // Cộng dồn số lượng
      totalPrice: acc.totalPrice + item.price * item.quantity         // Cộng dồn thành tiền (đơn giá * số lượng)
    }),
    { totalQuantity: 0, totalPrice: 0 } // Giá trị khởi tạo khi bắt đầu cộng dồn
  );
}
