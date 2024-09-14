const cowModel = require('./cow'); // นำเข้าโมดูล cow ที่สร้างไว้ก่อนหน้า

// ฟังก์ชันหลักสำหรับประมวลผล ID วัว
function processCowId() {
    const cowId = document.getElementById('cowIdInput').value; // รับค่า ID วัวจาก input ใน HTML

    // ตรวจสอบความถูกต้องของ ID วัว (ต้องเป็นตัวเลข 8 หลัก และขึ้นต้นด้วย 1-9)
    if (!/^[1-9]\d{7}$/.test(cowId)) {
        displayError("รหัสวัวไม่ถูกต้อง"); // แสดงข้อผิดพลาดถ้า ID ไม่ถูกต้อง
        return;
    }

    const cow = cowModel.getCowById(cowId); // ค้นหาวัวตาม ID

    if (!cow) {
        displayError("ไม่พบวัวตามรหัสนี้"); // แสดงข้อผิดพลาดถ้าไม่พบวัว
    } else {
        const milkYield = cowModel.calculateMilkYield(cow); // คำนวณปริมาณน้ำนมของวัวตัวนี้
        const totalMilkYield = cowModel.getTotalMilkYield(); // คำนวณปริมาณน้ำนมรวมทั้งหมด
        displayResult(cow, milkYield, totalMilkYield); // แสดงผลลัพธ์
    }
}

// ฟังก์ชันแสดงข้อผิดพลาด
function displayError(message) {
    document.getElementById('error').textContent = message; // กำหนดข้อความแสดงข้อผิดพลาด
    document.getElementById('error').style.display = 'block'; // แสดงข้อผิดพลาด
    document.getElementById('result').style.display = 'none'; // ซ่อนผลลัพธ์
}

// ฟังก์ชันแสดงผลลัพธ์
function displayResult(cow, milkYield, totalMilkYield) {
    document.getElementById('cowIdResult').textContent = cow.id; // แสดง ID วัว
    document.getElementById('cowColorResult').textContent = cow.color; // แสดงสีวัว
    document.getElementById('cowAgeResult').textContent = `${cow.age.years} ปี ${cow.age.months} เดือน`; // แสดงอายุวัว
    document.getElementById('milkYieldResult').textContent = milkYield; // แสดงปริมาณน้ำนมของวัวตัวนี้
    // Display total milk yield
    document.getElementById('totalMilkYieldResult').textContent = totalMilkYield // แสดงปริมาณน้ำนมรวมทั้งหมด
    document.getElementById('error').style.display = 'none'; // ซ่อนข้อผิดพลาด
    document.getElementById('result').style.display = 'block'; // แสดงผลลัพธ์
}