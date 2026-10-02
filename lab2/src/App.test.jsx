import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from './App';

// Test thao tác giống người dùng: click nút, đọc dialog rồi đóng dialog.
// Nó không kiểm tra tên biến state nên implementation vẫn có thể được refactor.
describe('Lab 2 orchid details', () => {
  it('opens and closes the selected orchid modal', async () => {
    // userEvent mô phỏng chuỗi sự kiện trình duyệt thực tế hơn gọi click trực tiếp.
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'View details for Taichung Beauty' }));
    const dialog = screen.getByRole('dialog');
    // within giới hạn truy vấn bên trong modal, tránh trùng text với card phía sau.
    expect(within(dialog).getByRole('heading', { name: 'Taichung Beauty' })).toBeInTheDocument();
    expect(within(dialog).getByText('Cattleya')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Close orchid details' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
