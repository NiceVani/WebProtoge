export default function SearchBar({ query, setQuery, searchPlaces, language }) {
  return (
    <div className="flex space-x-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={language === "th" ? "ค้นหาจังหวัด..." : "Search for a province..."} // ✅ เปลี่ยน placeholder ตามภาษา
        className="border p-2 flex-grow"
      />
      <button onClick={searchPlaces} className="bg-blue-500 text-white p-2">
        {language === "th" ? "ค้นหา" : "Search"} {/* ✅ ปุ่มเปลี่ยนตามภาษา */}
      </button>
    </div>
  );
}
