import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import useCart from "../hooks/useCart";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const { dispatch, cartItems } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!product) return;
    async function fetchRelated() {
      try {
        const res = await axios.get(
          `https://fakestoreapi.com/products/category/${product.category}`
        );
        setRelated(res.data.filter((p) => p.id !== product.id));
      } catch {
        setRelated([]);
      }
    }
    fetchRelated();
  }, [product]);

  const inCart = product && cartItems.find((item) => item.id === product.id);

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="product-detail">
          <div className="pd-image-skeleton" />
          <div className="pd-info-skeleton">
            <div className="pd-skel-line pd-skel-line--lg" />
            <div className="pd-skel-line pd-skel-line--sm" />
            <div className="pd-skel-line pd-skel-line--md" />
            <div className="pd-skel-line pd-skel-line--full" />
            <div className="pd-skel-line pd-skel-line--full" />
            <div className="pd-skel-line pd-skel-line--full" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-detail-page">
        <div className="pd-error">
          <p>Something went wrong loading this product.</p>
          <Link to="/shop">Back to shop</Link>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="product-detail-page">
      <Link to="/shop" className="pd-back">
        ← Back to shop
      </Link>

      <div className="product-detail">
        <div className="pd-image-wrap">
          <img src={product.image} alt={product.title} className="pd-image" />
        </div>

        <div className="pd-info">
          <span className="pd-category">{product.category}</span>
          <h1 className="pd-title">{product.title}</h1>
          <p className="pd-price">${Number(product.price).toFixed(2)}</p>
          <div className="pd-rating">
            <span className="pd-stars">
              {"★".repeat(Math.round(product.rating?.rate ?? 0))}
              {"☆".repeat(5 - Math.round(product.rating?.rate ?? 0))}
            </span>
            <span className="pd-rating-text">
              {product.rating?.rate} ({product.rating?.count} reviews)
            </span>
          </div>
          <p className="pd-description">{product.description}</p>
          <button
            className="pd-add-btn"
            onClick={() => dispatch({ type: "ADD_ITEM", payload: product })}
          >
            {inCart ? `In cart (${inCart.quantity})` : "Add to cart"}
          </button>
        </div>
      </div>

      {related.length > 0 && (
        <section className="pd-related">
          <h2>You may also like</h2>
          <div className="pd-related-grid">
            {related.map((p) => (
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
      )}
    </div>
  );
}