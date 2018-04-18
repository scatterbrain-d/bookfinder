import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";

class APITable extends Component {
  
  
  state = {
    results: [],
    totalItems: 0,
    titleInput: '',
    authorInput: '',
    categoryInput: '',
    page: 1
  }
  
  inputHandler = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }
  
  
  
  searchHandler = () => {
    let params = '';
    let maxAndStart = '&maxResults=20&startIndex=' + (1 + 20 * (this.state.page - 1));
    const APIkey = '&key=AIzaSyBWeTQ4CaU31-FevfbyRtiThB_AOuzAz7g';
    const fields = '&fields=totalItems,items(id,volumeInfo(title,authors,publishedDate,categories,imageLinks(smallThumbnail),previewLink))';
    
    if (this.state.titleInput)
      params += 'intitle:' + this.state.titleInput + '&';
    if (this.state.authorInput)
      params += 'inauthor:' + this.state.authorInput + '&';
    if (this.state.categoryInput)
      params += 'subject' + this.state.categoryInput + '&';
    
    fetch('https://www.googleapis.com/books/v1/volumes?q=' + params + maxAndStart + APIkey + fields)
      .then(res => res.json())
        .then(data => {
          this.setState({results: data.items, totalItems: data.totalItems});
        });  
  }
  
  pageHandler = (pageIndex) => {
    this.setState({page: pageIndex});
    this.searchHandler();
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
          manual
          pages={Math.ceil(this.state.totalItems/20)}
          page={this.state.page}
          onPageChange={(pageIndex) => this.pageHandler(pageIndex)}
        />
      </div>
    );
  }
}

export default APITable;