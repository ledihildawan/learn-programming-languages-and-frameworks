import React from 'react';
import PropTypes from 'prop-types';

export default class TitleBar extends React.Component {
  renderSubtitle() {
    const { subtitle } = this.props;

    if (subtitle) {
      return <h2>{ subtitle }</h2>
    }
  }

  render() {
    const { title, subtitle } = this.props;

    return (
      <div>
        <h1>{ title }</h1>
      </div>
    );
  }
}

TitleBar.propTypes = {
  title: React.PropTypes.string.isRequired,
  subtitle: React.PropTypes.string
};