import { ErrorMessage, Field, Form, Formik } from 'formik';
import Button from 'react-bootstrap/Button';
import { checkoutInitialValues, checkoutValidationSchema } from '../validation/checkoutSchema';

export default function CheckoutForm({ isCartEmpty, onSubmitOrder }) {
  return (
    <section className="checkout-panel" aria-labelledby="checkout-heading">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Step 02 · Formik & Yup Validation</p>
          <h2 id="checkout-heading">Checkout Form</h2>
        </div>
      </div>

      <Formik
        initialValues={checkoutInitialValues}
        validationSchema={checkoutValidationSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmitOrder(values);
          resetForm();
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form noValidate className="checkout-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <Field
                id="fullName"
                name="fullName"
                type="text"
                placeholder="e.g. Nguyen Van A"
                className={`form-control ${touched.fullName && errors.fullName ? 'is-invalid' : ''}`}
              />
              <ErrorMessage name="fullName" component="div" className="field-error" />
            </div>

            <div className="form-row-two">
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

            <div className="form-group terms-group">
              <label className="checkbox-label" htmlFor="agreeTerms">
                <Field type="checkbox" id="agreeTerms" name="agreeTerms" />
                <span>I agree to the store terms and botanical care policy</span>
              </label>
              <ErrorMessage name="agreeTerms" component="div" className="field-error" />
            </div>

            {isCartEmpty && (
              <p className="empty-warning" role="status">
                Add at least one product to the cart to enable order submission.
              </p>
            )}

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
