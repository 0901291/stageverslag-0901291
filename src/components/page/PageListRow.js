import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const PageListRow = ({page}) => {
    return (
      <tr>
          <td><Link to={`/${page.id}`}>{page.title}</Link></td>
          <td className='body'>{page.body}</td>
      </tr>
    );
};

PageListRow.propTypes = {
    page: PropTypes.object.isRequired
};

export default PageListRow;