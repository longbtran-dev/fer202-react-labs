# Lab 3 — Context Hook và Effect Hook

## Mục tiêu

Lab 3 tiếp tục từ Lab 1 và Lab 2, sau đó thêm hai loại state cần dùng ở nhiều component:

1. User đang đăng nhập hay chưa.
2. Toàn ứng dụng đang dùng light theme hay dark theme.

Context chia sẻ state toàn cục mà không phải truyền props qua nhiều tầng. Effect đồng bộ state đó với `localStorage`, giúp lựa chọn được khôi phục sau khi reload.

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

Truyền function vào `useState` giúp việc đọc storage chỉ chạy khi state được khởi tạo:

```jsx
const [user, setUser] = useState(readStoredUser);
```

Nếu viết `useState(readStoredUser())`, function được gọi lại mỗi lần component render dù React chỉ dùng giá trị đó ở lần đầu.

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

Dependency array bảo đảm effect user chỉ chạy khi `user` đổi và effect theme chỉ chạy khi `theme` đổi.

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

## Câu hỏi tự ôn tập

1. Vì sao user/theme phù hợp với Context nhưng `selectedOrchid` vẫn nên là state cục bộ?
2. Khác nhau giữa code chạy trong render và code chạy trong `useEffect` là gì?
3. Vì sao lazy initializer tốt hơn đọc storage trực tiếp ở mỗi render?
4. Custom hook `useAuth` mang lại lợi ích gì ngoài việc viết ngắn hơn?
5. Nếu storage chứa JSON lỗi, ứng dụng xử lý thế nào?

## Gợi ý mở rộng

Thay user hardcode bằng form nhập username, nhưng vẫn giữ rõ đây là đăng nhập mô phỏng. Sau đó thử tách theme sang `ThemeContext` nếu ứng dụng phát triển thành hai miền state độc lập.
