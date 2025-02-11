from flask import Flask, request, jsonify
from flask_cors import CORS
from owlready2 import get_ontology

app = Flask(__name__)
CORS(app)

# โหลด OWL
ontology = get_ontology("tourism.owl").load()
print("✅ OWL Loaded Successfully!")

# ฟังก์ชันดึงข้อมูลจังหวัดทั้งหมด
def get_provinces():
    provinces = []
    
    for province in ontology.individuals():
        if "ThaiProvince" in [cls.name for cls in province.is_a]:  # ตรวจสอบว่าเป็นจังหวัด
            data = {
                "name_en": getattr(province, "hasNameOfProvince", ["Unknown"])[0],  
                "name_th": getattr(province, "hasNameOfProvince", ["Unknown"])[1] if len(getattr(province, "hasNameOfProvince", [])) > 1 else "Unknown",  
                "motto_en": getattr(province, "hasMotto", ["Unknown"])[0],
                "motto_th": getattr(province, "hasMotto", ["Unknown"])[1] if len(getattr(province, "hasMotto", [])) > 1 else "Unknown",
                "flower": [f for f in getattr(province, "hasFlower", ["Unknown"])],  # รองรับหลายค่า
                "tree": [t for t in getattr(province, "hasTree", ["Unknown"])],  # รองรับหลายค่า
                "seal_en": getattr(province, "hasSeal", ["Unknown"])[0],
                "seal_th": getattr(province, "hasSeal", ["Unknown"])[1] if len(getattr(province, "hasSeal", [])) > 1 else "Unknown",
                "latitude": getattr(province, "hasLatitudeOfProvince", ["Unknown"])[0],
                "longitude": getattr(province, "hasLongitudeOfProvince", ["Unknown"])[0],
                "traditional_names": getattr(province, "hasTraditionalNameOfProvince", []),
                "website":getattr(province,"hasURLOfProvince",[])
            }
            provinces.append(data)
    
    return provinces


# API ดึงข้อมูลจังหวัดทั้งหมด
@app.route("/provinces", methods=["GET"])
def get_all_provinces():
    return jsonify(get_provinces())

# API ค้นหาจังหวัด
@app.route("/province", methods=["GET"])
def search_province():
    query = request.args.get("q", "").strip().lower()  # แปลงเป็นตัวพิมพ์เล็ก
    if not query:
        return jsonify({"error": "กรุณาใส่ชื่อจังหวัด"}), 400

    provinces = get_provinces()
    
    # 🔍 ค้นหาจาก: name_th, name_en, traditional_names
    results = [
        p for p in provinces
        if query in p["name_th"].lower()
        or query in p["name_en"].lower()
        or any(query in name.lower() for name in p.get("traditional_names", []))
    ]

    if results:
        return jsonify(results)
    else:
        return jsonify({"error": "ไม่พบข้อมูลจังหวัด"}), 404


if __name__ == "__main__":
    app.run(debug=True)
