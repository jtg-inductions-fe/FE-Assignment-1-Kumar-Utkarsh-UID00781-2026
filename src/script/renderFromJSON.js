import data from './utilities/content.json';

// DOM Nodes
const headerNavLinksList = document.querySelector('.nav__links');
const headerMenuLinksList = document.querySelector('.menu__links');

// Render Desktop Nav Links
const headerNavLinksHtml = data.navbar.links
    .map(({ href, label }) => {
        return `<li><a class="nav__link ${label.toLowerCase() === 'home' ? 'nav__link--active' : ''}" href="${href}" >${label}</a></li>`;
    })
    .join('');
headerNavLinksList.innerHTML = headerNavLinksHtml;

// Render Mobile / Table Menu Nav Links
const headerMenuLinksHtml = data.navbar.links
    .map(({ href, label }) => {
        return `<li><a class="menu__link" href="${href}" >${label}</a></li>`;
    })
    .join('');
headerMenuLinksList.innerHTML = headerMenuLinksHtml;
