import { useReducer, useState } from 'react';
import CheckoutForm from './components/CheckoutForm';
import OrderConfirmation from './components/OrderConfirmation';
import ProductCatalog from './components/ProductCatalog';
import ShoppingCart from './components/ShoppingCart';
import { products } from './data/products';
import { calculateCartSummary, cartReducer, initialCartItems } from './reducer/cartReducer';

export default function App() {
  // useReducer gom toàn bộ thao tác thêm/sửa/xóa/làm trống giỏ hàng vào một
  // hàm reducer thuần, giúp luồng cập nhật state rõ ràng và dễ kiểm thử.
  const [cartItems, dispatch] = useReducer(cartReducer, initialCartItems);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const summary = calculateCartSummary(cartItems);

  function handleAddItem(product) {
    dispatch({ type: 'ADD_ITEM', payload: product });
  }

  function handleUpdateQuantity(id, quantity) {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  }

  function handleRemoveItem(id) {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  }

  function handleResetDemoCart() {
    dispatch({ type: 'RESET_DEMO_CART' });
  }

  function handleSubmitOrder(customerInfo) {
    // Lưu bản chụp (snapshot) của đơn hàng vừa đặt trước khi xóa giỏ hàng.
    setConfirmedOrder({
      customer: customerInfo,
      items: cartItems,
      summary,
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    dispatch({ type: 'CLEAR_CART' });
  }

  return (
    <div className="app-shell" id="top">
      <header className="app-navbar">
        <a className="app-navbar__brand" href="#top">
          <span aria-hidden="true">✿</span> Orchid Atelier · Checkout
        </a>
        <div className="app-navbar__status">
          <span>Cart: <strong>{summary.totalQuantity}</strong> items</span>
          <span>·</span>
          <span>Total: <strong>${summary.totalPrice.toFixed(2)}</strong></span>
        </div>
      </header>

      <section className="hero">
        <div className="hero__copy">
          <p className="eyebrow">Lab 4 · useReducer, Formik & Yup</p>
          <h1>Structured state meets declarative validation.</h1>
          <p className="hero__intro">
            Manage shopping cart transitions predictably with <code>useReducer</code>, validate customer checkout details
            strictly through <code>Yup</code> schemas in <code>Formik</code>, and confirm the completed order.
          </p>
        </div>
        <div className="hero__note" aria-label="Lab focus">
          <span>04</span>
          <p>useReducer · Formik · Yup schema · Order confirmation</p>
        </div>
      </section>

      <main>
        <OrderConfirmation order={confirmedOrder} />

        <div className="checkout-workspace">
          <ShoppingCart
            cartItems={cartItems}
            summary={summary}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onResetDemoCart={handleResetDemoCart}
          />
          <CheckoutForm
            isCartEmpty={cartItems.length === 0}
            onSubmitOrder={handleSubmitOrder}
          />
        </div>

        <ProductCatalog
          products={products}
          cartItems={cartItems}
          onAddItem={handleAddItem}
        />
      </main>

      <footer className="footer">
        <p>FER202 · Lab 4</p>
        <p>Shopping cart reducer + Formik & Yup checkout validation.</p>
      </footer>
    </div>
  );
}
