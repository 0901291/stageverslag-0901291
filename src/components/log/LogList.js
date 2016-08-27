import React, {PropTypes} from 'react';
import LogListRow from './LogListRow.js';

const LogList = ({data}) => {
    return (
      <table>
          <thead>
          <tr>
              <th>Title</th>
              <th>Body</th>
          </tr>
          </thead>
          <tbody>
          {data.map(log =>
            <LogListRow key={log.id} log={log}/>
          )}
          </tbody>
      </table>
    );
};

LogList.propTypes = {
    data: PropTypes.array.isRequired
};

export default LogList;