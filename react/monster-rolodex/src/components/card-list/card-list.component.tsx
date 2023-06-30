import './card-list.styles.css';

import { Component } from 'react';

import Card from '../card/card.component';

export default class CardList extends Component {
  render() {
    const { monsters } = this.props;

    return (
      <div className="card-list">
        {Boolean(monsters.length) &&
          monsters.map((monster) => (
            <Card {...monster} key={`monster-${monster.id}`} />
          ))}
      </div>
    );
  }
}
