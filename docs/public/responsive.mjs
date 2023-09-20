export function checkScreenSize() {
    const html = document.querySelector('html');
    if (window.innerWidth < 768) {
      html.classList.add('mobile');
      html.classList.remove('tablet', 'desktop');
    } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
      html.classList.add('tablet');
      html.classList.remove('mobile', 'desktop');
    } else {
      html.classList.add('desktop');
      html.classList.remove('mobile', 'tablet');
    }
  }
  
  window.addEventListener('resize', checkScreenSize);
  window.addEventListener('DOMContentLoaded', checkScreenSize);
  