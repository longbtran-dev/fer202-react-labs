import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import App from './App';
import AuthProvider from './context/AuthProvider';

function renderApp() {
  return render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

describe('Lab 3 global state', () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.theme;
  });

  afterEach(cleanup);

  it('logs Aaron in and out while synchronizing localStorage', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole('button', { name: 'Log in as Aaron' }));
    expect(screen.getByText('Welcome, Aaron')).toBeInTheDocument();
    await waitFor(() => {
      expect(JSON.parse(localStorage.getItem('fer202-lab3-user'))).toEqual({ username: 'Aaron' });
    });

    await user.click(screen.getByRole('button', { name: 'Log out' }));
    expect(screen.getByRole('button', { name: 'Log in as Aaron' })).toBeInTheDocument();
    await waitFor(() => expect(localStorage.getItem('fer202-lab3-user')).toBeNull());
  });

  it('toggles and persists the application theme', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole('button', { name: 'Switch to dark theme' }));
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(localStorage.getItem('fer202-lab3-theme')).toBe('dark');
  });

  it('restores valid user and theme values on startup', () => {
    localStorage.setItem('fer202-lab3-user', JSON.stringify({ username: 'Aaron' }));
    localStorage.setItem('fer202-lab3-theme', 'dark');

    renderApp();

    expect(screen.getByText('Welcome, Aaron')).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });
});
