import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import useCategories from "../hooks/useCatogories";
import useCart from "../hooks/useCart";
import SearchBar from "../components/shop/SearchBar";
import CategoryFilter from "../components/shop/CategoryFilter";
import SortSelect from "../components/shop/SortSelect";
import "./shop.css";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All categories";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("default");

  const { products, loading, error, refetch } = useProducts(category);
  const { categories: allCategories } = useCategories();
  const { dispatch, cartItems } = useCart();

  function handleCategoryChange(value) {
    setCategory(value);
    if (value === "All categories") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", value);
    }
    setSearchParams(searchParams);
  }

  const categories = [
    "All categories",
    ...allCategories,
  ];

 let filtered = (products || []).filter((p) => {
  const matchesCategory = category === "All categories" || p.category === category;
  const matchesSearch =
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.description?.toLowerCase().includes(search.toLowerCase());
  return matchesCategory && matchesSearch;
});
  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);

  return (
    <div className="shop-page">
      <div className="shop-toolbar">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter categories={categories} value={category} onChange={handleCategoryChange} />
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