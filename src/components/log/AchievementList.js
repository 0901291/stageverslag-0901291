import React, {PropTypes} from 'react';
import AchievementListRow from './AchievementListRow.js';

const AchievementList = ({data}) => {
    return (
      <table>
          <thead>
          <tr>
              <th>Title</th>
              <th>Body</th>
          </tr>
          </thead>
          <tbody>
          {data.map(item =>
            <AchievementListRow key={item.id} item={item}/>
          )}
          </tbody>
      </table>
    );
};

AchievementList.propTypes = {
    data: PropTypes.array.isRequired
};

export default AchievementList;