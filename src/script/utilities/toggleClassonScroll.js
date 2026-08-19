/**
 * Adds [elementBaseClass]--[modifierClass] to element when the window is scrolled by scrollAmount
 * Should have the corresponding style defined in SCSSL [elementBaseClass]--[modifierClass]
 * @param {HTMLElement} element: The element to modify
 * @param {string} elementBaseClass: The class of the element
 * @param {string} modifierClass: The modifier class of appended to baseClass
 * @param {number} scrollAmount: The scroll amount that triggers the class toggle
 */

export function toggleClassOnScroll(
    element,
    elementBaseClass,
    modifierClass,
    scrollAmount,
) {
    const finalClassName = `${elementBaseClass}-${modifierClass}`;
    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollAmount) {
            element.classList.add(finalClassName);
        } else {
            element.classList.remove(finalClassName);
        }
    });
}
