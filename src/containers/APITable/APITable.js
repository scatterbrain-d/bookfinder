import React, { Component } from 'react';
import TableRow from '../../components/TableRow/TableRow';

const pageSize = 10;

class APITable extends Component {
  
  state = {
    results: [],
    page: 1,
    totalItems: 0,
    searchBy: 'Title',
    input: '',
    titleSort: false,
    authorSort: false,
    dateSort: false
  }
  
  inputHandler = (event) => {
      this.setState({[event.target.name]: event.target.value, page: 1});
  }
  
  searchHandler = () => {
    let maxAndStart = '&maxResults='+pageSize+'&startIndex=' + (1 + pageSize * (this.state.page - 1));
    const APIkey = '&key=AIzaSyBWeTQ4CaU31-FevfbyRtiThB_AOuzAz7g';
    const fields = '&fields=totalItems,items(id,volumeInfo(title,authors,publishedDate,categories,imageLinks(smallThumbnail),previewLink))';
    let searchPrefix, params;
    
    switch(this.state.searchBy) {
      case('Title'): searchPrefix = 'intitle:'; break;
      case('Author'): searchPrefix = 'inauthor:'; break;
      case('Subject'): searchPrefix = 'subject'; break;
      default: searchPrefix = 'intitle:';
    }
    params = searchPrefix + this.state.input + '&';
    
    fetch('https://www.googleapis.com/books/v1/volumes?q=' + params + maxAndStart + APIkey + fields)
      .then(res => res.json())
        .then(data => {
          this.setState({results: data.items, totalItems: data.totalItems});
        });
  }
  
  columnSortHandler = (event) => {
    let newResults = this.state.results;
    newResults.sort((a,b) => {
      let sort;
      switch(event.target.name) {
        case('title'): {
          sort = this.state.titleSort;
          this.setState({titleSort: !sort});
        break;}
        case('authors'): {
          sort = this.state.authorSort;
          this.setState({authorSort: !sort});
        break;}
        case('publishedDate'): {
          sort = this.state.dateSort;
          this.setState({dateSort: !sort});
        break;}
        default: sort = this.state.titleSort;
      }
      const aVal = a.volumeInfo[[event.target.name]] || 'ZZ';
      const bVal = b.volumeInfo[[event.target.name]] || 'ZZ';
      (console.log(aVal, bVal));
      return sort ? 
      (aVal > bVal ? 1 : aVal < bVal ? -1 : 0)
      : (bVal > aVal ? 1 : bVal < aVal ? -1 : 0);
    });
    this.setState({results: newResults});
  }
  
  pageHandler = (diff) => {
    const newPage = this.state.page + diff;
    if (newPage <= 0 || newPage > Math.ceil(this.state.totalItems/pageSize)) return;
    this.setState({page: newPage});
    this.searchHandler();
  }
  
  render() {
    
    let results = this.state.results;
    
    return (
      <div className='container'>
        <h1>BookFinder</h1>
        
        <span>
          Search by 
          <select
            name='searchBy'
            value={this.state.searchBy}
            onChange={(event) => this.inputHandler(event)}
          >
            <option>Title</option>
            <option>Author</option>
            <option>Subject</option>
          </select>
          <input
            name='input'
            value={this.state.input}
            onChange={(event) => this.inputHandler(event)}
          />
          <button onClick={this.searchHandler}>Search</button>
        </span>
        
        <table>
          <thead>
            <tr>
              <th>Image</th>
              
              <th><button
                name='title'
                onClick={(event) => this.columnSortHandler(event)}
              >Title
              </button></th>
              
              <th><button
                name='authors'
                onClick={(event) => this.columnSortHandler(event)}
              >Authors
              </button></th>
              
              <th><button
                name='publishedDate'
                onClick={(event) => this.columnSortHandler(event)}
              >Published
              </button></th>
              
              <th>Preview</th>
            </tr>
          </thead>
          
          <tbody>
            {results.map((entry) => {
              return (
              <TableRow
                key={entry.id}
                data={entry}
              />
              );
            })}
          </tbody>
        </table>
        <div>
        
        <button onClick={() => this.pageHandler(-1)}>Previous</button>
        
        <span>
          Page: {this.state.page}/{Math.ceil(this.state.totalItems/pageSize)}
        </span>
        
        <button onClick={() => this.pageHandler(1)}>Next</button>
        
        </div>
      </div>
    );
  }
}

export default APITable;