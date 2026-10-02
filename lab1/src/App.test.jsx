import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

// Phần lớn assertion kiểm tra nội dung người dùng nhìn thấy thay vì tên component.
// Assertion cuối cố ý kiểm tra thêm yêu cầu kỹ thuật: ảnh phải là data URI tự chứa.
describe('Lab 1 orchid gallery', () => {
  it('renders all 16 orchids from the data module', () => {
    render(<App />);

    // Truy vấn theo role/text gần với cách người dùng và công nghệ hỗ trợ đọc UI.
    expect(screen.getAllByRole('article')).toHaveLength(16);
    expect(screen.getByRole('heading', { name: 'Taichung Beauty' })).toBeInTheDocument();
    expect(screen.getByText('Taiwan')).toBeInTheDocument();
    expect(screen.getAllByText('Special collection')).toHaveLength(8);
    expect(screen.getByRole('img', { name: 'Taichung Beauty orchid' }))
      .toHaveAttribute('src', expect.stringMatching(/^data:image\/svg\+xml/));
  });
});
