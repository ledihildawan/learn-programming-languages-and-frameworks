const widgetCarousel = document.querySelector('.widget__carousel');
const widgetCarouselBtnRight = document.querySelector('.widget__button--right');
const widgetCarouselBtnLeft = document.querySelector('.widget__button--left');
const widgetCarouselActice = document.querySelector('.widget__item--active');
const widgetItemLast = document.querySelector('.widget__item:last-of-type');
const widgetItemFirst = document.querySelector('.widget__item:first-of-type');

widgetCarouselBtnRight.addEventListener('click', function (e) {
  e.stopPropagation();

  if (widgetCarouselActice.getAttribute('src').includes('2')) {
    widgetCarouselActice.setAttribute('src', 'img/widget-1.png');
    widgetItemLast.setAttribute('src', 'img/widget-2.png');
    widgetItemFirst.setAttribute('src', 'img/widget-3.png');
  } else if (widgetCarouselActice.getAttribute('src').includes('1')) {
    widgetCarouselActice.setAttribute('src', 'img/widget-3.png');
    widgetItemLast.setAttribute('src', 'img/widget-1.png');
    widgetItemFirst.setAttribute('src', 'img/widget-2.png');
  } else {
    widgetCarouselActice.setAttribute('src', 'img/widget-2.png');
    widgetItemLast.setAttribute('src', 'img/widget-3.png');
    widgetItemFirst.setAttribute('src', 'img/widget-1.png');
  }
});

widgetCarouselBtnLeft.addEventListener('click', function (e) {
  e.stopPropagation();
 
  if (widgetCarouselActice.getAttribute('src').includes('2')) {
    widgetCarouselActice.setAttribute('src', 'img/widget-3.png');
    widgetItemFirst.setAttribute('src', 'img/widget-2.png');
    widgetItemLast.setAttribute('src', 'img/widget-1.png');
  } else if (widgetCarouselActice.getAttribute('src').includes('3')) {
    widgetCarouselActice.setAttribute('src', 'img/widget-1.png');
    widgetItemFirst.setAttribute('src', 'img/widget-3.png');
    widgetItemLast.setAttribute('src', 'img/widget-2.png');
  } else {
    widgetCarouselActice.setAttribute('src', 'img/widget-2.png');
    widgetItemFirst.setAttribute('src', 'img/widget-1.png');
    widgetItemLast.setAttribute('src', 'img/widget-3.png');
  }
});