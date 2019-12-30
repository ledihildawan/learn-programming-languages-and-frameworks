import React, { Component } from "react";

class AddOption extends React.Component {
  state = {
    error: undefined
  };

  handleAddOption = e => {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);

    this.setState(() => ({ error }));

    if (!error) {
      e.target.elements.option.value = "";
    }
  };

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <label htmlFor="option">Option</label>
          <input id="option" name="option" />
          <button type="submit">Add Option</button>
        </form>
      </div>
    );
  }
}

export default AddOption;
