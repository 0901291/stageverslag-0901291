import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as achievementActions from '../../actions/achievementActions';
import {browserHistory} from 'react-router';

class AchievementPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.redirectToAddAchievementPage = this.redirectToAddAchievementPage.bind(this);
    }

    redirectToAddAchievementPage() {
        browserHistory.push('/achievement');
    }

    render() {
        const {achievements} = this.props;
        return (
            <div>
                <h1>Achievement</h1>
                <input type="submit"
                       value="Add achievement"
                       className="btn btn-primary"
                       onClick={this.redirectToAddAchievementPage}
                />
            </div>
        );
    }
}

AchievementPage.propTypes = {
    achievements: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
       achievements: state.achievements
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(achievementActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AchievementPage);