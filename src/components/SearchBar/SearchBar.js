import React from 'react';

const searchBar = (props) => {
  return (
    <form className='inlineInput'>
      <span>Search by</span> 
      <select
        name='searchBy'
        value={props.searchBy}
        onChange={props.changed}
      >
        <option>Title</option>
        <option>Author</option>
        <option>Subject</option>
      </select>
      <input
        name='input'
        value={props.input}
        onChange={props.changed}
      />
      <button onClick={props.search}>Search</button>
    </form>
  );
};

export default searchBar;