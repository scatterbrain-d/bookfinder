import React, { Component } from 'react';

import Logo from '../../components/Logo/Logo';
import SearchBar from '../../components/SearchBar/SearchBar';
import Table from '../../components/Table/Table';
import PageSizer from '../../components/PageSizer/PageSizer';

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
    
    return (
      <div className='container'>
        
        <Logo/>
        
        <SearchBar
          input={this.state.input}
          searchBy={this.state.searchBy}
          changed={(event) => this.inputHandler(event)}
          search={(event) => this.searchHandler(event)}
        />
        
        <Table
          results={this.state.results}
          loading={this.state.loading}
          called={this.state.called}
          errorMsg={this.state.errorMsg}
          page={this.state.page}
          pageSize={this.state.pageSize}
          totalItems={this.state.totalItems}
          paginate={(event, diff) => this.pageHandler(event, diff)}
          columnSort={(event) => this.columnSortHandler(event)}
        />
        
        <PageSizer
          pageSize={this.state.pageSize}
          changed={(event) => this.inputHandler(event)}
        />
        
        <p className='credit'>Powered by Google Books API</p>
      </div>
    );
  }
}

export default APITable;