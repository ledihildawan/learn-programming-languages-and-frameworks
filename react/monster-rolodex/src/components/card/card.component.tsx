import './card.styles.css';

import { Component } from 'react';

export default class Card extends Component {
  render() {
    const { name, email, id } = this.props;

    return (
      <div className="card-container">
        <img
          alt={`Monster ${name}`}
          src={`https://robohash.org/${id}?size=180x180`}
        />
        <h2>{name}</h2>
        <p>{email}</p>
      </div>
    );
  }
}
