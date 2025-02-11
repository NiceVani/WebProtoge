export default function SearchBar({ query, setQuery, searchPlaces }) {
  return (
    <div className="my-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="ค้นหาจังหวัด..."
        className="border p-2 w-full"
      />
      <button onClick={searchPlaces} className="bg-blue-500 text-white px-4 py-2 mt-2">
        ค้นหา
      </button>
    </div>
  );
}
