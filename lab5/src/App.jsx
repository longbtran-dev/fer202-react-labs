// Routes đóng vai trò bộ chọn (switch) so khớp URL hiện tại với từng Route con.
// Route ánh xạ một đường dẫn (path) với một component giao diện (element).
import { Route, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import ContactPage from './pages/ContactPage';
import DetailPage from './pages/DetailPage';
import HomePage from './pages/HomePage';
import NaturalsPage from './pages/NaturalsPage';

export default function App() {
  return (
    <div className="app-shell" id="top">
      {/* AppNavbar đặt ngoài <Routes> để thanh menu luôn hiển thị cố định ở mọi trang */}
      <AppNavbar />

      <main>
        {/* Chỉ Route nào có path khớp với URL hiện tại mới được React Router render */}
        <Routes>
          {/* 1. Trang chủ Index (path="/") hiển thị toàn bộ 16 loài lan */}
          <Route path="/" element={<HomePage />} />

          {/* 2. Trang Natural (path="/naturals") chỉ lọc các loài lan có isNatural = true */}
          <Route path="/naturals" element={<NaturalsPage />} />
          <Route path="/naturals/:category" element={<NaturalsPage />} />

          {/* 3. Trang Detail hỗ trợ cả /detail?id=... lẫn dynamic param /detail/:id */}
          <Route path="/detail" element={<DetailPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />

          {/* 4. Trang Contact (path="/contact") hiển thị biểu mẫu Formik + Yup */}
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>FER202 · Lab 5</p>
        <p>React Router navigation + Formik & Yup Contact Form.</p>
      </footer>
    </div>
  );
}
