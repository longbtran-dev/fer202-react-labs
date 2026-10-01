# Lab 1 — React Components

## Mục tiêu

Lab 1 xây dựng một gallery gồm **16 orchids**. Dữ liệu không viết trực tiếp trong JSX mà nằm ở `src/data/ListOfOrchids.js`, sau đó được truyền qua props và render bằng `map()`.

Kết quả cần đạt: hiểu cách chia giao diện thành các component nhỏ, xác định component nào giữ dữ liệu và component nào chỉ chịu trách nhiệm trình bày.

## Yêu cầu đề bài đã đáp ứng

- Tạo component hiển thị danh sách orchids.
- Có đúng 16 phần tử.
- Mỗi orchid có `id`, `image`, `name`, `origin`, `color`, `isSpecial`, `rating`, `category`.
- Dữ liệu nằm trong `ListOfOrchids.js`.
- Dùng `map()` để lặp dữ liệu.
- Tách Container component và Presentation component.
- Ảnh dùng URL, có ảnh fallback nếu URL lỗi.
- Giao diện responsive và đánh dấu orchid đặc biệt.

## Kiến thức được vận dụng

### 1. Functional component

Mỗi phần giao diện là một JavaScript function trả về JSX. Component nhỏ dễ đọc, tái sử dụng và kiểm thử hơn một `App.jsx` chứa toàn bộ trang.

### 2. Props và luồng dữ liệu một chiều

`OrchidsContainer` truyền mảng `orchids` xuống `OrchidsPresentation`:

```jsx
export default function OrchidsContainer() {
  return <OrchidsPresentation orchids={orchids} />;
}
```

Component con nhận dữ liệu qua props nhưng không sửa trực tiếp dữ liệu của component cha. Đây là **one-way data flow** của React.

### 3. Render danh sách bằng `map()`

```jsx
{orchids.map((orchid) => (
  <OrchidCard key={orchid.id} orchid={orchid} />
))}
```

`map()` biến mỗi object thành một component. `key={orchid.id}` giúp React nhận biết phần tử nào được giữ lại, thêm hoặc xóa khi danh sách thay đổi.

### 4. Container và Presentation

- **Container:** biết dữ liệu đến từ đâu và truyền dữ liệu xuống.
- **Presentation:** nhận props và quyết định cách hiển thị.
- **Card:** chỉ hiển thị một orchid.

Cách tách này làm rõ trách nhiệm và là nền tảng để Lab 2 thêm state mà không phải viết lại toàn bộ UI.

### 5. Conditional rendering

Badge chỉ xuất hiện khi `isSpecial` là `true`:

```jsx
{orchid.isSpecial && (
  <span className="orchid-card__badge">Special collection</span>
)}
```

## Luồng hoạt động

```text
App
└── OrchidsContainer
    ├── import orchids từ ListOfOrchids.js
    └── OrchidsPresentation nhận prop orchids
        └── map() tạo 16 OrchidCard
            └── OrchidCard hiển thị thông tin một orchid
```

Không component nào dùng state trong lab này. Khi React render `App`, dữ liệu đi xuống qua props cho tới từng card.

## Cấu trúc file

| File | Vai trò |
|---|---|
| `src/main.jsx` | Tạo React root và render `App` |
| `src/App.jsx` | Bố cục hero, gallery và footer |
| `src/data/ListOfOrchids.js` | Chứa 16 object orchid |
| `src/components/OrchidsContainer.jsx` | Import và cung cấp dữ liệu |
| `src/components/OrchidsPresentation.jsx` | Dùng `map()` để tạo danh sách |
| `src/components/OrchidCard.jsx` | Trình bày một orchid và xử lý ảnh lỗi |
| `src/App.test.jsx` | Kiểm tra đủ 16 cards và dữ liệu tiêu biểu |
| `src/styles.css` | Responsive layout và visual system |
| `public/orchid-placeholder.svg` | Ảnh thay thế khi URL bên ngoài lỗi |

## Chạy Lab 1

Từ thư mục repository:

```bash
npm install
npm run dev:lab1
```

Hoặc từ thư mục `lab1`:

```bash
npm run dev
npm test
npm run build
```

## Lỗi thường gặp

- Quên `return` bên trong callback của `map()` khi dùng `{}`.
- Dùng index của mảng làm `key` dù dữ liệu đã có `id` ổn định.
- Import dữ liệu trực tiếp trong mọi card, làm presentation component bị phụ thuộc nguồn dữ liệu.
- Viết điều kiện `isSpecial` bằng chuỗi `'true'` thay vì boolean `true`.

## Câu hỏi tự ôn tập

1. Vì sao React cần prop `key` khi render danh sách?
2. Vì sao `OrchidsPresentation` nhận dữ liệu qua props thay vì tự import `ListOfOrchids.js`?
3. Khi nào nên tách một phần JSX thành component như `OrchidCard`?
4. Nếu thêm orchid thứ 17 vào file dữ liệu, cần sửa bao nhiêu component?

## Gợi ý mở rộng

Thử thêm bộ lọc theo `category` hoặc `origin`. Khi bắt đầu có dữ liệu thay đổi theo thao tác người dùng, đó là lúc cần state—chủ đề của Lab 2.
