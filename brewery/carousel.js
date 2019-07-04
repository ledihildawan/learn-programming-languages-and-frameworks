const carousel = document.querySelector('.grid-carousel');
const slides = document.querySelectorAll('.grid-carousel__item')
const leftButton = document.querySelector('.js-left');
const rightButton = document.querySelector('.js-right');

slides[(slides.length - 1) / 2].classList.add('featured');


const getOrder = (el) => {
  const styles = getComputedStyle(el);
  const orderValue = styles.order;
  const order = parseInt(orderValue);

  return order;
}

const moveRight = _ => {
  slides.forEach((slide) => {
    order = getOrder(slide);

    if (order == 2) {
      slide.classList.add('featured');
    } else {
        slide.classList.remove('featured');
    }

    if (order < slides.length) {
      slide.style.order = order += 1;
    } else {
      slide.style.order = 1;
    }
  });
}

const moveLeft = _ => {
  slides.forEach((slide) => {
    order = getOrder(slide);

    if (order == 3) {
      slide.classList.add('featured');
    } else {
        slide.classList.remove('featured');
    }

    if (order > 1) {
      slide.style.order = order -= 1;
    } else {
      slide.style.order = slides.length;
    }
  });
}

rightButton.addEventListener('click', _ => {
  moveRight();
});

leftButton.addEventListener('click', _ => {
  moveLeft();
});