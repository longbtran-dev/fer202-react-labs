# Lab 3 — Context Hook và Effect Hook

## Mục tiêu

Lab 3 tiếp tục từ Lab 1 và Lab 2, sau đó thêm hai loại state được quản lý ở cấp ứng dụng:

1. User đang đăng nhập hay chưa.
2. Toàn ứng dụng đang dùng light theme hay dark theme.

Trong code hiện tại, `AppNavbar` là React component duy nhất đọc Context trực tiếp; theme sau đó ảnh hưởng toàn giao diện thông qua CSS. Context được dùng để luyện cách cung cấp state cho các descendant và tránh prop drilling khi ứng dụng có thêm consumer. Effect đồng bộ state đó với `localStorage`, giúp lựa chọn được khôi phục sau khi reload.

## Cần biết trước khi học

- Hiểu component, props và luồng dữ liệu một chiều của Lab 1.
- Hiểu `useState`, callback, re-render và lifting state của Lab 2.
- Biết object, function, destructuring và toán tử ba ngôi.
- Biết JSON là định dạng chuỗi dùng để lưu/trao đổi dữ liệu.

Lab 3 có nhiều khái niệm hơn, nên hãy tách chúng thành hai câu hỏi:

1. **Ai cần dùng state này?** Nếu nhiều nhánh xa nhau cùng cần, Context có thể phù hợp.
2. **State cần đồng bộ với gì bên ngoài React?** Nếu là storage hoặc DOM, đó là công việc của Effect.

## Bản đồ kiến thức

| Kiến thức | Hiểu đơn giản | Nơi sử dụng |
|---|---|---|
| Context | Kênh chia sẻ dữ liệu cho cây component | `AuthContext.js` |
| Provider | Component giữ state và cung cấp value cho descendants | `AuthProvider.jsx` |
| Consumer | Component đọc value từ Context | `AppNavbar.jsx` |
| `useContext` | Hook đọc Context gần nhất | `useAuth.js` |
| Custom hook | Function bắt đầu bằng `use`, đóng gói cách dùng hook | `useAuth` |
| Lazy initializer | Function tạo state ban đầu khi Provider khởi tạo | `readStoredUser`, `readStoredTheme` |
| `useEffect` | Chạy side effect sau render | Đồng bộ storage và `data-theme` |
| Dependency array | Quy định effect cần chạy lại khi giá trị nào đổi | `[user]`, `[theme]` |
| `localStorage` | Kho chuỗi trong trình duyệt, còn sau reload | User và theme |
| CSS variables | Các biến màu được đổi theo theme | `styles.css` |
| Functional update | Tính state mới từ state trước đó | `setTheme((currentTheme) => ...)` |

## Yêu cầu đề bài đã đáp ứng

- Có `AuthContext`.
- Có `AuthProvider` cung cấp state và action.
- Có custom hook `useAuth`.
- Navbar hiển thị `Log in as Aaron` khi chưa đăng nhập.
- Khi đăng nhập hiển thị `Welcome, Aaron` và nút Logout.
- Login tạo fake user object; logout xóa user.
- Có toggle light/dark áp dụng cho toàn app.
- Dùng `useEffect` để đồng bộ user và theme với `localStorage`.
- Khôi phục user và theme khi reload.
- Vẫn giữ gallery và modal từ hai lab trước.

## Kiến thức được vận dụng

### 1. `createContext`

```js
const AuthContext = createContext(null);
```

Context là kênh để component con đọc một giá trị từ provider gần nhất. Giá trị mặc định là `null` để custom hook có thể phát hiện khi bị dùng sai vị trí.

### 2. Provider là nguồn dữ liệu duy nhất

`AuthProvider` giữ hai state:

```jsx
const [user, setUser] = useState(readStoredUser);
const [theme, setTheme] = useState(readStoredTheme);
```

Provider cung cấp API nhỏ và rõ ràng:

```jsx
<AuthContext.Provider
  value={{ user, login, logout, theme, toggleTheme }}
>
  {children}
</AuthContext.Provider>
```

Component sử dụng context không cần biết state được lưu bằng `useState` hay dữ liệu được ghi vào đâu.

### 3. Lazy state initialization

Truyền function vào `useState` giúp React chỉ dùng việc đọc storage trong giai đoạn khởi tạo state, thay vì đánh giá lời gọi function ở mọi lần render:

```jsx
const [user, setUser] = useState(readStoredUser);
```

Nếu viết `useState(readStoredUser())`, biểu thức `readStoredUser()` vẫn được chạy mỗi khi component function được gọi dù React chỉ dùng kết quả để tạo state ở lần đầu. Trong development, `StrictMode` có thể gọi initializer hơn một lần để kiểm tra tính thuần khiết, vì vậy initializer chỉ nên đọc và trả về dữ liệu, không nên tạo side effect.

### 4. Custom hook `useAuth`

```js
export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
```

Custom hook gom logic đọc Context và tạo lỗi rõ ràng nếu component không nằm trong Provider. Consumer chỉ cần gọi `useAuth()`.

### 5. `useEffect` cho side effect

Render phải chỉ tính UI. Ghi `localStorage` và sửa thuộc tính của `document` là side effect, nên được thực hiện sau render:

```jsx
useEffect(() => {
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  else localStorage.removeItem(USER_KEY);
}, [user]);

useEffect(() => {
  localStorage.setItem(THEME_KEY, theme);
  document.documentElement.dataset.theme = theme;
}, [theme]);
```

Mỗi effect chạy sau lần render đầu tiên, sau đó chạy lại khi dependency tương ứng (`user` hoặc `theme`) thay đổi. Trong development, `StrictMode` có thể chạy lại quy trình effect để phát hiện side effect không an toàn.

### 6. Đọc storage an toàn

JSON trong storage có thể bị hỏng hoặc bị người dùng sửa. `readStoredUser` dùng `try/catch` và chỉ chấp nhận user có username `Aaron`. Giá trị theme ngoài `light`/`dark` quay về `light`.

### 7. Theme bằng CSS variables

JavaScript chỉ đặt `data-theme` trên thẻ `<html>`. CSS chịu trách nhiệm đổi toàn bộ màu:

```css
:root { --paper: #f4f0e8; --ink: #17352b; }

:root[data-theme='dark'] {
  --paper: #0d1814;
  --ink: #f2ede4;
}
```

Cách này nhẹ hơn việc thêm class riêng cho từng component và giữ logic style ở CSS.

## Đọc code theo thứ tự thực thi

### Bước 1: `main.jsx` đặt Provider quanh ứng dụng

```jsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
```

Cây component lúc này có dạng:

```text
AuthProvider
└── App
    ├── AppNavbar
    └── OrchidsContainer
```

Mọi component nằm bên trong `AuthProvider` đều có khả năng đọc `AuthContext`. Nếu đặt `AppNavbar` ra ngoài Provider, `useAuth()` không tìm thấy value và báo lỗi.

### Bước 2: `createContext` tạo kênh dữ liệu

```js
const AuthContext = createContext(null);
```

Context object không tự chứa user hay theme. Nó là một kênh để React tìm value từ Provider gần nhất phía trên component đang đọc.

Giá trị mặc định là `null`. Dự án cố ý chọn `null` để phát hiện trường hợp quên bọc Provider thay vì âm thầm dùng một object mặc định không đúng.

### Bước 3: Đọc dữ liệu ban đầu từ `localStorage`

`localStorage` chỉ lưu chuỗi. Khi lưu object user, code phải chuyển object thành JSON; khi đọc lại, code phải chuyển JSON về object.

```jsx
function readStoredUser() {
  try {
    const user = JSON.parse(localStorage.getItem(USER_KEY));
    return user?.username === 'Aaron' ? user : null;
  } catch {
    return null;
  }
}
```

Giải thích từng bước:

1. `localStorage.getItem(USER_KEY)` trả về chuỗi đã lưu hoặc `null`.
2. `JSON.parse(...)` chuyển chuỗi JSON thành object JavaScript.
3. `user?.username` dùng optional chaining; nếu `user` là `null`, biểu thức trả về `undefined` thay vì báo lỗi.
4. Toán tử ba ngôi chỉ chấp nhận object có username đúng là `Aaron`.
5. `try/catch` ngăn ứng dụng bị crash nếu storage chứa JSON lỗi như `{abc`.

Theme không cần JSON vì nó chỉ là chuỗi:

```jsx
function readStoredTheme() {
  return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
}
```

Chỉ giá trị chính xác `dark` được chấp nhận; mọi giá trị khác quay về mặc định `light`.

### Bước 4: Provider tạo state bằng lazy initializer

```jsx
const [user, setUser] = useState(readStoredUser);
const [theme, setTheme] = useState(readStoredTheme);
```

Lưu ý không có `()` sau tên function. React nhận function initializer và gọi nó trong lúc khởi tạo state.

So sánh:

```jsx
useState(readStoredUser);   // Truyền function cho React
useState(readStoredUser()); // Tự gọi function trước khi truyền kết quả
```

Cách đầu tránh đánh giá lời gọi đọc storage ở mọi lần Provider render. Function initializer phải trả về giá trị ban đầu và không được cập nhật state hoặc sửa DOM.

### Bước 5: Render trước, Effect chạy sau

```jsx
useEffect(() => {
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  else localStorage.removeItem(USER_KEY);
}, [user]);
```

Luồng thực thi:

1. React render Provider và các component con bằng state hiện tại.
2. Trình duyệt cập nhật giao diện.
3. React chạy effect sau render.
4. Effect đồng bộ state user với storage.

`JSON.stringify(user)` chuyển `{ username: 'Aaron' }` thành chuỗi `{"username":"Aaron"}`. Khi logout, xóa key rõ ràng hơn lưu chuỗi `'null'`.

Dependency array `[user]` nói rằng effect cần chạy sau lần mount và chạy lại khi tham chiếu `user` thay đổi. Nếu bỏ dependency array, effect chạy sau mọi render. Nếu dùng `[]`, effect chỉ gắn với lần mount và sẽ không đồng bộ các lần login/logout tiếp theo.

Effect theme tương tự nhưng đồng bộ hai nơi:

```jsx
useEffect(() => {
  localStorage.setItem(THEME_KEY, theme);
  document.documentElement.dataset.theme = theme;
}, [theme]);
```

`document.documentElement` là thẻ `<html>`. Gán vào `dataset.theme` tạo thuộc tính như:

```html
<html data-theme="dark">
```

Đây là side effect vì code giao tiếp với API trình duyệt nằm ngoài quá trình tính JSX.

### Bước 6: Provider định nghĩa các action

```jsx
const login = () => setUser({ username: 'Aaron' });
const logout = () => setUser(null);
const toggleTheme = () => setTheme(
  (currentTheme) => currentTheme === 'light' ? 'dark' : 'light'
);
```

- `login` thay trạng thái chưa đăng nhập bằng fake user object.
- `logout` đưa state về trạng thái không có user.
- `toggleTheme` dùng functional update vì state mới phụ thuộc state trước đó.

Tham số `currentTheme` luôn là giá trị React cung cấp tại thời điểm xử lý update, nên an toàn hơn việc dựa vào biến `theme` có thể thuộc một lần render cũ khi nhiều update được xếp hàng.

### Bước 7: Provider công bố value

```jsx
return (
  <AuthContext.Provider
    value={{ user, login, logout, theme, toggleTheme }}
  >
    {children}
  </AuthContext.Provider>
);
```

`children` là nội dung được đặt giữa thẻ mở và đóng của `AuthProvider`; trong `main.jsx`, đó là `<App />`.

Value gồm cả dữ liệu và action. Consumer không được nhận trực tiếp `setUser`, nhờ vậy nó chỉ dùng API có ý nghĩa là `login` và `logout`. Với ứng dụng nhỏ này, object value viết trực tiếp là đủ rõ ràng.

### Bước 8: Custom hook tạo cách dùng thống nhất

```js
export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
```

Thay vì component nào cũng import cả `useContext` và `AuthContext`, component chỉ cần:

```jsx
const { user, login, logout, theme, toggleTheme } = useAuth();
```

Tên custom hook phải bắt đầu bằng `use` để React tooling có thể kiểm tra Rules of Hooks. Hook chỉ được gọi ở cấp cao nhất của component hoặc custom hook, không gọi trong `if`, loop hay callback thông thường.

### Bước 9: Navbar tính UI từ Context

```jsx
const nextTheme = theme === 'light' ? 'dark' : 'light';
```

`nextTheme` không cần state vì nó luôn tính được từ `theme`. Đây là derived value.

```jsx
<p>{user ? `Welcome, ${user.username}` : 'Log in as Aaron'}</p>
```

Toán tử ba ngôi chọn nội dung theo việc `user` có tồn tại hay không.

```jsx
<Button onClick={user ? logout : login}>
  {user ? 'Logout' : 'Login'}
</Button>
```

`onClick` nhận một trong hai function. Không có dấu `()` nên function chỉ chạy khi click. Sau khi action cập nhật Context state, Provider và các consumer liên quan render lại, vì vậy button/text tự đổi.

`aria-label={`Switch to ${nextTheme} theme`}` mô tả hành động sắp xảy ra cho công nghệ hỗ trợ, thay vì chỉ đọc biểu tượng mặt trời/mặt trăng.

### Bước 10: CSS phản ứng với `data-theme`

```css
:root {
  --paper: #f4f0e8;
  --ink: #17352b;
}

:root[data-theme='dark'] {
  --paper: #0d1814;
  --ink: #f2ede4;
}
```

Các component dùng `var(--paper)` và `var(--ink)`. Khi thuộc tính `data-theme` đổi, trình duyệt tự tính lại CSS. JavaScript không cần tìm và đổi màu của từng element.

### Bước 11: Test bọc App bằng cùng Provider

```jsx
function renderApp() {
  return render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
```

Test phải tạo đúng môi trường như `main.jsx`; nếu render `App` một mình, `AppNavbar` gọi `useAuth()` ngoài Provider và test báo lỗi.

`beforeEach` xóa storage để các test độc lập. `userEvent` mô phỏng thao tác người dùng. `waitFor` chờ effect đồng bộ storage trước khi assertion, vì effect chạy sau render.

## Khi nào dùng Context, khi nào giữ state cục bộ?

Hãy đặt state ở phạm vi nhỏ nhất đáp ứng nhu cầu:

| State | Ai cần dùng? | Nơi phù hợp |
|---|---|---|
| `selectedOrchid` | Gallery và modal trong cùng khu vực | `OrchidsContainer` |
| `user` | Navbar và có thể nhiều trang/component khác | `AuthProvider` |
| `theme` | Toàn bộ ứng dụng và CSS root | `AuthProvider` |

Context không thay thế mọi `useState`. Nếu đưa tất cả state cục bộ vào Context, nhiều consumer có thể render lại không cần thiết và code khó biết state thuộc chức năng nào.

## Luồng đăng nhập/đăng xuất

```text
AppNavbar gọi login()
        ↓
Provider setUser({ username: 'Aaron' })
        ↓
Mọi consumer dùng useAuth() được re-render
        ↓
Navbar hiển thị Welcome, Aaron
        ↓
Effect [user] ghi fer202-lab3-user vào localStorage

Logout → setUser(null) → UI đổi → effect xóa storage key
```

## Luồng đổi theme

```text
Theme button gọi toggleTheme()
        ↓
setTheme dùng functional update light ↔ dark
        ↓
Effect [theme] đặt data-theme và ghi localStorage
        ↓
CSS variables đổi màu toàn bộ ứng dụng
```

## Storage keys

| Key | Giá trị |
|---|---|
| `fer202-lab3-user` | JSON như `{"username":"Aaron"}` hoặc không tồn tại |
| `fer202-lab3-theme` | Chuỗi `light` hoặc `dark` |

## Cấu trúc file

| File | Vai trò |
|---|---|
| `src/context/AuthContext.js` | Tạo Context object |
| `src/context/AuthProvider.jsx` | Giữ state, action và effects |
| `src/hooks/useAuth.js` | API tái sử dụng để đọc context |
| `src/components/AppNavbar.jsx` | Consumer đăng nhập, đăng xuất, đổi theme |
| `src/main.jsx` | Đặt `AuthProvider` quanh toàn bộ `App` |
| `src/App.test.jsx` | Kiểm tra auth, persistence và theme |
| `src/styles.css` | Light/dark tokens và responsive navbar |

Các component orchid giữ nguyên ý tưởng của Lab 2 để cho thấy kiến thức mới được xây tiếp trên chức năng cũ.

## Chạy Lab 3

Từ root:

```bash
npm install
npm run dev:lab3
```

Từ thư mục `lab3`:

```bash
npm run dev
npm test
npm run build
```

## Test đang kiểm tra gì?

- Click Login làm xuất hiện `Welcome, Aaron` và ghi đúng JSON.
- Click Logout trả giao diện về trạng thái đăng nhập và xóa key user.
- Click theme toggle đặt `data-theme="dark"` và lưu `dark`.
- Provider đọc user/theme đã lưu ngay khi khởi động.

## Lỗi thường gặp

- Gọi `useAuth` ngoài `AuthProvider`.
- Ghi `localStorage` trực tiếp trong render, gây side effect ở sai chỗ.
- Quên dependency array khiến effect chạy sau mọi render.
- Lưu chuỗi `'null'` thay vì xóa key khi logout.
- Tin dữ liệu storage mà không parse và validate.
- Dùng Context cho mọi state cục bộ, làm toàn app re-render không cần thiết.

## Giới hạn bảo mật

Đây **không phải authentication thật**. `localStorage` không chứng minh danh tính; người dùng có thể tự sửa dữ liệu. Hệ thống production cần backend, password hashing, session hoặc token an toàn, authorization và bảo vệ XSS/CSRF phù hợp.

## Câu hỏi lý thuyết và câu trả lời

Hãy thử giải thích bằng lời của bạn trước khi đọc câu trả lời ngay bên dưới.

### Mức 1 — Nhận biết

1. Context giải quyết vấn đề gì?

   **Trả lời:** Context giúp nhiều component trong một cây đọc dữ liệu chung mà không phải truyền cùng một prop qua từng tầng trung gian. Trong lab, dữ liệu chung là `user`, `theme` và các action tương ứng.

2. `createContext(null)` có tạo ra state không?

   **Trả lời:** Không. Nó tạo một Context object, tức kênh để Provider cung cấp value và consumer đọc value. State thật nằm trong `AuthProvider`.

3. Provider có vai trò gì?

   **Trả lời:** Provider giữ state, định nghĩa các action và đưa một `value` cho mọi descendant consumer. Nó là nguồn dữ liệu chung của miền chức năng đó.

4. `useContext(AuthContext)` trả về gì?

   **Trả lời:** Nó trả về `value` của `AuthContext.Provider` gần nhất phía trên component đang gọi. Nếu không có Provider, nó trả về giá trị mặc định đã truyền cho `createContext`, ở đây là `null`.

5. Custom hook là gì?

   **Trả lời:** Custom hook là function có tên bắt đầu bằng `use` và có thể gọi các hook khác. `useAuth` đóng gói cách đọc `AuthContext` và kiểm tra lỗi thiếu Provider.

6. `localStorage` lưu được object trực tiếp không?

   **Trả lời:** Không. `localStorage` lưu key và value dưới dạng chuỗi. Object phải được đổi thành JSON bằng `JSON.stringify`, sau đó đọc lại bằng `JSON.parse`.

7. `useEffect` chạy trước hay sau render?

   **Trả lời:** Effect chạy sau khi React render/commit giao diện. Vì thế nó phù hợp để đồng bộ với storage, DOM, network hoặc hệ thống bên ngoài React.

### Mức 2 — Giải thích

8. Vì sao `AuthProvider` phải bọc `<App />` trong `main.jsx`?

   **Trả lời:** Vì `AppNavbar` nằm trong `App` và gọi `useAuth()`. Consumer chỉ đọc được value nếu nó là descendant của Provider trong cây component.

9. Vì sao Context mặc định là `null` thay vì một object user giả?

   **Trả lời:** `null` cho phép `useAuth` phát hiện việc dùng hook ngoài Provider và báo lỗi rõ ràng. Một object mặc định có thể che giấu lỗi cấu hình.

10. Khác nhau giữa code trong render và code trong `useEffect` là gì?

    **Trả lời:** Code render tính JSX từ props/state và nên thuần khiết. Effect chạy sau render để đồng bộ với bên ngoài, ví dụ ghi storage hoặc sửa thuộc tính DOM.

11. Dependency array `[user]` có ý nghĩa gì?

    **Trả lời:** Effect được gắn với giá trị `user`: nó chạy sau mount và chạy lại khi `user` thay đổi. Các giá trị đọc trong effect cần được phản ánh đúng trong dependency array.

12. Vì sao dùng `useState(readStoredUser)` thay vì `useState(readStoredUser())`?

    **Trả lời:** Cách đầu truyền function initializer cho React, tránh đánh giá lời gọi đọc storage ở mọi lần Provider render. Function initializer chỉ nên đọc và trả về giá trị, không tạo side effect.

13. Custom hook `useAuth` có lợi ích gì ngoài việc viết ngắn hơn?

    **Trả lời:** Nó tạo một API thống nhất, giấu chi tiết Context, kiểm tra lỗi thiếu Provider tại một chỗ và cho phép thay đổi cách lấy auth state mà ít ảnh hưởng consumer.

14. Vì sao `toggleTheme` dùng functional update?

    **Trả lời:** State mới phụ thuộc state trước. Callback nhận giá trị mới nhất do React cung cấp, tránh phụ thuộc vào biến `theme` của một render cũ khi update được batch hoặc xếp hàng.

15. Vì sao `nextTheme` không cần một state riêng?

    **Trả lời:** Nó luôn suy ra được từ `theme`: light thì next là dark và ngược lại. Lưu thêm state sẽ tạo dữ liệu trùng lặp có nguy cơ mất đồng bộ.

### Mức 3 — Vận dụng

16. Vì sao `user` và `theme` phù hợp với Context nhưng `selectedOrchid` vẫn nên là state cục bộ?

    **Trả lời:** User/theme có phạm vi toàn ứng dụng hoặc nhiều nhánh cùng cần. `selectedOrchid` chỉ phục vụ gallery và modal trong một khu vực, nên giữ cục bộ giúp phạm vi state nhỏ, dễ hiểu và giảm re-render không cần thiết.

17. Nếu storage chứa JSON bị hỏng, ứng dụng xử lý thế nào?

    **Trả lời:** `JSON.parse` ném lỗi, `catch` bắt lỗi và `readStoredUser` trả về `null`. Ứng dụng tiếp tục chạy ở trạng thái chưa đăng nhập thay vì crash.

18. Nếu storage chứa `{"username":"SomeoneElse"}`, user có được khôi phục không?

    **Trả lời:** Không. Điều kiện `user?.username === 'Aaron'` không đạt nên function trả về `null`. Đây là validation tối thiểu cho dữ liệu demo, không phải bảo mật thật.

19. Vì sao test dùng `waitFor` khi kiểm tra `localStorage` sau login/logout?

    **Trả lời:** Click cập nhật state và UI trước, còn effect đồng bộ storage chạy sau render. `waitFor` cho effect thời gian hoàn thành rồi mới kiểm tra kết quả.

20. Vì sao đăng nhập của Lab 3 không thể dùng trong production?

    **Trả lời:** Không có mật khẩu, backend, xác minh danh tính, session/token an toàn hay authorization. Bất kỳ ai cũng có thể sửa `localStorage`; nó chỉ là bộ nhớ phía trình duyệt, không phải bằng chứng xác thực.

## Bài tập thực hành

1. Thêm nút **Clear preferences** để xóa cả user/theme và đưa ứng dụng về mặc định.
2. Thêm form nhập username nhưng vẫn ghi chú rõ đây là đăng nhập mô phỏng.
3. Tạo một component `UserStatus` ở vị trí khác và dùng `useAuth()` để chứng minh không cần truyền props qua `App`.
4. Cố ý bỏ `AuthProvider` trong test, đọc lỗi từ `useAuth`, sau đó khôi phục Provider.
5. Ghi JSON lỗi vào key user trong DevTools, reload và xác nhận ứng dụng không crash.
6. Tách theme thành `ThemeContext` riêng và giải thích lợi ích khi auth/theme phát triển độc lập.
7. Thêm lựa chọn theme `system`; dùng `window.matchMedia` trong effect và nhớ viết cleanup nếu đăng ký event listener.

## Gợi ý mở rộng

Thay user hardcode bằng form nhập username, nhưng vẫn giữ rõ đây là đăng nhập mô phỏng. Sau đó thử tách theme sang `ThemeContext` nếu ứng dụng phát triển thành hai miền state độc lập.
