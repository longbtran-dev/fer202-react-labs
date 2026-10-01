import Button from 'react-bootstrap/Button';
import useAuth from '../hooks/useAuth';

export default function AppNavbar() {
  const { user, login, logout, theme, toggleTheme } = useAuth();
  const nextTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <header className="app-navbar">
      <a className="app-navbar__brand" href="#top" aria-label="Orchid Atlas home">
        <span aria-hidden="true">✿</span> Orchid Atlas
      </a>

      <div className="app-navbar__actions">
        <p>{user ? `Welcome, ${user.username}` : 'Log in as Aaron'}</p>
        <Button
          className="auth-button"
          variant={user ? 'outline-secondary' : 'dark'}
          size="sm"
          aria-label={user ? 'Log out' : 'Log in as Aaron'}
          onClick={user ? logout : login}
        >
          {user ? 'Logout' : 'Login'}
        </Button>
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
