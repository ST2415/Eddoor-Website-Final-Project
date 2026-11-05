// LIKE BUTTON
document.querySelectorAll('.btn-favorite').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        this.classList.toggle('is-active');
        // ตรวจสอบและสลับไอคอนของ Font Awesome
        const icon = this.querySelector('i');
        if (this.classList.contains('is-active')) {
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
        } else {
            icon.classList.remove('fa-solid');
            icon.classList.add('fa-regular');
        }
    });
});

// ฟังก์ชันแบ่งหน้า Pagination สไตล์เข้าใจง่ายสำหรับมือใหม่ฃ
function initPagination(cardSelector, itemsPerPage = 5, unitText = 'รายการ') {
    // 1. ดึงการ์ดทั้งหมด และปุ่มควบคุม
    const cards = document.querySelectorAll(cardSelector);
    const pageButtons = document.querySelectorAll('.pagination [data-page]');
    const prevBtn = document.querySelector('.pagination [data-page="prev"]');
    const nextBtn = document.querySelector('.pagination [data-page="next"]');
    const countInfo = document.querySelector('.activity-list_count, .pagination-info');

    if (cards.length === 0) return;

    let currentPage = 1;
    const totalPages = Math.ceil(cards.length / itemsPerPage);

    // 2. ฟังก์ชันแสดงการ์ดตามหน้าที่เลือก
    function showPage(page) {
        currentPage = page;

        // คำนวณช่วง เช่น หน้า 1 = ตัวที่ 0 ถึง 4, หน้า 2 = ตัวที่ 5 ถึง 9
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        // วนลูปการ์ด: ตัวที่อยู่ในช่วงให้แสดง นอกช่วงให้ซ่อน
        cards.forEach((card, index) => {
            if (index >= start && index < end) {
                card.style.display = ''; // แสดงตาม CSS ปกติ
            } else {
                card.style.display = 'none'; // ซ่อน
            }
        });

        // 3. ไฮไลต์ปุ่มตัวเลขที่กำลังเลือก (เติม/ลบ คลาส is-active)
        pageButtons.forEach(btn => {
            const pageNum = Number(btn.dataset.page);
            if (!isNaN(pageNum)) {
                btn.classList.toggle('is-active', pageNum === currentPage);
                btn.style.display = pageNum <= totalPages ? '' : 'none'; // ถ้าหน้าเกินให้ซ่อนปุ่ม
            }
        });

        // 4. คุมปุ่มก่อนหน้า - ถัดไป (ถ้าอยู่หน้าแรก/หน้าสุดท้ายให้กดไม่ได้)
        if (prevBtn) prevBtn.disabled = (currentPage === 1);
        if (nextBtn) nextBtn.disabled = (currentPage === totalPages);

        // 5. อัปเดตข้อความบอกจำนวนชิ้น
        if (countInfo) {
            const showingCount = Math.min(end, cards.length);
            countInfo.textContent = `แสดง ${start + 1}–${showingCount} จาก ${cards.length} ${unitText}`;
        }
    }

    // 6. ดักจับการคลิกปุ่มทั้งหมดใน Pagination
    const paginationContainer = document.querySelector('.pagination');
    if (paginationContainer) {
        paginationContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-page]');
            if (!btn || btn.disabled) return;

            const action = btn.dataset.page;
            if (action === 'prev') {
                if (currentPage > 1) showPage(currentPage - 1);
            } else if (action === 'next') {
                if (currentPage < totalPages) showPage(currentPage + 1);
            } else {
                showPage(Number(action));
            }
        });
    }

    // แสดงหน้า 1 เริ่มต้น
    showPage(1);
}