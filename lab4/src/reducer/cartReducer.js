import { products } from '../data/products';

// Khởi tạo sẵn 3 sản phẩm trong giỏ để người học và giáo viên mở trang là thấy
// ngay danh sách giỏ hàng, đồng thời vẫn có thể thêm/xóa/cập nhật số lượng.
export const initialCartItems = [
  { ...products[0], quantity: 1 },
  { ...products[1], quantity: 2 },
  { ...products[2], quantity: 1 }
];

// Reducer là hàm thuần (pure function): nhận state hiện tại + action, trả về
// mảng state mới mà không chỉnh sửa trực tiếp (mutate) mảng cũ.
export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const product = action.payload;
      const existing = state.find((item) => item.id === product.id);
      if (existing) {
        return state.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...state, { ...product, quantity: 1 }];
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      const parsedQuantity = Number(quantity);
      if (!Number.isFinite(parsedQuantity) || parsedQuantity < 1) {
        return state;
      }
      return state.map((item) =>
        item.id === id ? { ...item, quantity: Math.floor(parsedQuantity) } : item
      );
    }

    case 'REMOVE_ITEM': {
      const { id } = action.payload;
      return state.filter((item) => item.id !== id);
    }

    case 'CLEAR_CART':
      return [];

    case 'RESET_DEMO_CART':
      return initialCartItems;

    default:
      return state;
  }
}

// Tổng số lượng và tổng tiền luôn được suy ra (derived) từ danh sách cartItems
// để tránh lệch dữ liệu giữa danh sách món và phần tổng kết.
export function calculateCartSummary(cartItems) {
  return cartItems.reduce(
    (acc, item) => ({
      totalQuantity: acc.totalQuantity + item.quantity,
      totalPrice: acc.totalPrice + item.price * item.quantity
    }),
    { totalQuantity: 0, totalPrice: 0 }
  );
}
