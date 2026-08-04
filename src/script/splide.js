import Splide from '@splidejs/splide';

const splide = new Splide('.splide');
splide.mount();

splide.on('pagination:mounted', function (data) {
    // You can add your class to the UL element
    data.list.classList.add('splide__pagination');

    // `items` contains all dot items
    data.items.forEach(function (item) {
        item.button.textContent = String(item.page + 1);
    });
});

splide.mount();
