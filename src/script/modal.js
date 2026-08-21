import { enableScroll, disableScroll } from './utilities/toggleScroll';

const specialDealsDialog = document.querySelector('#special-deals-dialog');

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
