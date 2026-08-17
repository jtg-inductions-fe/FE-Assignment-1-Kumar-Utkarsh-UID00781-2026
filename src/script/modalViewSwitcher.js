import { populateDeals } from './populateDeals';

const wheel = document.querySelector('.wheel');
const wheelDeal = document.querySelector('#wheel-deal');
const dealsContainer = document.querySelector('.deals-container');
const modalBtn = document.querySelector('.modal__btn');
const modalHeading = document.querySelector('.modal__heading');
const modalDescription = document.querySelector('.modal__description');
const modalMessage = document.querySelector('.modal__message');

modalBtn.addEventListener('click', () => {
    if (wheel.classList.contains('wheel--hidden')) {
        wheel.classList.remove('wheel--hidden');
        dealsContainer.classList.add('deals-container--hidden');
        modalHeading.innerText = 'Spin & Win';
        modalDescription.innerText = 'Tap the center of the wheel to spin';
        const wonDeals = JSON.parse(localStorage.getItem('wonDeals'));
        modalBtn.innerHTML = `
                    View All Unlocked deals22wwwww
                    <span class="modal__btn-badge">${wonDeals.length}</span>
                `;
    } else {
        populateDeals();
        wheel.classList.add('wheel--hidden');
        wheelDeal.classList.add('deal--hidden');
        dealsContainer.classList.remove('deals-container--hidden');
        modalMessage.innerText = '';
        modalHeading.innerText = 'Unlocked Deals';
        modalDescription.innerText = "All the deals you've unlocked yet!";
        modalBtn.innerHTML = 'Go Back';
    }
});
