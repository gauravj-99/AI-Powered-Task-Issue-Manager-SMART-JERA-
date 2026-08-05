function Navbar() {
  return (
    <div className="bg-white shadow rounded-xl p-4 flex justify-between items-center mb-6">

      {/* <div>
        <h1 className="text-2xl font-bold">
          Dashboard
        </h1>
      </div> */}

      <div>
        <input
          type="text"
          placeholder="Search..."
          className="border p-1 rounded-lg"
        />
      </div>

    </div>
  );
}

export default Navbar;