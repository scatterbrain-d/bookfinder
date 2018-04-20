import React from 'react';

const pageSizer = (props) => {
  return (
    <span className='inlineInput'>
      <span>Page Size</span>
      <select
        name='pageSize'
        value={props.pageSize}
        onChange={props.changed}
      >
        <option>10</option>
        <option>20</option>
        <option>30</option>
        <option>40</option>
      </select>
    </span>
  );
};

export default pageSizer;