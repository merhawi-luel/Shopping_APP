export default function ProductCard({ product, dispatch, inCart }) {
  const rounded = Math.round(product.rating?.rate ?? 0);

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <p className="product-title">{product.title}</p>
      <p className="product-price">${Number(product.price).toFixed(2)}</p>
      <p className="product-rating">
        <span className="stars">
          {"★".repeat(rounded)}
          {"☆".repeat(5 - rounded)}
        </span>
        <span className="rating-number">{product.rating?.rate?.toFixed(1) ?? "0.0"}</span>
      </p>
      <button onClick={() => dispatch({ type: "ADD_ITEM", payload: product })}>
        {inCart ? `In cart (${inCart.quantity})` : "Add to cart"}
      </button>
    </div>
  );
}