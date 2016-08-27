import React, {PropTypes} from 'react';
import PageListRow from './PageListRow.js';

/**
 * PageList Component
 * @param data Array with items to list
 * @returns {*} React Component
 * @constructor
 */
const PageList = ({data}) => {
    return (
      <table>
          <thead>
          <tr>
              <th>Title</th>
              <th>Body</th>
          </tr>
          </thead>
          <tbody>
          {data.map(page =>
            <PageListRow key={page.id} page={page}/>
          )}
          </tbody>
      </table>
    );
};

PageList.propTypes = {
    data: PropTypes.array.isRequired
};

export default PageList;