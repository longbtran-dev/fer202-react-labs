# Lab 5 — React Router, Formik & Yup (Orchid Atlas)

## Mục tiêu

Lab 5 kế thừa bộ dữ liệu 16 loài lan và `AuthContext` (đăng nhập giả + Dark/Light theme) từ Lab 1–3, sau đó nâng cấp ứng dụng thành một **Single-Page Application (SPA) nhiều đường dẫn** bằng **`React Router`** và bổ sung trang liên hệ dùng **`Formik` + `Yup`**.

---

## Bản đồ kiến thức

| Kiến thức | Hiểu đơn giản | Nơi sử dụng |
|---|---|---|
| `<BrowserRouter basename={...}>` | Đồng bộ giao diện React với thanh địa chỉ URL của trình duyệt | [`main.jsx`](./src/main.jsx) |
| `<Routes>` và `<Route path element>` | Khai báo bảng ánh xạ giữa đường dẫn URL và component trang | [`App.jsx`](./src/App.jsx) |
| `<NavLink>` | Thẻ điều hướng trên thanh menu có tự động đánh dấu `isActive` | [`AppNavbar.jsx`](./src/components/AppNavbar.jsx) |
| `<Link to="...">` | Chuyển trang mượt mà không tải lại HTML (thay cho `<a href>`) | [`OrchidCard.jsx`](./src/components/OrchidCard.jsx), [`DetailPage.jsx`](./src/pages/DetailPage.jsx) |
| `useParams()` | Hook đọc tham số động trên đường dẫn URL (như `:id` trong `/detail/:id`) | [`DetailPage.jsx`](./src/pages/DetailPage.jsx), [`NaturalsPage.jsx`](./src/pages/NaturalsPage.jsx) |
| `useSearchParams()` | Hook đọc query string trên URL (như `?id=3` trong `/detail?id=3`) | [`DetailPage.jsx`](./src/pages/DetailPage.jsx) |
| Lọc dữ liệu theo route (`isNatural`) | Dùng `Array.filter()` hiển thị riêng các loài lan tự nhiên ở `/naturals` | [`NaturalsPage.jsx`](./src/pages/NaturalsPage.jsx) |
| `Formik` + `Yup` Contact Form | Quản lý và kiểm tra hợp lệ biểu mẫu liên hệ ở route `/contact` | [`ContactPage.jsx`](./src/pages/ContactPage.jsx), [`contactSchema.js`](./src/validation/contactSchema.js) |

---

## Giải thích luồng hoạt động từng bước

### Bước 1: Bọc ứng dụng trong `BrowserRouter` (`src/main.jsx`)

```jsx
<BrowserRouter basename={import.meta.env.BASE_URL}>
  <AuthProvider>
    <App />
  </AuthProvider>
</BrowserRouter>
```

- `BrowserRouter` lắng nghe sự thay đổi của URL trên trình duyệt.
- `basename={import.meta.env.BASE_URL}` giúp ứng dụng chạy đúng ở cả máy cá nhân (`/`) lẫn khi triển khai trong thư mục con trên GitHub Pages (`/fer202-react-labs/lab5/`).

### Bước 2: Định nghĩa 4 Route theo yêu cầu đề bài (`src/App.jsx`)

```jsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/naturals" element={<NaturalsPage />} />
  <Route path="/detail" element={<DetailPage />} />
  <Route path="/detail/:id" element={<DetailPage />} />
  <Route path="/contact" element={<ContactPage />} />
</Routes>
```

- `AppNavbar` đặt phía trên `<Routes>` nên luôn giữ nguyên khi chuyển trang.
- Khi URL đổi sang `/naturals`, chỉ phần bên trong `<Routes>` đổi từ `<HomePage />` sang `<NaturalsPage />`.

### Bước 3: Truyền và đọc tham số URL ở trang Detail (`src/components/OrchidCard.jsx` & `src/pages/DetailPage.jsx`)

1. Trên mỗi thẻ hoa lan (`OrchidCard.jsx`), nút **Detail** là một `<Link to={`/detail/${orchid.id}`}>`.
2. Khi bấm vào thẻ có `id = 3`, URL đổi thành `/detail/3`.
3. Trong `DetailPage.jsx`, hook `useParams()` đọc `{ id: '3' }`, sau đó tìm đúng loài lan trong mảng `orchids` bằng `orchids.find(...)` để hiển thị ảnh lớn, xuất xứ, màu sắc, phân loại và mô tả chi tiết.

### Bước 4: Lọc hoa lan tự nhiên ở `/naturals` (`src/pages/NaturalsPage.jsx`)

Trong `ListOfOrchids.js`, mỗi loài lan có thuộc tính boolean `isNatural` (`true` nếu là loài tự nhiên, `false` nếu là giống lai). Khi người dùng bấm nút **Natural** trên thanh điều hướng để tới `/naturals`, `NaturalsPage` lọc danh sách bằng:

```js
const naturalOrchids = orchids.filter((orchid) => orchid.isNatural);
```

### Bước 5: Biểu mẫu liên hệ với `Formik` và `Yup` (`src/pages/ContactPage.jsx`)

Tại route `/contact`, biểu mẫu sử dụng `<Formik>`, `<Form>`, `<Field>`, `<ErrorMessage>` kết hợp với `contactValidationSchema` của `Yup` để kiểm tra:
- `name` (bắt buộc, tối thiểu 2 ký tự)
- `email` (bắt buộc, đúng định dạng email)
- `phone` (bắt buộc, khớp 10–11 chữ số bắt đầu bằng `0`)
- `topic` (bắt buộc chọn chủ đề trong `<Field as="select">`)
- `message` (bắt buộc, tối thiểu 10 ký tự trong `<Field as="textarea">`)
- `agree` (bắt buộc tick đồng ý chính sách bảo mật)

---

## Chạy dự án & kiểm thử

```bash
# Từ thư mục gốc fer202-react-labs:
npm run dev:lab5
npm test --workspace=@fer202/lab5
```
