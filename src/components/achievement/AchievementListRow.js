import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const AchievementListRow = ({achievement}) => {
    return (
      <tr>
          <td>
              <span>
                  <i className={`glyphicon ${achievement.status.class}`}></i>
                  {' '}
                  {achievement.status.label}
              </span>
          </td>
          <td><Link to={`/achievements/${achievement.id}`}>{achievement.title}</Link></td>
          <td className='body'>{achievement.body}</td>
      </tr>
    );
};

AchievementListRow.propTypes = {
    achievement: PropTypes.object.isRequired
};

export default AchievementListRow;