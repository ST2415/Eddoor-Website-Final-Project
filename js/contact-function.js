// ชุดข้อมูลคำถามแบบประเมินความพึงพอใจ 5 ข้อ
const quizData = [
    {
        step: "1 / 5 ข้อ",
        title: "ความรู้สึกหลังทำกิจกรรมหรือใช้งานเว็บ Eddoor ของคุณคือแบบไหน?",
        options: [
            "สนุกมาก! ชอบมากเลย อยากให้มีกิจกรรมอื่นอีก",
            "ได้เรียนรู้อะไรใหม่ๆ เพียบเลย",
            "ก็โอเคนะ ชิลๆ ได้ห่างหน้าจอซะที",
            "ยังเฉยๆ หรือมีแอบงงนิดหน่อย",
            "ไม่เข้าใจเลยว่าต้องทำอะไรบ้างหรือไม่ชอบเท่าไหร่",
            "อื่นๆ"
        ]
    },
    {
        step: "2 / 5 ข้อ",
        title: "หมวดหมู่กิจกรรมแบบไหนที่คุณสนใจอยากลองเข้าร่วมมากที่สุด?",
        options: [
            "กิจกรรมกลางแจ้ง / เดินป่า / ท่องเที่ยวธรรมชาติ",
            "เวิร์กช็อปศิลปะ / งานคราฟต์ / ออกแบบ UI/UX",
            "กิจกรรมบอร์ดเกม / การ์ดเกม / E-Sports",
            "จิตอาสา / พัฒนาสังคมและสิ่งแวดล้อม",
            "ดนตรี / การแสดง / อีเวนต์รวมพล",
            "อื่นๆ"
        ]
    },
    {
        step: "3 / 5 ข้อ",
        title: "คุณคิดว่าระบบสะสมและแลก COIN ของ Eddoor เป็นอย่างไรบ้าง?",
        options: [
            "ใช้งานง่าย แลกของรางวัลคุ้มค่ามาก",
            "อยากให้เพิ่มของรางวัลหลากหลายมากกว่านี้",
            "สะสมยากไปหน่อย อยากให้ได้ COIN ง่ายขึ้น",
            "ยังไม่เคยทดลองใช้ระบบแลก COIN",
            "อยากให้มีโบนัส COIN จากกิจกรรมพิเศษเพิ่มขึ้น",
            "อื่นๆ"
        ]
    },
    {
        step: "4 / 5 ข้อ",
        title: "อะไรคือสิ่งที่ทำให้คุณอยากเข้าร่วมกิจกรรมกับ Eddoor?",
        options: [
            "อยากค้นหาตัวเองและลองทำสิ่งใหม่ๆ",
            "อยากเจอเพื่อนใหม่ที่มีความสนใจตรงกัน",
            "สนใจระบบรางวัลและ COIN สะสม",
            "มีรุ่นพี่หรือเพื่อนแนะนำมา",
            "อยากได้เกียรติบัตร / ผลงานลง Portfolio",
            "อื่นๆ"
        ]
    },
    {
        step: "5 / 5 ข้อ",
        title: "คุณมีโอกาสจะแนะนำเว็บ Eddoor ให้เพื่อนหรือคนรู้จักมากน้อยแค่ไหน?",
        options: [
            "แนะนำแน่นอน! (10/10)",
            "น่าจะแนะนำนะ (7-9/10)",
            "ดูๆ ก่อน ขอใช้งานเพิ่มอีกนิด (4-6/10)",
            "ยังไม่แนะนำเท่าไหร่ (1-3/10)",
            "ขอคิดดูก่อน",
            "อื่นๆ"
        ]
    }
];

let currentQuestion = 0;
// อ้างอิง DOM Elements
const quizStep = document.getElementById("quizStep");
const quizTitle = document.getElementById("quizTitle");
const optionsGrid = document.getElementById("optionsGrid");
const btnNext = document.getElementById("btnNext");
const surveyQuizBox = document.getElementById("surveyQuizBox");
const surveySuccessBox = document.getElementById("surveySuccessBox");

// ฟังก์ชันเรนเดอร์ข้อคำถาม
function renderQuestion(index) {
    const currentData = quizData[index];
    
    quizStep.innerText = currentData.step;
    quizTitle.innerText = currentData.title;
    optionsGrid.innerHTML = "";
    btnNext.disabled = true; // ปิดปุ่มจนกว่าจะคลิกเลือกตอบ
    // สลับข้อความบนปุ่มในข้อสุดท้าย
    if (index === quizData.length - 1) {
        btnNext.innerHTML = 'เสร็จสิ้น <i class="fa-solid fa-check"></i>';
    } else {
        btnNext.innerHTML = 'ถัดไป <i class="fa-solid fa-angle-right"></i>';
    }
    // สร้างการ์ดตัวเลือก 6 ข้อ
    currentData.options.forEach((optText, i) => {
        const label = document.createElement("label");
        label.className = "option-card";
        
        label.innerHTML = `
            <input type="radio" name="feedback_quiz" value="${i + 1}">
            <span>${optText}</span>
        `;
        // เมื่อคลิกเลือกตัวเลือก ปลดล็อกปุ่มให้กดไปต่อได้
        label.addEventListener("click", () => {
            btnNext.disabled = false;
        });
        optionsGrid.appendChild(label);
    });
}

// Event Listener เมื่อกดปุ่มถัดไป / เสร็จสิ้น
btnNext.addEventListener("click", () => {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        renderQuestion(currentQuestion);
    } else {
        // เมื่อทำครบ 5 ข้อ เปลี่ยนไปแสดงหน้าขอบคุณ +20 COIN
        surveyQuizBox.style.display = "none";
        surveySuccessBox.style.display = "block";
    }
});
// เริ่มต้นเรนเดอร์คำถามข้อที่ 1 เมื่อโหลดหน้าเว็บสำเร็จ
document.addEventListener("DOMContentLoaded", () => {
    renderQuestion(0);
});