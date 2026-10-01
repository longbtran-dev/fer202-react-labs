# FER202 React Labs 1–3

Bộ ba bài thực hành React được xây dựng từ đề FER202, tách thành ba ứng dụng độc lập và phát triển tăng dần từ **component → state → context/effect**. Mỗi lab có source code, test tự động và tài liệu tiếng Việt giải thích cách làm.

## Demo trực tuyến

| Trang | Đường dẫn |
|---|---|
| Cổng bài lab | https://longbtran-dev.github.io/fer202-react-labs/ |
| Lab 1 — React Components | https://longbtran-dev.github.io/fer202-react-labs/lab1/ |
| Lab 2 — useState | https://longbtran-dev.github.io/fer202-react-labs/lab2/ |
| Lab 3 — Context & Effect | https://longbtran-dev.github.io/fer202-react-labs/lab3/ |

## Ba lab học gì?

| Lab | Bài toán | Kiến thức chính |
|---|---|---|
| [Lab 1](./lab1/README.md) | Hiển thị 16 orchids từ file dữ liệu | Functional component, props, `map()`, `key`, container/presentation, conditional rendering |
| [Lab 2](./lab2/README.md) | Bấm một card để xem chi tiết trong modal | `useState`, event callback, state lifting, derived UI, React Bootstrap Modal |
| [Lab 3](./lab3/README.md) | Đăng nhập giả, đổi theme và ghi nhớ trạng thái | Context, Provider, `useContext`, custom hook, `useEffect`, lazy state, `localStorage` |

## Cấu trúc repository

```text
fer202-react-labs/
├── lab1/                 # Components, props và map()
├── lab2/                 # Lab 1 + useState + modal
├── lab3/                 # Lab 2 + Context + Effect + theme
├── site/                 # Portal tĩnh liên kết ba lab
├── scripts/build-all.mjs # Build một artifact cho GitHub Pages
├── .github/workflows/    # Test, build và deploy tự động
└── package.json          # npm workspaces
```

Mỗi thư mục `lab1`, `lab2`, `lab3` có `package.json`, `index.html`, source, test và README riêng nên có thể học hoặc chạy độc lập.

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
```

Hoặc vào trực tiếp một lab:

```bash
cd lab1
npm run dev
```

## Kiểm thử và build

```bash
npm test       # Chạy test của cả ba workspace
npm run build  # Build portal và ba lab vào dist/
```

Test tập trung vào yêu cầu cốt lõi của đề:

- Lab 1 render đủ 16 orchids.
- Lab 2 mở đúng orchid và đóng modal được.
- Lab 3 đăng nhập/đăng xuất, đổi theme và khôi phục dữ liệu từ `localStorage`.

## Triển khai

Mỗi lần push lên `main`, GitHub Actions thực hiện `npm ci`, chạy toàn bộ test, build ba Vite app với đúng base path rồi deploy thư mục `dist` lên GitHub Pages.

## Lưu ý về đăng nhập

Lab 3 chỉ mô phỏng authentication để luyện Context và Effect. User `Aaron` được hardcode; không có mật khẩu, backend, token hay cơ chế bảo mật thật. Không sử dụng mẫu này cho hệ thống production.

## Đặc tả kỹ thuật

- [Thiết kế đã duyệt](./docs/superpowers/specs/2026-10-02-fer202-react-labs-design.md)
- [Kế hoạch triển khai](./docs/superpowers/plans/2026-10-02-fer202-react-labs.md)
