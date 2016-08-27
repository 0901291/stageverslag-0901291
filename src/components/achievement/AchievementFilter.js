import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import AdvancedSelect from 'react-select';
import achievementTypes from '../../models/achievementTypes';
import statusTypes from '../../models/statusTypes';

class AchievementFilter extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            filters: {
                categoryFilter: [],
                statusFilter: []
            }
        };

        this.onCategoryFilterChange = this.onCategoryFilterChange.bind(this);
        this.onStatusFilterChange = this.onStatusFilterChange.bind(this);
    }

    onCategoryFilterChange(event) {
        const filters    = this.state.filters;
        if(Array.isArray(event)) { // Redux select component calls onChange with value object, not Event object
            filters.categoryFilter = event;
        } else {
            filters.categoryFilter = [];
        }
        this.props.onFilterChange(filters);
        return this.setState({filters});
    }

    onStatusFilterChange(event) {
        const filters    = this.state.filters;
        if(Array.isArray(event)) { // Redux select component calls onChange with value object, not Event object
            filters.statusFilter = event;
        } else {
            filters.statusFilter = [];
        }
        this.props.onFilterChange(filters);
        return this.setState({filters});
    }

    render() {
        return (
          <div>
              <h3>Filter achievements</h3>
              <form className="form-inline">
                  <div className="form-group">
                      <label htmlFor="statusFilter">{"Status"}</label>
                      <div className="field">
                          <AdvancedSelect
                            name="statusFilter"
                            value={this.state.filters.statusFilter}
                            options={statusTypes}
                            onChange={this.onStatusFilterChange}
                            multi={true}/>
                      </div>
                  </div>
                  <div className="form-group">
                      <label htmlFor="categoryFilter">{"Categories"}</label>
                      <div className="field">
                          <AdvancedSelect
                            name="categoryFilter"
                            value={this.state.filters.categoryFilter}
                            options={achievementTypes}
                            onChange={this.onCategoryFilterChange}
                            multi={true}/>
                      </div>
                  </div>
              </form>
          </div>
        );
    }
};

AchievementFilter.contextTypes = {
    router: PropTypes.object.isRequired
};

AchievementFilter.propTypes = {
};

export default AchievementFilter;