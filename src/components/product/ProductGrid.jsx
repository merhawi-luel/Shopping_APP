import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";

export default function ProductGrid({ products, loading, cartItems, dispatch }) {
  if (loading) {
    return (
      <div className="product-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return <p className="shop-empty">No products match your search.</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => {
        const inCart = cartItems.find((item) => item.id === product.id);
        return (
          <ProductCard
            key={product.id}
            product={product}
            dispatch={dispatch}
            inCart={inCart}
          />
        );
      })}
    </div>
  );
}