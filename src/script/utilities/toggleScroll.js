const body = document.body;

/**
 * Prevents touchmove and wheel event default behaviour when called.
 */
export function disableScroll() {
    body.style.overflow = 'hidden';
}

/**
 * Removes the eventListener which prevents touchmove and wheel event default behaviour.
 */
export function enableScroll() {
    body.style.overflow = 'auto';
}
