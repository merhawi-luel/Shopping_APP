export default function SearchBar({ value, onChange }) {
  return (
    <input
      className="shop-search"
      placeholder="Search products"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}