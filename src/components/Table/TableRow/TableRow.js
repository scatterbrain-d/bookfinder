import React from 'react';

// TableRow displays a row in the search results from the APITable component

const tableRow = (props) => {
  
  //sets thumbnail to generic book image if none exists
  let thumbnail = 'http://packetpushers.net/wp-content/uploads/2015/04/accessories-dictionary.png';
  if (props.data.volumeInfo.imageLinks)
    thumbnail = props.data.volumeInfo.imageLinks.smallThumbnail;
  
  //trims long titles. Trims more based on screen size
  let maxChar = window.innerWidth > 550 ? 100 : 50;
  let title = props.data.volumeInfo.title.substring(0,maxChar);
  if (title.length > (maxChar - 3)) title += '...';
  
  //formats multiple authors correctly and trims
  let authors = props.data.volumeInfo.authors;
  if (authors && authors.length > 1) {
    authors = authors.join(', ').substring(0,maxChar);
    if (authors.length > (maxChar - 3)) authors += '...';
  }
  
  //reformats row output for mobile devices
  let row;
  if (window.innerWidth > 550) {
    row = (
      <tr>
        <td><img className='thumbnail' alt='thumbnail' src={thumbnail}/></td>
        <td>{title}</td>
        <td>{authors}</td>
        <td>{props.data.volumeInfo.publishedDate}</td>
        <td><a href={props.data.volumeInfo.previewLink} target='_blank'>Start Reading</a></td>
      </tr>
  )} else {
    row = (
      <tr>
        <td><img className='thumbnail' alt='thumbnail' src={thumbnail}/></td>
        <td><a href={props.data.volumeInfo.previewLink} target='_blank'>{title}</a></td>
        <td>{authors}</td>
      </tr>
  )}
  
  return row;
};

export default tableRow;