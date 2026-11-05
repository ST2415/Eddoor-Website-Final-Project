const itemsPerPage = 5;
let currentPage = 1;

const cards = document.querySelectorAll('.rewards-list .reward-card');
const totalPages = Math.ceil(cards.length / itemsPerPage);
const pageButtons = document.querySelectorAll('.pagination-nav .page-number');
const prevBtn = document.getElementById('prevPageBtn');
const nextBtn = document.getElementById('nextPageBtn');
const paginationInfo = document.getElementById('paginationInfo');

function renderPage(page) {
    currentPage = page;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

     // วนลูปการ์ด: แสดงเฉพาะชิ้นที่อยู่ในช่วง index ของหน้านั้นๆ
    cards.forEach((card, index) => {
        if (index >= startIndex && index < endIndex) {
            card.style.display = ''; // ใช้ค่า display ปกติตาม CSS
        } else {
            card.style.display = 'none'; // ซ่อนส่วนเกิน
        }
    });

     // สลับสถานะ active ของปุ่มตัวเลข
    pageButtons.forEach(btn => {
        const btnPage = parseInt(btn.getAttribute('data-page'));
        if (btnPage === currentPage) {
            btn.classList.add('is-active');
        } else {
            btn.classList.remove('is-active');
        }
    });

     // อัปเดตข้อความบอกจำนวน
    if (paginationInfo) {
        const currentShowing = Math.min(endIndex, cards.length);
        paginationInfo.textContent = `แสดง ${startIndex + 1} - ${currentShowing} จาก ${cards.length} รายการรางวัล`;
    }
}

// คลิกปุ่มตัวเลข (1, 2, 3)
pageButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = parseInt(btn.getAttribute('data-page'));
        renderPage(targetPage);
    });
});

// ปุ่ม "ก่อนหน้า"
if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 1) renderPage(currentPage - 1);
    });
}

// ปุ่ม "ถัดไป"
if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < totalPages) renderPage(currentPage + 1);
    });
}

// เริ่มต้นแสดงผลหน้าแรก
renderPage(1);