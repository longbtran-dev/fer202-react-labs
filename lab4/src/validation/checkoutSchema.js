// Import toàn bộ thư viện Yup để định nghĩa tập luật kiểm tra dữ liệu (schema validation).
import * as Yup from 'yup';

// Giá trị khởi tạo ban đầu cho tất cả các trường trong Formik.
// Tên các thuộc tính ở đây phải trùng khớp 100% với thuộc tính name="..." của thẻ <Field />.
export const checkoutInitialValues = {
  fullName: '',      // Họ và tên khách hàng (chuỗi rỗng ban đầu)
  email: '',         // Địa chỉ email
  phone: '',         // Số điện thoại
  address: '',       // Địa chỉ giao hàng
  paymentMethod: '', // Phương thức thanh toán ('COD' hoặc 'Card')
  agreeTerms: false  // Trạng thái đồng ý điều khoản (checkbox nên khởi tạo là boolean false)
};

// Yup.object() định nghĩa schema kiểm tra cho một object tương ứng với checkoutInitialValues.
// Đề bài Lab 4 yêu cầu: mọi quy tắc kiểm tra dữ liệu chỉ được xử lý bởi Yup.
export const checkoutValidationSchema = Yup.object({
  // 1. Kiểm tra fullName: kiểu chuỗi, cắt khoảng trắng 2 đầu, tối thiểu 3 ký tự, bắt buộc nhập
  fullName: Yup.string()
    .trim()
    .min(3, 'Full name must be at least 3 characters.')
    .required('Full name is required.'),

  // 2. Kiểm tra email: kiểu chuỗi, đúng định dạng email chuẩn, bắt buộc nhập
  email: Yup.string()
    .trim()
    .email('Please enter a valid email address.')
    .required('Email is required.'),

  // 3. Kiểm tra phone: kiểu chuỗi, phải khớp biểu thức chính quy (bắt đầu bằng số 0, gồm 10–11 chữ số)
  phone: Yup.string()
    .trim()
    .matches(/^0\d{9,10}$/, 'Phone number must match 10–11 digits starting with 0.')
    .required('Phone number is required.'),

  // 4. Kiểm tra address: kiểu chuỗi, tối thiểu 5 ký tự, bắt buộc nhập
  address: Yup.string()
    .trim()
    .min(5, 'Shipping address must be at least 5 characters.')
    .required('Shipping address is required.'),

  // 5. Kiểm tra paymentMethod: chỉ chấp nhận 1 trong 2 giá trị 'COD' hoặc 'Card', bắt buộc chọn
  paymentMethod: Yup.string()
    .oneOf(['COD', 'Card'], 'Please select a payment method (COD or Card).')
    .required('Please select a payment method (COD or Card).'),

  // 6. Kiểm tra agreeTerms: kiểu boolean, bắt buộc phải có giá trị là true (đã đánh dấu tick)
  agreeTerms: Yup.boolean()
    .oneOf([true], 'You must agree to the terms and conditions before placing an order.')
    .required('You must agree to the terms and conditions before placing an order.')
});
