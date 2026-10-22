# FER202 React Labs 1–5

Bộ năm bài thực hành React được xây dựng từ đề FER202, tách thành năm ứng dụng độc lập và phát triển tăng dần từ **component → state → context/effect → reducer + formik/yup → react router**. Mỗi lab có source code, test tự động, trang demo riêng trên GitHub Pages và tài liệu tiếng Việt giải thích cách làm.

## Demo trực tuyến

| Trang | Đường dẫn |
|---|---|
| Cổng bài lab | https://longbtran-dev.github.io/fer202-react-labs/ |
| Lab 1 — React Components | https://longbtran-dev.github.io/fer202-react-labs/lab1/ |
| Lab 2 — useState | https://longbtran-dev.github.io/fer202-react-labs/lab2/ |
| Lab 3 — Context & Effect | https://longbtran-dev.github.io/fer202-react-labs/lab3/ |
| Lab 4 — useReducer, Formik & Yup | https://longbtran-dev.github.io/fer202-react-labs/lab4/ |
| Lab 5 — React Router, Formik & Yup | https://longbtran-dev.github.io/fer202-react-labs/lab5/ |

## Năm lab học gì?

| Lab | Bài toán | Kiến thức chính |
|---|---|---|
| [Lab 1](./lab1/README.md) | Hiển thị 16 orchids từ file dữ liệu | Functional component, props, `map()`, `key`, container/presentation, conditional rendering |
| [Lab 2](./lab2/README.md) | Bấm một card để xem chi tiết trong modal | `useState`, event callback, state lifting, derived UI, React Bootstrap Modal |
| [Lab 3](./lab3/README.md) | Đăng nhập giả, đổi theme và ghi nhớ trạng thái | Context, Provider, `useContext`, custom hook, `useEffect`, lazy state, `localStorage` |
| [Lab 4](./lab4/README.md) | Giỏ hàng thương mại điện tử và biểu mẫu thanh toán | `useReducer`, pure reducer, `Formik`, `Yup` validation schema, Order Confirmation Summary |
| [Lab 5](./lab5/README.md) | Ứng dụng đa trang điều hướng qua URL và trang Contact | `React Router` (`Routes`, `Route`, `NavLink`, `useParams`), lọc `isNatural`, `Formik` & `Yup` Contact Form |

## Cấu trúc repository

```text
fer202-react-labs/
├── lab1/                 # Components, props và map()
├── lab2/                 # Lab 1 + useState + modal
├── lab3/                 # Lab 2 + Context + Effect + theme
├── lab4/                 # Giỏ hàng useReducer + Checkout Formik & Yup
├── lab5/                 # Lab 1–3 + React Router + Contact Formik & Yup
├── site/                 # Portal tĩnh liên kết năm lab
├── scripts/build-all.mjs # Build một artifact cho GitHub Pages
├── .github/workflows/    # Test, build và deploy tự động
└── package.json          # npm workspaces
```

Mỗi thư mục `lab1`–`lab5` có `package.json`, `index.html`, source, test và README riêng nên có thể học hoặc chạy độc lập.

## Chạy dự án

Yêu cầu: Node.js 20.19+, 22.12+ hoặc 24+ và npm.

```bash
git clone https://github.com/longbtran-dev/fer202-react-labs.git
cd fer202-react-labs
npm install
```

Chạy từng lab từ thư mục gốc:

```bash
npm run dev:lab1
npm run dev:lab2
npm run dev:lab3
npm run dev:lab4
npm run dev:lab5
```

## Kiểm thử và build

```bash
npm test       # Chạy test của cả năm workspace
npm run build  # Build portal và năm lab vào dist/
```

Test tập trung vào yêu cầu cốt lõi của đề:

- Lab 1 render đủ 16 orchids.
- Lab 2 mở đúng orchid và đóng modal được.
- Lab 3 đăng nhập/đăng xuất, đổi theme và khôi phục dữ liệu từ `localStorage`.
- Lab 4 quản lý giỏ hàng bằng `useReducer`, kiểm tra lỗi bằng `Yup`, khóa nút đặt hàng khi giỏ trống, hiển thị Order Confirmation Summary và xóa giỏ hàng sau khi đặt thành công.
- Lab 5 điều hướng giữa `/`, `/naturals`, `/detail/:id`, `/contact` bằng `React Router`, lọc hoa lan tự nhiên (`isNatural`) và kiểm tra hợp lệ Contact Form bằng `Formik` & `Yup`.
