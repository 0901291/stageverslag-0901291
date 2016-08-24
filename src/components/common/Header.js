import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { appIsMounted: false };
    }

    componentDidMount() {
        requestAnimationFrame(() => {
            this.setState({ appIsMounted: true });
        });
    }

    render() {
        return (
          <nav>
              <IndexLink to="/" activeClassName="active">Home</IndexLink>
              {" | "}
              <IndexLink to="/logs" activeClassName="active">Logs</IndexLink>
              {" | "}
              <IndexLink to="/achievements" activeClassName="active">Achievements</IndexLink>
              {" | "}
              <IndexLink to="/pages" activeClassName="active">Pages</IndexLink>
              {/*{this.state.appIsMounted && this.props.loading && <LoadingDots interval={100} dots={20} />}*/}
          </nav>
        );
    }

};

Header.propTypes = {
    loading: PropTypes.bool.isRequired
};

export default Header;