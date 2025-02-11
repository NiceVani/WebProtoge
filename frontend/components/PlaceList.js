export default function PlaceList({ places, language }) {
  return (
    <ul className="mt-4">
      {places && places.length > 0 ? (
        places.map((place, index) => (
          <li key={index} className="border p-2 mb-2">
            <h2 className="text-lg font-bold">
              {language === "th" ? place.name_th : place.name_en}
            </h2>

            {place.traditional_name && (
              <p>
                <strong>{language === "th" ? "ชื่อโบราณ:" : "Traditional Name:"}</strong>{" "}
                {place.traditional_name.join(", ")}
              </p>
            )}

            <p>
              <strong>{language === "th" ? "คำขวัญ:" : "Motto:"}</strong>{" "}
              {language === "th" ? place.motto_th : place.motto_en}
            </p>

            <p>
              <strong>{language === "th" ? "ต้นไม้ประจำจังหวัด:" : "Provincial Tree:"}</strong>{" "}
              {place.tree.length > 0 ? (language === "th" ? place.tree[1] : place.tree[0]) : language === "th" ? "ไม่ระบุ" : "Not specified"}
            </p>
            <p>
              <strong>{language === "th" ? "ดอกไม้ประจำจังหวัด:" : "Provincial Flower:"}</strong>{" "}
              {place.flower.length > 0 ? (language === "th" ? place.flower[1] : place.flower[0]) : language === "th" ? "ไม่ระบุ" : "Not specified"}
            </p>


            <p>
              <strong>{language === "th" ? "ตราประจำจังหวัด:" : "Provincial Seal:"}</strong>{" "}
              {language === "th" ? place.seal_th : place.seal_en}
            </p>

            <p>
              <strong>{language === "th" ? "พิกัด:" : "Coordinates:"}</strong>
              {language === "th" ? "ละติจูด" : "Latitude"} {place.latitude},
              {language === "th" ? "ลองจิจูด" : "Longitude"} {place.longitude}
            </p>
            <p><strong>{language === "th" ? "เว็บไซต์: " : "Website: "}</strong>
              {place.website !== "N/A"
                ? <a href={place.website} className="text-blue-500">{place.website}</a>
                : "ไม่ระบุ"}
            </p>
          </li>
        ))
      ) : (
        <p>{language === "th" ? "ไม่พบข้อมูลจังหวัด" : "No province data found"}</p>
      )}
    </ul>
  );
}