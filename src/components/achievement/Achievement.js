import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as achievementActions from '../../actions/achievementActions';
import {Link} from 'react-router';
import achievementModel from '../../models/achievementModel';

const Achievement = ({achievement, references}) => {
    console.log(references);
    references = references.map(reference =>
      <li key={reference.id}><Link to={`/${reference.content_type}s/${reference.id}`}>{reference.title}</Link></li>
    );

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
              <h2>References</h2>
              <p>Read more about this achievement on any of the following pages and/or log items.</p>
              <ol>
                  {references}
              </ol>
        </div>
    );
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

    let references = [];

    if(state.pages.length || state.logs.length) {
        references = achievement.references.map(reference => {
            return state.pages.find(page => page.id === reference.value) || state.logs.find(log => log.id === reference.value) || {
                  id: '',
                  title: '',
                  overview_type: ''
              }
        });
    }


    return {
        achievement,
        references
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(achievementActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Achievement);