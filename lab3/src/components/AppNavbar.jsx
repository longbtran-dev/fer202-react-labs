import Button from 'react-bootstrap/Button';
import useAuth from '../hooks/useAuth';

export default function AppNavbar() {
  // Destructuring lấy cả dữ liệu và action mà Provider công bố.
  const { user, login, logout, theme, toggleTheme } = useAuth();
  // nextTheme luôn suy ra được từ theme hiện tại nên không cần state riêng.
  const nextTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <header className="app-navbar">
      <a className="app-navbar__brand" href="#top" aria-label="Orchid Atlas home">
        <span aria-hidden="true">✿</span> Orchid Atlas
      </a>

      <div className="app-navbar__actions">
        {/* Toán tử ba ngôi chọn nội dung dựa trên việc user có tồn tại hay không. */}
        <p>{user ? `Welcome, ${user.username}` : 'Log in as Aaron'}</p>
        {/* onClick nhận function login hoặc logout; không có () nên function
            chỉ chạy khi người dùng thực sự click. */}
        <Button
          className="auth-button"
          variant={user ? 'outline-secondary' : 'dark'}
          size="sm"
          aria-label={user ? 'Log out' : 'Log in as Aaron'}
          onClick={user ? logout : login}
        >
          {user ? 'Logout' : 'Login'}
        </Button>
        {/* aria-label mô tả hành động sắp xảy ra cho trình đọc màn hình. */}
        <Button
          className="theme-button"
          variant="outline-secondary"
          size="sm"
          aria-label={`Switch to ${nextTheme} theme`}
          onClick={toggleTheme}
        >
          <span aria-hidden="true">{theme === 'light' ? '◐' : '☀'}</span>
          {theme === 'light' ? 'Dark' : 'Light'}
        </Button>
      </div>
    </header>
  );
}
