import './App.css';

import { Component } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

export class App extends Component {
  state = {
    monsters: [],
    searchField: '',
  };

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((users) => {
        this.setState({ monsters: users });
      });
  }

  handleChange = (e) => {
    this.setState(() => ({ searchField: e.target.value.toLowerCase() }));
  };

  render() {
    const { monsters, searchField } = this.state;
    const { handleChange } = this;

    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField)
    );

    return (
      <div className="app">
        <h1>Monsters Rolodex</h1>
        <SearchBox placeholder="search monsters" onSearch={handleChange} />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
