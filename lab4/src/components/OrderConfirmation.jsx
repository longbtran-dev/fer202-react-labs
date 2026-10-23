// Component hiển thị bảng tóm tắt xác nhận đơn hàng (Order Confirmation Summary)
// ngay sau khi người dùng gửi biểu mẫu thanh toán thành công.
export default function OrderConfirmation({ order }) {
  // Nếu chưa có đơn hàng nào được đặt (order === null) thì không render gì cả.
  if (!order) return null;

  // Tách thông tin khách hàng, danh sách món đã mua, tổng kết và thời gian đặt từ prop order.
  const { customer, items, summary, submittedAt } = order;

  return (
    <section className="confirmation-banner" aria-labelledby="confirmation-heading">
      <div className="confirmation-banner__header">
        <div>
          <p className="eyebrow">Order Confirmed · Thank You</p>
          <h2 id="confirmation-heading">Order Confirmation Summary</h2>
        </div>
        <span className="confirmation-time">{submittedAt}</span>
      </div>

      <div className="confirmation-grid">
        {/* Khối 1: Thông tin khách hàng vừa nhập từ Formik */}
        <div className="confirmation-card">
          <h3>Customer Information</h3>
          <dl className="confirmation-dl">
            <div><dt>Full Name</dt><dd>{customer.fullName}</dd></div>
            <div><dt>Email</dt><dd>{customer.email}</dd></div>
            <div><dt>Phone</dt><dd>{customer.phone}</dd></div>
            <div><dt>Address</dt><dd>{customer.address}</dd></div>
            <div><dt>Payment Method</dt><dd>{customer.paymentMethod}</dd></div>
          </dl>
        </div>

        {/* Khối 2: Danh sách sản phẩm trong đơn hàng, tổng số lượng và tổng tiền */}
        <div className="confirmation-card">
          <h3>Ordered Items</h3>
          <ul className="confirmation-items">
            {items.map((item) => (
              <li key={item.id}>
                <div>
                  <span>{item.name}</span>{' '}
                  <small>× {item.quantity}</small>
                </div>
                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
              </li>
            ))}
          </ul>
          <div className="confirmation-totals">
            <div>
              <span>Total Quantity</span>
              <strong>{summary.totalQuantity}</strong>
            </div>
            <div>
              <span>Total Price</span>
              <strong>${summary.totalPrice.toFixed(2)}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
