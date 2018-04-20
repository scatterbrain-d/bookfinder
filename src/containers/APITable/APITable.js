import React, { Component } from 'react';
import TableRow from '../../components/TableRow/TableRow';
import Spinner from '../../components/Spinner/Spinner';
import Aux from '../../components/Aux/Aux';

// APITable calls the Google Books API and returns results based
// on user-entered search criteria

class APITable extends Component {
  
  state = {
    results: [],
    page: 1,
    totalItems: 0,
    searchBy: 'Title',
    input: '',
    errorMsg: '',
    titleSort: false,
    authorSort: false,
    dateSort: false,
    loading: false,
    called: false,
    pageSize: 10
  }
  
  // binds the user search inputs to the state. Forbids symbols that could disrupt the API call.
  inputHandler = (event) => {
    const regex = /^[\w?\s?\b?]+$/gi;
    if(!regex.test(event.target.value) && event.target.value !== '') {
      event.preventDefault();
    } else {
      this.setState({[event.target.name]: event.target.value, page: 1});
    }
  }
  //applies parameters to API call - page, page size, desired fields, and user search parameters
  searchHandler = (event) => {
    event.preventDefault();
    let maxAndStart = '&maxResults='+this.state.pageSize+'&startIndex=' + (1 + this.state.pageSize * (this.state.page - 1));
    const APIkey = '&key=AIzaSyBWeTQ4CaU31-FevfbyRtiThB_AOuzAz7g';
    const fields = '&fields=totalItems,items(id,volumeInfo(title,authors,publishedDate,categories,imageLinks(smallThumbnail),previewLink))';
    let searchPrefix, params;
    
    this.setState({loading: true});
    
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
          this.setState({results: data.items, totalItems: data.totalItems, loading: false, called: true});
        }).catch(error => {
          console.log(error);
          this.setState({errorMsg: error, loading: false, called: true});
        });
  }
  
  //toggles column sort in ascending or descending order
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
      return sort ? 
      (aVal > bVal ? 1 : aVal < bVal ? -1 : 0)
      : (bVal > aVal ? 1 : bVal < aVal ? -1 : 0);
    });
    this.setState({results: newResults});
  }
  
  //returns a new page of results from the API
  pageHandler = (event, diff) => {
    const newPage = this.state.page + diff;
    if (newPage <= 0 || newPage > Math.ceil(this.state.totalItems/this.state.pageSize)) return;
    this.setState({page: newPage});
    this.searchHandler(event);
  }
  
  render() {
    
    let results = this.state.results;
    
    //removes publish date and preview columns for mobile viewing
    let extraColumns = null;
    if (window.innerWidth > 550) {
      extraColumns = (
        <Aux>
          <th><button
            name='publishedDate'
            onClick={(event) => this.columnSortHandler(event)}
          >Published
          </button></th>
          
          <th>Preview</th>
        </Aux>
    )}
    
    //render table as long as loading is false and results exist, otherwise it's hidden
    let table= '';
    if (!this.state.loading && this.state.results && this.state.results.length > 0) {
      table = (
        <div>
          <div className='pages'>
            <button onClick={(event) => this.pageHandler(event, -1)}>Previous</button>
            
            <span>
              Page: {this.state.page}/{Math.ceil(this.state.totalItems/this.state.pageSize)}
            </span>
            
            <button onClick={(event) => this.pageHandler(event, 1)}>Next</button>
          </div>
          <table className='resultsTable'>
            <thead className='tableHeaders'><tr>
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
                {extraColumns}
            </tr></thead>
            
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
    } else if (this.state.loading)
        table = <Spinner/>;
      else if (this.state.called)
        table = <div className='error'>No results found.</div>;
    
    //displays error message if there was a problem with API call
    if (this.state.errorMsg)
      table = <div className='error'>{this.state.errorMsg.toString()}</div>;
    
    return (
      <div className='container'>
        <div className='logo'>
          <img src='https://cloud.glstock.com/23142/1889854/book-mascot.jpg' alt='Bookly'/>
          <h1>BookFinder</h1>
        </div>
        
        <form className='searchBar'>
          <span>Search by</span> 
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
          <button onClick={(event) => this.searchHandler(event)}>Search</button>
        </form>
        {table}
        <span className='searchBar'>
          <span>Page Size</span>
          <select
            name='pageSize'
            value={this.state.pageSize}
            onChange={(event) => this.inputHandler(event)}
          >
            <option>10</option>
            <option>20</option>
            <option>30</option>
            <option>40</option>
          </select>
        </span>
        <p className='credit'>Powered by Google Books API</p>
      </div>
    );
  }
}

export default APITable;