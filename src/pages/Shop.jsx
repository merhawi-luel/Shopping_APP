import { useState } from "react";
import useProducts from "../hooks/useProducts";
import useCart from "../hooks/useCart";
import SearchBar from "../components/shop/SearchBar";
import CategoryFilter from "../components/shop/CategoryFilter";
import SortSelect from "../components/shop/SortSelect";
import "./shop.css";

export default function Shop() {
  const { products, loading, error, refetch } = useProducts();
  const { dispatch, cartItems } = useCart();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const [sort, setSort] = useState("default");

  const categories = [
    "All categories",
    ...Array.from(new Set((products || []).map((p) => p.category).filter(Boolean))),
  ];

 let filtered = (products || []).filter((p) => {
  return (
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.description?.toLowerCase().includes(search.toLowerCase())
  );
});
  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);

  return (
    <div className="shop-page">
      <div className="shop-toolbar">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter categories={categories} value={category} onChange={setCategory} />
        <SortSelect value={sort} onChange={setSort} />
      </div>

      {error && (
        <div className="shop-error">
          <p>Something went wrong loading products.</p>
          <button onClick={refetch}>Retry</button>
        </div>
      )}

      <div className="product-grid">
        {loading &&
          Array.from({ length: 8 }).map((_, i) => (
            <div className="skeleton-card" key={i} />
          ))}

        {!loading &&
          !error &&
          filtered.map((product) => {
            const inCart = cartItems.find((item) => item.id === product.id);
            return (
              <div className="product-card" key={product.id}>
                <img src={product.image} alt={product.title} />
                <p className="product-title">{product.title}</p>
                <p className="product-price">${Number(product.price).toFixed(2)}</p>
                <button onClick={() => dispatch({ type: "ADD_ITEM", payload: product })}>
                  {inCart ? `In cart (${inCart.quantity})` : "Add to cart"}
                </button>
              </div>
            );
          })}

        {!loading && !error && filtered.length === 0 && (
          <p className="shop-empty">No products match your search.</p>
        )}
      </div>
    </div>
  );
}