const body = document.body;

// HEADER MENU INTERACTIONS
// DOM Nodes
const headerMenu = document.querySelector('.header__menu');
const toggleBtn = document.querySelector('.header__toggle-btn');

// Functions for Enabling and Disabling scroll when menu is open
function preventDefault(e) {
    e.preventDefault();
}

function disableScroll() {
    body.addEventListener('touchmove', preventDefault, {
        passive: false,
    });
    body.addEventListener('wheel', preventDefault, {
        passive: false,
    });
}

function enableScroll() {
    body.removeEventListener('touchmove', preventDefault);
    body.removeEventListener('wheel', preventDefault);
}

// Adding and Closing menu from toggle button
toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('open');
    headerMenu.classList.toggle('active');
    if (headerMenu.classList.contains('active')) {
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
    if (!headerMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
        enableScroll();
        toggleBtn.ariaExpanded = false;
        toggleBtn.ariaLabel = 'Open menu';
        toggleBtn.classList.remove('open');
        headerMenu.classList.remove('active');
        headerMenu.inert = true;
    }
});
