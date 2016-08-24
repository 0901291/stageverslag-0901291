import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as pageActions from '../../actions/pageActions';
import {browserHistory} from 'react-router';

class Page extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
    }

    redirectToAddCoursePage() {
        browserHistory.push('/page');
    }

    render() {
        const {page} = this.props;
        return (
            <div>
                <h1>Page</h1>
            </div>
        );
    }
}

Page.propTypes = {
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
       pages: state.pages
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(pageActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);