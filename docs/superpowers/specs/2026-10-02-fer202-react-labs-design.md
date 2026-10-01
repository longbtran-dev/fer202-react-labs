# FER202 React Labs 1–3 Design

## Mục tiêu

Xây dựng ba ứng dụng React độc lập tương ứng Lab 1, Lab 2 và Lab 3 của môn FER202. Mỗi ứng dụng nằm trong một thư mục riêng, chạy độc lập, có tài liệu tiếng Việt giải thích yêu cầu và kiến thức được áp dụng. Toàn bộ được triển khai trên một GitHub Pages chung với các đường dẫn `/lab1/`, `/lab2/` và `/lab3/`.

## Phạm vi

### Lab 1 — React Components

- Hiển thị đúng 16 loài lan.
- Mỗi phần tử có `id`, `name`, `rating`, `isSpecial`, `image`, `color`, `origin` và `category`.
- Dữ liệu đặt trong `src/data/ListOfOrchids.js`.
- Dùng `Array.map()` để render danh sách.
- Tách container component chịu trách nhiệm lấy dữ liệu và presentation component chịu trách nhiệm hiển thị.
- Giao diện responsive, dễ đọc và có trạng thái nổi bật cho orchid đặc biệt.

### Lab 2 — React Hook: useState

- Kế thừa toàn bộ chức năng và dữ liệu của Lab 1.
- Mỗi thẻ orchid có nút xem chi tiết.
- Dùng `useState` để lưu orchid đang được chọn và trạng thái modal.
- Dùng React Bootstrap Modal để hiển thị đầy đủ thông tin orchid.
- Modal đóng được bằng nút đóng, nút hành động và thao tác chuẩn của component.

### Lab 3 — Context, Effect và Custom Hook

- Kế thừa danh sách và modal từ Lab 2.
- Tạo `AuthContext`, `AuthProvider` và custom hook `useAuth`.
- Cho phép đăng nhập giả bằng tài khoản mẫu `Aaron` và đăng xuất.
- Navbar thay đổi theo trạng thái đăng nhập: hiển thị lời mời đăng nhập hoặc `Welcome, Aaron` cùng nút Logout.
- Tạo dark/light theme áp dụng cho toàn ứng dụng.
- Dùng `useEffect` để đồng bộ user và theme với `localStorage`.
- Khôi phục user và theme sau khi tải lại trang.

## Kiến trúc repository

```text
fer202-react-labs/
├── .github/workflows/deploy.yml
├── lab1/
│   ├── src/
│   ├── README.md
│   ├── package.json
│   └── vite.config.js
├── lab2/
│   ├── src/
│   ├── README.md
│   ├── package.json
│   └── vite.config.js
├── lab3/
│   ├── src/
│   ├── README.md
│   ├── package.json
│   └── vite.config.js
├── site/
│   └── index.html
├── scripts/
│   └── build-all.mjs
├── package.json
└── README.md
```

Mỗi lab là một Vite project độc lập để người học có thể mở riêng thư mục và chạy đúng bài. Root project chỉ điều phối cài đặt, kiểm thử và build cả ba ứng dụng. Script build tổng hợp kết quả vào một thư mục deploy duy nhất; trang `site/index.html` là trang chủ liên kết đến ba lab.

## Thiết kế giao diện

Ngôn ngữ hình ảnh lấy cảm hứng từ vườn thực vật: nền sáng dịu, xanh lá đậm, điểm nhấn hồng hoa lan và typography rõ ràng. Giao diện ưu tiên việc học hơn hiệu ứng trang trí.

- Card dùng ảnh tỷ lệ thống nhất, tiêu đề rõ, metadata ngắn gọn.
- Grid tự co từ bốn cột xuống một cột theo kích thước màn hình.
- Nút và modal có trạng thái focus rõ để sử dụng bằng bàn phím.
- Ảnh có `alt` mô tả tên orchid.
- Dark mode giữ độ tương phản dễ đọc và không chỉ đảo màu máy móc.
- Chuyển động ngắn, tôn trọng `prefers-reduced-motion`.

## Dữ liệu orchid

Mỗi lab giữ một bản `ListOfOrchids.js` riêng để thực sự độc lập. Ba bản dùng cùng schema và cùng 16 bản ghi để người học dễ so sánh sự phát triển từ lab trước sang lab sau.

```js
{
  id: 1,
  name: 'Taichung Beauty',
  rating: 5,
  isSpecial: true,
  image: 'https://...',
  color: 'Pink',
  origin: 'Taiwan',
  category: 'Cattleya'
}
```

Ảnh sử dụng URL HTTPS ổn định từ nguồn ảnh công khai. Component có fallback trực quan khi ảnh tải lỗi để một URL hỏng không phá bố cục.

## Thành phần và luồng dữ liệu

### Lab 1

`App` render phần giới thiệu và `OrchidsContainer`. Container import danh sách rồi truyền qua prop `orchids` cho `OrchidsPresentation`. Presentation dùng `map()` để render `OrchidCard`; không tự đọc dữ liệu toàn cục và không giữ business state.

### Lab 2

`OrchidsContainer` giữ `selectedOrchid` bằng `useState`. Presentation phát sự kiện `onViewDetails(orchid)`. Container cập nhật state và truyền orchid đã chọn vào `OrchidModal`. Đóng modal đặt `selectedOrchid` về `null`, vì vậy không cần state `show` thứ hai.

### Lab 3

`AuthProvider` là nguồn duy nhất của trạng thái user và theme. Provider đọc giá trị ban đầu an toàn từ `localStorage`, cung cấp `user`, `login`, `logout`, `theme` và `toggleTheme`. Hai effect độc lập đồng bộ user và theme. `useAuth` kiểm tra context và báo lỗi rõ nếu được gọi ngoài provider. Navbar và nội dung ứng dụng chỉ tiêu thụ API context, không thao tác trực tiếp với storage.

## Xử lý lỗi và biên

- Parser `localStorage` bắt lỗi JSON và quay về trạng thái đăng xuất thay vì làm ứng dụng crash.
- Logout xóa khóa user khỏi storage; không lưu chuỗi `null`.
- Theme chỉ chấp nhận `light` hoặc `dark`; giá trị khác quay về theme sáng.
- Nút chi tiết chỉ mở modal khi có orchid hợp lệ.
- Ảnh hỏng được thay bằng placeholder CSS/ảnh data URI có nhãn rõ.
- Các thao tác đăng nhập của Lab 3 chỉ là mô phỏng học tập, không được mô tả như hệ thống xác thực thật.

## Kiểm thử

Kiểm thử tập trung vào hành vi học thuật cốt lõi:

- Lab 1 render đủ 16 orchid và thể hiện container/presentation qua props.
- Lab 2 mở đúng thông tin orchid và đóng modal bằng tương tác người dùng.
- Lab 3 đăng nhập/đăng xuất qua context, đổi theme, ghi storage và phục hồi state sau khi render lại.
- Mỗi app phải build production thành công.
- Trang deploy được kiểm tra các đường dẫn `/`, `/lab1/`, `/lab2/`, `/lab3/` và hiển thị responsive ở desktop/mobile.

## Tài liệu học tập

Root `README.md` giải thích tổng quan, liên kết demo, ma trận kiến thức giữa ba lab và cách chạy toàn repository. Mỗi `labN/README.md` gồm:

1. Lab làm gì.
2. Yêu cầu đề bài đã đáp ứng.
3. Kiến thức React được vận dụng.
4. Luồng dữ liệu/state bằng mô tả từng bước.
5. Cấu trúc file và vai trò từng file.
6. Các đoạn code trọng tâm có giải thích.
7. Cách cài đặt, chạy, test và build.
8. Câu hỏi tự ôn tập và gợi ý mở rộng.

## Triển khai

GitHub Actions chạy khi push lên `main`:

1. Cài dependencies từ lockfile.
2. Chạy test cho ba lab.
3. Build từng lab với base path tương ứng.
4. Ghép trang chủ và ba thư mục build vào artifact Pages.
5. Deploy bằng action chính thức của GitHub Pages.

URL mục tiêu:

- Trang chủ: `https://longbtran-dev.github.io/fer202-react-labs/`
- Lab 1: `https://longbtran-dev.github.io/fer202-react-labs/lab1/`
- Lab 2: `https://longbtran-dev.github.io/fer202-react-labs/lab2/`
- Lab 3: `https://longbtran-dev.github.io/fer202-react-labs/lab3/`

## Giới hạn có chủ đích

- Không có backend, database hoặc xác thực thật vì đề chỉ yêu cầu fake user.
- Không thêm router; mỗi lab là một static app ở một thư mục deploy riêng.
- Không tạo shared package giữa các lab để giữ khả năng học và chạy độc lập.
- Không thêm state library vì Context và hooks là trọng tâm của Lab 3.
- Không tải ảnh về repository trừ khi URL bên ngoài không ổn định trong quá trình kiểm tra.
