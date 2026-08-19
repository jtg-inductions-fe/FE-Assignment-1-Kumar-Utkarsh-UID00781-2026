const accordions = document.querySelectorAll('.accordion');
const isTablet = window.matchMedia('(min-width: 430px)');

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
