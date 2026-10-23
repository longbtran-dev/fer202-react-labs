import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// BrowserRouter kết nối ứng dụng React với thanh địa chỉ URL của trình duyệt
// thông qua HTML5 History API (pushState, replaceState, popstate).
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import AuthProvider from './context/AuthProvider';
import './styles.css';

// Sử dụng import.meta.env.BASE_URL làm basename để BrowserRouter hoạt động
// chính xác cả khi chạy local ('/') và khi deploy trên GitHub Pages ('/fer202-react-labs/lab5/').
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
