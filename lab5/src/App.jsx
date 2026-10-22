import { Route, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import ContactPage from './pages/ContactPage';
import DetailPage from './pages/DetailPage';
import HomePage from './pages/HomePage';
import NaturalsPage from './pages/NaturalsPage';

export default function App() {
  return (
    <div className="app-shell" id="top">
      <AppNavbar />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/naturals" element={<NaturalsPage />} />
          <Route path="/naturals/:category" element={<NaturalsPage />} />
          <Route path="/detail" element={<DetailPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
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
