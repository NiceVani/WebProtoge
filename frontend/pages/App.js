import React, { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const search = async () => {
    const res = await axios.get(`http://localhost:5000/search?q=${query}`);
    setResults(res.data);
  };

  return (
    <div>
      <h1>ค้นหาสถานที่ท่องเที่ยว</h1>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={search}>ค้นหา</button>

      <ul>
        {results.map((item, index) => (
          <li key={index}>{item.name} - {item.province}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
