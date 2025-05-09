const countEl = document.getElementById('count');
const seatsEl = document.querySelectorAll('.row .seat:not(.occupied)');
const totalEl = document.getElementById('total');
const containerEl = document.querySelector('.container');
const movieSelectEl = document.getElementById('movie');

let ticketPrice = +movieSelectEl.value;

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
        seatEl.classList.add('selected');
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

  countEl.innerText = numberSelectedOfSeats;
  totalEl.innerText = numberSelectedOfSeats * ticketPrice;
}

movieSelectEl.addEventListener('click', (e) => {
  ticketPrice = +e.target.value;

  setMovieData(e.target.selectedIndex, ticketPrice);
  updateSelectedCount();
});

containerEl.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

populateUI();
updateSelectedCount();
