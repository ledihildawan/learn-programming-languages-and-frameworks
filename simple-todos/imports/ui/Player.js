import React from 'react';
import { Players } from './../api/players';

export default class Player extends React.Component {
  render() {
    const { player } = this.props;
    const { _id, name, score } = player;

    return (
      <li>
        <span>{ name } has { score } point(s).</span>
        <button onClick={ () => Players.update({ _id }, { $inc: { score: 1 }}) }>+1</button>
        <button onClick={ () => Players.update({ _id }, { $inc: { score: -1 }}) }>-1</button>
        <button onClick={ () => Players.remove({ _id }) }>X</button>
      </li>
    );
  }
}

Player.propTypes = {
  player: React.PropTypes.object.isRequired
};