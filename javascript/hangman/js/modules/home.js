import { sound } from './../data/sound.js';

import How from './how.js';
import Game from './game.js';

const Home = (() => {
  const $hangman = document.querySelector('.hangman');

  const init = () => {
    render();
    listeners();
  };

  const render = () => {
    let markup = '';

    markup += `
      <h1 class="hangman__title">Hangman</h1>
      <button class="button start">New Game</button>
      <button class="button instructions">Instructions</button>
    `;

    $hangman.innerHTML = markup;
  };

  const listeners = () => {
    const $startBtn = document.querySelector('.start');
    const $instructionsBtn = document.querySelector('.instructions');

    $startBtn.addEventListener('click', () => {
      Game.init();

      sound.click.play();
    });

    $instructionsBtn.addEventListener('click', () => {
      How.init();

      sound.click.play();
    });
  };

  return {
    init,
  };
})();

export default Home;
