import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as logActions from '../../actions/logActions';
import LogForm from './LogForm';
import toastr from 'toastr';
import logModel from '../../models/logModel';

class ManageLogPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            log: Object.assign({}, logModel, props.log),
            errors: {},
            saving: false,
            deleteState: 0,
            appIsMounted: false,
            logTypes: [],
            overviewTypes: [],
            editing: props.editing || false
        };

        this.saveLog        = this.saveLog.bind(this);
        this.updateLogState = this.updateLogState.bind(this);
        this.deleteLog      = this.deleteLog.bind(this);
    }

    componentDidMount() {
        requestAnimationFrame(() => {
            this.setState({appIsMounted: true});
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.log.id != nextProps.log.id) {
            // Necessary to populate form when existing log is loaded directly.
            this.setState({log: Object.assign({}, nextProps.log), editing: true});
        }
    }

    updateLogState(event) {
        const log    = this.state.log;
        if(Array.isArray(event)) {
            log.references = event;
        } else {
            const field        = event.target.name;
            log[field] = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        }
        return this.setState({log});
    }

    saveLog(event, keepEditing = false) {
        event.preventDefault();
        this.setState({saving: true});
        toastr.clear();
        this.props.actions.saveLog(this.state.log)
          .then(() => this.redirect(keepEditing))
          .catch(error => {
              toastr.error(error);
              this.setState({saving: false});
          });
    }

    deleteLog(event = false) {
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
            toastr.warning('Sure you want to delete this log? Click again to confirm.');
            toastr.options.timeOut = 5000;
        } else if (this.state.deleteState === 2) {
            const log = this.state.log;
            toastr.clear();
            this.props.actions.deleteLog(log)
              .then(() => this.redirectAfterDelete(log))
              .catch(error => {
                  console.error(error);
                  toastr.error(error);
                  this.setState({deleting: false});
              });
        }
    }

    redirect(keepEditing = false) {
        this.setState({saving: false});
        toastr.success('Log saved');
        this.context.router.push(keepEditing ? `/logs/${this.state.log.id}/edit` : `/logs/${this.state.log.id}`);
    }

    redirectAfterDelete(log) {
        this.setState({deleting: false});
        toastr.success(`Log <strong>${log.title}</strong> deleted`);
        this.context.router.push(`/logs`);
    }

    render() {
        return (
          <div>
              <h1>Manage Log</h1>
              <LogForm
                onChange={this.updateLogState}
                onSave={this.saveLog}
                onDelete={this.deleteLog}
                log={this.state.log}
                errors={this.state.errors}
                saving={this.state.saving}
                deleteState={this.state.deleteState}
                logTypes={this.props.logTypes}
                editing={this.state.editing}
                referenceOptions={this.props.referenceOptions}
                statusTypes={this.props.statusTypes}
              />
          </div>
        );
    }
}

ManageLogPage.propTypes = {
    log: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

ManageLogPage.contextTypes = {
    router: PropTypes.object.isRequired
};

function getLogById(logs, id) {
    const log = logs.find(log => log.id === id);
    if (log) return log; //since filter returns an array, have to grab the first.
    return logModel;
}

function mapStateToProps(state, ownProps) {
    let log = logModel;

    const logId = ownProps.params.id;

    const editing = logId && state.logs.length > 0;

    if (editing) {
        log = getLogById(state.logs, logId);
    }

    const logTypes = [
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
        log,
        logTypes,
        editing,
        referenceOptions,
        statusTypes
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(logActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageLogPage);