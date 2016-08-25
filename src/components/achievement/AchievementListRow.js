import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const AchievementListRow = ({item}) => {
    return (
        <tr>
            <td><Link to={`/achievements/${item.id}`}>{item.title}</Link></td>
            <td>{item.body}</td>
        </tr>
    );
};

AchievementListRow.propTypes = {
    item: PropTypes.object.isRequired
};

export default AchievementListRow;