import { deals } from './utilities/fetchData';

const modal = document.querySelector('.modal');
const modalBadge = document.querySelector('.modal__btn-badge');
const message = document.querySelector('.modal__message');
const wheel = document.querySelector('.wheel');
const dealContainer = document.querySelector('.deal');

const finalAngles = [45, 135, 225, 315];
const spinTiming = {
    duration: 4000,
    iterations: 1,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    fill: 'forwards',
};

// Load deals when page loads
let wonDeals = JSON.parse(localStorage.getItem('wonDeals')) || []; // Will be fetched from localStorage later on
modalBadge.innerText = wonDeals.length;

let chosenDeals = [];
let spunOnce = false;

/**
 * Finds what deals are left and chooses 4 deals randomly out of them
 *
 * @returns selectedDeals - An array of 4 deals chosen from the list of deals that are not already won
 */
function getDeals() {
    // Copy made to not destroy original dealsLeft array since that should only be updated when a deal is won. Won deal to be implemented
    const dealsLeft = deals.filter(
        (deal) =>
            !wonDeals.find((wonDeal) => deal.promoCode === wonDeal.promoCode),
    );
    if (dealsLeft.length < 4) return null;

    const selectedDeals = [];
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * dealsLeft.length);
        selectedDeals.push(dealsLeft[randomIndex]);
        dealsLeft.splice(randomIndex, 1);
    }
    return selectedDeals;
}

/**
 * Renders the chosen deals onto the wheel partitions
 *
 * @param {DOMNodes List} containers - List of DOM Nodes that can contain the deals
 * @param {*} chosenDeals - The list of deals chosen to be displayed
 */
function renderDeals(containers, chosenDeals) {
    for (let i = 0; i < chosenDeals.length; i++) {
        containers[i].innerText = chosenDeals[i]
            ? chosenDeals[i].label
            : 'Unavailable';
        containers[i].style.rotate = `${(315 + i * 90) % 360}deg`;
    }
}

/**
 * Maps the rotated angle to the deal won
 *
 * @param {number} angle - The amount of angle the wheel is at after animation
 * @returns the deal placed in the partition based on given angle
 */
function determineWonDeal(angle) {
    // Conflicting prettier and eslint tabbing
    if (angle === 45) return chosenDeals[0];
    else if (angle === 135) return chosenDeals[3];
    else if (angle === 225) return chosenDeals[2];
    else if (angle === 315) return chosenDeals[1];
    else return;
}

/** If the wheel has been spun at least once, choose new deals and paint the wheel with newly chosen wheels
 * The check is done because the wheel already loads with some deals when it is first loaded
 */
function resetWheel() {
    if (spunOnce) {
        // Render again only if the wheel has been spun at least once
        const wheelTexts = wheel.querySelectorAll('.wheel__text');
        chosenDeals = getDeals();
        if (!chosenDeals) {
            wheel.innerHTML = `<p>No Deals Available</p>`;
            return;
        }
        renderDeals(wheelTexts, chosenDeals);
    } else {
        spunOnce = true;
    }
    dealContainer.classList.add('deal--hidden');
    message.innerText = '';
}

/**
 * Updates the wonDeals array and updates localStorage with the same
 *
 * @param {Object} wonDeal - The deal won from spinning the wheel. Properties: label, promoCode, validFor
 */
function updateWonDeals(wonDeal) {
    const modalBadge = document.querySelector('.modal__btn-badge');
    wonDeal.validUpto = new Date(
        Date.now() + (wonDeal.validFor ?? 7) * 24 * 60 * 60 * 1000,
    );
    wonDeals.push(wonDeal);
    wonDeals.sort((a, b) => a.validUpto - b.validUpto);
    modalBadge.innerText = wonDeals.length;
    localStorage.setItem('wonDeals', JSON.stringify(wonDeals));
}

/**
 * Renders the deal won after spinning the wheel
 *
 * @param {string} label - The label of the deal won
 * @param {number} code - The coupon code of the deal won
 * @param {number} validFor - The number of days the deal will be valid for
 */
function renderWonDeal(label, code, validFor) {
    dealContainer.classList.remove('deal--hidden');
    const HTMLMarkup = `<div class="deal__text">
                        <p class="deal__label"></p>
                        <p class="deal__expiry">
                            Expires in <span class="deal__expiry-date"></span>d
                        </p>
                    </div>
                    <div class="deal__code-container">
                        <p class="deal__code"></p>
                        <button class="deal__copy-btn icon-copy"></button>
                    </div>`;
    dealContainer.innerHTML = HTMLMarkup;
    const dealLabelContainer = dealContainer.querySelector('.deal__label');
    const dealExpiryContainer =
        dealContainer.querySelector('.deal__expiry-date');
    const dealCodeContainer = dealContainer.querySelector('.deal__code');

    dealLabelContainer.textContent = label;
    dealCodeContainer.textContent = code;
    dealExpiryContainer.textContent = validFor ?? 7;
}

/**
 * Disables spin button when the animation is running
 * Chooses the final angle to be animated upto between 45deg, 135deg, 225deg, 315deg randomly
 * Animates the partitions with 15 spins + final angle
 * Update won deal array and localStorage via updateWonDeals() and render the won deal with renderWonDeal()
 *
 */
async function spinWheel() {
    const spinBtn = wheel.querySelector('.wheel__spin-btn');
    const partitions = wheel.querySelector('.wheel__partitions');
    if (spinBtn) {
        spinBtn.disabled = true;
    }

    const chosenAngle =
        finalAngles[Math.floor(Math.random() * finalAngles.length)];

    let wonDeal = determineWonDeal(chosenAngle);

    const keyframes = [
        { rotate: '0deg' },
        { rotate: `${5400 + chosenAngle}deg` },
    ];

    await partitions.animate(keyframes, spinTiming).finished;
    updateWonDeals(wonDeal);
    renderWonDeal(wonDeal.label, wonDeal.promoCode, wonDeal.validFor);
    message.innerText = 'You won!';
    spinBtn.disabled = false;
}

/** Binds functionality to spin button
 * Adds an event listener that calls resetWheel() to load new deals and spinWheel() to start the spin animation
 */
function bindSpinBtn() {
    const spinBtn = wheel.querySelector('.wheel__spin-btn');

    spinBtn.addEventListener('click', () => {
        resetWheel();
        spinWheel();
    });
}

/** Renders the wheel
 * Adds the HTML markup within .wheel div
 * Renders the randomly chosen deals from getDeals() within each of the 4 wheel__text paragraphs
 * Calls bindSpinBtn() to re-bind the spin button with its functionality since the markup was added by this function
 */
function renderWheel() {
    const HTMLMarkup = `
                    <div class="wheel__pointer"></div>
                    
                    <div class="wheel__partitions">
                    ${[1, 2, 3, 4].map(() => `<div class="wheel__partition"><p class="wheel__text"></p></div>`).join('')}
                    </div>
                    <button class="wheel__spin-btn" autofocus>Spin</button>
               `;
    wheel.innerHTML = HTMLMarkup;
    const wheelTexts = wheel.querySelectorAll('.wheel__text');
    chosenDeals = getDeals();
    if (!chosenDeals) {
        wheel.innerHTML = `<p>No Deals Available</p>`;
        return;
    }
    renderDeals(wheelTexts, chosenDeals);
    bindSpinBtn();
}

modal.addEventListener('toggle', () => {
    if (modal.open) {
        renderWheel();
        // Load deals whenever modal pops up to keep badge number updated
        wonDeals = JSON.parse(localStorage.getItem('wonDeals')) || []; // Will be fetched from localStorage later on
    }
});
