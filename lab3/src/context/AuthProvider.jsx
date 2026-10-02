import { useEffect, useState } from 'react';
import AuthContext from './AuthContext';

const USER_KEY = 'fer202-lab3-user';
const THEME_KEY = 'fer202-lab3-theme';

// localStorage là dữ liệu phía trình duyệt và có thể bị sửa hoặc chứa JSON lỗi,
// vì vậy cần parse trong try/catch và chỉ chấp nhận shape hợp lệ cho bài demo.
function readStoredUser() {
  try {
    const user = JSON.parse(localStorage.getItem(USER_KEY));
    return user?.username === 'Aaron' ? user : null;
  } catch {
    return null;
  }
}

function readStoredTheme() {
  // Chỉ dark được chấp nhận; mọi giá trị khác quay về theme light an toàn.
  return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
}

export default function AuthProvider({ children }) {
  // Truyền function (không có dấu ngoặc gọi) để React dùng làm lazy initializer.
  // Nhờ vậy việc đọc storage gắn với lúc state được khởi tạo, không phải mỗi render.
  const [user, setUser] = useState(readStoredUser);
  const [theme, setTheme] = useState(readStoredTheme);

  // Effect chạy sau render và đồng bộ state user ra hệ thống bên ngoài React.
  // [user] làm effect chạy sau mount và chạy lại khi giá trị user thay đổi.
  useEffect(() => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  }, [user]);

  // Theme được lưu để dùng lại sau reload và đặt lên thẻ html để CSS variables
  // có thể đổi màu toàn bộ ứng dụng mà không sửa style từng component.
  // [theme] giới hạn lần chạy lại của effect vào những lúc theme thay đổi.
  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Login này chỉ mô phỏng để học Context, không xác thực danh tính thật.
  const login = () => setUser({ username: 'Aaron' });
  const logout = () => setUser(null);
  // Functional update nhận theme mới nhất do React cung cấp; phù hợp khi state
  // tiếp theo phụ thuộc trực tiếp vào state trước đó.
  const toggleTheme = () => setTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light');

  // Provider công bố dữ liệu và action; children là nội dung nằm giữa
  // <AuthProvider>...</AuthProvider>, ở đây chính là App.
  return (
    <AuthContext.Provider value={{ user, login, logout, theme, toggleTheme }}>
      {children}
    </AuthContext.Provider>
  );
}
