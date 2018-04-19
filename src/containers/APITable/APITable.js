import React, { Component } from 'react';
import TableRow from '../../components/TableRow/TableRow';

const pageSize = 10;

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
    console.log(event.target);
    if(event.target.name === 'page') {
      this.setState({[event.target.name]: Number(event.target.value)});
      this.searchHandler();
    } else {
      this.setState({[event.target.name]: event.target.value});
    }
  }
  
  searchHandler = () => {
    let params = '';
    let maxAndStart = '&maxResults='+pageSize+'&startIndex=' + (1 + pageSize * (this.state.page - 1));
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
  
  columnSortHandler = (event) => {
    console.log(event.target, event.target.name);
    let newResults = this.state.results;
    console.log(newResults);
    newResults.sort((a,b) => {
      const aVal = a.volumeInfo[[event.target.name]] || 'zz';
      const bVal = b.volumeInfo[[event.target.name]] || 'zz';
      // if(!aVal) aVal = 0;
      console.log(aVal, bVal);
      if (aVal < bVal) return -1;
      if (aVal > bVal) return 1;
      return 0;
    });
    console.log(newResults);
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
        <table>
          <thead>
            <tr>
              <th
              >Image</th>
              <th>
                <button
                name='title'
                onClick={(event) => this.columnSortHandler(event)}
              >Title
              </button>
              </th>
              <th>
                <button
                name='authors'
                onClick={(event) => this.columnSortHandler(event)}
              >Authors
              </button>
              </th>
              <th>
                <button
                name='publishedDate'
                onClick={(event) => this.columnSortHandler(event)}
              >Published
              </button>
              </th>
              <th
              
              >Preview</th>
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
        <button
          onClick={() => this.pageHandler(-1)}
        >Previous</button>
        <span>
          <input
            type='number'
            name='page'
            min='1'
            value={this.state.page}
            onChange={(event) => this.inputHandler(event)}
          />
          /{Math.ceil(this.state.totalItems/pageSize)}
        </span>
        <button
          onClick={() => this.pageHandler(1)}
        >Next</button>
        </div>
      </div>
    );
  }
}

export default APITable;