import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const PageListRow = ({item}) => {
    return (
      <tr>
          <td><Link to={`/${item.id}`}>{item.title}</Link></td>
          <td>{item.body}</td>
      </tr>
    );
};

PageListRow.propTypes = {
    item: PropTypes.object.isRequired
};

export default PageListRow;