document.addEventListener('DOMContentLoaded', () => {
    // แลกรางวัล: การ์ด .reward-card หน้าละ 5 ชิ้น
    initPagination('.rewards-list .reward-card', 5, 'รายการรางวัล');
});