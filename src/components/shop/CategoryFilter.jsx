export default function CategoryFilter({ categories, value, onChange }) {
  return (
    <select
      className="shop-filter"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {categories.map((c) => (
        <option key={c}>{c}</option>
      ))}
    </select>
  );
}