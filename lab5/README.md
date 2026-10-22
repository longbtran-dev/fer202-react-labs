# Lab 5 — React Router, Formik & Yup (Orchid Atlas)

Lab 5 mở rộng ứng dụng **Orchid Atlas** từ Lab 1–3 thành một Single-Page Application (SPA) đa trang bằng **`React Router`** và trang liên hệ dùng **`Formik` + `Yup`**.

---

## 1. Đáp ứng yêu cầu đề bài Lab 05

| Yêu cầu đề bài | Nơi cài đặt trong source code |
|---|---|
| Thiết kế lại các component theo các route: `Index` (`/`), `Detail` (`/detail`, `/detail/:id`), `Natural` (`/naturals`), `Contact` (`/contact`) | `src/App.jsx` và `src/components/AppNavbar.jsx` |
| Tạo component `Natural` chỉ hiển thị các loài lan tự nhiên (`isNatural === true`) khi bấm nút `Natural` qua URL | `src/pages/NaturalsPage.jsx` và `src/data/ListOfOrchids.js` |
| Tạo component `Detail` hiển thị thông tin chi tiết của một loài lan khi bấm nút `Detail` qua tham số URL (`/detail/:id` hoặc `/detail?id=...`) | `src/pages/DetailPage.jsx` và `src/components/OrchidCard.jsx` |
| Tạo component `Contact` và xây dựng Contact Form có kiểm tra hợp lệ bằng `Formik` và `Yup` | `src/pages/ContactPage.jsx` và `src/validation/contactSchema.js` |
| Kế thừa `AuthContext`, đăng nhập mẫu `Aaron` và Dark/Light Theme từ Lab 3 | `src/context/AuthProvider.jsx` và `src/hooks/useAuth.js` |

---

## 2. Cấu trúc thư mục

```text
lab5/
├── public/
│   └── orchid-placeholder.svg
├── src/
│   ├── components/
│   │   ├── AppNavbar.jsx            # Thanh điều hướng NavLink + Auth/Theme
│   │   ├── OrchidCard.jsx           # Thẻ hoa lan có Link dẫn tới /detail/:id
│   │   └── OrchidsPresentation.jsx  # Lưới hiển thị danh sách hoa lan
│   ├── context/
│   │   ├── AuthContext.js
│   │   └── AuthProvider.jsx         # Lưu user/theme trong localStorage
│   ├── data/
│   │   └── ListOfOrchids.js         # 16 loài lan có thêm isNatural & description
│   ├── hooks/
│   │   └── useAuth.js
│   ├── pages/
│   │   ├── ContactPage.jsx          # Route /contact (Formik + Yup)
│   │   ├── DetailPage.jsx           # Route /detail/:id và /detail?id=
│   │   ├── HomePage.jsx             # Route / (Index)
│   │   └── NaturalsPage.jsx         # Route /naturals (lọc isNatural === true)
│   ├── validation/
│   │   └── contactSchema.js         # Yup validation schema cho Contact Form
│   ├── test/
│   │   └── setup.js
│   ├── App.jsx                      # Định nghĩa <Routes> và <Route>
│   ├── App.test.jsx                 # Test tự động cho Router và Contact Form
│   ├── main.jsx                     # BrowserRouter với basename động
│   └── styles.css
├── index.html
├── package.json
└── vite.config.js
```

---

## 3. Chạy dự án & kiểm thử

```bash
# Từ thư mục gốc fer202-react-labs:
npm run dev:lab5
npm test --workspace=@fer202/lab5
```
