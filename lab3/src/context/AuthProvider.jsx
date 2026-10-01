import { useEffect, useState } from 'react';
import AuthContext from './AuthContext';

const USER_KEY = 'fer202-lab3-user';
const THEME_KEY = 'fer202-lab3-theme';

function readStoredUser() {
  try {
    const user = JSON.parse(localStorage.getItem(USER_KEY));
    return user?.username === 'Aaron' ? user : null;
  } catch {
    return null;
  }
}

function readStoredTheme() {
  return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);
  const [theme, setTheme] = useState(readStoredTheme);

  useEffect(() => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  }, [user]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const login = () => setUser({ username: 'Aaron' });
  const logout = () => setUser(null);
  const toggleTheme = () => setTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light');

  return (
    <AuthContext.Provider value={{ user, login, logout, theme, toggleTheme }}>
      {children}
    </AuthContext.Provider>
  );
}
