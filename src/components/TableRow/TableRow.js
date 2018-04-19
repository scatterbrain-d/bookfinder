import React from 'react';

const tableRow = (props) => {
  
  //sets thumbnail to generic book image if none exists
  let thumbnail = 'http://packetpushers.net/wp-content/uploads/2015/04/accessories-dictionary.png';
  if (props.data.volumeInfo.imageLinks)
    thumbnail = props.data.volumeInfo.imageLinks.smallThumbnail;
  
  //formats multiple authors correctly
  let authors = props.data.volumeInfo.authors;
  if (authors && authors.length > 1)
    authors = authors.join(', ');
  
  //trims long titles
  let title = props.data.volumeInfo.title.substring(0,100);
  if (title.length > 99) title += '...';
  
  return (
    <tr>
      <td><img height={80} alt='thumbnail' src={thumbnail}/></td>
      <td>{title}</td>
      <td>{authors}</td>
      <td>{props.data.volumeInfo.publishedDate}</td>
      <td><a href={props.data.volumeInfo.previewLink} target='_blank'>Start Reading</a></td>
    </tr>
    );
};

export default tableRow;