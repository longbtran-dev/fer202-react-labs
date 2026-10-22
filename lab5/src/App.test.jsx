import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import App from './App';
import AuthProvider from './context/AuthProvider';
import { orchids } from './data/ListOfOrchids';

function renderAtRoute(initialEntry = '/') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MemoryRouter>
  );
}

describe('Lab 5 React Router, Formik & Yup', () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.theme;
  });

  afterEach(cleanup);

  it('renders all 16 orchids on Index route (/) and navigates to Detail via URL parameter', async () => {
    const user = userEvent.setup();
    renderAtRoute('/');

    expect(screen.getAllByRole('article')).toHaveLength(16);

    // Click Detail button for Taichung Beauty
    await user.click(screen.getByRole('link', { name: /detail for taichung beauty/i }));

    const detailRegion = await screen.findByRole('region', { name: /orchid detail/i });
    expect(within(detailRegion).getByRole('heading', { name: 'Taichung Beauty' })).toBeInTheDocument();
    expect(within(detailRegion).getByText('Taiwan')).toBeInTheDocument();
    expect(within(detailRegion).getByText('Cattleya')).toBeInTheDocument();
  });

  it('filters only natural orchids (isNatural = true) on /naturals route', async () => {
    const user = userEvent.setup();
    renderAtRoute('/');

    const naturalCount = orchids.filter((item) => item.isNatural).length;
    expect(naturalCount).toBeGreaterThan(0);
    expect(naturalCount).toBeLessThan(orchids.length);

    await user.click(screen.getByRole('link', { name: /^natural$/i }));

    expect(screen.getByRole('heading', { name: /natural orchids collection/i })).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(naturalCount);
  });

  it('supports direct URL parameter on /detail/:id and query parameter on /detail?id=', () => {
    renderAtRoute('/detail/3');
    expect(screen.getByRole('heading', { name: "Lady's Slipper" })).toBeInTheDocument();

    cleanup();
    renderAtRoute('/detail?id=7');
    expect(screen.getByRole('heading', { name: 'Vanda Blue Magic' })).toBeInTheDocument();
  });

  it('validates and submits the Contact Form at /contact using Formik and Yup', async () => {
    const user = userEvent.setup();
    renderAtRoute('/contact');

    expect(screen.getByRole('heading', { name: /contact the botanical curator/i })).toBeInTheDocument();

    // Submit empty form to trigger Yup validation errors
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/your name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/phone number is required/i)).toBeInTheDocument();
    expect(screen.getByText(/message is required/i)).toBeInTheDocument();
    expect(screen.getByText(/you must agree to the privacy policy/i)).toBeInTheDocument();

    // Fill valid contact form
    await user.type(screen.getByLabelText(/your name/i), 'Tran Minh Long');
    await user.type(screen.getByLabelText(/email address/i), 'longtm@fpt.edu.vn');
    await user.type(screen.getByLabelText(/phone number/i), '0912345678');
    await user.selectOptions(screen.getByLabelText(/inquiry topic/i), 'Natural Orchids');
    await user.type(
      screen.getByLabelText(/your message/i),
      'I would like to learn more about natural Paphiopedilum care in Vietnam.'
    );
    await user.click(screen.getByLabelText(/i agree to the terms and privacy policy/i));

    await user.click(screen.getByRole('button', { name: /send message/i }));

    const confirmation = await screen.findByRole('status', { name: /contact confirmation/i });
    expect(within(confirmation).getByText(/tran minh long/i)).toBeInTheDocument();
    expect(within(confirmation).getByText(/longtm@fpt.edu.vn/i)).toBeInTheDocument();
  });
});
