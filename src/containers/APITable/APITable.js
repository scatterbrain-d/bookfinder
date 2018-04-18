import React, { Component } from 'react';
import TableRow from "../../components/TableRow/TableRow";


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
    let maxAndStart = '&maxResults=5&startIndex=' + (1 + 5 * (this.state.page - 1));
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
          console.log(data);
        });
  }
  
  pageHandler = (pageIndex) => {
    this.setState({page: pageIndex});
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
              <th>Image</th>
              <th>Title</th>
              <th>Authors</th>
              <th>Published</th>
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
      </div>
    );
  }
}

export default APITable;