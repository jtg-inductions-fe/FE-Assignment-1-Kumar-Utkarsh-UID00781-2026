import { enableScroll, disableScroll } from './utilities/toggleScroll';

const body = document.body;
const specialDealsDialog = document.querySelector('#special-deals-dialog');
const headerMenu = document.querySelector('.header__menu');
const toggleBtn = document.querySelector('.header__toggle-btn');

// Adding and Closing menu from toggle button
toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('toggle-btn--open');
    headerMenu.classList.toggle('menu--active');
    if (headerMenu.classList.contains('menu--active')) {
        disableScroll();
        toggleBtn.ariaExpanded = true;
        toggleBtn.ariaLabel = 'Close menu';
        headerMenu.inert = false;
    } else {
        enableScroll();
        toggleBtn.ariaExpanded = false;
        toggleBtn.ariaLabel = 'Open menu';
        headerMenu.inert = true;
    }
});

// Closing menu when clicking outside the menu on tablet view
body.addEventListener('click', (e) => {
    if (!headerMenu.classList.contains('menu--active')) return;
    if (!headerMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
        if (!specialDealsDialog.open) {
            enableScroll();
        }
        toggleBtn.ariaExpanded = false;
        toggleBtn.ariaLabel = 'Open menu';
        toggleBtn.classList.remove('toggle-btn--open');
        headerMenu.classList.remove('menu--active');
        headerMenu.inert = true;
    }
});
