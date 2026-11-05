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