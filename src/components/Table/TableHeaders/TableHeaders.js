import React from 'react';
import Aux from '../../Utility/Aux/Aux';

const tableHeaders = (props) => {
  //removes publish date and preview columns for mobile viewing
  let extraColumns = null;
  if (window.innerWidth > 550) {
    extraColumns = (
      <Aux>
        <th><button
          name='publishedDate'
          onClick={props.clicked}
        >Published
        </button></th>
        
        <th>Preview</th>
      </Aux>
  )}
  
  return (
    <thead className='tableHeaders'>
      <tr>
        
        <th>Image</th>
        
        <th>
          <button
            name='title'
            onClick={props.clicked}
          >Title
          </button>
        </th>
        
        <th>
          <button
            name='authors'
            onClick={props.clicked}
          >Authors
          </button>
        </th>
        
        {extraColumns}
      
      </tr>
    </thead>
  )
};

export default tableHeaders;