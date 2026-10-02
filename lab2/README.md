# Lab 2 — React Hook: useState

## Mục tiêu

Lab 2 kế thừa gallery 16 orchids của Lab 1 và bổ sung tương tác: người dùng bấm **View details** để mở modal chứa thông tin đầy đủ của orchid được chọn.

Trọng tâm không phải modal, mà là cách React lưu một giá trị thay đổi theo thao tác người dùng bằng `useState` và re-render giao diện dựa trên state đó.

## Cần biết trước khi học

- Hoàn thành hoặc hiểu các nội dung của Lab 1: component, props, `map()` và `key`.
- Biết function có thể được truyền như một giá trị.
- Phân biệt **truyền function** (`onClick={handleClick}`) với **gọi function ngay** (`onClick={handleClick()}`).
- Hiểu object `orchid` chứa các thuộc tính như `name`, `origin`, `rating`.

## Bản đồ kiến thức

| Kiến thức | Hiểu đơn giản | Nơi sử dụng |
|---|---|---|
| State | Bộ nhớ của component, dùng cho dữ liệu có thể thay đổi | `selectedOrchid` |
| `useState` | Hook tạo một state và function cập nhật state | `OrchidsContainer.jsx` |
| Event handler | Function chạy khi người dùng thao tác | `onClick`, `onHide` |
| Callback prop | Function cha truyền xuống để con báo sự kiện ngược lên | `onViewDetails`, `onClose` |
| Lifting state up | Đưa state lên component cha chung gần nhất | `OrchidsContainer` |
| Re-render | React gọi lại component để tính UI từ state mới | Sau `setSelectedOrchid(...)` |
| Derived UI | Suy ra giao diện trực tiếp từ state đang có | `show={Boolean(orchid)}` |
| Fragment | Nhóm nhiều element mà không tạo thẻ DOM thừa | `<>...</>` |
| Thư viện component | Dùng component có sẵn thay vì tự xây modal | React Bootstrap |

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

## Đọc code theo thứ tự thực thi

### Bước 1: `main.jsx` nạp CSS của Bootstrap

```jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import './styles.css';
```

- Bootstrap CSS cung cấp style nền cho `Modal`, `Button` và `Badge`.
- `styles.css` được import sau nên có thể tùy chỉnh giao diện mặc định của Bootstrap.
- Phần tạo root và render `<App />` giống Lab 1.

### Bước 2: `OrchidsContainer` tạo state

```jsx
const [selectedOrchid, setSelectedOrchid] = useState(null);
```

Có thể đọc dòng này thành: “Tạo một ô nhớ tên `selectedOrchid`, giá trị ban đầu là `null`, và cho tôi function `setSelectedOrchid` để cập nhật ô nhớ đó.”

| Thành phần | Vai trò |
|---|---|
| `selectedOrchid` | Giá trị đang được lưu ở lần render hiện tại |
| `setSelectedOrchid` | Yêu cầu React cập nhật state và render lại |
| `null` | Chưa chọn orchid nào |
| Object orchid | Đã chọn một orchid để modal hiển thị |

Không gán trực tiếp như sau:

```jsx
selectedOrchid = orchid; // Sai
```

React không theo dõi phép gán này. Phải gọi setter:

```jsx
setSelectedOrchid(orchid); // Đúng
```

Setter lên lịch cập nhật state. Biến `selectedOrchid` trong function đang chạy không đổi ngay lập tức; React gọi lại component ở lần render tiếp theo và cung cấp giá trị mới.

### Bước 3: Container nối danh sách với modal

```jsx
return (
  <>
    <OrchidsPresentation
      orchids={orchids}
      onViewDetails={setSelectedOrchid}
    />
    <OrchidModal
      orchid={selectedOrchid}
      onClose={() => setSelectedOrchid(null)}
    />
  </>
);
```

`<>...</>` là Fragment. Nó cho phép trả về hai component cùng cấp mà không tạo thêm một thẻ `<div>` trong DOM.

Container truyền:

- Mảng `orchids` và callback `setSelectedOrchid` về phía danh sách.
- Giá trị `selectedOrchid` và callback đóng về phía modal.

Hai component con không gọi trực tiếp lẫn nhau. Chúng giao tiếp thông qua state do component cha quản lý.

### Bước 4: Callback đi qua presentation tới từng card

```jsx
export default function OrchidsPresentation({ orchids, onViewDetails }) {
  return orchids.map((orchid) => (
    <OrchidCard
      key={orchid.id}
      orchid={orchid}
      onViewDetails={onViewDetails}
    />
  ));
}
```

`OrchidsPresentation` không cần biết callback sẽ mở modal hay làm việc gì khác. Nó chỉ chuyển function xuống card. Cách này giữ component trình bày ít phụ thuộc logic của component cha.

### Bước 5: Click card gửi object lên component cha

```jsx
<button onClick={() => onViewDetails(orchid)}>
  View details
</button>
```

Điểm quan trọng là `onClick` nhận **một function chưa chạy**:

```jsx
onClick={() => onViewDetails(orchid)} // Đúng: chạy khi click
onClick={onViewDetails(orchid)}       // Sai: chạy ngay lúc render
```

Arrow function tạo một function nhỏ. Chỉ khi người dùng click, function đó mới gọi `onViewDetails(orchid)` và gửi đúng object của card hiện tại lên container.

Tên `onViewDetails` chỉ là tên prop do dự án đặt. Quy ước `on...` giúp người đọc nhận ra đây là callback sự kiện.

### Bước 6: State đổi làm React render lại

Khi card đầu tiên được click, lời gọi thực tế tương đương:

```jsx
setSelectedOrchid({
  id: 1,
  name: 'Taichung Beauty',
  // ...các thuộc tính khác
});
```

Sau đó React:

1. Lưu object mới vào state.
2. Gọi lại `OrchidsContainer`.
3. `selectedOrchid` ở lần render mới là object vừa chọn.
4. Truyền object đó xuống `OrchidModal`.
5. So sánh cây UI mới với cây cũ và cập nhật phần DOM cần thiết.

React không tải lại toàn bộ trang. Đây là cập nhật giao diện dựa trên state.

### Bước 7: Modal suy ra trạng thái mở/đóng

```jsx
<Modal
  show={Boolean(orchid)}
  onHide={onClose}
  centered
  animation={false}
>
```

`Boolean(...)` đổi một giá trị thành `true` hoặc `false`:

```js
Boolean(null);         // false
Boolean({ name: 'A' }); // true
```

Vì thế:

- `orchid === null` → `show={false}` → modal đóng.
- `orchid` là object → `show={true}` → modal mở.

`onHide={onClose}` cho React Bootstrap biết cần gọi callback nào khi người dùng bấm dấu X, nhấn ESC hoặc đóng qua backdrop theo hành vi của thư viện.

### Bước 8: Chỉ đọc thuộc tính khi object tồn tại

```jsx
{orchid && (
  <>
    <img src={orchid.image} alt={`${orchid.name} orchid detail`} />
    <Modal.Title>{orchid.name}</Modal.Title>
  </>
)}
```

Lần render đầu tiên, `orchid` là `null`. Nếu code đọc `orchid.name` ngay, JavaScript báo lỗi vì `null` không có thuộc tính `name`. Điều kiện `orchid && ...` bảo đảm nội dung chỉ được tính khi object tồn tại.

### Bước 9: Đóng modal bằng cách xóa lựa chọn

```jsx
onClose={() => setSelectedOrchid(null)}
```

Khi callback chạy, state trở về `null`. React render lại, `Boolean(orchid)` thành `false`, nên modal đóng. Không cần một state `showModal` riêng.

## Vì sao state đặt ở `OrchidsContainer`?

Hãy xét những component cần dữ liệu:

```text
OrchidsContainer
├── OrchidsPresentation
│   └── OrchidCard cần gửi orchid được click
└── OrchidModal cần nhận orchid được chọn
```

Card và modal là hai nhánh khác nhau. `OrchidsContainer` là tổ tiên chung gần nhất của chúng, nên đây là nơi nhỏ nhất có thể:

1. Nhận sự kiện từ card.
2. Lưu orchid được chọn.
3. Truyền orchid đó cho modal.

Đó chính là **lifting state up**. Không phải state nào cũng đặt ở `App`; chỉ đưa state lên đủ cao để các component cần nó có thể phối hợp.

## State và biến thường khác nhau thế nào?

```jsx
let selectedOrchid = null;
```

Biến thường có thể bị tạo lại khi component được gọi và việc đổi biến không báo cho React render lại. `useState` vừa giữ giá trị giữa các lần render vừa cung cấp setter để kích hoạt quy trình cập nhật UI.

Quy tắc đơn giản:

- Dữ liệu cố định hoặc tính được ngay trong render → dùng biến/`const`.
- Dữ liệu thay đổi theo thời gian và cần làm UI cập nhật → thường dùng state.

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

## Câu hỏi lý thuyết và câu trả lời

Nên tự trả lời trước, sau đó đọc phần **Trả lời** để kiểm tra cách hiểu.

### Mức 1 — Nhận biết

1. State trong React là gì?

   **Trả lời:** State là dữ liệu được component ghi nhớ giữa các lần render. Khi state được cập nhật bằng setter, React render lại để giao diện phản ánh giá trị mới.

2. `useState(null)` trả về những gì?

   **Trả lời:** Nó trả về một mảng gồm giá trị state hiện tại và function cập nhật state. Destructuring biến mảng đó thành `selectedOrchid` và `setSelectedOrchid`.

3. Vì sao giá trị ban đầu của `selectedOrchid` là `null`?

   **Trả lời:** Vì khi ứng dụng mới mở, người dùng chưa chọn orchid nào. `null` biểu diễn rõ trạng thái “không có lựa chọn”.

4. Setter như `setSelectedOrchid` dùng để làm gì?

   **Trả lời:** Setter yêu cầu React lưu giá trị state mới và lên lịch render lại component. Không nên thay state bằng phép gán trực tiếp.

5. Event handler là gì?

   **Trả lời:** Event handler là function được gọi khi một sự kiện xảy ra, ví dụ click nút, nhập bàn phím hoặc gửi form. Trong lab, arrow function của `onClick` là event handler.

### Mức 2 — Giải thích

6. Vì sao `selectedOrchid` nên đặt ở `OrchidsContainer`?

   **Trả lời:** Card cần cập nhật lựa chọn còn modal cần đọc lựa chọn. Container là component cha chung gần nhất của cả hai, nên nó có thể nối hai nhánh bằng một nguồn state duy nhất.

7. Callback truyền qua props giúp dữ liệu đi từ component con lên cha như thế nào?

   **Trả lời:** Cha truyền một function xuống con. Khi sự kiện xảy ra, con gọi function đó với dữ liệu cần gửi. Function vẫn cập nhật state thuộc cha, nên cha giữ quyền quản lý dữ liệu.

8. Vì sao viết `onClick={() => onViewDetails(orchid)}` thay vì `onClick={onViewDetails(orchid)}`?

   **Trả lời:** Cách đầu truyền một function để React gọi khi click. Cách sau gọi function ngay trong lúc render và gán kết quả trả về cho `onClick`.

9. “React re-render” có nghĩa là trình duyệt tải lại toàn bộ trang không?

   **Trả lời:** Không. React gọi lại các component liên quan để tạo mô tả UI mới, so sánh với mô tả cũ rồi chỉ cập nhật phần DOM cần thay đổi.

10. Vì sao `show={Boolean(orchid)}` hoạt động?

    **Trả lời:** `null` chuyển thành `false`, còn object orchid chuyển thành `true`. Vì vậy chính state dữ liệu quyết định modal đóng hay mở.

### Mức 3 — Vận dụng

11. Điều gì có thể xảy ra nếu lưu cả `selectedOrchid` và `showModal` thành hai state riêng?

    **Trả lời:** Hai state có thể mất đồng bộ, ví dụ `showModal` là `true` nhưng `selectedOrchid` vẫn là `null`. Khi một giá trị có thể suy ra từ giá trị khác, không nên lưu bản sao state.

12. Giả sử có nút Next hoặc code gọi setter để đổi từ orchid A sang orchid B khi modal đang mở, state và UI thay đổi thế nào?

    **Trả lời:** `setSelectedOrchid(B)` thay object A bằng B. Modal vẫn mở vì state vẫn là object, nhưng nội dung được render lại bằng dữ liệu của B.

13. Vì sao callback đóng modal đặt state thành `null` thay vì chỉ ẩn modal bằng CSS?

    **Trả lời:** `null` mô tả đúng trạng thái ứng dụng là không còn orchid được chọn. Chỉ ẩn CSS sẽ giữ dữ liệu lựa chọn cũ và tạo hai nguồn sự thật khác nhau.

14. Vì sao một biến `let selectedOrchid` không thay thế được `useState`?

    **Trả lời:** Biến thường không được React lưu ổn định qua các lần render và thay đổi của nó không kích hoạt render. State giải quyết cả hai việc đó.

15. Muốn thêm nút Previous/Next, state hiện tại có đủ không?

    **Trả lời:** Có. Từ `selectedOrchid`, tìm index của nó trong mảng rồi đặt state thành phần tử trước hoặc sau. Một phương án khác là lưu `selectedIndex`, nhưng không nên lưu đồng thời cả object và index nếu một giá trị suy ra được từ giá trị kia.

## Bài tập thực hành

1. Thêm nút **View details** cho một card mới và quan sát modal nhận đúng object mà không cần sửa modal.
2. Thêm nút **Next** trong modal để chuyển sang orchid kế tiếp.
3. Thêm bộ lọc category bằng một state mới và giải thích vì sao state đó thuộc container.
4. Tạm đổi `onClick` thành `onClick={onViewDetails(orchid)}`, quan sát lỗi/hành vi rồi sửa lại.
5. Thử tạo state `showModal`, sau đó liệt kê các trường hợp khiến nó lệch với `selectedOrchid`; cuối cùng xóa state dư thừa.

## Gợi ý mở rộng

Thử thêm nút **Previous/Next** trong modal. Bạn sẽ cần tìm index của orchid hiện tại và cập nhật `selectedOrchid` sang phần tử bên cạnh.
