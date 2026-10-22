import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import App from './App';
import { calculateCartSummary, cartReducer, initialCartItems } from './reducer/cartReducer';

describe('Lab 4 cartReducer & checkout workflow', () => {
  afterEach(cleanup);

  it('manages cart state transitions with cartReducer', () => {
    const startState = [
      { id: 1, name: 'Taichung Beauty', price: 45, quantity: 1 },
      { id: 2, name: 'Moon Orchid', price: 38, quantity: 2 }
    ];

    // Update quantity
    const updatedState = cartReducer(startState, {
      type: 'UPDATE_QUANTITY',
      payload: { id: 1, quantity: 3 }
    });
    expect(updatedState.find((item) => item.id === 1).quantity).toBe(3);

    // Add existing item increments quantity
    const incrementedState = cartReducer(updatedState, {
      type: 'ADD_ITEM',
      payload: { id: 2, name: 'Moon Orchid', price: 38 }
    });
    expect(incrementedState.find((item) => item.id === 2).quantity).toBe(3);

    // Remove item
    const afterRemove = cartReducer(incrementedState, {
      type: 'REMOVE_ITEM',
      payload: { id: 1 }
    });
    expect(afterRemove).toHaveLength(1);
    expect(afterRemove[0].id).toBe(2);

    // Calculate summary
    const summary = calculateCartSummary(afterRemove);
    expect(summary).toEqual({ totalQuantity: 3, totalPrice: 114 });

    // Clear cart
    const cleared = cartReducer(afterRemove, { type: 'CLEAR_CART' });
    expect(cleared).toEqual([]);
  });

  it('displays initial cart items, updates quantity, removes items, and disables submit when empty', async () => {
    const user = userEvent.setup();
    render(<App />);

    const cartRegion = screen.getByRole('region', { name: /shopping cart/i });
    expect(within(cartRegion).getByText('Taichung Beauty')).toBeInTheDocument();
    expect(within(cartRegion).getByText('Moon Orchid')).toBeInTheDocument();

    // Increase quantity of Taichung Beauty
    await user.click(screen.getByRole('button', { name: /increase quantity for taichung beauty/i }));
    expect(screen.getByTestId('cart-total-quantity')).toHaveTextContent(
      String(initialCartItems.reduce((sum, i) => sum + i.quantity, 0) + 1)
    );

    // Remove all items in cart
    const removeButtons = within(cartRegion).getAllByRole('button', { name: /^remove /i });
    for (const btn of removeButtons) {
      await user.click(btn);
    }

    expect(within(cartRegion).getByText(/your cart is currently empty/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /place order/i })).toBeDisabled();
  });

  it('validates checkout fields using Yup and displays validation errors', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Type invalid short name, invalid email, invalid phone
    await user.type(screen.getByLabelText(/full name/i), 'Ab');
    await user.type(screen.getByLabelText(/email/i), 'invalid-email');
    await user.type(screen.getByLabelText(/phone/i), '12345');

    await user.click(screen.getByRole('button', { name: /place order/i }));

    expect(await screen.findByText(/full name must be at least 3 characters/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    expect(screen.getByText(/phone number must match 10–11 digits/i)).toBeInTheDocument();
    expect(screen.getByText(/shipping address is required/i)).toBeInTheDocument();
    expect(screen.getByText(/please select a payment method/i)).toBeInTheDocument();
    expect(screen.getByText(/you must agree to the terms and conditions/i)).toBeInTheDocument();
  });

  it('submits valid checkout form, shows order confirmation summary, and clears the cart', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/full name/i), 'Nguyen Van A');
    await user.type(screen.getByLabelText(/email/i), 'nguyenvana@fpt.edu.vn');
    await user.type(screen.getByLabelText(/phone/i), '0901234567');
    await user.type(screen.getByLabelText(/shipping address/i), 'Khu CNC Hoa Lac, Ha Noi');
    await user.click(screen.getByLabelText(/cash on delivery \(cod\)/i));
    await user.click(screen.getByLabelText(/i agree to the store terms/i));

    await user.click(screen.getByRole('button', { name: /place order/i }));

    const confirmation = await screen.findByRole('region', { name: /order confirmation summary/i });
    expect(within(confirmation).getByText('Nguyen Van A')).toBeInTheDocument();
    expect(within(confirmation).getByText('nguyenvana@fpt.edu.vn')).toBeInTheDocument();
    expect(within(confirmation).getByText('0901234567')).toBeInTheDocument();
    expect(within(confirmation).getByText('Khu CNC Hoa Lac, Ha Noi')).toBeInTheDocument();
    expect(within(confirmation).getByText('COD')).toBeInTheDocument();
    expect(within(confirmation).getByText('Taichung Beauty')).toBeInTheDocument();

    // Cart is cleared after successful submission
    const cartRegion = screen.getByRole('region', { name: /shopping cart/i });
    expect(within(cartRegion).getByText(/your cart is currently empty/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /place order/i })).toBeDisabled();
  });
});
