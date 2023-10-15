import { sound } from './../data/sound.js';

import Home from './home.js';

const How = (() => {
  const $hangman = document.querySelector('.hangman');

  const init = () => {
    render();
    listeners();
  };

  const render = () => {
    let markup = `
      <h1 class="hangman__title">Instructions</h1>
      <ul class="how">
        <li>Alright here is how you play!</li>
        <li>When you start a new game, the game will automatically choose a random word.</li>
        <li>Your job is guess that chosen word completely by guessing a letter at a time by clicking on the buttons.</li>
        <li>If successfully guess the word within 7 tries, you win or else you lose.</li>
        <li>If you lose, you will be hanged without mercy. 👻</li>
      </ul>
      <button class="button hangman__triger">Main Menu</button>
    `;

    $hangman.innerHTML = markup;
  };

  const listeners = () => {
    $hangman.addEventListener('click', (event) => {
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

export default How;
