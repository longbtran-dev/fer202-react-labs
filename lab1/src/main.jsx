import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

// React chỉ quản lý giao diện nằm bên trong thẻ #root của index.html.
// StrictMode hỗ trợ phát hiện cách dùng React chưa an toàn khi development;
// nó không tạo thêm phần tử nhìn thấy trên giao diện production.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
