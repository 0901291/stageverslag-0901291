import React, {PropTypes} from 'react';
import AchievementListRow from './AchievementListRow.js';

const AchievementList = ({data}) => {
    return (
      <table>
          <thead>
          <tr>
              <th>Status</th>
              <th>Title</th>
              <th>Body</th>
          </tr>
          </thead>
          <tbody>
          {data.map(achievement =>
            <AchievementListRow key={achievement.id} achievement={achievement}/>
          )}
          </tbody>
      </table>
    );
};

AchievementList.propTypes = {
    data: PropTypes.array.isRequired
};

export default AchievementList;