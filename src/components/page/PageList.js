import React, {PropTypes} from 'react';
import PageListRow from './PageListRow.js';

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