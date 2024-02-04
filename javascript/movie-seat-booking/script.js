const countEl = document.getElementById('count');
const seatsEl = document.querySelectorAll('.row .seat:not(.occupied)');
const totalEl = document.getElementById('total');
const containerEl = document.querySelector('.container');
const movieSelectEl = document.getElementById('movie');

let ticketPrice = +movieSelectEl.value;

class ClassHelper {
  static add (el, value) {
    el.classList.add(value);
  }

  static toggle (el, value) {
    el.classList.toggle(value);
  }

  static contains(el, value) {
    return el.classList.contains(value);
  }

  static notContains(el, value) {
    return !this.contains(el, value);
  }
}

class DomHelper {
  static setText(el, value) {
    el.innerText = value;
  }
}

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  const selectedMovieIndex = JSON.parse(localStorage.getItem('selectedMovieIndex'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seatsEl.forEach((seatEl, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        ClassHelper.add(seatEl, 'selected');
      }
    });
  }

  if (selectedMovieIndex !== null) {
    movieSelectEl.selectedIndex = selectedMovieIndex;
  }
}

/**
 * Update total and count
 */
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const numberSelectedOfSeats = selectedSeats.length;

  const seatsIndex = [...selectedSeats].map((seat) => [...seatsEl].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  DomHelper.setText(countEl, numberSelectedOfSeats);
  DomHelper.setText(totalEl, numberSelectedOfSeats * ticketPrice);
}

movieSelectEl.addEventListener('click', (e) => {
  ticketPrice = +e.target.value;

  setMovieData(e.target.selectedIndex, ticketPrice);
  updateSelectedCount();
});

containerEl.addEventListener('click', (e) => {
  if (ClassHelper.contains(e.target, 'seat') && ClassHelper.notContains(e.target, 'occupied')) {
    ClassHelper.toggle(e.target, 'selected');

    updateSelectedCount();
  }
});

populateUI();
updateSelectedCount();
