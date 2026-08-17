import data from './utilities/content.json';

// DOM Nodes
const headerNavLinksList = document.querySelector('.nav__links');
const headerMenuLinksList = document.querySelector('.menu__links');

// Render Desktop Nav Links
const headerNavLinksHtml = data.navbar.links
    .map(({ href, label }) => {
        if (label.toLowerCase() === 'home') {
            return `<li><a class="nav__link nav__link--active" href="${href}" >${label}</a></li>`;
        }
        if (label.toLowerCase() === 'special deals') {
            return `<li><button
                class="nav__link"
                command="show-modal"
                commandfor="special-deals-dialog"
            >
                ${label}
            </button></li>`;
        }
        return `<li><a class="nav__link" href="${href}" >${label}</a></li>`;
    })
    .join('');
headerNavLinksList.innerHTML = headerNavLinksHtml;

// Render Mobile / Table Menu Nav Links
const headerMenuLinksHtml = data.navbar.links
    .map(({ href, label }) => {
        if (label.toLowerCase() === 'special deals') {
            return `<li><button
                class="menu__link"
                command="show-modal"
                commandfor="special-deals-dialog"
            >
                ${label}
            </button></li>`;
        }
        return `<li><a class="menu__link" href="${href}" >${label}</a></li>`;
    })
    .join('');
headerMenuLinksList.innerHTML = headerMenuLinksHtml;

// Travel Point Cards
const cardsContainer = document.querySelector('.travel-point__cards');

let cardsHTML = data.travelpoint.cards
    .map(({ value, label }) => {
        return `<article class="travel-point__card card"><p class="card__value">${value}</p><p class="card__label">${label}</p></article>`;
    })
    .join('');
cardsHTML += '<div class="travel-point__floater floater icon-ticket"></div>';
cardsContainer.innerHTML = cardsHTML;
