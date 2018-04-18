import React, { Component } from 'react';

class APITable extends Component {
  
  
  state = {
    cast: []
  }
  
  componentWillMount() {
    let cast;
    fetch('https://swapi.co/api/people/')
      .then(res => res.json())
        .then(data => {
          cast = data.results;
          this.setState({cast: cast});
        });
  }
  
  render() {
    
    let people = this.state.cast;
    
    return (
      <div>
        {people.map(person => (
          <p key={person.name}>{person.name}</p>
        ))}
      </div>  
    );
  }
}

export default APITable;