import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as pageActions from '../../actions/pageActions';
import PageForm from './PageForm';
import toastr from 'toastr';
import pageModel from '../../models/pageModel';

class ManagePagePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            page: Object.assign({}, pageModel, props.page),
            errors: {},
            saving: false,
            deleteState: 0,
            appIsMounted: false,
            pageTypes: [],
            overviewTypes: [],
            editing: props.editing || false
        };

        this.savePage        = this.savePage.bind(this);
        this.updatePageState = this.updatePageState.bind(this);
        this.deletePage      = this.deletePage.bind(this);
    }

    componentDidMount() {
        requestAnimationFrame(() => {
            this.setState({appIsMounted: true});
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.page.id != nextProps.page.id) {
            // Necessary to populate form when existing page is loaded directly.
            this.setState({page: Object.assign({}, nextProps.page), editing: true});
        }
    }

    updatePageState(event) {
        const field = event.target.name;
        let page    = this.state.page;
        page[field] = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        return this.setState({page});
    }

    savePage(event, keepEditing = false) {
        event.preventDefault();
        this.setState({saving: true});
        toastr.clear();
        this.props.actions.savePage(this.state.page)
          .then(() => this.redirect(keepEditing))
          .catch(error => {
              toastr.error(error);
              this.setState({saving: false});
          });
    }

    deletePage(event = false) {
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
            toastr.warning('Sure you want to delete this page? Click again to confirm.');
            toastr.options.timeOut = 5000;
        } else if (this.state.deleteState === 2) {
            const page = this.state.page;
            toastr.clear();
            this.props.actions.deletePage(page)
              .then(() => this.redirectAfterDelete(page))
              .catch(error => {
                  console.error(error);
                  toastr.error(error);
                  this.setState({deleting: false});
              });
        }
    }

    redirect(keepEditing = false) {
        this.setState({saving: false});
        toastr.success('Page saved');
        this.context.router.push(keepEditing ? `/pages/${this.state.page.id}/edit` : `/${this.state.page.id}`);
    }

    redirectAfterDelete(page) {
        this.setState({deleting: false});
        toastr.success(`Page <strong>${page.title}</strong> deleted`);
        this.context.router.push(`/pages`);
    }

    render() {
        return (
          <div>
              <h1>Manage Page</h1>
              <PageForm
                onChange={this.updatePageState}
                onSave={this.savePage}
                onDelete={this.deletePage}
                page={this.state.page}
                errors={this.state.errors}
                saving={this.state.saving}
                deleteState={this.state.deleteState}
                pageTypes={this.props.pageTypes}
                overviewTypes={this.props.overviewTypes}
                editing={this.state.editing}
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
    const page = pages.find(page => page.id === id);
    if (page) return page; //since filter returns an array, have to grab the first.
    return pageModel;
}

function mapStateToProps(state, ownProps) {
    let page = pageModel;

    const pageId = ownProps.params.id;

    const editing = pageId && state.pages.length > 0;

    if (editing) {
        page = getPageById(state.pages, pageId);
    }

    const pageTypes = [
        {
            value: "overview",
            text: "Overview page"
        },
        {
            value: "basic",
            text: "Basic page"
        }
    ];

    const overviewTypes = [
        {
            value: "achievement",
            text: "Achievements"
        },
        {
            value: "log",
            text: "Logs"
        },
        {
            value: "page",
            text: "Pages"
        }
    ];

    return {
        page,
        pageTypes,
        overviewTypes,
        editing
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(pageActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePagePage);