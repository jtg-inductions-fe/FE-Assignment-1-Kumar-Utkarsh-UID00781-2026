import data from './utilities/content.json';

// Desktop Nav Links
const headerNavLinksList = document.querySelector('.header__nav__links');
const headerNavLinksHtml = data.navbar.links
    .map(({ href, label }) => {
        return `<li class="header__nav__link ${label.toLowerCase() === 'home' && 'header__nav__link--active'}"><a href="${href}" >${label}</a></li>`;
    })
    .join('');
headerNavLinksList.innerHTML = headerNavLinksHtml;

// Mobile / Table Menu Nav Links
const headerMenuLinksList = document.querySelector('.header__menu__links');
const headerMenuLinksHtml = data.navbar.links
    .map(({ href, label }) => {
        return `<li class="header__menu__link"><a href="${href}" >${label}</a></li>`;
    })
    .join('');
headerMenuLinksList.innerHTML = headerMenuLinksHtml;
