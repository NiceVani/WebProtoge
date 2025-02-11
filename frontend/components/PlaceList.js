export default function PlaceList({ places }) {
  return (
    <ul className="mt-4">
      {places && places.length > 0 ? (
        places.map((place, index) => (
          <li key={index} className="border p-2 mb-2">
            <h2 className="text-lg font-bold">{place.name_th} ({place.name_en})</h2>
            <p><strong>คำขวัญ:</strong> {place.motto_th} ({place.motto_en})</p>
            
            {/* ✅ แสดงหลายค่า (Array) */}
            <p><strong>ต้นไม้ประจำจังหวัด:</strong> {place.tree.length > 0 ? place.tree.join(", ") : "ไม่ระบุ"}</p>
            <p><strong>ดอกไม้ประจำจังหวัด:</strong> {place.flower.length > 0 ? place.flower.join(", ") : "ไม่ระบุ"}</p>

            <p><strong>ตราประจำจังหวัด:</strong> {place.seal_th} ({place.seal_en})</p>
            
            {/* ✅ แสดงชื่อจังหวัดโบราณ */}
            <p><strong>ชื่อจังหวัดโบราณ:</strong> 
              {place.traditional_names.length > 0 
                ? place.traditional_names.join(", ") 
                : "ไม่ระบุ"}
            </p>

            <p><strong>เว็บไซต์:</strong> 
              {place.website !== "N/A" 
                ? <a href={place.website} className="text-blue-500">{place.website}</a> 
                : "ไม่ระบุ"}
            </p>

            <p><strong>พิกัด:</strong> ละติจูด {place.latitude}, ลองจิจูด {place.longitude}</p>
          </li>
        ))
      ) : (
        <p>ไม่พบข้อมูลจังหวัด</p>
      )}
    </ul>
  );
}
