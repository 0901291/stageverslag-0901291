import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as logActions from '../../actions/logActions';
import {Link} from 'react-router';
import logModel from '../../models/logModel';

class Log extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            log: Object.assign({}, logModel, props.log)
        }
    }

    render() {
        const log = this.props.log;
        return (
          <div>
              <Link to={`/logs/${log.id}/edit`}
                    className="btn btn-lg btn-primary">Edit log</Link>
              <h1>{log.title}</h1>
              <p>{log.body}</p>
          </div>
        );
    }
}

Log.propTypes = {
    actions: PropTypes.object.isRequired
};

Log.contextTypes = {
    router: PropTypes.object.isRequired
};

function getLogById(logs, id) {
    const log = logs.find(log => log.id === id);
    if (log) return log;
    return null;
}

function mapStateToProps(state, ownProps) {
    let log = logModel;

    const logId = ownProps.params.id || ownProps.route.log;

    if (logId && state.logs.length > 0) {
        log = getLogById(state.logs, logId) || log;
    }

    const data = state[(log.overview_type || '') + 's'] || [];

    return {
        log,
        data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(logActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Log);