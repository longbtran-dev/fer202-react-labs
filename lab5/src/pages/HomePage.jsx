import { Link } from 'react-router-dom';
import OrchidsPresentation from '../components/OrchidsPresentation';
import { orchids } from '../data/ListOfOrchids';

export default function HomePage() {
  return (
    <>
      <header className="hero">
        <div className="hero__copy">
          <p className="eyebrow">Lab 5 · React Router, Formik & Yup</p>
          <h1>Navigate every specimen with dedicated routes.</h1>
          <p className="hero__intro">
            Transition seamlessly between the full catalog (<code>/</code>), wild species filtered via URL on{' '}
            <code>/naturals</code>, individual specimen profiles on <code>/detail/:id</code>, and the validated{' '}
            <code>/contact</code> page.
          </p>
          <div className="hero__cta-group">
            <Link className="hero__btn hero__btn--primary" to="/naturals">
              Explore Natural Orchids
            </Link>
            <Link className="hero__btn hero__btn--secondary" to="/contact">
              Contact Curator
            </Link>
          </div>
        </div>
        <div className="hero__note" aria-label="Lab focus">
          <span>05</span>
          <p>React Router · URL params · Natural filter · Formik & Yup Contact</p>
        </div>
      </header>

      <OrchidsPresentation
        eyebrow="Route: / (Index)"
        title="All sixteen orchids"
        subtitle={`${orchids.length} specimens · Natural & hybrid collection`}
        orchids={orchids}
      />
    </>
  );
}
