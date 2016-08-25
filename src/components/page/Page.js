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
        const page = this.props.page;
        return (
            <div>
                <h1>{page.title}</h1>
            </div>
        );
    }
}

Page.propTypes = {
    actions: PropTypes.object.isRequired
};

function getPageById(pages, id) {
    const page = pages.find(page => page.id === id);
    if (page) return page; //since filter returns an array, have to grab the first.
    return null;
}

function mapStateToProps(state, ownProps) {
    const pageId = ownProps.params.page || ownProps.route.page;

    let page = pageId && state.pages.length > 0 ? getPageById(state.pages, pageId) : {};

    return {
        page
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(pageActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);