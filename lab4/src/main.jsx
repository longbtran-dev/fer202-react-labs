// StrictMode bật các kiểm tra phụ trong chế độ development để phát hiện sớm
// hàm reducer hoặc component không thuần khiết (impure).
import { StrictMode } from 'react';
// createRoot khởi tạo gốc React gắn với phần tử DOM thật trong index.html.
import { createRoot } from 'react-dom/client';
// Nạp CSS của Bootstrap trước để file styles.css bên dưới có thể ghi đè khi cần.
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import './styles.css';

// Tìm thẻ <div id="root"></div> trong index.html và render toàn bộ cây App vào đó.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
