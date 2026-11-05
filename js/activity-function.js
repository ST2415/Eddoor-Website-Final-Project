//SCRIPT จัดการแบ่งหน้า 4 Pagination, คัดกรอง และสลับหน้า
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('activityGrid');
    const form = document.getElementById('activityFilterForm');
    const keyword = document.getElementById('filterKeyword');
    const category = document.getElementById('filterCategory');
    const sortSelect = document.getElementById('activitySort');
    const emptyMsg = document.getElementById('activityEmpty');
    const countText = document.getElementById('activityCount');
    const pagination = document.querySelector('.pagination');
     const allLinks = Array.from(grid.querySelectorAll('.activity-card-link'));
    const numberButtons = Array.from(pagination.querySelectorAll('[data-page]'))
        .filter(b => !isNaN(Number(b.dataset.page)));
    const PER_PAGE = 6;
    let currentPage = 1;
     // ปุ่มหัวใจ Favorite (กดแล้วไม่ให้เปิดลิงก์หน้ารายละเอียด)
    grid.addEventListener('click', (e) => {
        const favBtn = e.target.closest('.btn-favorite');
        if (favBtn) {
            e.preventDefault();
            e.stopPropagation();
            favBtn.classList.toggle('is-active');
            const icon = favBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-regular');
                icon.classList.toggle('fa-solid');
            }
        }
    });
     function render() {
        const q = keyword.value.trim().toLowerCase();
        const cat = category.value;
        const isFiltered = Boolean(q || cat);
         // คัดกรองตามชื่อกิจกรรมหรือหมวดหมู่
        const matchedLinks = allLinks.filter(link => {
            const matchText = !q || link.dataset.title.toLowerCase().includes(q);
            const matchCat = !cat || link.dataset.category === cat;
            return matchText && matchCat;
        });
         const totalMatched = matchedLinks.length;
        const totalPages = Math.max(1, Math.ceil(totalMatched / PER_PAGE));
         if (currentPage > totalPages) currentPage = 1;
         // ซ่อนการ์ดทั้งหมด แล้วแสดงเฉพาะ 6 ใบของหน้าที่เลือก
        allLinks.forEach(link => link.style.display = 'none');
         const startIndex = (currentPage - 1) * PER_PAGE;
        const endIndex = startIndex + PER_PAGE;
        const pagedItems = matchedLinks.slice(startIndex, endIndex);
         pagedItems.forEach(link => {
            link.style.display = 'block';
        });
         // อัปเดตข้อความจำนวนรายการ
        emptyMsg.hidden = totalMatched > 0;
        if (totalMatched === 0) {
            countText.textContent = 'ไม่พบกิจกรรมที่ตรงกับการค้นหา';
        } else if (isFiltered) {
            countText.textContent = `พบ ${totalMatched} กิจกรรม (แสดง ${startIndex + 1}–${Math.min(endIndex, totalMatched)})`;
        } else {
            countText.textContent = `แสดง ${startIndex + 1}–${Math.min(endIndex, totalMatched)} จาก ${allLinks.length} กิจกรรม`;
        }
         // สลับสถานะของปุ่มตัวเลข (1, 2, 3, 4)
        numberButtons.forEach(btn => {
            const pageVal = Number(btn.dataset.page);
            btn.classList.toggle('is-active', pageVal === currentPage);
            btn.style.display = pageVal <= totalPages ? '' : 'none';
        });
         // คุมปุ่มก่อนหน้า/ถัดไป
        const prevBtn = pagination.querySelector('[data-page="prev"]');
        const nextBtn = pagination.querySelector('[data-page="next"]');
        if (prevBtn) prevBtn.disabled = currentPage === 1;
        if (nextBtn) nextBtn.disabled = currentPage === totalPages || totalMatched === 0;
    }
     form.addEventListener('submit', e => {
        e.preventDefault();
        currentPage = 1;
        render();
    });
     keyword.addEventListener('input', () => {
        currentPage = 1;
        render();
    });
     category.addEventListener('change', () => {
        currentPage = 1;
        render();
    });
     sortSelect.addEventListener('change', () => {
        if (sortSelect.value === 'date') {
            allLinks.sort((a, b) => a.dataset.date.localeCompare(b.dataset.date));
        } else {
            allLinks.sort((a, b) => b.dataset.date.localeCompare(a.dataset.date));
        }
        allLinks.forEach(item => grid.appendChild(item));
        render();
    });
     pagination.addEventListener('click', e => {
        const btn = e.target.closest('[data-page]');
        if (!btn || btn.disabled) return;
        const value = btn.dataset.page;
        if (value === 'prev') currentPage = Math.max(1, currentPage - 1);
        else if (value === 'next') currentPage++;
        else currentPage = Number(value);
        render();
    });
     render();
});