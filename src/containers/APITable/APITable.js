import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";

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
        <ReactTable
          columns={columns}
          data={people}
        />
      </div>
    );
  }
}

export default APITable;