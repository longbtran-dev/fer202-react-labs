import * as Yup from 'yup';

export const checkoutInitialValues = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  paymentMethod: '',
  agreeTerms: false
};

// Toàn bộ luật kiểm tra dữ liệu (validation rules) được xử lý duy nhất bởi Yup
// theo đúng yêu cầu đề Lab 4.
export const checkoutValidationSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .min(3, 'Full name must be at least 3 characters.')
    .required('Full name is required.'),
  email: Yup.string()
    .trim()
    .email('Please enter a valid email address.')
    .required('Email is required.'),
  phone: Yup.string()
    .trim()
    .matches(/^0\d{9,10}$/, 'Phone number must match 10–11 digits starting with 0.')
    .required('Phone number is required.'),
  address: Yup.string()
    .trim()
    .min(5, 'Shipping address must be at least 5 characters.')
    .required('Shipping address is required.'),
  paymentMethod: Yup.string()
    .oneOf(['COD', 'Card'], 'Please select a payment method (COD or Card).')
    .required('Please select a payment method (COD or Card).'),
  agreeTerms: Yup.boolean()
    .oneOf([true], 'You must agree to the terms and conditions before placing an order.')
    .required('You must agree to the terms and conditions before placing an order.')
});
