import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function AppNavbar() {
  const { user, login, logout, theme, toggleTheme } = useAuth();
  const nextTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <header className="app-navbar">
      <NavLink className="app-navbar__brand" to="/" aria-label="Orchid Atlas home">
        <span aria-hidden="true">✿</span> Orchid Atlas
      </NavLink>

      <nav className="app-navbar__links" aria-label="Primary navigation">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `nav-pill ${isActive ? 'nav-pill--active' : ''}`}
        >
          Index
        </NavLink>
        <NavLink
          to="/naturals"
          className={({ isActive }) => `nav-pill ${isActive ? 'nav-pill--active' : ''}`}
        >
          Natural
        </NavLink>
        <NavLink
          to="/detail/1"
          className={({ isActive }) => `nav-pill ${isActive ? 'nav-pill--active' : ''}`}
        >
          Detail
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => `nav-pill ${isActive ? 'nav-pill--active' : ''}`}
        >
          Contact
        </NavLink>
      </nav>

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
