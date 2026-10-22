import Button from 'react-bootstrap/Button';

export default function ShoppingCart({
  cartItems,
  summary,
  onUpdateQuantity,
  onRemoveItem,
  onResetDemoCart
}) {
  return (
    <section className="cart-panel" aria-labelledby="cart-heading">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Step 01 · useReducer State</p>
          <h2 id="cart-heading">Shopping Cart</h2>
        </div>
        <span className="cart-badge">
          {summary.totalQuantity} {summary.totalQuantity === 1 ? 'item' : 'items'}
        </span>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is currently empty. Add an orchid from the catalog above or restore the sample items.</p>
          <Button variant="outline-dark" size="sm" onClick={onResetDemoCart}>
            Restore sample cart
          </Button>
        </div>
      ) : (
        <ul className="cart-list" aria-label="Products in cart">
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <div className="cart-item__info">
                <h3>{item.name}</h3>
                <p className="cart-item__unit-price">
                  Unit price: <strong>${item.price.toFixed(2)}</strong>
                </p>
              </div>

              <div className="cart-item__controls">
                <div className="quantity-stepper" role="group" aria-label={`Quantity controls for ${item.name}`}>
                  <button
                    type="button"
                    className="qty-btn"
                    aria-label={`Decrease quantity for ${item.name}`}
                    disabled={item.quantity <= 1}
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    className="qty-input"
                    aria-label={`Quantity for ${item.name}`}
                    value={item.quantity}
                    onChange={(event) => onUpdateQuantity(item.id, event.target.value)}
                  />
                  <button
                    type="button"
                    className="qty-btn"
                    aria-label={`Increase quantity for ${item.name}`}
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <p className="cart-item__line-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>

                <Button
                  variant="outline-danger"
                  size="sm"
                  className="remove-btn"
                  aria-label={`Remove ${item.name}`}
                  onClick={() => onRemoveItem(item.id)}
                >
                  Remove
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="cart-summary" aria-label="Cart summary">
        <div className="cart-summary__row">
          <span>Total quantity</span>
          <strong data-testid="cart-total-quantity">{summary.totalQuantity}</strong>
        </div>
        <div className="cart-summary__row cart-summary__row--total">
          <span>Total price</span>
          <strong data-testid="cart-total-price">${summary.totalPrice.toFixed(2)}</strong>
        </div>
      </div>
    </section>
  );
}
