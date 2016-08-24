import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as achievementActions from '../../actions/achievementActions';
import AchievementForm from './AchievementForm';
import toastr from 'toastr';

class ManageAchievementPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            achievement: Object.assign({}, props.achievement),
            errors: {},
            saving: false
        };

        this.saveAchievement = this.saveAchievement.bind(this);
        this.updateAchievementState = this.updateAchievementState.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.achievement.id != nextProps.achievement.id) {
            // Necessary to populate form when existing achievement is loaded directly.
            this.setState({achievement: Object.assign({}, nextProps.achievement)});
        }
    }

    updateAchievementState(event) {
        const field = event.target.name;
        let achievement = this.state.achievement;
        achievement[field] = event.target.value;
        return this.setState({achievement});
    }

    saveAchievement(event) {
        event.preventDefault();
        this.setState({saving: true});
        this.props.actions.saveAchievement(this.state.achievement)
            .then(() => this.redirect())
            .catch(error => {
                toastr.error(error);
                this.setState({saving: false});
            });
    }

    redirect() {
        this.setState({saving: false});
        toastr.success('Achievement saved');
        this.context.router.push('/achievements');
    }

    render() {
        return (
            <div>
                <h1>Manage Achievement</h1>
                <AchievementForm
                    allAuthors={this.props.authors}
                    onChange={this.updateAchievementState}
                    onSave={this.saveAchievement}
                    achievement={this.state.achievement}
                    errors={this.state.errors}
                    saving={this.state.saving}
                />
            </div>
        );
    }
}

ManageAchievementPage.propTypes = {
    achievement: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

ManageAchievementPage.contextTypes = {
    router: PropTypes.object.isRequired
};

function getAchievementById(achievements, id) {
    const achievement = achievements.filter(achievement => achievement.id == id);
    if (achievement) return achievement[0]; //since filter returns an array, have to grab the first.
    return null;
}

function mapStateToProps(state, ownProps) {
    let achievement = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};


    const achievementId = ownProps.params.id;

    if (achievementId && state.achievements.length > 0) {
        achievement = getAchievementById(state.achievements, achievementId);
    }

    const authorsFormattedForDropdown = state.authors.map(author => {
        return {
            value: author.id,
            text: author.firstName + ' ' + author.lastName
        };
    });

    return {
        achievement,
        authors: authorsFormattedForDropdown
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(achievementActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAchievementPage);