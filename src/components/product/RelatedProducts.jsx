import { Link } from "react-router-dom";

export default function RelatedProducts({ products }) {
  if (products.length === 0) return null;

  return (
    <section className="pd-related">
      <h2>You may also like</h2>
      <div className="pd-related-grid">
        {products.map((p) => (
          <Link to={`/shop/${p.id}`} className="pd-related-card" key={p.id}>
            <div className="pd-related-img-wrap">
              <img src={p.image} alt={p.title} />
            </div>
            <p className="pd-related-title">{p.title}</p>
            <p className="pd-related-price">${Number(p.price).toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}