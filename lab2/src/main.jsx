import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import './styles.css';

// Bootstrap được nạp trước, styles.css nạp sau để CSS của dự án có thể
// tùy chỉnh giao diện mặc định của Modal, Button và Badge.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
