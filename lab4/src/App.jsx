// useReducer quản lý state phức tạp có nhiều thao tác; useState lưu đơn hàng vừa xác nhận.
import { useReducer, useState } from 'react';
import CheckoutForm from './components/CheckoutForm';
import OrderConfirmation from './components/OrderConfirmation';
import ProductCatalog from './components/ProductCatalog';
import ShoppingCart from './components/ShoppingCart';
import { products } from './data/products';
import { calculateCartSummary, cartReducer, initialCartItems } from './reducer/cartReducer';

export default function App() {
  // useReducer nhận (hàm reducer, state ban đầu) và trả về:
  // - cartItems: danh sách sản phẩm hiện tại trong giỏ hàng
  // - dispatch: hàm dùng để gửi một action ({ type, payload }) vào cartReducer
  const [cartItems, dispatch] = useReducer(cartReducer, initialCartItems);

  // confirmedOrder lưu thông tin đơn hàng sau khi người dùng submit thành công (ban đầu là null).
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Mỗi lần render, tính lại tổng số lượng (totalQuantity) và tổng tiền (totalPrice) từ cartItems.
  const summary = calculateCartSummary(cartItems);

  // Gửi action ADD_ITEM kèm sản phẩm được chọn vào cartReducer.
  function handleAddItem(product) {
    dispatch({ type: 'ADD_ITEM', payload: product });
  }

  // Gửi action UPDATE_QUANTITY kèm id sản phẩm và số lượng mới vào cartReducer.
  function handleUpdateQuantity(id, quantity) {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  }

  // Gửi action REMOVE_ITEM kèm id sản phẩm cần xóa khỏi giỏ hàng.
  function handleRemoveItem(id) {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  }

  // Gửi action RESET_DEMO_CART để khôi phục 3 sản phẩm mẫu ban đầu.
  function handleResetDemoCart() {
    dispatch({ type: 'RESET_DEMO_CART' });
  }

  // Được gọi khi Formik kiểm tra Yup hợp lệ 100% và người dùng bấm Place Order.
  function handleSubmitOrder(customerInfo) {
    // 1. Lưu bản chụp (snapshot) gồm thông tin khách hàng, các món đã đặt và tổng tiền
    // để hiển thị khối Order Confirmation Summary trên màn hình.
    setConfirmedOrder({
      customer: customerInfo,
      items: cartItems,
      summary,
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    // 2. Gửi action CLEAR_CART để làm trống giỏ hàng ngay sau khi đặt đơn thành công.
    dispatch({ type: 'CLEAR_CART' });
  }

  return (
    <div className="app-shell" id="top">
      {/* Thanh điều hướng trên cùng hiển thị nhanh tổng số món và tổng tiền hiện tại */}
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

      {/* Phần giới thiệu mục tiêu bài thực hành Lab 4 */}
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
        {/* Hiển thị bảng xác nhận đơn hàng khi confirmedOrder khác null */}
        <OrderConfirmation order={confirmedOrder} />

        {/* Khu vực chính chia 2 cột: bên trái là Giỏ hàng (useReducer), bên phải là Form (Formik + Yup) */}
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

        {/* Danh mục sản phẩm phía dưới để người học có thể thêm món mới vào giỏ bất kỳ lúc nào */}
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
