# Lab 1 — React Components

## Mục tiêu

Lab 1 xây dựng một gallery gồm **16 orchids**. Dữ liệu không viết trực tiếp trong JSX mà nằm ở `src/data/ListOfOrchids.js`, sau đó được truyền qua props và render bằng `map()`.

Kết quả cần đạt: hiểu cách chia giao diện thành các component nhỏ, xác định component nào giữ dữ liệu và component nào chỉ chịu trách nhiệm trình bày.

## Cần biết trước khi học

- Object và array trong JavaScript.
- Arrow function: `(value) => value`.
- Destructuring: `const { name } = orchid`.
- `map()` để tạo mảng mới.
- Import/export giữa các file.

Nếu chưa chắc các kiến thức trên, bạn vẫn có thể học lab bằng cách chạy từng ví dụ trong DevTools Console và so sánh kết quả với giao diện.

## Bản đồ kiến thức

| Kiến thức | Hiểu đơn giản | Nơi sử dụng |
|---|---|---|
| JSX | Cú pháp giúp viết cấu trúc giao diện gần giống HTML trong JavaScript | Tất cả component `.jsx` |
| Component | Function trả về JSX | `App`, `OrchidsContainer`, `OrchidsPresentation`, `OrchidCard` |
| Props | Dữ liệu component cha truyền cho component con | `orchids`, `orchid` |
| `map()` | Biến mỗi object trong mảng thành một React element | `OrchidsPresentation.jsx` |
| `key` | Danh tính ổn định của phần tử trong danh sách | `key={orchid.id}` |
| Conditional rendering | Chỉ render một phần giao diện khi điều kiện đúng | Badge `Special collection` |
| Semantic HTML | Dùng thẻ đúng ý nghĩa để dễ đọc và hỗ trợ accessibility | `article`, `section`, `dl`, `dt`, `dd` |
| Event xử lý lỗi ảnh | Thay ảnh bị lỗi bằng ảnh dự phòng | `onError={showFallback}` |

## Yêu cầu đề bài đã đáp ứng

- Tạo component hiển thị danh sách orchids.
- Có đúng 16 phần tử.
- Mỗi orchid có `id`, `image`, `name`, `origin`, `color`, `isSpecial`, `rating`, `category`.
- Dữ liệu nằm trong `ListOfOrchids.js`.
- Dùng `map()` để lặp dữ liệu.
- Tách Container component và Presentation component.
- Ảnh dùng SVG data URI tự chứa, có file fallback nếu dữ liệu ảnh lỗi.
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

## Đọc code theo thứ tự thực thi

### Bước 1: `main.jsx` gắn React vào trang HTML

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- `document.getElementById('root')` tìm thẻ `<div id="root">` trong `index.html`.
- `createRoot(...)` tạo vùng do React quản lý.
- `.render(<App />)` yêu cầu React bắt đầu từ component `App`.
- `<App />` là cách dùng một component, tương tự một thẻ HTML tự định nghĩa.
- `StrictMode` hỗ trợ phát hiện code không an toàn trong lúc phát triển. Nó không tạo thêm giao diện và không ảnh hưởng production.
- Import CSS tại đây giúp style được áp dụng cho toàn ứng dụng.

### Bước 2: `App.jsx` ghép các phần lớn của trang

```jsx
export default function App() {
  return (
    <div className="app-shell">
      <header>{/* Nội dung giới thiệu */}</header>
      <main>
        <OrchidsContainer />
      </main>
      <footer>{/* Thông tin cuối trang */}</footer>
    </div>
  );
}
```

`App` không cần biết cách tạo từng card. Nó chỉ ghép bố cục trang và đặt `OrchidsContainer` vào vị trí gallery. Đây gọi là **component composition**: tạo giao diện lớn bằng cách kết hợp nhiều component nhỏ.

`className` được dùng thay cho `class` vì JSX là JavaScript và `class` là một từ khóa của JavaScript.

### Bước 3: `ListOfOrchids.js` mô tả dữ liệu

Mỗi orchid là một object có cùng cấu trúc:

```js
{
  id: 1,
  name: 'Taichung Beauty',
  rating: 5,
  isSpecial: true,
  image: '...',
  color: 'Pink',
  origin: 'Taiwan',
  category: 'Cattleya'
}
```

Điểm quan trọng là dữ liệu được tách khỏi JSX. Muốn thêm orchid, bạn thêm một object vào mảng thay vì sao chép cả khối HTML.

```js
export const orchids = [/* 16 object */];
```

Đây là **named export**, nên file khác phải import đúng tên bằng dấu ngoặc nhọn:

```js
import { orchids } from '../data/ListOfOrchids';
```

Hàm `createOrchidImage(...)` chỉ tạo ảnh SVG dưới dạng chuỗi data URI để demo không phụ thuộc máy chủ ảnh. Khi mới học React, bạn có thể xem `image` đơn giản là một URL; không cần học cú pháp SVG để hiểu luồng component.

### Bước 4: Container lấy dữ liệu

```jsx
export default function OrchidsContainer() {
  return <OrchidsPresentation orchids={orchids} />;
}
```

- Bên trái dấu `=` là tên prop: `orchids`.
- Bên phải trong `{}` là biến JavaScript: mảng `orchids` vừa import.
- Component này chưa thay đổi dữ liệu; nó chỉ làm cầu nối giữa data module và presentation component.

Có thể đọc câu lệnh trên thành: “Hãy render `OrchidsPresentation` và đưa cho nó mảng orchids qua một prop cũng tên là `orchids`.”

### Bước 5: Presentation nhận props và tạo danh sách

```jsx
export default function OrchidsPresentation({ orchids }) {
```

`{ orchids }` là destructuring props. Hai cách sau có ý nghĩa giống nhau:

```jsx
function OrchidsPresentation(props) {
  const orchids = props.orchids;
}

function OrchidsPresentation({ orchids }) {
}
```

Danh sách card được tạo bằng:

```jsx
{orchids.map((orchid) => (
  <OrchidCard key={orchid.id} orchid={orchid} />
))}
```

Giả sử mảng có 16 object, callback của `map()` chạy 16 lần. Mỗi lần:

1. Biến `orchid` nhận một object.
2. JSX tạo một `OrchidCard` tương ứng.
3. Prop `orchid` đưa object đó xuống card.
4. `key` giúp React theo dõi đúng card nếu danh sách thay đổi.

`key` không xuất hiện trong props của `OrchidCard`; đây là thuộc tính đặc biệt React dùng nội bộ.

### Bước 6: `OrchidCard` hiển thị một object

```jsx
export default function OrchidCard({ orchid }) {
  return <h3>{orchid.name}</h3>;
}
```

Dấu `{}` bên trong JSX cho phép chèn biểu thức JavaScript. Vì vậy `{orchid.name}` được thay bằng tên thật của orchid khi render.

Một số cú pháp đáng chú ý trong card:

```jsx
alt={`${orchid.name} orchid`}
```

Đây là template literal. Nếu tên là `Moon Orchid`, giá trị `alt` trở thành `Moon Orchid orchid`. Thuộc tính `alt` giúp trình đọc màn hình mô tả ảnh và hiển thị nội dung thay thế khi ảnh lỗi.

```jsx
{String(orchid.id).padStart(2, '0')}
```

`String(...)` đổi số thành chuỗi; `padStart(2, '0')` thêm số `0` phía trước để `1` hiển thị thành `01`.

```jsx
{orchid.isSpecial && <span>Special collection</span>}
```

Toán tử `&&` hoạt động như sau:

- `true && JSX` → React nhận JSX và hiển thị badge.
- `false && JSX` → React không hiển thị gì.

### Bước 7: Xử lý ảnh bị lỗi

```jsx
function showFallback(event) {
  event.currentTarget.onerror = null;
  event.currentTarget.src = fallbackImage;
}
```

- `onError={showFallback}` yêu cầu trình duyệt gọi function khi ảnh không tải được.
- `event.currentTarget` chính là thẻ `<img>` đang phát sinh sự kiện.
- Gán `src` mới để dùng ảnh dự phòng.
- Dòng `event.currentTarget.onerror = null` xóa native `onerror` property trước khi đổi ảnh. Tuy nhiên handler trong bài được React gắn qua prop `onError`, nên không nên xem đây là cơ chế chống lặp hoàn chỉnh. Bài lab dùng file fallback đóng gói sẵn và giả định file này tải được; ứng dụng thực tế nên dùng thêm một cờ để chỉ fallback một lần.

`import.meta.env.BASE_URL` lấy base path do Vite cấu hình, nhờ vậy ảnh vẫn đúng đường dẫn khi chạy local và khi deploy trong thư mục con của GitHub Pages.

## React render Lab 1 như thế nào?

1. Trình duyệt tải `index.html` và JavaScript.
2. `main.jsx` render `<App />` vào `#root`.
3. React gọi function `App` để lấy JSX.
4. Gặp `<OrchidsContainer />`, React gọi component đó.
5. Container truyền mảng xuống `OrchidsPresentation`.
6. `map()` tạo 16 `OrchidCard`.
7. React chuyển cây JSX thành các DOM element nhìn thấy trên trang.

Lab 1 chưa có state nên dữ liệu không tự thay đổi sau render. Giao diện chỉ thay đổi khi source/data thay đổi và ứng dụng được render lại.

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
| `public/orchid-placeholder.svg` | Ảnh thay thế nếu dữ liệu ảnh không đọc được |

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

## Câu hỏi lý thuyết

Mỗi câu có câu trả lời ngay bên dưới. Khi tự học, nên che phần trả lời, nói hoặc viết câu trả lời của bạn trước, rồi mới đối chiếu.

### Mức 1 — Nhận biết

1. Component React là gì?

   **Trả lời:** Component là một function hoặc class mô tả một phần giao diện. Trong dự án này, component là function nhận props và trả về JSX, ví dụ `OrchidCard({ orchid })`.

2. JSX khác HTML ở điểm nào dễ thấy nhất trong lab?

   **Trả lời:** JSX cho phép chèn JavaScript trong `{}`, dùng `className` thay cho `class`, và yêu cầu đóng thẻ như `<img />`. JSX sẽ được công cụ build chuyển thành JavaScript trước khi chạy.

3. Props dùng để làm gì?

   **Trả lời:** Props truyền dữ liệu hoặc callback từ component cha xuống component con. Ví dụ `orchid={orchid}` đưa một object từ `OrchidsPresentation` xuống `OrchidCard`.

4. `map()` trả về gì?

   **Trả lời:** `map()` luôn trả về một mảng mới. Trong lab, mảng mới chứa 16 React elements `OrchidCard` tương ứng với 16 object dữ liệu.

5. Vì sao mỗi orchid cần một `id` riêng?

   **Trả lời:** `id` giúp xác định duy nhất từng orchid và được dùng làm `key` ổn định để React theo dõi đúng phần tử trong danh sách.

### Mức 2 — Giải thích

6. Vì sao `OrchidCard` không tự import toàn bộ mảng orchids?

   **Trả lời:** Card chỉ có trách nhiệm hiển thị một orchid. Nhận object qua props giúp card ít phụ thuộc nguồn dữ liệu, dễ tái sử dụng và dễ test hơn.

7. Vì sao không nên sửa trực tiếp object nhận qua props?

   **Trả lời:** Props thuộc quyền quản lý của component cha và nên được xem là chỉ đọc. Sửa trực tiếp làm luồng dữ liệu khó dự đoán và cũng không phải cách yêu cầu React cập nhật giao diện.

8. `key={orchid.id}` giúp React giải quyết vấn đề gì?

   **Trả lời:** `key` giúp React ghép phần tử trước và sau mỗi lần render. Nhờ đó React biết card nào được giữ lại, thêm, xóa hoặc di chuyển thay vì xử lý nhầm phần tử.

9. Khi `isSpecial` bằng `false`, biểu thức dùng `&&` tạo ra giao diện thế nào?

   **Trả lời:** Vế JSX phía sau không được render, nên badge `Special collection` không xuất hiện.

10. Container component và presentation component khác nhau về trách nhiệm ra sao?

    **Trả lời:** Container biết dữ liệu đến từ đâu và chuẩn bị dữ liệu; presentation nhận dữ liệu qua props và quyết định cách trình bày nó.

### Mức 3 — Vận dụng

11. Nếu thêm orchid thứ 17 vào mảng, cần sửa những component nào?

    **Trả lời:** Không cần sửa component để tạo card mới: chỉ cần thêm object hợp lệ vào `ListOfOrchids.js`, `map()` tự tạo card thứ 17 và `orchids.length` đổi thành 17. Tuy nhiên heading `Sixteen remarkable orchids` đang viết cố định, nên phải sửa heading hoặc đổi nó thành nội dung tính từ `orchids.length` nếu muốn toàn bộ chữ trên giao diện chính xác.

12. Nếu muốn chỉ hiển thị orchid từ Việt Nam mà chưa cần tương tác người dùng, bạn có thể xử lý mảng ở đâu?

    **Trả lời:** Có thể dùng `filter()` trong `OrchidsContainer`, sau đó truyền mảng đã lọc xuống presentation: `orchids.filter((orchid) => orchid.origin === 'Vietnam')`.

13. Nếu dùng `map()` với callback có `{}` nhưng quên `return`, điều gì xảy ra?

    **Trả lời:** Callback trả về `undefined` ở mỗi lượt, nên React không nhận được các card cần render. Nếu muốn bỏ `return`, phải dùng cú pháp ngoặc tròn: `(item) => (<Component />)`.

14. Nếu hai orchid có cùng `key`, React có thể gặp vấn đề gì?

    **Trả lời:** React có thể ghép sai hai phần tử khi cập nhật, dẫn đến DOM hoặc state cục bộ gắn nhầm card. Console cũng hiển thị cảnh báo duplicate key.

15. Khi nào một khối JSX nên được tách thành component riêng?

    **Trả lời:** Nên tách khi phần giao diện có trách nhiệm riêng, xuất hiện nhiều lần, cần tái sử dụng, cần test độc lập hoặc làm component hiện tại quá dài và khó hiểu.

## Bài tập thực hành

1. Thêm một orchid thứ 17, quan sát card và `{orchids.length}` tự cập nhật nhưng heading `Sixteen remarkable orchids` chưa đổi; sau đó sửa heading thành nội dung động.
2. Thêm prop `showRating` cho `OrchidCard`; khi `false` thì ẩn rating.
3. Tạo component `OrchidFacts` để chứa phần origin và color.
4. Trong `OrchidsContainer`, dùng `filter()` để chỉ truyền các orchid có rating bằng `5`.
5. Cố ý bỏ `key`, quan sát cảnh báo console, sau đó khôi phục `key={orchid.id}`.

## Gợi ý mở rộng

Thử thêm bộ lọc theo `category` hoặc `origin`. Khi bắt đầu có dữ liệu thay đổi theo thao tác người dùng, đó là lúc cần state—chủ đề của Lab 2.
