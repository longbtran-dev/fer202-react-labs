import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('Lab 1 orchid gallery', () => {
  it('renders all 16 orchids from the data module', () => {
    render(<App />);

    expect(screen.getAllByRole('article')).toHaveLength(16);
    expect(screen.getByRole('heading', { name: 'Taichung Beauty' })).toBeInTheDocument();
    expect(screen.getByText('Taiwan')).toBeInTheDocument();
    expect(screen.getAllByText('Special collection')).toHaveLength(8);
  });
});
