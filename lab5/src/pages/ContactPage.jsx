import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { contactInitialValues, contactValidationSchema } from '../validation/contactSchema';

export default function ContactPage() {
  // Lưu thông tin liên hệ vừa gửi thành công để hiển thị hộp thông báo xác nhận.
  const [submittedData, setSubmittedData] = useState(null);

  return (
    <section className="contact-page" aria-labelledby="contact-heading">
      <div className="contact-grid">
        {/* Cột trái: Giới thiệu trang liên hệ và thông tin vườn lan */}
        <div className="contact-intro">
          <p className="eyebrow">Route: /contact · Formik & Yup</p>
          <h1 id="contact-heading">Contact the Botanical Curator</h1>
          <p className="contact-intro__lead">
            Have a question about natural orchid habitats, conservation ethics, or specimen care? Complete the
            Formik form validated with Yup below.
          </p>

          <dl className="contact-details">
            <div>
              <dt>Conservatory Address</dt>
              <dd>FPT University Botanical Studio, Hoa Lac Hi-Tech Park</dd>
            </div>
            <div>
              <dt>Curator Email</dt>
              <dd>curator@orchid-atlas.edu.vn</dd>
            </div>
            <div>
              <dt>Visiting Hours</dt>
              <dd>Monday – Saturday · 08:30 – 17:30</dd>
            </div>
          </dl>
        </div>

        {/* Cột phải: Biểu mẫu liên hệ quản lý bằng Formik và kiểm tra lỗi bằng Yup */}
        <div className="contact-panel">
          {/* Hiển thị thông báo xác nhận sau khi người dùng gửi biểu mẫu hợp lệ */}
          {submittedData && (
            <div className="contact-confirmation" role="status" aria-label="Contact confirmation">
              <h2>Message Received</h2>
              <p>
                Thank you, <strong>{submittedData.name}</strong> ({submittedData.email}). Our curator will reply
                regarding <strong>{submittedData.topic}</strong> at <strong>{submittedData.phone}</strong>.
              </p>
            </div>
          )}

          {/* Formik tự động kiểm tra dữ liệu theo contactValidationSchema trước khi gọi onSubmit */}
          <Formik
            initialValues={contactInitialValues}
            validationSchema={contactValidationSchema}
            onSubmit={(values, { resetForm }) => {
              setSubmittedData(values); // Lưu dữ liệu vừa gửi để hiển thị lời cảm ơn
              resetForm();              // Làm mới các trường trong form về trạng thái ban đầu
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form noValidate className="contact-form">
                {/* 1. Họ và tên */}
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Tran Minh Long"
                    className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name="name" component="div" className="field-error" />
                </div>

                <div className="form-row-two">
                  {/* 2. Địa chỉ Email */}
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@fpt.edu.vn"
                      className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage name="email" component="div" className="field-error" />
                  </div>

                  {/* 3. Số điện thoại */}
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <Field
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="0912345678"
                      className={`form-control ${touched.phone && errors.phone ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage name="phone" component="div" className="field-error" />
                  </div>
                </div>

                {/* 4. Chủ đề liên hệ (render thẻ <select> bằng as="select") */}
                <div className="form-group">
                  <label htmlFor="topic">Inquiry Topic</label>
                  <Field
                    as="select"
                    id="topic"
                    name="topic"
                    className={`form-select ${touched.topic && errors.topic ? 'is-invalid' : ''}`}
                  >
                    <option value="">Select a topic...</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Natural Orchids">Natural Orchids</option>
                    <option value="Cultivation Support">Cultivation Support</option>
                  </Field>
                  <ErrorMessage name="topic" component="div" className="field-error" />
                </div>

                {/* 5. Nội dung tin nhắn (render thẻ <textarea> bằng as="textarea") */}
                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <Field
                    as="textarea"
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us which orchid species you are researching..."
                    className={`form-control ${touched.message && errors.message ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name="message" component="div" className="field-error" />
                </div>

                {/* 6. Checkbox đồng ý điều khoản và chính sách bảo mật */}
                <div className="form-group">
                  <label className="checkbox-label" htmlFor="agree">
                    <Field type="checkbox" id="agree" name="agree" />
                    <span>I agree to the terms and privacy policy</span>
                  </label>
                  <ErrorMessage name="agree" component="div" className="field-error" />
                </div>

                <Button type="submit" className="submit-contact-btn" disabled={isSubmitting}>
                  Send Message
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
}
