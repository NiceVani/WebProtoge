import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import PlaceList from "../components/PlaceList";

export default function Home() {

  const [places, setPlaces] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [language, setLanguage] = useState("th");
  const [selectedInfo, setSelectedInfo] = useState(""); // สิ่งที่ต้องการดู (เริ่มต้นเป็น คำขวัญ)
  // const [query, setQuery] = useState("");
  // const [error, setError] = useState("");
  //////////////////////////////////////
  //                                 //
  //  สำหรับอยากทำเป็น SearchBar      //
  //                                //
  ////////////////////////////////////


  // โหลดข้อมูลจังหวัดทั้งหมดเมื่อหน้าเว็บโหลด
  // useEffect(() => {
  //   fetch("http://localhost:5000/provinces")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (Array.isArray(data)) {
  //         setPlaces(data);
  //         setError("");
  //       } else {
  //         setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
  //       }
  //     })
  //     .catch(() => setError("ไม่สามารถโหลดข้อมูลจากเซิร์ฟเวอร์ได้"));
  // }, []);

  // ฟังก์ชันค้นหาจังหวัด
  // const searchPlaces = () => {
  //   if (!query.trim())  {
  //       fetch("http://localhost:5000/provinces")
  //         .then((res) => res.json())
  //         .then((data) => setPlaces(data))
  //         .catch((err) => console.error("Error loading provinces:", err));
  //       return;
  //     };

  //   fetch(`http://localhost:5000/province?q=${query}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (Array.isArray(data)) {
  //         setPlaces(data);
  //       } else {
  //         setPlaces([]); // ถ้าไม่เจอ ให้เป็น array ว่าง
  //       }
  //     })
  //     .catch((err) => console.error("Error searching province:", err));
  // };


  // return (
  //   <div className="max-w-3xl mx-auto p-4">
  //     <h1 className="text-2xl font-bold text-center">ค้นหาข้อมูลจังหวัด</h1>
  //     <div className="text-center my-4">
  //       <button
  //         className={`px-4 py-2 mx-2 border ${language === "th" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
  //         onClick={() => setLanguage("th")}
  //       >
  //         🇹🇭 ไทย
  //       </button>
  //       <button
  //         className={`px-4 py-2 mx-2 border ${language === "en" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
  //         onClick={() => setLanguage("en")}
  //       >
  //         🇬🇧 English
  //       </button>
  //     </div>

  //     <SearchBar query={query} setQuery={setQuery} searchPlaces={searchPlaces} language={language}/>
  //     {error && <p className="text-red-500 text-center">{error}</p>}
  //     <PlaceList places={places} language={language} />
  //   </div>
  // );

  useEffect(() => {
    fetch("http://localhost:5000/provinces")
      .then((res) => res.json())
      .then((data) => setPlaces(data))
      .catch((err) => console.error("Error loading provinces:", err));
  }, []);

  // **เมื่อเลือกจังหวัด**
  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
  };

  // **เมื่อเลือกสิ่งที่ต้องการดู**
  const handleInfoChange = (e) => {
    setSelectedInfo(e.target.value);
  };

  // หาจังหวัดที่ถูกเลือก
  const selectedPlace = places.find((p) => p.name_th === selectedProvince || p.name_en === selectedProvince);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center">
        {language === "th" ? "ค้นหาข้อมูลจังหวัด" : "Search for Provinces"}
      </h1>

      {/* ✅ ปุ่มเปลี่ยนภาษา */}
      <div className="flex justify-end">
        <button
          onClick={() => setLanguage(language === "th" ? "en" : "th")}
          className="p-2 bg-gray-200 rounded"
        >
          {language === "th" ? "Switch to English" : "เปลี่ยนเป็นภาษาไทย"}
        </button>
      </div>

      {/* ✅ Dropdown เลือกจังหวัด */}
      <div className="mt-4">
        <label className="block font-bold">{language === "th" ? "เลือกจังหวัด" : "Select Province"}:</label>
        <select value={selectedProvince} onChange={handleProvinceChange} className="border p-2 w-full">
          <option value="">{language === "th" ? "กรุณาเลือกจังหวัด" : "Please select a province"}</option>
          {places.map((place) => (
            <option key={place.name_th} value={language === "th" ? place.name_th : place.name_en}>
              {language === "th" ? place.name_th : place.name_en}
            </option>
          ))}
        </select>
      </div>

      {/* ✅ Dropdown เลือกสิ่งที่ต้องการดู */}
      <div className="mt-4">
        <label className="block font-bold">{language === "th" ? "เลือกข้อมูลที่ต้องการดู" : "Select Information"}:</label>
        <select value={selectedInfo} onChange={handleInfoChange} className="border p-2 w-full">
          <option value="">{language === "th" ? "" : ""}</option>
          <option value="motto">{language === "th" ? "คำขวัญ" : "Motto"}</option>
          <option value="tree">{language === "th" ? "ต้นไม้ประจำจังหวัด" : "Provincial Tree"}</option>
          <option value="flower">{language === "th" ? "ดอกไม้ประจำจังหวัด" : "Provincial Flower"}</option>
          <option value="seal">{language === "th" ? "ตราประจำจังหวัด" : "Provincial Seal"}</option>
          <option value="location">{language === "th" ? "พิกัด" : "Coordinates"}</option>
          <option value="website">{language === "th" ? "เว็บไซต์" : "Website"}</option>
          <option value="traditional">{language === "th" ? "ชื่อเก่า" : "Traditional Name"}</option>
        </select>
      </div>

      {/* ✅ แสดงข้อมูลที่เลือก */}
      <div className="mt-4 p-4 border">
        {selectedPlace ? (
          <>
            <h2 className="text-xl font-bold">{language === "th" ? selectedPlace.name_th : selectedPlace.name_en}</h2>
            <p>
              <strong>
                {language === "th" ? "ข้อมูล" : "Information"}:</strong>
              {selectedInfo === "motto" && (language === "th" ? selectedPlace.motto_th : selectedPlace.motto_en)}
              {selectedInfo === "tree" && (language === "th" ? selectedPlace.tree_th : selectedPlace.tree_en)}
              {selectedInfo === "flower" && (language === "th" ? selectedPlace.flower_th : selectedPlace.flower_en)}
              {selectedInfo === "seal" && (language === "th" ? selectedPlace.seal_th : selectedPlace.seal_en)}
             
              {selectedInfo === "location" && (
                language === "th"
                  ? `พิกัด: ละติจูด ${selectedPlace.latitude}, ลองจิจูด ${selectedPlace.longitude}`
                  : `Location: Latitude ${selectedPlace.latitude}, Longitude ${selectedPlace.longitude}`
              )}
              {selectedInfo === "website" && (
                <p>
                  {language === "th" ? "เว็บไซต์: " : "Website: "}
                  <a href={selectedPlace.website} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    {selectedPlace.website || "ไม่ระบุ"}
                  </a>
                </p>
              )}
              {selectedInfo === "traditional" && (
  <>
    <p>
      <strong>{language === "th" ? "ชื่อโบราณ:" : "Traditional Names:"}</strong>
    </p>
    <ul>
      {language === "th"
        ? [].concat(selectedPlace.traditional_names_th || []).map((name, index) => <li key={index}>{name}</li>)
        : [].concat(selectedPlace.traditional_names_en || []).map((name, index) => <li key={index}>{name}</li>)
      }
    </ul>
  </>
)}


            </p>
          </>
        ) : (
          <p>{language === "th" ? "กรุณาเลือกจังหวัด" : "Please select a province"}</p>
        )}
      </div>
    </div>
  );
}
