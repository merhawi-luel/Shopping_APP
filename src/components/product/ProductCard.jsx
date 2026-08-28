export default function ProductCard({ product, dispatch, inCart }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <p className="product-title">{product.title}</p>
      <p className="product-price">${Number(product.price).toFixed(2)}</p>
      <button onClick={() => dispatch({ type: "ADD_ITEM", payload: product })}>
        {inCart ? `In cart (${inCart.quantity})` : "Add to cart"}
      </button>
    </div>
  );
}