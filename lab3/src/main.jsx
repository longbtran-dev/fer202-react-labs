import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import AuthProvider from './context/AuthProvider';
import './styles.css';

// AuthProvider phải bọc App để mọi component con có thể đọc user/theme qua
// Context. Component nằm ngoài Provider sẽ không nhận được value này.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
