import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as achievementActions from '../../actions/achievementActions';
import AchievementForm from './AchievementForm';
import toastr from 'toastr';
import achievementModel from '../../models/achievementModel';

class ManageAchievementPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            achievement: Object.assign({}, achievementModel, props.achievement),
            errors: {},
            saving: false,
            deleteState: 0,
            appIsMounted: false,
            achievementTypes: [],
            overviewTypes: [],
            editing: props.editing || false
        };

        this.saveAchievement        = this.saveAchievement.bind(this);
        this.updateAchievementState = this.updateAchievementState.bind(this);
        this.deleteAchievement      = this.deleteAchievement.bind(this);
    }

    componentDidMount() {
        requestAnimationFrame(() => {
            this.setState({appIsMounted: true});
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.achievement.id != nextProps.achievement.id) {
            // Necessary to populate form when existing achievement is loaded directly.
            this.setState({achievement: Object.assign({}, nextProps.achievement), editing: true});
        }
    }

    updateAchievementState(event) {
        const achievement    = this.state.achievement;
        if(Array.isArray(event)) {
            achievement.references = event;
        } else {
            const field        = event.target.name;
            achievement[field] = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        }
        return this.setState({achievement});
    }

    saveAchievement(event, keepEditing = false) {
        event.preventDefault();
        this.setState({saving: true});
        toastr.clear();
        this.props.actions.saveAchievement(this.state.achievement)
          .then(() => this.redirect(keepEditing))
          .catch(error => {
              toastr.error(error);
              this.setState({saving: false});
          });
    }

    deleteAchievement(event = false) {
        if (!event) {
            this.setState({deleteState: 0});
        } else {
            if (event !== true) {
                event.preventDefault();
            }
            this.setState({deleteState: ++this.state.deleteState});
        }
        if (this.state.deleteState === 1) {
            toastr.options.timeOut = 0;
            toastr.warning('Sure you want to delete this achievement? Click again to confirm.');
            toastr.options.timeOut = 5000;
        } else if (this.state.deleteState === 2) {
            const achievement = this.state.achievement;
            toastr.clear();
            this.props.actions.deleteAchievement(achievement)
              .then(() => this.redirectAfterDelete(achievement))
              .catch(error => {
                  console.error(error);
                  toastr.error(error);
                  this.setState({deleting: false});
              });
        }
    }

    redirect(keepEditing = false) {
        this.setState({saving: false});
        toastr.success('Achievement saved');
        this.context.router.push(keepEditing ? `/achievements/${this.state.achievement.id}/edit` : `/achievements/${this.state.achievement.id}`);
    }

    redirectAfterDelete(achievement) {
        this.setState({deleting: false});
        toastr.success(`Achievement <strong>${achievement.title}</strong> deleted`);
        this.context.router.push(`/achievements`);
    }

    render() {
        return (
          <div>
              <h1>Manage Achievement</h1>
              <AchievementForm
                onChange={this.updateAchievementState}
                onSave={this.saveAchievement}
                onDelete={this.deleteAchievement}
                achievement={this.state.achievement}
                errors={this.state.errors}
                saving={this.state.saving}
                deleteState={this.state.deleteState}
                achievementTypes={this.props.achievementTypes}
                editing={this.state.editing}
                referenceOptions={this.props.referenceOptions}
                statusTypes={this.props.statusTypes}
              />
          </div>
        );
    }
}

ManageAchievementPage.propTypes = {
    achievement: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

ManageAchievementPage.contextTypes = {
    router: PropTypes.object.isRequired
};

function getAchievementById(achievements, id) {
    const achievement = achievements.find(achievement => achievement.id === id);
    if (achievement) return achievement; //since filter returns an array, have to grab the first.
    return achievementModel;
}

function mapStateToProps(state, ownProps) {
    let achievement = achievementModel;

    const achievementId = ownProps.params.id;

    const editing = achievementId && state.achievements.length > 0;

    if (editing) {
        achievement = getAchievementById(state.achievements, achievementId);
    }

    const achievementTypes = [
        {
            value: "Analyseren",
            text: "Analyseren"
        },
        {
            value: "Adviseren",
            text: "Adviseren"
        },
        {
            value: "Ontwerpen",
            text: "Ontwerpen"
        },
        {
            value: "Realiseren",
            text: "Realiseren"
        },
        {
            value: "Implementeren",
            text: "Implementeren"
        }
    ];

    const statusTypes = [
        {
            value: "to_do",
            text: "To do"
        },
        {
            value: "in_progress",
            text: "In progress"
        },
        {
            value: "done",
            text: "Done"
        }
    ];

    let referenceOptions = [];
    if(state.pages.length) {
        const options = [...state.pages, ...state.logs];
        referenceOptions = options.map(option => {
            return {
                value: option.id,
                label: `${option.title} (${option.content_type})`
            }
        });
    }

    return {
        achievement,
        achievementTypes,
        editing,
        referenceOptions,
        statusTypes
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(achievementActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAchievementPage);