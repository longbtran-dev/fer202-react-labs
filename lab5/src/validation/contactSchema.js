import * as Yup from 'yup';

export const contactInitialValues = {
  name: '',
  email: '',
  phone: '',
  topic: '',
  message: '',
  agree: false
};

export const contactValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, 'Your name must be at least 2 characters.')
    .required('Your name is required.'),
  email: Yup.string()
    .trim()
    .email('Please enter a valid email address.')
    .required('Email is required.'),
  phone: Yup.string()
    .trim()
    .matches(/^0\d{9,10}$/, 'Phone number must be 10–11 digits starting with 0.')
    .required('Phone number is required.'),
  topic: Yup.string()
    .oneOf(['General Inquiry', 'Natural Orchids', 'Cultivation Support'], 'Please select an inquiry topic.')
    .required('Please select an inquiry topic.'),
  message: Yup.string()
    .trim()
    .min(10, 'Message must be at least 10 characters.')
    .required('Message is required.'),
  agree: Yup.boolean()
    .oneOf([true], 'You must agree to the privacy policy.')
    .required('You must agree to the privacy policy.')
});
