import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as achievementActions from '../../actions/achievementActions';
import {Link} from 'react-router';
import achievementModel from '../../models/achievementModel';

class Achievement extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            achievement: Object.assign({}, achievementModel, props.achievement)
        }
    }

    render() {
        const achievement = this.props.achievement;
        return (
          <div>
              <Link to={`/achievements/${achievement.id}/edit`}
                    className="btn btn-lg btn-primary">Edit achievement</Link>
              <h1>{achievement.title}</h1>
              <p>{achievement.body}</p>
              <span>
                  <i className={`glyphicon ${achievement.status.class}`}></i>
                  {' '}
                  {achievement.status.label}
              </span>
          </div>
        );
    }
}

Achievement.propTypes = {
    actions: PropTypes.object.isRequired
};

Achievement.contextTypes = {
    router: PropTypes.object.isRequired
};

function getAchievementById(achievements, id) {
    const achievement = achievements.find(achievement => achievement.id === id);
    if (achievement) return achievement;
    return null;
}

function mapStateToProps(state, ownProps) {
    let achievement = achievementModel;

    const achievementId = ownProps.params.id || ownProps.route.achievement;

    if (achievementId && state.achievements.length > 0) {
        achievement = getAchievementById(state.achievements, achievementId) || achievement;
    }

    const data = state[(achievement.overview_type || '') + 's'] || [];

    return {
        achievement,
        data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(achievementActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Achievement);