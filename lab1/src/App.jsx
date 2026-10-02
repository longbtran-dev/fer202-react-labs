import OrchidsContainer from './components/OrchidsContainer';

// App chỉ ghép các khu vực lớn của trang. OrchidsContainer lấy/cung cấp dữ liệu,
// còn OrchidsPresentation và OrchidCard chịu trách nhiệm render dữ liệu đó.
export default function App() {
  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero__copy">
          <p className="eyebrow">Lab 1 · React Components</p>
          <h1>An orchid atlas, composed one component at a time.</h1>
          <p className="hero__intro">
            The container owns the collection. The presentation layer turns the same data into a calm,
            responsive gallery of sixteen orchids.
          </p>
          <a className="hero__link" href="#orchid-gallery">Explore the collection</a>
        </div>
        <div className="hero__note" aria-label="Lab focus">
          <span>01</span>
          <p>Props · map() · component composition</p>
        </div>
      </header>

      <main id="orchid-gallery">
        {/* Dùng component giống một thẻ HTML tự định nghĩa. */}
        <OrchidsContainer />
      </main>

      <footer className="footer">
        <p>FER202 · Lab 1</p>
        <p>Built with reusable React components.</p>
      </footer>
    </div>
  );
}
