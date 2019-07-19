import React from 'react';
import FlipMove from 'react-flip-move';

import Player from './Player';

export default class PlayerList extends React.Component {
  renderPlayers() {
    const { players } = this.props;
    
    if (players.length === 0) {
      return <p>Add your first player to get started</p>
    } else {
      return players.map((player) => <Player key={ player._id } player={ player } />);
    }
  }

  render() {
    return (
      <ul>
        <FlipMove maintainContainerHight={ true }>
          { this.renderPlayers() }
        </FlipMove>
      </ul>
    );
  }
}

PlayerList.propTypes = {
  players: React.PropTypes.array.isRequired
};