const fs = require('fs');

const databaseFile = 'cow.json'

// ฟังก์ชันโหลดข้อมูลวัวจากไฟล์ JSON
function loadCows() {
    try {
        const data = fs.readFileSync(databaseFile); // อ่านข้อมูลจากไฟล์
        return JSON.parse(data); // แปลงข้อมูล JSON เป็นออบเจ็กต์ JavaScript
    } catch (err) {
        return []; // ถ้าเกิดข้อผิดพลาดในการอ่านไฟล์ ให้คืนค่าเป็น array ว่าง
    }
}

// ฟังก์ชันบันทึกข้อมูลวัวลงในไฟล์ JSON
function saveCows(cows) {
    const data = JSON.stringify(cows); // แปลงออบเจ็กต์ JavaScript เป็นข้อมูล JSON
    fs.writeFileSync(databaseFile, data); // เขียนข้อมูลลงในไฟล์
}

// ฟังก์ชันค้นหาวัวตาม ID
function getCowById(cowId) {
    const cows = loadCows(); // โหลดข้อมูลวัวทั้งหมด
    return cows.find(cow => cow.id === cowId); // ค้นหาวัวที่มี ID ตรงกัน
}

// ฟังก์ชันคำนวณปริมาณน้ำนมที่วัวแต่ละตัวผลิตได้
function calculateMilkYield(cow) {
    const ageInmonths = cow.age.years * 12 + cow.age.months; // คำนวณอายุวัวเป็นเดือน

    switch (cow.color) {
        case 'white':
            // วัวสีขาว: ปริมาณน้ำนมลดลงตามอายุ (เดือน) แต่ไม่ติดลบ
            return Math.max(0, 120 - ageInmonths);
        case 'brown':
            // วัวสีน้ำตาล: ปริมาณน้ำนมลดลงตามอายุ (ปี) แต่ไม่ติดลบ
            return Math.max(0, 40 - cow.age.years);
        case 'pink':
            // วัวสีชมพู: ปริมาณน้ำนมลดลงตามอายุ (เดือน) แต่ไม่ติดลบ
            return Math.max(0, 30 - cow.age.months);
        default:
            // สีอื่นๆ: ไม่ผลิตน้ำนม
            return 0;
    }
}

// ฟังก์ชันคำนวณปริมาณน้ำนมรวมทั้งหมด
function getTotalMilkYield() {
    const cows = loadCows(); // โหลดข้อมูลวัวทั้งหมด
    let total = 0;
    cows.forEach(cow => {
        total += calculateMilkYield(cow); // รวมปริมาณน้ำนมจากวัวแต่ละตัว
    });
    return total;
}

// ฟังก์ชันสร้างข้อมูลวัวตัวอย่าง
function createSampleCows() {
    const colors = ['white', 'brown', 'pink'];
    const cows = [];

    for (let i = 0; i < 15; i++) {
        const color = colors[i % 3]; // สุ่มสีจาก array
        const years = Math.floor(Math.random() * 11); // สุ่มอายุ (ปี)
        const months = Math.floor(Math.random() * 12); // สุ่มอายุ (เดือน)
        // สร้าง ID ไม่ซ้ำ
        const id = generateUniqueId();

        cows.push({
            id,
            color,
            age: { years, months }
        });
    }
    saveCows(cows); // บันทึกข้อมูลวัวตัวอย่างลงในไฟล์
}

// ฟังก์ชันสร้าง ID ที่ไม่ซ้ำกัน
function generateUniqueId() {
    let id;
    do {
        id = Math.floor(10000000 + Math.random() * 90000000).toString(); // สร้าง ID แบบสุ่ม
    } while (getCowById(id)); // ตรวจสอบว่า ID ไม่ซ้ำ ถ้าซ้ำ ให้สร้างใหม่
    return id;
}

// สร้างข้อมูลวัวตัวอย่างเมื่อเริ่มต้น
createSampleCows();

// ส่งออกฟังก์ชันที่จำเป็นสำหรับการใช้งานภายนอก
module.exports = {
    getCowById,
    calculateMilkYield,
    getTotalMilkYield
};