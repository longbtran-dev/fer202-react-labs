// Các component có sẵn của Formik giúp tự động kết nối input với state và hiển thị lỗi:
// - Formik: quản lý vòng đời form (values, errors, touched, validation, submit)
// - Form: thẻ <form> đã gắn sẵn onSubmit={handleSubmit} và onReset={handleReset}
// - Field: tự động gắn value, onChange, onBlur dựa theo thuộc tính name="..."
// - ErrorMessage: tự động hiển thị thông báo lỗi từ Yup khi trường đó đã chạm (touched) và có lỗi
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Button from 'react-bootstrap/Button';
import { checkoutInitialValues, checkoutValidationSchema } from '../validation/checkoutSchema';

// Nhận 2 props từ App:
// - isCartEmpty: boolean cho biết giỏ hàng có đang trống hay không (để khóa nút Submit)
// - onSubmitOrder: hàm callback chạy khi form hợp lệ và người dùng gửi đơn
export default function CheckoutForm({ isCartEmpty, onSubmitOrder }) {
  return (
    <section className="checkout-panel" aria-labelledby="checkout-heading">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Step 02 · Formik & Yup Validation</p>
          <h2 id="checkout-heading">Checkout Form</h2>
        </div>
      </div>

      {/* Khởi tạo Formik với giá trị ban đầu (initialValues) và bộ luật Yup (validationSchema).
          Hàm onSubmit chỉ được Formik gọi khi TẤT CẢ các trường đều vượt qua kiểm tra của Yup. */}
      <Formik
        initialValues={checkoutInitialValues}
        validationSchema={checkoutValidationSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmitOrder(values); // Gửi dữ liệu khách hàng đã hợp lệ lên App
          resetForm();           // Xóa trắng các ô input về giá trị ban đầu sau khi đặt hàng
        }}
      >
        {/* Render prop của Formik cung cấp errors (lỗi từng trường), touched (đã chạm vào chưa)
            và isSubmitting (đang trong quá trình gửi form) */}
        {({ errors, touched, isSubmitting }) => (
          // noValidate tắt popup kiểm tra mặc định của trình duyệt để dùng hoàn toàn lỗi từ Yup
          <Form noValidate className="checkout-form">
            {/* 1. Trường Full Name (bắt buộc, tối thiểu 3 ký tự) */}
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <Field
                id="fullName"
                name="fullName"
                type="text"
                placeholder="e.g. Nguyen Van A"
                className={`form-control ${touched.fullName && errors.fullName ? 'is-invalid' : ''}`}
              />
              {/* Hiển thị câu thông báo lỗi của Yup cho trường fullName nếu không hợp lệ */}
              <ErrorMessage name="fullName" component="div" className="field-error" />
            </div>

            <div className="form-row-two">
              {/* 2. Trường Email (bắt buộc, đúng định dạng email) */}
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="email" component="div" className="field-error" />
              </div>

              {/* 3. Trường Phone (bắt buộc, khớp mẫu regex 10–11 chữ số bắt đầu bằng 0) */}
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <Field
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="0901234567"
                  className={`form-control ${touched.phone && errors.phone ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="phone" component="div" className="field-error" />
              </div>
            </div>

            {/* 4. Trường Address (bắt buộc, render dưới dạng thẻ <textarea> nhờ as="textarea") */}
            <div className="form-group">
              <label htmlFor="address">Shipping Address</label>
              <Field
                as="textarea"
                id="address"
                name="address"
                rows={2}
                placeholder="Street, Ward, District, City"
                className={`form-control ${touched.address && errors.address ? 'is-invalid' : ''}`}
              />
              <ErrorMessage name="address" component="div" className="field-error" />
            </div>

            {/* 5. Trường Payment Method: dùng 2 radio button cùng name="paymentMethod" với value COD / Card */}
            <fieldset className="form-group payment-fieldset">
              <legend>Payment Method</legend>
              <div className="payment-options">
                <label className="payment-option" htmlFor="payment-cod">
                  <Field type="radio" id="payment-cod" name="paymentMethod" value="COD" />
                  <span>Cash on Delivery (COD)</span>
                </label>
                <label className="payment-option" htmlFor="payment-card">
                  <Field type="radio" id="payment-card" name="paymentMethod" value="Card" />
                  <span>Credit / Debit Card (Card)</span>
                </label>
              </div>
              <ErrorMessage name="paymentMethod" component="div" className="field-error" />
            </fieldset>

            {/* 6. Trường Agree Terms: checkbox bắt buộc phải được đánh dấu tick (agreeTerms === true) */}
            <div className="form-group terms-group">
              <label className="checkbox-label" htmlFor="agreeTerms">
                <Field type="checkbox" id="agreeTerms" name="agreeTerms" />
                <span>I agree to the store terms and botanical care policy</span>
              </label>
              <ErrorMessage name="agreeTerms" component="div" className="field-error" />
            </div>

            {/* Thông báo nhắc người dùng khi giỏ hàng đang trống */}
            {isCartEmpty && (
              <p className="empty-warning" role="status">
                Add at least one product to the cart to enable order submission.
              </p>
            )}

            {/* Yêu cầu đề bài: Nút Submit bắt buộc phải bị khóa (disabled) nếu giỏ hàng đang trống */}
            <Button
              type="submit"
              className="submit-order-btn"
              disabled={isCartEmpty || isSubmitting}
            >
              Place Order
            </Button>
          </Form>
        )}
      </Formik>
    </section>
  );
}
