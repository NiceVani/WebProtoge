# 🌍 WebProtoge  

WebProtoge เป็นโปรเจกต์ที่ใช้ **Flask (Python) + Next.js (React)** ในการแสดงข้อมูลจาก **OWL Ontology** พร้อมระบบค้นหาข้อมูลจังหวัด  

---

## 🚀 วิธีติดตั้งและใช้งาน  

### ✅ **1. Clone โปรเจกต์ และเข้าไปในโฟลเดอร์**
```sh
git clone https://github.com/NiceVani/WebProtoge.git
cd WebProtoge
```

### ✅ 2. ติดตั้งและรัน Backend (Flask API)

```sh
cd backend
pip install -r requirements.txt
python app.py

```
### 📌 API จะรันที่ http://localhost:5000
### ✅ 3. ติดตั้งและรัน Frontend (Next.js)
```sh
cd ../frontend
npm install
npm run dev

```
### 🌍 เข้าใช้งานที่ http://localhost:3000
## ⚡ การใช้งาน
หน้าเว็บจะแสดง ข้อมูลจังหวัด และมีระบบค้นหา
ค้นหาชื่อจังหวัดได้ทั้ง ไทย / อังกฤษ / ชื่อโบราณ
###  🔧 ปัญหาและวิธีแก้ไข
ModuleNotFoundError (ตอนรัน python app.py)
## 👉 ตรวจสอบว่า ติดตั้ง dependencies (pip install -r requirements.txt) แล้ว
Error: Port 3000 is already in use
## 👉 ใช้พอร์ตอื่น เช่น
npm run dev -- -p 4000
แล้วเข้า http://localhost:4000
## 🤝 Contributors
NiceVani
## 💡 สามารถ Fork / Pull Request ได้เลย! 🚀

## 🦉 เปลี่ยน OWL เป็นไฟล์อื่น
หากต้องการใช้ OWL ตัวอื่น ให้ทำดังนี้

1️ Export ไฟล์ OWL เป็น RDF/XML (จาก Protégé หรือแหล่งอื่น)

2️ นำไฟล์ .owl ที่ Export มา แทนที่ไฟล์เดิม (backend/tourism.owl)

3️ รีสตาร์ท Backend 
