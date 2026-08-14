const body = document.body;

// DOM Nodes
const headerMenu = document.querySelector('.header__menu');
const toggleBtn = document.querySelector('.header__toggle-btn');
const accordions = document.querySelectorAll('.accordion');
const header = document.querySelector('header');
const specialDealsDialog = document.querySelector('#special-deals-dialog');

// Viewport flags
const isTablet = window.matchMedia('(min-width: 430px)');

// HEADER SHADOW
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('header--scrolled');
    } else {
        header.classList.remove('header--scrolled');
    }
});

// HEADER MENU INTERACTIONS
// Functions for Enabling and Disabling scroll when menu is open

/**
 * Prevents touchmove and wheel event default behaviour when called.
 */
function disableScroll() {
    body.style.overflow = 'hidden';
}

/**
 * Removes the eventListener which prevents touchmove and wheel event default behaviour.
 */
function enableScroll() {
    body.style.overflow = 'auto';
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

// Accordion
// Disable aria-* attributes when viewport is > 430px

// Toggle attributes based on if viewport > 430px
function toggleAriaAttributes(accordion, matchesTablet) {
    const accordionContent = accordion.querySelector('.accordion__content');
    if (matchesTablet) {
        accordionContent.inert = false;
    } else {
        accordionContent.inert = true;
    }
}

function changeAccordionState(isTablet) {
    accordions.forEach((accordion) => {
        toggleAriaAttributes(accordion, isTablet.matches);
    });
}
isTablet.addEventListener('change', changeAccordionState);
changeAccordionState(isTablet);

accordions.forEach((accordion) => {
    const toggle = accordion.querySelector('.accordion__toggle');
    const content = accordion.querySelector('.accordion__content');
    const icon = accordion.querySelector('.accordion__icon');

    toggle.addEventListener('click', () => {
        if (isTablet.matches) return;

        content.classList.toggle('accordion__content--active');
        icon.classList.toggle('accordion__icon--active');

        if (content.classList.contains('accordion__content--active')) {
            content.inert = false;
            toggle.ariaExpanded = true;
            toggle.ariaLabel = `Close ${accordion.querySelector('.accordion__label').textContent} accordion`;
        } else {
            content.inert = true;
            toggle.ariaExpanded = false;
            toggle.ariaLabel = `Open ${accordion.querySelector('.accordion__label').textContent} accordion`;
        }
    });
});

// Disabling Scroll on modal
specialDealsDialog.addEventListener('toggle', () => {
    if (specialDealsDialog.open) disableScroll();
    if (!specialDealsDialog.open) enableScroll();
});

// Copy functionality on modal deals
specialDealsDialog.addEventListener('click', async (e) => {
    if (e.target.classList.contains('deal__copy-btn')) {
        const codeContainer = e.target.previousElementSibling;
        const code = codeContainer.innerText;
        try {
            await navigator.clipboard.writeText(code);
            e.target.classList.toggle('icon-check');
            setTimeout(() => e.target.classList.toggle('icon-check'), 2500);
        } catch {
            setTimeout(() => e.target.classList.toggle('icon-cross'), 2500);
        }
    }
});
