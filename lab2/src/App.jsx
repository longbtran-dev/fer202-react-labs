import OrchidsContainer from './components/OrchidsContainer';

export default function App() {
  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero__copy">
          <p className="eyebrow">Lab 2 · useState</p>
          <h1>One collection. Sixteen stories waiting to open.</h1>
          <p className="hero__intro">
            Select any orchid to place it in component state. React then re-renders a focused detail view
            inside a Bootstrap modal.
          </p>
          <a className="hero__link" href="#orchid-gallery">Explore the collection</a>
        </div>
        <div className="hero__note" aria-label="Lab focus">
          <span>01</span>
          <p>useState · events · React Bootstrap Modal</p>
        </div>
      </header>

      <main id="orchid-gallery">
        <OrchidsContainer />
      </main>

      <footer className="footer">
        <p>FER202 · Lab 2</p>
        <p>State connects the selected card to its modal.</p>
      </footer>
    </div>
  );
}
