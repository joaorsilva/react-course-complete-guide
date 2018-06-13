import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {

  state = {
    persons: [
      {id: 'id1', name: 'Joao R. Silva', age: 47},
      {id: 'id2', name: 'Ceni Ingracio', age: 49},
      {id: 'id3', name: 'Beatriz R. Silva', age: 16}
]
  };

  togglePersonsHandler = (event) => {
    const doesShow = this.state.showPersons;

    this.setState({showPersons: !doesShow});
  };

  deletePersonsHandler = (index) => {
    // slice to create a copy of the array
    // const persons = this.state.persons.slice();

    const persons = [...this.state.persons];
    persons.splice(index,1);
    this.setState({persons: persons});
  };

  nameChangedHandler = (event,id) => {
    const personIndex = this.state.persons.findIndex( (p) => {
      return p.id === id;
    });
    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons});
  };

  render() {

    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;

    const classes = [];

    if(this.state.showPersons) {
      style.backgroundColor = 'red';
      if(this.state.persons.length <=2) {
        classes.push('red');
      }
      if(this.state.persons.length <=1) {
        classes.push('bold');
      }
        style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
      persons = (
        <div>
          {this.state.persons.map( (person, index) => {
            return <Person 
              name={person.name}
              age={person.age}
              click={() =>this.deletePersonsHandler(index)}
              changed={(event) => this.nameChangedHandler(event, person.id)}
              key={person.id}/>
          })}
      </div>  
      );
    }

    // Recomended use of bind on events
    // as anonimous functions are inefficient

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(' ')}>This is really working!</p>
        <button
        style={style} 
        onClick={this.togglePersonsHandler.bind(this)}>Toggle Persons</button>
        {persons}
      </div>
    );
  }
}

export default App;
