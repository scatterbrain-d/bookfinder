import React from 'react';

const tableRow = (props) => {
  
  let thumbnail = 'http://packetpushers.net/wp-content/uploads/2015/04/accessories-dictionary.png';
  if (props.data.volumeInfo.imageLinks)
    thumbnail = props.data.volumeInfo.imageLinks.smallThumbnail;
  let authors = props.data.volumeInfo.authors;
  if (authors && authors.length > 1)
    authors = authors.join(', ');
  
  return (
    <tr>
      <td><img height={80} alt='thumbnail' src={thumbnail}/></td>
      <td>{props.data.volumeInfo.title}</td>
      <td>{authors}</td>
      <td>{props.data.volumeInfo.publishedDate}</td>
      <td><a href={props.data.volumeInfo.previewLink} target='_blank'>Start Reading</a></td>
    </tr>
    );
};

export default tableRow;