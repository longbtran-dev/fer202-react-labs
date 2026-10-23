import Button from 'react-bootstrap/Button';

// Component trình bày giỏ hàng: nhận dữ liệu (cartItems, summary) và các callback
// (onUpdateQuantity, onRemoveItem, onResetDemoCart) từ App thông qua props.
export default function ShoppingCart({
  cartItems,
  summary,
  onUpdateQuantity,
  onRemoveItem,
  onResetDemoCart
}) {
  return (
    <section className="cart-panel" aria-labelledby="cart-heading">
      {/* Tiêu đề khu vực giỏ hàng kèm huy hiệu tổng số sản phẩm */}
      <div className="panel-header">
        <div>
          <p className="eyebrow">Step 01 · useReducer State</p>
          <h2 id="cart-heading">Shopping Cart</h2>
        </div>
        <span className="cart-badge">
          {summary.totalQuantity} {summary.totalQuantity === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Toán tử 3 ngôi: nếu giỏ trống (length === 0) thì hiện thông báo và nút khôi phục giỏ mẫu,
          ngược lại thì dùng map() để render danh sách các món trong giỏ */}
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is currently empty. Add an orchid from the catalog above or restore the sample items.</p>
          <Button variant="outline-dark" size="sm" onClick={onResetDemoCart}>
            Restore sample cart
          </Button>
        </div>
      ) : (
        <ul className="cart-list" aria-label="Products in cart">
          {/* Duyệt qua từng phần tử trong giỏ hàng; key={item.id} giúp React định danh đúng dòng */}
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              {/* Cột trái: hiển thị tên sản phẩm và đơn giá (unit price) */}
              <div className="cart-item__info">
                <h3>{item.name}</h3>
                <p className="cart-item__unit-price">
                  Unit price: <strong>${item.price.toFixed(2)}</strong>
                </p>
              </div>

              {/* Cột phải: bộ điều chỉnh số lượng (- / ô nhập số / +), thành tiền từng dòng và nút Remove */}
              <div className="cart-item__controls">
                <div className="quantity-stepper" role="group" aria-label={`Quantity controls for ${item.name}`}>
                  {/* Nút giảm số lượng: bị khóa (disabled) khi số lượng đã giảm về 1 */}
                  <button
                    type="button"
                    className="qty-btn"
                    aria-label={`Decrease quantity for ${item.name}`}
                    disabled={item.quantity <= 1}
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  >
                    −
                  </button>
                  {/* Ô nhập số lượng trực tiếp: gọi onUpdateQuantity mỗi khi người dùng gõ số mới */}
                  <input
                    type="number"
                    min="1"
                    className="qty-input"
                    aria-label={`Quantity for ${item.name}`}
                    value={item.quantity}
                    onChange={(event) => onUpdateQuantity(item.id, event.target.value)}
                  />
                  {/* Nút tăng số lượng thêm 1 đơn vị */}
                  <button
                    type="button"
                    className="qty-btn"
                    aria-label={`Increase quantity for ${item.name}`}
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                {/* Thành tiền của riêng mặt hàng này = đơn giá * số lượng */}
                <p className="cart-item__line-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>

                {/* Nút xóa mặt hàng khỏi giỏ (phát sự kiện REMOVE_ITEM lên reducer) */}
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

      {/* Phần tổng kết giỏ hàng (Cart Summary): hiển thị tổng số lượng và tổng tiền */}
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
