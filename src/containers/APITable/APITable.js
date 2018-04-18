import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";

class APITable extends Component {
  
  
  state = {
    cast: [],
    searchInput: ''
  }
  
  componentWillMount = () => {
    let cast;
    fetch('https://swapi.co/api/people/')
      .then(res => res.json())
        .then(data => {
          cast = data.results;
          this.setState({cast: cast});
        });
  }
  
  inputHandler = (event) => {
    this.setState({searchInput: event.target.value});
  }
  
  searchHandler = () => {
    console.log(this.state);
    let params = '?search=' + this.state.searchInput;
    fetch('https://swapi.co/api/people/' + params)
      .then(res => res.json())
        .then(data => {
          const search = data.results;
          this.setState({cast: search});
        });  
  }
  
  render() {
    
    let people = this.state.cast;
    
    const columns = [{
      Header: 'Name',
      accessor: 'name'
      },{
      Header: 'Films',
      accessor: p => p.films.length,
      id: 'films'
      },{
      Header: 'Gender',
      accessor: 'gender'
      }
    ];
    
    return (
      <div className='container'>
        <input
          type='text'
          value={this.state.searchInput}
          onChange={(event) => this.inputHandler(event)}
        />
        <button
          onClick={this.searchHandler}
        >
          Search
        </button>
        <ReactTable
          columns={columns}
          data={people}
        />
      </div>
    );
  }
}

export default APITable;