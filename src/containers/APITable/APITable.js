import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";

class APITable extends Component {
  
  
  state = {
    results: [],
    titleInput: '',
    authorInput: '',
    categoryInput: '',
    startIndex: 1
  }
  
  inputHandler = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }
  
  // Google Books API key
  // key=AIzaSyBWeTQ4CaU31-FevfbyRtiThB_AOuzAz7g
  
  searchHandler = () => {
    let params = '';
    let maxAndStart = '&maxResults=20&startIndex=' + this.state.startIndex;
    const APIkey = '&key=AIzaSyBWeTQ4CaU31-FevfbyRtiThB_AOuzAz7g';
    const fields = '&fields=totalItems,items(id,volumeInfo(title,authors,publishedDate,categories,imageLinks(smallThumbnail),previewLink))'
    
    if (this.state.titleInput)
      {params += 'intitle:' + this.state.titleInput + '&';
      console.log(params);}
    if (this.state.authorInput)
      {params += 'inauthor:' + this.state.authorInput + '&';}
    if (this.state.categoryInput)
      {console.log("cat param hit");
      params += 'subject' + this.state.categoryInput + '&';}
    console.log('https://www.googleapis.com/books/v1/volumes?q=' + params + maxAndStart + APIkey + fields);
    
    fetch('https://www.googleapis.com/books/v1/volumes?q=' + params + maxAndStart + APIkey + fields)
      .then(res => res.json())
        .then(data => {
          const search = data.items;
          this.setState({results: search});
        });  
  }
  
  render() {
    
    let results = this.state.results;
    
    const columns = [{
        Header: 'Image',
        id: 'image',
        Cell: (row) => {
          if(row.original.volumeInfo.imageLinks)
            return (<div><img height={100} src={row.original.volumeInfo.imageLinks.smallThumbnail} alt='thumbnail'/></div>)}
      },
      {
        Header: 'Title',
        accessor: 'volumeInfo.title',
        id: 'title'
      },
      {
        Header: 'Authors',
        accessor: 'volumeInfo.authors',
        id: 'authors'
      },
      {
        Header: 'Published Date',
        accessor: 'volumeInfo.publishedDate',
        id: 'date'
      },
      {
        Header: 'Link',
        id: 'link',
        Cell: (row) => (<a href={row.original.volumeInfo.previewLink} target='_blank'>Preview</a>)
      }
    ];
    
    return (
      <div className='container'>
        <input
          type='text'
          name='titleInput'
          value={this.state.titleInput}
          onChange={(event) => this.inputHandler(event)}
        />
        <input
          type='text'
          name='authorInput'
          value={this.state.authorInput}
          onChange={(event) => this.inputHandler(event)}
        />
        <input
          type='text'
          name='categoryInput'
          value={this.state.categoryInput}
          onChange={(event) => this.inputHandler(event)}
        />
        <button
          onClick={this.searchHandler}
        >
          Search
        </button>
        <ReactTable
          columns={columns}
          data={results}
          className='-striped -highlight'
        />
      </div>
    );
  }
}

export default APITable;