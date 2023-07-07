export function checkScreenSize() {
    const body = document.querySelector('body');
    if (window.innerWidth < 768) {
        body.classList.add('mobile');
        body.classList.remove('tablet', 'desktop');
    } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        body.classList.add('tablet');
        body.classList.remove('mobile', 'desktop');
    } else {
        body.classList.add('desktop');
        body.classList.remove('mobile', 'tablet');
    }
}

window.addEventListener('resize', checkScreenSize);
window.addEventListener('DOMContentLoaded', checkScreenSize);
