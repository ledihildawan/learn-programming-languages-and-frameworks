import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instructors: [
        {
          name: 'Time',
          hobbies: ['sailing', 'react']
        },
        {
          name: 'Matt',
          hobbies: ['math', 'd3']
        },
        {
          name: 'Colt',
          hobbies: ['css', 'hiking']
        },
        {
          name: 'Elie',
          hobbies: ['music', 'es2015']
        }
      ]
    }

    setTimeout(() => {
      const randInst = Math.floor(Math.random() * this.state.instructors.length);
      const hobbyIndex = Math.floor(Math.random() * this.state.instructors[randInst].length);

      const instructors = this.state.instructors.map((instructor, index) => {
        if (index === randInst) {
          const hobbies = [...instructor.hobbies];
          hobbies.splice(hobbyIndex, index);
          return {
            ...instructor,
            hobbies
          }
        }
        
        return instructor;
      });

      // const instructors = this.state.instructors.slice();
      // instructors[randInst] = Object.assign({}, instructors[randInst]);
      // instructors[randInst].hobbies = instructors[randInst].hobbies.slice();
      // instructors[randInst].hobbies.splice(hobbyIndex, 1);
      
      this.setState({ instructors });
    }, 5000)
  }

  render() {
    const instructors = this.state.instructors.map((instructor, index) => (
      <li key={ index }>
        <h3>{ instructor.name }</h3>
        <h4>Hobbies: { instructor.hobbies.join(', ') }</h4>
      </li>
    ));
    return (
      <div className="App">
        <ul>
          { instructors }
        </ul>
      </div>
    )
  }
}

export default App;