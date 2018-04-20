import React from 'react';

import Paginator from './Paginator/Paginator';
import TableHeaders from './TableHeaders/TableHeaders';
import TableRow from './TableRow/TableRow';
import Spinner from '../Utility/Spinner/Spinner';

const table = (props) => {
  
  //render table as long as loading is false and results exist, otherwise it's hidden
    let table= '';
    if (!props.loading && props.results && props.results.length > 0) {
      table = (
        <div>
          
          <Paginator
            page={props.page}
            pageSize={props.pageSize}
            totalItems={props.totalItems}
            clicked={props.paginate}
          />
          
          <table className='resultsTable'>
            
            <TableHeaders
              clicked={props.columnSort}
            />
            
            <tbody>
              {props.results.map((entry) => {
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
    } else if (props.loading)
        table = <Spinner/>;
      else if (props.called)
        table = <div className='error'>No results found.</div>;
    
    //displays error message if there was a problem with API call
    if (props.errorMsg)
      table = <div className='error'>{props.errorMsg.toString()}</div>;
  
  
  return table;
};

export default table;