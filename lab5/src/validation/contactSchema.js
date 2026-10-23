import * as Yup from 'yup';

// Giá trị ban đầu của các trường trong Contact Form (trang /contact).
export const contactInitialValues = {
  name: '',     // Họ tên người liên hệ
  email: '',    // Địa chỉ email
  phone: '',    // Số điện thoại
  topic: '',    // Chủ đề cần tư vấn
  message: '',  // Nội dung tin nhắn
  agree: false  // Checkbox đồng ý chính sách bảo mật
};

// Bộ luật kiểm tra tính hợp lệ của Contact Form bằng Yup (Phần B của đề Lab 5).
export const contactValidationSchema = Yup.object({
  // Họ tên: bắt buộc, tối thiểu 2 ký tự
  name: Yup.string()
    .trim()
    .min(2, 'Your name must be at least 2 characters.')
    .required('Your name is required.'),

  // Email: bắt buộc, phải đúng cấu trúc email chuẩn
  email: Yup.string()
    .trim()
    .email('Please enter a valid email address.')
    .required('Email is required.'),

  // Số điện thoại: bắt buộc, khớp biểu thức chính quy 10–11 chữ số bắt đầu bằng số 0
  phone: Yup.string()
    .trim()
    .matches(/^0\d{9,10}$/, 'Phone number must be 10–11 digits starting with 0.')
    .required('Phone number is required.'),

  // Chủ đề: phải chọn một trong 3 chủ đề hợp lệ trong danh sách select
  topic: Yup.string()
    .oneOf(['General Inquiry', 'Natural Orchids', 'Cultivation Support'], 'Please select an inquiry topic.')
    .required('Please select an inquiry topic.'),

  // Nội dung tin nhắn: bắt buộc, tối thiểu 10 ký tự
  message: Yup.string()
    .trim()
    .min(10, 'Message must be at least 10 characters.')
    .required('Message is required.'),

  // Checkbox đồng ý điều khoản: bắt buộc phải có giá trị là true
  agree: Yup.boolean()
    .oneOf([true], 'You must agree to the privacy policy.')
    .required('You must agree to the privacy policy.')
});
