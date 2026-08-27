import { Link } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import useCategories from "../hooks/useCatogories";
import "../styles/Home.css";


export default function Home() {
  const { products, loading } = useProducts();
  const { categories } = useCategories();
  const featured = products.slice(0, 6);

  return (
    <div className="home-page">
      <section className="hero-banner">
        <h1>Welcome to the Shop</h1>
        <p>Find what you need, at prices you'll love.</p>
        <Link to="/shop">Shop now</Link>
      </section>

      <section className="category-grid">
        <h2>Shop by Category</h2>
        <div className="category-grid-items">
          {categories.map((category) => (
            <Link to="/shop" className="category-card" key={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Link>
          ))}
        </div>
      </section>

      <section className="featured-products">
        <h2>Featured Products</h2>
        {loading && <p>Loading...</p>}
        <div className="product-grid">
          {featured.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.title} />
              <p className="product-title">{product.title}</p>
              <p className="product-price">${product.price}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-cta">
        <h2>Explore Our Full Collection</h2>
        <p>Discover quality products curated just for you.</p>
        <Link to="/shop">Browse the Shop</Link>
      </section>
    </div>
  );
}