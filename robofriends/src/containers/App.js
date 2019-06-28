import React, { Component } from 'react';

import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import CardList from '../components/CardList';

// import { robots } from './robots';

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: ''
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(users => this.setState({ robots: users }));
  }

  onSearchChange = event => this.setState({ searchfield: event.target.value });

  render() {
    const { robots, searchfield } = this.state;
    const filterRobots = robots.filter(robot => robot.name.toLowerCase().includes(searchfield.toLowerCase()));

    if (robots === 0) {
      return (
        <div>
          <h1>No data</h1>
        </div>
      );
    } else {
      return (
        <div>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <CardList robots={filterRobots} />
          </Scroll>
        </div>
      );
    }
  }
}

export default App;