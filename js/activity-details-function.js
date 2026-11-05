/* เปลี่ยนรูปใหญ่เมื่อคลิกรูปย่อ */
document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.getElementById('detailMainImage');
    const thumbs = document.querySelectorAll('.detail-gallery_thumb')
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            mainImage.src = thumb.dataset.full;
            thumbs.forEach(t => t.classList.remove('is-active'));
            thumb.classList.add('is-active');
        });
    });
});