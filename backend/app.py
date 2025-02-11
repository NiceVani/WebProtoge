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
            
            # ดึงค่า traditional names และแยกภาษา
            has_traditional_names = getattr(province, "hasTraditionalNameOfProvince", [])
            traditional_names_en = [name for name in has_traditional_names if name.isascii()]  # ชื่ออังกฤษ
            traditional_names_th = [name for name in has_traditional_names if not name.isascii()]  # ชื่อไทย

            data = {
                "name_en": getattr(province, "hasNameOfProvince", ["Unknown"])[0],  
                "name_th": getattr(province, "hasNameOfProvince", ["Unknown"])[1] if len(getattr(province, "hasNameOfProvince", [])) > 1 else "Unknown",  
                "motto_en": getattr(province, "hasMotto", ["Unknown"])[0],
                "motto_th": getattr(province, "hasMotto", ["Unknown"])[1] if len(getattr(province, "hasMotto", [])) > 1 else "Unknown",
                "flower_en": getattr(province, "hasFlower", ["Unknown"])[0] if len(getattr(province, "hasFlower", [])) > 0 else "Unknown",
                "flower_th": getattr(province, "hasFlower", ["Unknown"])[1] if len(getattr(province, "hasFlower", [])) > 1 else "Unknown",
                "tree_en":  getattr(province, "hasTree", ["Unknown"])[0] if len(getattr(province, "hasTree", [])) > 0 else "Unknown",
                "tree_th":  getattr(province, "hasTree", ["Unknown"])[1] if len(getattr(province, "hasTree", [])) > 1 else "Unknown",
                "seal_en": getattr(province, "hasSeal", ["Unknown"])[0],
                "seal_th": getattr(province, "hasSeal", ["Unknown"])[1] if len(getattr(province, "hasSeal", [])) > 1 else "Unknown",
                "latitude": getattr(province, "hasLatitudeOfProvince", ["Unknown"])[0],
                "longitude": getattr(province, "hasLongitudeOfProvince", ["Unknown"])[0],
                "traditional_names_en": traditional_names_en,  # ✅ เก็บเป็น list
                "traditional_names_th": traditional_names_th,  # ✅ เก็บเป็น list
                "website": getattr(province, "hasURLOfProvince", "Unknown")  # ถ้าไม่มีให้เป็น Unknown
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
