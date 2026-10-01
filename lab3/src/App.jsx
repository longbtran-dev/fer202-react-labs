import AppNavbar from './components/AppNavbar';
import OrchidsContainer from './components/OrchidsContainer';

export default function App() {
  return (
    <div className="app-shell" id="top">
      <AppNavbar />
      <header className="hero">
        <div className="hero__copy">
          <p className="eyebrow">Lab 3 · Context & Effect Hooks</p>
          <h1>A shared experience that remembers your choices.</h1>
          <p className="hero__intro">
            Authentication and theme live in Context, while effects keep both choices synchronized with
            localStorage across visits.
          </p>
          <a className="hero__link" href="#orchid-gallery">Explore the collection</a>
        </div>
        <div className="hero__note" aria-label="Lab focus">
          <span>01</span>
          <p>Context · useEffect · custom hook · persistence</p>
        </div>
      </header>

      <main id="orchid-gallery">
        <OrchidsContainer />
      </main>

      <footer className="footer">
        <p>FER202 · Lab 3</p>
        <p>Global state, side effects, and a reusable custom hook.</p>
      </footer>
    </div>
  );
}
