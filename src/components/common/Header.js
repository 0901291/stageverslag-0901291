import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const links = [];

        this.props.pages.filter(page => page.show_nav).forEach((page, key) => {
            if(key !== 0) {
                links.push(" | ");
            }
            const link = page.id === 'home' ? '/' : page.id;
            links.push(<IndexLink key={page.id} to={link} activeClassName="active">{page.title}</IndexLink>);
        });
        return (
          <nav>
              {links}
          </nav>
        );
    }

};

Header.propTypes = {
    loading: PropTypes.bool.isRequired,
    pages: PropTypes.array.isRequired
};

export default Header;