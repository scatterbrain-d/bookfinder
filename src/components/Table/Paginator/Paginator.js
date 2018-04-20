import React from 'react';

const paginator = (props) => {
  return (
    <div className='pages'>
      <button onClick={(event) => props.clicked(event, -1)}>Previous</button>
      
      <span>
        Page: {props.page}/{Math.ceil(props.totalItems/props.pageSize)}
      </span>
      
      <button onClick={(event) => props.clicked(event, 1)}>Next</button>
    </div>
  );
};

export default paginator;