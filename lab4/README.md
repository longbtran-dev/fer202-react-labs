# Lab 4 — useReducer, Formik & Yup (E-Commerce Checkout)

## Mục tiêu

Lab 4 xây dựng luồng **Giỏ hàng & Thanh toán (Shopping Cart & Checkout)** cho một trang thương mại điện tử hoa lan, tập trung vào ba trụ cột kiến thức:

1. **`useReducer`**: Quản lý trạng thái phức tạp của giỏ hàng (thêm món, tăng/giảm số lượng, xóa món, xóa sạch giỏ hàng sau khi đặt đơn) thông qua một hàm `reducer` thuần khiết.
2. **`Formik`**: Quản lý trạng thái biểu mẫu thanh toán (`values`, `touched`, `errors`, `isSubmitting`, `resetForm`) mà không cần tạo hàng loạt `useState` rời rạc cho từng ô input.
3. **`Yup`**: Định nghĩa toàn bộ tập luật kiểm tra dữ liệu đầu vào (`validationSchema`) tách biệt hoàn toàn khỏi giao diện JSX.

---

## Bản đồ kiến thức

| Kiến thức | Hiểu đơn giản | Nơi sử dụng |
|---|---|---|
| `useReducer(reducer, initialState)` | Hook quản lý state bằng cách gửi `action` vào hàm `reducer` | [`App.jsx`](./src/App.jsx) |
| Pure Reducer (`cartReducer`) | Hàm nhận `(state, action)` và trả về mảng state mới (không sửa mảng cũ) | [`cartReducer.js`](./src/reducer/cartReducer.js) |
| Action `{ type, payload }` | Bản tin mô tả việc cần làm (`type`) và dữ liệu kèm theo (`payload`) | `ADD_ITEM`, `UPDATE_QUANTITY`, `REMOVE_ITEM`, `CLEAR_CART` |
| Derived State (`calculateCartSummary`) | Tính `totalQuantity` và `totalPrice` trực tiếp từ `cartItems` bằng `reduce()` | [`cartReducer.js`](./src/reducer/cartReducer.js) |
| `<Formik>` | Component bọc ngoài quản lý vòng đời form (state, validate, submit) | [`CheckoutForm.jsx`](./src/components/CheckoutForm.jsx) |
| `<Form>`, `<Field>`, `<ErrorMessage>` | Bộ component tự động nối input với Formik theo thuộc tính `name` | [`CheckoutForm.jsx`](./src/components/CheckoutForm.jsx) |
| `Yup.object({...})` | Schema kiểm tra toàn bộ các trường của biểu mẫu | [`checkoutSchema.js`](./src/validation/checkoutSchema.js) |
| `Yup.string().matches(regex)` | Kiểm tra chuỗi theo biểu thức chính quy (ví dụ số điện thoại 10–11 số) | [`checkoutSchema.js`](./src/validation/checkoutSchema.js) |
| `Yup.boolean().oneOf([true])` | Bắt buộc người dùng phải đánh dấu tick vào ô checkbox điều khoản | [`checkoutSchema.js`](./src/validation/checkoutSchema.js) |

---

## Giải thích luồng hoạt động từng bước

### Bước 1: Quản lý giỏ hàng bằng `useReducer` (`src/reducer/cartReducer.js`)

Thay vì viết 4–5 hàm cập nhật mảng rải rác trong component, `useReducer` gom toàn bộ quy tắc biến đổi giỏ hàng vào một hàm duy nhất:

```js
const [cartItems, dispatch] = useReducer(cartReducer, initialCartItems);
```

- Khi người dùng bấm nút **+** ở giỏ hàng, component gọi:
  ```js
  dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } });
  ```
- React tự động truyền `cartItems` hiện tại và `action` trên vào `cartReducer(state, action)`.
- `cartReducer` dùng `state.map(...)` tạo ra một mảng mới với `quantity` đã cập nhật. React nhận mảng mới và render lại giao diện cùng tổng tiền mới.

### Bước 2: Định nghĩa luật kiểm tra bằng `Yup` (`src/validation/checkoutSchema.js`)

Đề bài yêu cầu **mọi quy tắc kiểm tra dữ liệu chỉ được xử lý bởi Yup**:

- `fullName`: `.trim().min(3, ...).required(...)` — bắt buộc nhập và có ít nhất 3 ký tự.
- `email`: `.trim().email(...).required(...)` — bắt buộc nhập và đúng cấu trúc email.
- `phone`: `.matches(/^0\d{9,10}$/, ...).required(...)` — bắt buộc khớp chuỗi 10–11 chữ số bắt đầu bằng `0`.
- `address`: `.trim().min(5, ...).required(...)` — bắt buộc nhập địa chỉ giao hàng.
- `paymentMethod`: `.oneOf(['COD', 'Card'], ...).required(...)` — bắt buộc chọn `COD` hoặc `Card`.
- `agreeTerms`: `.oneOf([true], ...)` — bắt buộc phải tick đồng ý điều khoản.

### Bước 3: Kết nối Giỏ hàng và Form (`src/components/CheckoutForm.jsx` & `src/App.jsx`)

1. **Khóa nút Submit khi giỏ trống:** `App.jsx` truyền `isCartEmpty={cartItems.length === 0}` xuống `CheckoutForm`. Nút `Place Order` có `disabled={isCartEmpty || isSubmitting}`.
2. **Hiển thị xác nhận & xóa giỏ hàng:** Khi form hợp lệ, `onSubmit` của Formik gọi `handleSubmitOrder(values)` ở `App.jsx`:
   - Lưu bản chụp đơn hàng (`customer`, `items`, `summary`) vào `confirmedOrder` để hiển thị `OrderConfirmation`.
   - Gọi `dispatch({ type: 'CLEAR_CART' })` để làm trống giỏ hàng và `resetForm()` để làm mới biểu mẫu.

---

## Chạy dự án & kiểm thử

```bash
# Từ thư mục gốc fer202-react-labs:
npm run dev:lab4
npm test --workspace=@fer202/lab4
```
