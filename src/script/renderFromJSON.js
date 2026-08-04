import data from './utilities/content.json';

// Desktop Nav Links
const headerNavLinksList = document.querySelector('.nav__links');
const headerNavLinksHtml = data.navbar.links
    .map(({ href, label }) => {
        return `<li class="nav__link ${label.toLowerCase() === 'home' ? 'nav__link--active' : ''}"><a href="${href}" >${label}</a></li>`;
    })
    .join('');
headerNavLinksList.innerHTML = headerNavLinksHtml;

// Mobile / Table Menu Nav Links
const headerMenuLinksList = document.querySelector('.menu__links');
const headerMenuLinksHtml = data.navbar.links
    .map(({ href, label }) => {
        return `<li class="menu__link"><a href="${href}" >${label}</a></li>`;
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
