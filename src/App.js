import React, { Component } from 'react';
import APITable from "./containers/APITable/APITable";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <APITable/>
      </div>
    );
  }
}

export default App;
