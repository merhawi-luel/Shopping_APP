import { useState } from "react";
import useProducts from "../hooks/useProducts";
import useCart from "../hooks/useCart";
import SearchBar from "../components/shop/SearchBar";
import CategoryFilter from "../components/shop/CategoryFilter";
import SortSelect from "../components/shop/SortSelect";
import ProductGrid from "../components/product/ProductGrid";
import "../styles/shop.css";

export default function Shop() {
  const [category, setCategory] = useState("All categories");
  const { products, loading, error, refetch } = useProducts(category);
  const { dispatch, cartItems } = useCart();
  const [search, setSearch] = useState("");
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
  if (sort === "name-asc") filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
  if (sort === "name-desc") filtered = [...filtered].sort((a, b) => b.title.localeCompare(a.title));
  if (sort === "rating-desc") filtered = [...filtered].sort((a, b) => b.rating.rate - a.rating.rate);
  if (sort === "rating-asc") filtered = [...filtered].sort((a, b) => a.rating.rate - b.rating.rate);

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

      {!error && (
        <ProductGrid
          products={filtered}
          loading={loading}
          cartItems={cartItems}
          dispatch={dispatch}
        />
      )}
    </div>
  );
}