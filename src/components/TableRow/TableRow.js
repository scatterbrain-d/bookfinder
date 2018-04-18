import React from 'react';

const tableRow = (props) => {
  console.log(props.data);
  return (
    <tr>
      <td><img height={80} alt='thumbnail' src={props.data.volumeInfo.imageLinks.smallThumbnail}/></td>
      <td>{props.data.volumeInfo.title}</td>
      <td>{props.data.volumeInfo.authors}</td>
      <td>{props.data.volumeInfo.publishedDate}</td>
      <td><a href={props.data.volumeInfo.previewLink}>Preview</a></td>
    </tr>
    );
};

export default tableRow;