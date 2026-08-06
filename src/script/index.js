const body = document.body;

// DOM Nodes
const headerMenu = document.querySelector('.header__menu');
const toggleBtn = document.querySelector('.header__toggle-btn');
const accordions = document.querySelectorAll('.accordion');

// HEADER MENU INTERACTIONS
// Functions for Enabling and Disabling scroll when menu is open
/**
 * Prevents default behaviour of the passed event when called.
 * @param {Event} e
 */
function preventDefault(e) {
    e.preventDefault();
}

/**
 * Prevents touchmove and wheel event default behaviour when called.
 */
function disableScroll() {
    body.addEventListener('touchmove', preventDefault, {
        passive: false,
    });
    body.addEventListener('wheel', preventDefault, {
        passive: false,
    });
}

/**
 * Removes the eventListener which prevents touchmove and wheel event default behaviour.
 */
function enableScroll() {
    body.removeEventListener('touchmove', preventDefault);
    body.removeEventListener('wheel', preventDefault);
}

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
    if (!headerMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
        enableScroll();
        toggleBtn.ariaExpanded = false;
        toggleBtn.ariaLabel = 'Open menu';
        toggleBtn.classList.remove('toggle-btn--open');
        headerMenu.classList.remove('menu--active');
        headerMenu.inert = true;
    }
});

// Accordion
accordions.forEach((accordion) => {
    const toggle = accordion.querySelector('.accordion__toggle');
    const content = accordion.querySelector('.accordion__content');
    const icon = accordion.querySelector('.accordion__icon');

    toggle.addEventListener('click', () => {
        content.classList.toggle('accordion__content--active');
        icon.classList.toggle('accordion__icon--active');

        if (content.classList.contains('accordion__content--active')) {
            toggle.ariaExpanded = true;
            toggle.ariaLabel = 'Close accordion';
        } else {
            toggle.ariaExpanded = false;
            toggle.ariaLabel = 'Open accordion';
        }
    });
});
