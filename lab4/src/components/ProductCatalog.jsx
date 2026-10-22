const fallbackImage = `${import.meta.env.BASE_URL}orchid-placeholder.svg`;

export default function ProductCatalog({ products, cartItems, onAddItem }) {
  function showFallback(event) {
    event.currentTarget.onerror = null;
    event.currentTarget.src = fallbackImage;
  }

  return (
    <section className="catalog-section" aria-labelledby="catalog-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Botanical Shop · Available Specimens</p>
          <h2 id="catalog-heading">Add orchids to your cart</h2>
        </div>
        <p>{products.length} curated orchids ready for dispatch</p>
      </div>

      <div className="catalog-grid">
        {products.map((product) => {
          const inCart = cartItems.find((item) => item.id === product.id);
          return (
            <article key={product.id} className="catalog-card">
              <div className="catalog-card__image-wrap">
                <img src={product.image} alt={`${product.name} orchid`} onError={showFallback} />
                <span className="catalog-card__price">${product.price}</span>
              </div>
              <div className="catalog-card__body">
                <p className="catalog-card__meta">{product.category} · {product.origin}</p>
                <h3>{product.name}</h3>
                <button
                  type="button"
                  className="add-cart-btn"
                  onClick={() => onAddItem(product)}
                  aria-label={`Add ${product.name} to cart`}
                >
                  {inCart ? `In cart (${inCart.quantity}) · Add +1` : 'Add to cart +'}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
