import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as pageActions from '../../actions/pageActions';
import PageForm from './PageForm';
import toastr from 'toastr';

class ManagePagePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            page: Object.assign({}, props.page),
            errors: {},
            saving: false,
            appIsMounted: false
        };

        this.savePage = this.savePage.bind(this);
        this.updatePageState = this.updatePageState.bind(this);
    }

    componentDidMount() {
        requestAnimationFrame(() => {
            this.setState({ appIsMounted: true });
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.page.id != nextProps.page.id) {
            // Necessary to populate form when existing page is loaded directly.
            this.setState({page: Object.assign({}, nextProps.page)});
        }
    }

    updatePageState(event) {
        const field = event.target.name;
        let page = this.state.page;
        page[field] = event.target.value;
        return this.setState({page});
    }

    savePage(event) {
        event.preventDefault();
        this.setState({saving: true});
        this.props.actions.savePage(this.state.page)
            .then(() => this.redirect())
            .catch(error => {
                toastr.error(error);
                this.setState({saving: false});
            });
    }

    redirect() {
        this.setState({saving: false});
        toastr.success('Page saved');
        this.context.router.push('/pages');
    }

    render() {
        return (
            <div>
                <h1>Manage Page</h1>
                <PageForm
                    onChange={this.updatePageState}
                    onSave={this.savePage}
                    page={this.state.page}
                    errors={this.state.errors}
                    saving={this.state.saving}
                />
            </div>
        );
    }
}

ManagePagePage.propTypes = {
    page: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

ManagePagePage.contextTypes = {
    router: PropTypes.object.isRequired
};

function getPageById(pages, id) {
    const page = pages.filter(page => page.id == id);
    if (page) return page[0]; //since filter returns an array, have to grab the first.
    return null;
}

function mapStateToProps(state, ownProps) {
    let page = {
        id: "",
        title: "",
        body: "",
        type: "",
        overview_type: "",
        access: ""
    };

    const pageId = ownProps.params.id;

    if (pageId && state.pages.length > 0) {
        page = getPageById(state.pages, pageId);
    }

    return {
        page
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(pageActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePagePage);