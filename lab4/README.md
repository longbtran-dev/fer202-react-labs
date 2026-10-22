# Lab 4 — useReducer, Formik & Yup (E-Commerce Checkout)

Lab 4 xây dựng luồng **Giỏ hàng & Thanh toán (Shopping Cart & Checkout)** cho cửa hàng hoa lan bằng ba công cụ trọng tâm:

1. **`useReducer`** để quản lý toàn bộ trạng thái giỏ hàng (thêm sản phẩm, cập nhật số lượng, xóa từng món, xóa sạch giỏ hàng sau khi đặt đơn).
2. **`Formik`** để quản lý trạng thái biểu mẫu thanh toán (`values`, `touched`, `errors`, `isSubmitting`, `resetForm`).
3. **`Yup`** để định nghĩa toàn bộ tập luật kiểm tra dữ liệu đầu vào (`validationSchema`).

---

## 1. Đáp ứng yêu cầu đề bài Lab 04

| Yêu cầu đề bài | Nơi cài đặt trong source code |
|---|---|
| 1. Hiển thị danh sách sản phẩm trong giỏ hàng | `src/components/ShoppingCart.jsx`, dữ liệu khởi tạo tại `src/reducer/cartReducer.js` |
| 2. Quản lý giỏ hàng bằng `useReducer` (tên, đơn giá, số lượng, nút Remove, cập nhật số lượng, tổng số lượng & tổng tiền) | `src/reducer/cartReducer.js` (`ADD_ITEM`, `UPDATE_QUANTITY`, `REMOVE_ITEM`, `CLEAR_CART`, `calculateCartSummary`) |
| 3. Tạo Checkout Form bằng `Formik` và chỉ validate bằng `Yup` (`fullName`, `email`, `phone`, `address`, `paymentMethod`: COD/Card, `agreeTerms`) | `src/validation/checkoutSchema.js` và `src/components/CheckoutForm.jsx` |
| 4. Khóa nút Submit khi giỏ trống; hiển thị **Order Confirmation Summary** (thông tin khách, danh sách món, tổng số lượng, tổng tiền) và xóa giỏ hàng sau khi đặt thành công | `src/App.jsx` và `src/components/OrderConfirmation.jsx` |

---

## 2. Cấu trúc thư mục

```text
lab4/
├── public/
│   └── orchid-placeholder.svg
├── src/
│   ├── components/
│   │   ├── CheckoutForm.jsx       # Formik + Yup checkout form
│   │   ├── OrderConfirmation.jsx  # Bảng xác nhận đơn hàng sau khi submit
│   │   ├── ProductCatalog.jsx     # Danh mục hoa lan để thêm vào giỏ
│   │   └── ShoppingCart.jsx       # Giỏ hàng + bộ đếm số lượng + tổng tiền
│   ├── data/
│   │   └── products.js            # 6 mẫu hoa lan kèm đơn giá
│   ├── reducer/
│   │   └── cartReducer.js         # Hàm cartReducer thuần và calculateCartSummary
│   ├── validation/
│   │   └── checkoutSchema.js      # Yup schema cho 6 trường dữ liệu
│   ├── test/
│   │   └── setup.js               # Cấu hình jest-dom cho Vitest
│   ├── App.jsx                    # Kết nối useReducer, giỏ hàng và form
│   ├── App.test.jsx               # Test tự động cho reducer, form và luồng đặt hàng
│   ├── main.jsx                   # Điểm vào ứng dụng
│   └── styles.css                 # Giao diện Botanical đồng bộ
├── index.html
├── package.json
└── vite.config.js
```

---

## 3. Điểm nhấn kỹ thuật

### Vì sao dùng `useReducer` cho giỏ hàng?
Khi một state có nhiều thao tác biến đổi liên quan chặt chẽ (`ADD_ITEM`, `UPDATE_QUANTITY`, `REMOVE_ITEM`, `CLEAR_CART`), gom toàn bộ logic vào `cartReducer(state, action)` giúp:
- Component giao diện chỉ cần phát tín hiệu `dispatch({ type, payload })`.
- Hàm reducer là hàm thuần (pure function), có thể viết unit test trực tiếp mà không cần render DOM.

### Vì sao tách `calculateCartSummary(cartItems)`?
Tổng số lượng (`totalQuantity`) và tổng tiền (`totalPrice`) luôn được tính trực tiếp từ mảng `cartItems` thay vì lưu thêm 2 biến state riêng, tránh lỗi lệch dữ liệu khi thêm/xóa sản phẩm.

### Chạy dự án & kiểm thử

```bash
# Từ thư mục gốc fer202-react-labs:
npm run dev:lab4
npm test --workspace=@fer202/lab4
```
