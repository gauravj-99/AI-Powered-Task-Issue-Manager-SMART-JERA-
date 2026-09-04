function Navbar({
  search = "",
  setSearch = () => {},
  placeholder = "Search..."
}) {
  return (
    <div className="bg-white shadow rounded-xl p-4 flex justify-between items-center mb-6">
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="border p-2 rounded-lg w-72"
      />
    </div>
  );
}

export default Navbar;