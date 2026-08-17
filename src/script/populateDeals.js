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

    dealsContainer.textContent = '';

    wonDeals.forEach(({ label, promoCode, validUpto }) => {
        const daysLeft = Math.max(
            Math.ceil(
                (new Date(validUpto) - Date.now()) / (1000 * 60 * 60 * 24),
            ),
            0,
        );
        const isExpired = daysLeft <= 0;

        const dealDiv = document.createElement('div');
        dealDiv.className = `deal ${isExpired ? 'deal--expired' : ''}`;

        const textDiv = document.createElement('div');
        textDiv.className = 'deal__text';

        const labelP = document.createElement('p');
        labelP.className = 'deal__label';
        labelP.textContent = label;

        const expiryP = document.createElement('p');
        expiryP.className = 'deal__expiry';
        if (isExpired) {
            expiryP.textContent = 'Deal expired';
        } else {
            expiryP.textContent = 'Expires in ';
            const span = document.createElement('span');
            span.className = 'deal__expiry-date';
            span.textContent = `${daysLeft}d`;
            expiryP.appendChild(span);
        }

        textDiv.appendChild(labelP);
        textDiv.appendChild(expiryP);

        const codeDiv = document.createElement('div');
        codeDiv.className = 'deal__code-container';

        const codeP = document.createElement('p');
        codeP.className = 'deal__code';
        codeP.textContent = promoCode;

        const copyBtn = document.createElement('button');
        copyBtn.className = 'deal__copy-btn icon-copy';
        if (isExpired) copyBtn.disabled = true;

        codeDiv.appendChild(codeP);
        codeDiv.appendChild(copyBtn);

        dealDiv.appendChild(textDiv);
        dealDiv.appendChild(codeDiv);
        dealsContainer.appendChild(dealDiv);
    });
}
