import React from 'react';
import { Players } from './../api/players';

const addPlayer = (e) => {
  e.preventDefault();

  const playerName = e.target.playerName.value;

  if (playerName) {
    Players.insert({
      name: playerName,
      score: 0
    });
  }
};

export default class TitleBar extends React.Component {
  render() {
    return (
      <form onSubmit={ addPlayer }>
        <input type="text" name="playerName" placeholder="Player name" />
        <button>Add Player</button>
      </form>
    );
  }
}