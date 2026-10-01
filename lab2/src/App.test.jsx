import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('Lab 2 orchid details', () => {
  it('opens and closes the selected orchid modal', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'View details for Taichung Beauty' }));
    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByRole('heading', { name: 'Taichung Beauty' })).toBeInTheDocument();
    expect(within(dialog).getByText('Cattleya')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Close orchid details' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
