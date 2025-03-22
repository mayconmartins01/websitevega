// script.js

document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.querySelector('#mobile-menu');
    const menuToggle = document.querySelector('#menu-toggle');
    const header = document.querySelector('.header');

    if (!mobileMenu || !menuToggle || !header) {
        console.error('Elements not found:', { mobileMenu, menuToggle, header });
        return;
    }

    menuToggle.addEventListener('click', () => {
        const isOpen = header.classList.toggle('is-open');
        menuToggle.setAttribute('aria-expanded', isOpen);
        menuToggle.setAttribute('alt', isOpen ? 'Close Menu Icon' : 'Menu Toggle Icon');
        console.log(isOpen ? 'Menu opened' : 'Menu closed');
    });
});