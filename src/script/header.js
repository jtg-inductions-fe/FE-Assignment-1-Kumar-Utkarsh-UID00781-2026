import { toggleClassOnScroll } from './utilities/toggleClassonScroll';

const headerClass = 'header';
const header = document.querySelector(`.${headerClass}`);

toggleClassOnScroll(header, 'header', 'scrolled', 100);
