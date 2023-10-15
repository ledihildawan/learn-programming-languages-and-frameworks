import { sound } from './../data/sound.js';

import End from './end.js';
import Home from './home.js';

const Game = (() => {
  const letters = 'abcdefghjiklmnopqrstuvwxyz'.split('');
  const words = ['apple', 'ball', 'cat', 'dog', 'elephant'];

  let chosenWord = null;
  let guessingWord = null;
  let lives = null;
  let guesses = null;

  const $hangman = document.querySelector('.hangman');

  const chooseWord = () => {
    return words[Math.floor(Math.random() * words.length)];
  };

  const showInitPage = () => {
    let markup = `
      <p class="hangman__stats">Lives: <span class="hangman__lives">${lives}</span></p>
      <h1 class="hangman__title">Hangman</h1>
      <canvas class="hangman__board" height="155px"></canvas>
      <div class="hangman__word">${guessingWord.join('')}</div>
      <ul class="hangman__letters">${createLetters()}</ul>
      <button class="button hangman__triger">Main Menu</button>
    `;

    $hangman.innerHTML = markup;
  };

  const createLetters = () => {
    let markup = '';

    for (const letter of letters) {
      const isActive = isAlreadyTaken(letter) ? 'hangman__letter--active' : '';

      markup += `<li class="hangman__letter ${isActive}">${letter}</li>`;
    }

    return markup;
  };

  const isAlreadyTaken = (letter) => {
    return guesses.includes(letter);
  };

  const check = (guess) => {
    if (isAlreadyTaken(guess)) {
      return;
    }

    guesses.push(guess);

    if (chosenWord.includes(guess)) {
      updateGuessingWord(guess);
    } else {
      lives -= 1;
    }

    render();
    isGameOver();
  };

  const updateGuessingWord = (letter) => {
    chosenWord.split('').forEach((el, idx) => {
      if (el === letter) {
        guessingWord[idx] = el;
      }
    });
  };

  const hasWon = () => guessingWord.join('') === chosenWord;

  const hasLost = () => lives <= 0;

  const isGameOver = () => {
    if (hasWon()) {
      sound.win.play();
      End.setState({ chosenWord, result: 'win' });
    }

    if (hasLost()) {
      sound.lose.play();
      End.setState({ chosenWord, result: 'lose' });
    }
  };

  const init = () => {
    chosenWord = chooseWord();
    guessingWord = Array(chosenWord.length).fill('_');
    lives = 7;
    guesses = [];

    showInitPage();
    listeners();
  };

  const render = () => {
    document.querySelector('.hangman__lives').innerHTML = lives;
    document.querySelector('.hangman__word').innerHTML = guessingWord.join('');
    document.querySelector('.hangman__letters').innerHTML = createLetters();
  };

  const listeners = () => {
    $hangman.addEventListener('click', (event) => {
      if (event.target.matches('.hangman__letter')) {
        sound.click.play();
        check(event.target.textContent);
      }

      if (event.target.matches('.hangman__triger')) {
        sound.click.play();
        Home.init();
      }
    });
  };

  return {
    init,
  };
})();

export default Game;
