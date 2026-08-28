export default function SortSelect({ value, onChange }) {
  return (
    <select
      className="shop-sort"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="default">Sort: default</option>
      <option value="price-asc">Price: low to high</option>
      <option value="price-desc">Price: high to low</option>
      <option value="name-asc">Name: A–Z</option>
      <option value="name-desc">Name: Z–A</option>
      <option value="rating-desc">Rating: high to low</option>
      <option value="rating-asc">Rating: low to high</option>
    </select>
  );
}