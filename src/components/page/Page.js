import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as pageActions from '../../actions/pageActions';
import {Link} from 'react-router';
import PageList from './PageList';
import AchievementList from '../achievement/AchievementList';
import LogList from '../achievement/AchievementList';

class Page extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const page = this.props.page;
        const data = this.props.data;
        let OverviewPage;
        switch(page.overview_type) {
            case 'achievement':
                OverviewPage = AchievementList;
                break;
            case 'log':
                OverviewPage = LogList;
                break;
            case 'page':
            default:
                OverviewPage = PageList;
        }
        return (
            <div>
                {page.type === 'overview' && <Link to={`/${page.overview_type}s/add`} className="btn btn-primary btn-lg">Add new {page.overview_type}</Link>}
                <h1>{page.title}</h1>
                <p>{page.body}</p>
                {page.type === 'overview' && <OverviewPage data={data} />}
            </div>
        );
    }
}

Page.propTypes = {
    actions: PropTypes.object.isRequired
};

Page.contextTypes = {
    router: PropTypes.object.isRequired
};

function getPageById(pages, id) {
    const page = pages.find(page => page.id === id);
    if (page) return page;
    return null;
}

function mapStateToProps(state, ownProps) {
    let page = {
        id: "",
        title: "",
        body: "",
        type: "",
        overview_type: "basic",
        access: true,
        show_nav: true
    };

    const pageId = ownProps.params.page || ownProps.route.page;

    if(pageId && state.pages.length > 0) {
        page = getPageById(state.pages, pageId) || page;
    }

    const data = state[(page.overview_type || '') + 's'] || [];

    return {
        page,
        data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(pageActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);