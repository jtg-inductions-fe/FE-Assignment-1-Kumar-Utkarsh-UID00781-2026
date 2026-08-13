const dealsContainer = document.querySelector('.deals-container');

/**
 * Populates the deals-container div with won deals
 * Calculates days left for each deal
 * Renders deal differently based on whether they have expired or not
 *
 *
 */
export function populateDeals() {
    const wonDeals = JSON.parse(localStorage.getItem('wonDeals'));

    let HTMLMarkup = wonDeals
        .map(({ label, promoCode, validUpto }) => {
            const daysLeft = Math.max(
                Math.ceil(
                    (new Date(validUpto) - Date.now()) / (1000 * 60 * 60 * 24),
                ),
                0,
            );
            return `<div class='deal ${daysLeft <= 0 ? 'deal--expired' : ''}'><div class="deal__text">
                            <p class="deal__label">${label}</p>
                            <p class="deal__expiry">
                            ${daysLeft <= 0 ? 'Deal expired' : `Expires in <span class="deal__expiry-date">${daysLeft}d</span>`}
                            </p>
                        </div>
                        <div class="deal__code-container">
                            <p class="deal__code">${promoCode}</p>
                            <button class="deal__copy-btn icon-copy" ${daysLeft <= 0 ? 'disabled' : ''}></button>
                        </div></div>`;
        })
        .join(' ');

    dealsContainer.innerHTML = HTMLMarkup;
}
