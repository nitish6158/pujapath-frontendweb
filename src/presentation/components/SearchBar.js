function SearchBar({ onChange, placeholder, value }) {
  return (
    <label className="search-bar">
      <span>⌕</span>
      <input
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export default SearchBar;
