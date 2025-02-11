import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import PlaceList from "../components/PlaceList";

export default function Home() {
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState("");

  // โหลดข้อมูลจังหวัดทั้งหมดเมื่อหน้าเว็บโหลด
  useEffect(() => {
    fetch("http://localhost:5000/provinces")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPlaces(data);
          setError("");
        } else {
          setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
        }
      })
      .catch(() => setError("ไม่สามารถโหลดข้อมูลจากเซิร์ฟเวอร์ได้"));
  }, []);

  // ฟังก์ชันค้นหาจังหวัด
  const searchPlaces = () => {
    if (!query.trim())  {
        fetch("http://localhost:5000/provinces")
          .then((res) => res.json())
          .then((data) => setPlaces(data))
          .catch((err) => console.error("Error loading provinces:", err));
        return;
      };
  
    fetch(`http://localhost:5000/province?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPlaces(data);
        } else {
          setPlaces([]); // ถ้าไม่เจอ ให้เป็น array ว่าง
        }
      })
      .catch((err) => console.error("Error searching province:", err));
  };
  
  
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center">ค้นหาข้อมูลจังหวัด</h1>
      <SearchBar query={query} setQuery={setQuery} searchPlaces={searchPlaces} />
      {error && <p className="text-red-500 text-center">{error}</p>}
      <PlaceList places={places} />
    </div>
  );
}
