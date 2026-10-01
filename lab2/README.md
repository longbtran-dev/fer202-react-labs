# Lab 2 — React Hook: useState

## Mục tiêu

Lab 2 kế thừa gallery 16 orchids của Lab 1 và bổ sung tương tác: người dùng bấm **View details** để mở modal chứa thông tin đầy đủ của orchid được chọn.

Trọng tâm không phải modal, mà là cách React lưu một giá trị thay đổi theo thao tác người dùng bằng `useState` và re-render giao diện dựa trên state đó.

## Yêu cầu đề bài đã đáp ứng

- Tiếp tục sử dụng dữ liệu và cấu trúc component từ Lab 1.
- Dữ liệu vẫn nằm trong `ListOfOrchids.js`.
- Mỗi orchid có nút xem chi tiết.
- Dùng State Hook để lưu orchid được chọn.
- Dùng React Bootstrap Modal.
- Modal hiển thị ảnh, tên, origin, category, color, rating và special status.
- Đóng modal bằng nút close trên header hoặc nút cuối modal.
- Giao diện responsive và có keyboard focus rõ ràng.

## Kiến thức được vận dụng

### 1. `useState`

```jsx
const [selectedOrchid, setSelectedOrchid] = useState(null);
```

- `selectedOrchid`: giá trị state hiện tại.
- `setSelectedOrchid`: hàm cập nhật state.
- `null`: chưa chọn orchid, vì vậy modal đóng.
- Một object orchid: đã chọn dữ liệu, vì vậy modal mở.

State nằm trong `OrchidsContainer` vì component này quản lý cả danh sách lẫn modal. Đây là component cha gần nhất cần biết orchid nào đang được chọn.

### 2. Event callback từ component con lên component cha

`OrchidCard` không tự sở hữu modal. Nó gọi callback được truyền qua props:

```jsx
<button onClick={() => onViewDetails(orchid)}>
  View details
</button>
```

Callback đi theo chiều props từ cha xuống, còn dữ liệu sự kiện đi từ con lên khi function được gọi.

### 3. State lifting

Card và modal là hai component ngang hàng. Muốn card A điều khiển modal B, state phải được đưa lên component cha chung là `OrchidsContainer`:

```jsx
<OrchidsPresentation
  orchids={orchids}
  onViewDetails={setSelectedOrchid}
/>
<OrchidModal
  orchid={selectedOrchid}
  onClose={() => setSelectedOrchid(null)}
/>
```

### 4. Derived UI thay vì state trùng lặp

Modal dùng:

```jsx
<Modal show={Boolean(orchid)} onHide={onClose}>
```

Không cần thêm `const [show, setShow] = useState(false)`. Trạng thái mở/đóng đã suy ra được từ `selectedOrchid`:

- Có object → mở.
- `null` → đóng.

Nếu lưu cả `show` và `selectedOrchid`, hai state có thể lệch nhau, ví dụ modal mở nhưng không có dữ liệu.

### 5. React Bootstrap

`Modal`, `Button`, `Badge` cung cấp hành vi modal chuẩn như focus management, backdrop, ESC và semantic dialog. CSS riêng chỉ thay đổi visual cho phù hợp chủ đề botanical.

## Luồng hoạt động

```text
Người dùng bấm View details
        ↓
OrchidCard gọi onViewDetails(orchid)
        ↓
OrchidsContainer gọi setSelectedOrchid(orchid)
        ↓
React re-render với selectedOrchid mới
        ↓
OrchidModal nhận object và show=true
        ↓
Người dùng đóng modal
        ↓
setSelectedOrchid(null) → show=false
```

## Cấu trúc file

| File | Vai trò |
|---|---|
| `src/components/OrchidsContainer.jsx` | Giữ `selectedOrchid` và nối list với modal |
| `src/components/OrchidsPresentation.jsx` | Truyền callback đến từng card |
| `src/components/OrchidCard.jsx` | Phát sự kiện khi bấm nút chi tiết |
| `src/components/OrchidModal.jsx` | Hiển thị orchid đang được chọn |
| `src/data/ListOfOrchids.js` | Dữ liệu 16 orchids |
| `src/App.test.jsx` | Mô phỏng người dùng mở và đóng modal |
| `src/main.jsx` | Import Bootstrap CSS và render app |

Các file còn lại giữ vai trò tương tự Lab 1.

## Test đang kiểm tra gì?

Test không kiểm tra implementation như tên biến state. Nó thao tác như người dùng:

1. Tìm nút `View details for Taichung Beauty`.
2. Click nút.
3. Kiểm tra dialog có heading và category đúng.
4. Click nút đóng.
5. Kiểm tra dialog biến mất.

Điều này cho phép refactor code bên trong mà test vẫn hợp lệ nếu hành vi không đổi.

## Chạy Lab 2

Từ root:

```bash
npm install
npm run dev:lab2
```

Từ thư mục `lab2`:

```bash
npm run dev
npm test
npm run build
```

## Lỗi thường gặp

- Gọi `onClick={onViewDetails(orchid)}` khiến function chạy ngay khi render. Phải truyền function: `onClick={() => onViewDetails(orchid)}`.
- Tạo một modal cho mỗi card, làm DOM nặng và state khó quản lý.
- Lưu cả `show` lẫn `selectedOrchid` dù `show` có thể suy ra từ dữ liệu.
- Đặt state trong `OrchidCard`, khiến modal bên ngoài không truy cập được orchid đã chọn.
- Sửa trực tiếp state thay vì gọi setter.

## Câu hỏi tự ôn tập

1. Vì sao `selectedOrchid` nên đặt ở `OrchidsContainer`?
2. Khi gọi `setSelectedOrchid`, React làm gì tiếp theo?
3. Vì sao `Boolean(selectedOrchid)` tốt hơn một state `show` riêng trong bài này?
4. Callback truyền qua props khác dữ liệu props thông thường như thế nào?

## Gợi ý mở rộng

Thử thêm nút **Previous/Next** trong modal. Bạn sẽ cần tìm index của orchid hiện tại và cập nhật `selectedOrchid` sang phần tử bên cạnh.
